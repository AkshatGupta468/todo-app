package com.backend.todolist.auth.model;

import com.backend.todolist.model.PredefinedTags;

import java.util.Arrays;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @NotEmpty(message = "Username is required")
    @Column(unique = true)
    private String username;

    @NotEmpty(message = "Password is required")
    private String password;

    @ElementCollection
    private List<String> tags = PredefinedTags.TAGS;

    private String role;

    protected User() {

	}

    public User(String username, String password) {
		super();
		this.username = username;
		this.password = password;
		this.role = "User";
	}

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoleAsList() {
        return Arrays.asList(this.role);
    }

    public String getRole() {
		return role;
	}

	public void setRoles(String role) {
        this.role = role;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
    public void addTag(String tag) {
        this.tags.add(tag);
    }
}