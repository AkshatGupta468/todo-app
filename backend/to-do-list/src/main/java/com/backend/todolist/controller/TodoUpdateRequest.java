package com.backend.todolist.controller;

import java.util.Date;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TodoUpdateRequest {
	@NotEmpty(message = "Title is required")
	private String title;
	private String description;
	private String tag;

	protected TodoUpdateRequest() {
		
	}

	public TodoUpdateRequest(String description, String title,String tag) {
		this.description = description;
		this.title = title;
		this.tag=tag;
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
