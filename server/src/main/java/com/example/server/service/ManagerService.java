package com.example.server.service;

import com.example.server.entity.ManagerEntity;
import com.example.server.model.Manager;
import com.example.server.model.Role;
import com.example.server.repository.ManagerRepository;
import com.example.server.utils.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ManagerService {

    @Autowired
    ManagerRepository managerRepository;

    public String add(ManagerEntity managerEntity){
        managerEntity.setToken(TokenUtils.generateToken(managerEntity));
        managerEntity.setRole(Role.MANAGER);
        managerRepository.save(managerEntity);
        return managerEntity.getToken();
    }

    public Object login(ManagerEntity managerEntity) throws Exception {
        ManagerEntity manager = managerRepository.findFirstByLogin(managerEntity.getLogin());
        if(manager.getPassword().equals(managerEntity.getPassword())){
            manager.setToken(TokenUtils.generateToken(manager));
            managerRepository.save(manager);

            Manager managerModel = new Manager();
            managerModel.setLogin(manager.getLogin());
            managerModel.setEmail(manager.getEmail());
            managerModel.setPhone(manager.getPhone());
            managerModel.setId(manager.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("token", manager.getToken());
            response.put("manager", managerModel);

            return response;
        }else{
            throw new Exception("Неверный пароль");
        }
    }
}
