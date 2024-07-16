package com.backend.todolist.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.backend.todolist.model.Todo;
import com.backend.todolist.repository.TodoRepository;

@Configuration
public class ConfigTodo {
    @Autowired
    private TodoRepository todoRepository;

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            // Creating sample TODOs
            Todo todo1 = new Todo("Shopping List", "Buy milk, eggs, and bread from the grocery store", "user1");
            Todo todo2 = new Todo("Workout Plan", "Complete a 30-minute run and 15 minutes of strength training", "user1");
            Todo todo3 = new Todo("Project Meeting", "Discuss project milestones with the team at 10 AM", "user2");
            Todo todo4 = new Todo("Book Reading", "Read 50 pages of the novel 'The Great Gatsby'", "user2");
            Todo todo5 = new Todo("Dentist Appointment", "Visit the dentist for a regular check-up at 3 PM", "user1");
            Todo todo6 = new Todo("Guitar Practice", "Practice the new song for 45 minutes in the evening", "user1");
            Todo todo7 = new Todo("Dinner Preparation", "Prepare a healthy dinner with chicken, vegetables, and rice", "user2");
            Todo todo8 = new Todo("Laundry", "Wash, dry, and fold clothes by the end of the day", "user2");
            Todo todo9 = new Todo("Email Follow-up", "Send a follow-up email to the client regarding the project update", "user1");
            Todo todo10 = new Todo("Garden Maintenance", "Water the plants and trim the hedges in the garden", "user1");

            // Setting some of them as favourite
            todo1.setFavourite(true);
            todo5.setFavourite(true);
            todo7.setFavourite(true);

            // Save the sample TODOs
            todoRepository.saveAll(Arrays.asList(todo1, todo2, todo3, todo4, todo5, todo6, todo7, todo8, todo9, todo10));
        };
    }
}
