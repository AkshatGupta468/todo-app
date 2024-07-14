package com.backend.todolist.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Entity
public class Todo {
	
	@Id
	@GeneratedValue
	private long id;
	
	@NotEmpty(message = "Title is required")
	private String title;

	private String description;
	private String username;
	
	private String tag;
	
	protected Todo() {
		
	}

	public Todo(String title, String description, String username) {
		this.title = title;
		this.description = description;
		this.username = username;
		this.tag= PredefinedTags.TAGS.get(0);
	}


	public long getId() {
		return id;
	}

	public void setIdd(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
