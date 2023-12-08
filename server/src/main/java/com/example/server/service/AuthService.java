package com.example.server.service;

import com.example.server.repository.AdminRepository;
import com.example.server.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    AdminRepository adminRepository;

    @Autowired
    ManagerRepository managerRepository;

    public boolean adminAuth(String token) throws Exception {
        if(adminRepository.findOneByToken(token) != null){
            return true;
        }
        throw new Exception("Необходимо авторизоваться");
    }

    public boolean managerAuth(String token) throws Exception {
        if(managerRepository.findOneByToken(token) != null){
            return true;
        }
        throw new Exception("Необходимо авторизоваться");
    }
}
