package com.backend.todolist.event;

import org.springframework.context.ApplicationEvent;
import com.backend.todolist.auth.model.User;

public class UserCreatedEvent extends ApplicationEvent {
    private User user;

    public UserCreatedEvent(Object source, User user) {
        super(source);
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
