package com.backend.todolist.config;

import java.util.Arrays;

import com.backend.todolist.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.backend.todolist.auth.model.User;

@Configuration
public class UserConfig {

    @Autowired
    private UserRepository userRepository;

    @Bean
    CommandLineRunner initUsers() {
        return args -> {
            // Creating sample users
            User user1 = new User("user1", "heythere");
            User user2 = new User("user2", "heythere");

            // Save the sample users
            userRepository.saveAll(Arrays.asList(user1, user2));
        };
    }
}
