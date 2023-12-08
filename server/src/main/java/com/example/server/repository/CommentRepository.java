package com.example.server.repository;

import com.example.server.entity.CommentEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CommentRepository extends CrudRepository<CommentEntity, Long> {
    List<CommentEntity> findAllByFlatId(Long id);
}
