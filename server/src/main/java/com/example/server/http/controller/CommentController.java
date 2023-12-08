package com.example.server.http.controller;

import com.example.server.model.Comment;
import com.example.server.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@CrossOrigin("*")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping
    public ResponseEntity add(@RequestBody Comment comment) {
        try {
            return ResponseEntity.ok().body(commentService.addComment(comment));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Не удалось добавить комментарий");
        }
    }

    @GetMapping("/getByFlatId")
    public ResponseEntity getCommentByRentFlatId(@RequestParam Long id) {
        try {
            return ResponseEntity.ok().body(commentService.getCommentsByRentFlatId(id));
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.badRequest().body("Не удалось получить комментарии");
        }
    }

    @PutMapping
    public ResponseEntity update(@RequestBody Comment comment) {
        try {
            return ResponseEntity.ok().body(commentService.editComment(comment));
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body("Не удалось добавить комментарий");
        }
    }


}
