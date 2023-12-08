package com.example.server.service;

import com.example.server.dto.CommentDTO;
import com.example.server.entity.*;
import com.example.server.model.Comment;
import com.example.server.model.Manager;
import com.example.server.model.RentFlat;
import com.example.server.repository.CommentRepository;
import com.example.server.repository.ManagerRepository;
import com.example.server.repository.RentFlatRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static io.swagger.v3.core.util.Yaml.mapper;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ManagerRepository managerRepository;

    @Autowired
    RentFlatRepository rentFlatRepository;

    ObjectMapper mapper = new ObjectMapper();


    public CommentEntity addComment(Comment comment) {
        comment.setFlat(RentFlat.toModel(rentFlatRepository.findOneById(comment.getFlat().getId())));
        CommentEntity commentEntity = mapper.convertValue(comment, CommentEntity.class);
        CommentEntity saveComment = commentRepository.save(commentEntity);
        calculateAvgRate(commentEntity.getFlat().getId());
        return saveComment;
    }

    public List<CommentDTO> getCommentsByRentFlatId(Long id) {
        List<CommentEntity> commentsEntities = commentRepository.findAllByFlatId(id);
        return commentsEntities.stream()
                .map(commentEntity -> this.mapper.convertValue(commentEntity, CommentDTO.class))
                .collect(ArrayList::new, List::add, List::addAll);
    }

    public CommentDTO editComment(Comment comment) {
        CommentEntity updateCommentEntity = commentRepository
                .save(mapper.convertValue(comment, CommentEntity.class));
        calculateAvgRate(updateCommentEntity.getFlat().getId());
        return mapper.convertValue(updateCommentEntity, CommentDTO.class);
    }

    private void calculateAvgRate(Long flatId) {
        RentFlatEntity flat = rentFlatRepository.findOneById(flatId);
        List<CommentEntity> comments = commentRepository.findAllByFlatId(flatId);
        Double avgRate = comments.stream().mapToDouble(CommentEntity::getRate).average()
                .orElse(-1);
        flat.setAvgRate(avgRate);
        rentFlatRepository.save(flat);
    }
}
