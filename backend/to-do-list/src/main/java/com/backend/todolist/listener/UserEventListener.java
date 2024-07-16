package com.backend.todolist.listener;

import com.backend.todolist.auth.model.User;
import com.backend.todolist.event.UserCreatedEvent;
import com.backend.todolist.model.Todo;
import com.backend.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UserEventListener {

    @Autowired
    private TodoRepository todoRepository;

    @EventListener
    public void onUserCreated(UserCreatedEvent event) {
        User user = event.getUser();

        // Define sample todos, some of which are marked as favourite
        Todo[] sampleTodos = {
                new Todo("Shopping List", "Buy milk, eggs, and bread from the grocery store", user.getUsername(), false),
                new Todo("Workout Plan", "Complete a 30-minute run and 15 minutes of strength training", user.getUsername(), true),
                new Todo("Project Meeting", "Discuss project milestones with the team at 10 AM", user.getUsername(), false),
                new Todo("Book Reading", "Read 50 pages of the novel 'The Great Gatsby'", user.getUsername(), true),
                new Todo("Dentist Appointment", "Visit the dentist for a regular check-up at 3 PM", user.getUsername(), false),
                new Todo("Guitar Practice", "Practice the new song for 45 minutes in the evening", user.getUsername(), true),
                new Todo("Dinner Preparation", "Prepare a healthy dinner with chicken, vegetables, and rice", user.getUsername(), false),
                new Todo("Laundry", "Wash, dry, and fold clothes by the end of the day", user.getUsername(), false),
                new Todo("Email Follow-up", "Send a follow-up email to the client regarding the project update", user.getUsername(), false),
                new Todo("Garden Maintenance", "Water the plants and trim the hedges in the garden", user.getUsername(), true)
        };

        // Save sample todos to the repository
        todoRepository.saveAll(Arrays.asList(sampleTodos));
    }
}
