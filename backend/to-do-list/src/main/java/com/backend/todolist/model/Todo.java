package com.backend.todolist.model;

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
	private boolean favourite;
	private String tag;
	
	protected Todo() {
		
	}

	public Todo(String title, String description, String username) {
		this.title = title;
		this.description = description;
		this.username = username;
		this.tag= PredefinedTags.TAGS.get(0);
		this.favourite = false;
	}

	public Todo(String title, String description, String username , boolean favourite) {
		this.title = title;
		this.description = description;
		this.username = username;
		this.tag = PredefinedTags.TAGS.get(0);
		this.favourite = favourite;
	}

	public Todo(String title, String description, String username, String tag , boolean favourite) {
		this.title = title;
		this.description = description;
		this.username = username;
		this.tag = tag;
		this.favourite = favourite;
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

	public boolean isFavourite() {
		return favourite;
	}

	public void setFavourite(boolean isFavourite) {
		this.favourite = isFavourite;
	}
}
