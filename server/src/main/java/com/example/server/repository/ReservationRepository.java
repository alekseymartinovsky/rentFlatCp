package com.example.server.repository;

import com.example.server.entity.RentFlatEntity;
import com.example.server.entity.ReservationEntity;
import org.springframework.data.repository.CrudRepository;

import java.sql.Date;
import java.util.List;

public interface ReservationRepository extends CrudRepository<ReservationEntity, String> {

    List<ReservationEntity> getByFlatIdAndEndDateAfter(Long id, Date nowDate);

    List<ReservationEntity> getByFlatId(Long id);
}
