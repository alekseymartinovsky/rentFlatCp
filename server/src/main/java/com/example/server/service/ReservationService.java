package com.example.server.service;

import com.example.server.dto.ApartmentReservationDto;
import com.example.server.dto.ManagerDto;
import com.example.server.dto.ReservationDto;
import com.example.server.entity.*;
import com.example.server.model.Flat;
import com.example.server.model.RentFlat;
import com.example.server.repository.ManagerRepository;
import com.example.server.repository.RentFlatRepository;
import com.example.server.repository.ReservationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    RentFlatRepository rentFlatRepository;

    @Autowired
    ManagerRepository managerRepository;

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    EmailService emailService;

    ObjectMapper mapper = new ObjectMapper();

    public ReservationDto addReservation(ReservationDto reservationDto) throws Exception {
        // TODO добавить проверки можно ли осуществить бронь
        RentFlatEntity flat = rentFlatRepository.findOneById(reservationDto.getFlatId());
        ReservationEntity reservation = this.reservationDtoToEntity(reservationDto);
        reservation.setDayPrice((double) flat.getFlatInfoEntity().getPrice());
        ReservationEntity saveReservation = reservationRepository.save(reservation);
        this.sendEmailNotification(saveReservation);

        return this.convertReservationEntityToDto(saveReservation);
    }

    private void sendEmailNotification(ReservationEntity reservation) {
        RentFlatEntity flatEntity = rentFlatRepository.findOneById(reservation.getFlatId());
        RentFlat flat = RentFlat.toModel(flatEntity);

        this.sendEmailToTenant(flat, reservation.getLandlordId());
        this.sendEmailToLandlord(flat, reservation.getTenantId());
    }

    private void sendEmailToTenant(RentFlat flat, Long landlordId) {
        ManagerEntity landlord = managerRepository.findFirstById(landlordId);
        String body = "Вы зарезервировали квартиру по адресус: " + flat.getAddress() + ". ";
        body += "Контакты владельца кваритры:" + landlord.getLogin() + ". Почта: " + landlord.getEmail();
        emailService.sendEmail("alexssd228@gmail.com", "FlatService Вы зарезервировали квартиру", body);
    }

    private void sendEmailToLandlord(RentFlat flat, Long tenantId) {
        ManagerEntity tenant = managerRepository.findFirstById(tenantId);
        String body = "Ваше квартиру по адресу: " + flat.getAddress() + ". ";
        body += "Зарезервирована пользователем " + tenant.getLogin() + ". Почта: " + tenant.getEmail();
        emailService.sendEmail("alexssd228@gmail.com", "FlatService Вашу квартиру зарезервировали", body);
    }


    public List<ReservationDto> getReservationByFlatId(Long id) {
        List<ReservationEntity> reservations = reservationRepository
                .getByFlatIdAndEndDateAfter(id, new Date(new java.util.Date().getTime()));

        return reservations.stream()
                .map(reservationEntity -> this.convertReservationEntityToDto(reservationEntity))
                .collect(ArrayList::new, List::add, List::addAll);
    }

    public List<ApartmentReservationDto> getReservationByUser(String token) throws Exception{
        ManagerEntity user = managerRepository.findOneByToken(token);
        List<RentFlatEntity> flats = rentFlatRepository.findAllByManagerEntity(user);

        Date currentDateSql = new Date(System.currentTimeMillis());
        LocalDate currentDate = currentDateSql.toLocalDate();
        LocalDate newDate = currentDate.minusDays(1);
        Date date = Date.valueOf(newDate);

        List<ApartmentReservationDto> result = new ArrayList<>();

        for(RentFlatEntity flat: flats) {
            List<ReservationEntity> reservations =
                    reservationRepository.getByFlatIdAndEndDateAfter(flat.getId(), date);
            List<Pair<ReservationDto, ManagerDto>> reserv = reservations.stream()
                    .map(reservationEntity ->
                    {
                        ReservationDto res = this.convertReservationEntityToDto(reservationEntity);
                        ManagerEntity manager = this.managerRepository.findFirstById(res.getTenantId());
                        ManagerDto man = this.mapper.convertValue(manager, ManagerDto.class);
                        return Pair.of(res, man);
                    })
                    .collect(ArrayList::new, List::add, List::addAll);

            result.add(new ApartmentReservationDto(RentFlat.toModel(flat), reserv));
        }

        return result;
    }


    private ReservationEntity reservationDtoToEntity(ReservationDto reservationDto) throws Exception {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        FlatEntity flat = rentFlatRepository.findOneById(reservationDto.getFlatId());

        ReservationEntity reservation = new ReservationEntity();
        reservation.setId(reservationDto.getId());
        reservation.setFlatId(flat.getId());
        // TODO брать id из логина
        reservation.setTenantId(reservationDto.getTenantId());
        reservation.setLandlordId(flat.getManagerEntity().getId());
        reservation.setStartDate(new Date(dateFormat.parse(reservationDto.getStartDate()).getTime()));
        reservation.setEndDate(new Date(dateFormat.parse(reservationDto.getEndDate()).getTime()));
        return reservation;
    }

    private ReservationDto convertReservationEntityToDto(ReservationEntity reservationEntity) {
        ReservationDto reservationDto = new ReservationDto();
        reservationDto.setId(reservationEntity.getId());
        reservationDto.setFlatId(reservationEntity.getFlatId());
        reservationDto.setTenantId(reservationEntity.getTenantId());
        reservationDto.setLandlordId(reservationEntity.getLandlordId());
        reservationDto.setStartDate(reservationEntity.getStartDate().toString());
        reservationDto.setEndDate(reservationEntity.getEndDate().toString());
        return reservationDto;
    }

}
