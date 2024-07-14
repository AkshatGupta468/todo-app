package com.backend.todolist.controller;

import com.backend.todolist.model.PredefinedTags;


import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public class TodoCreateRequest {
	@NotEmpty(message = "Title is required")
	private String title;
	private String description;
	private String tag;
	protected TodoCreateRequest() {
		
	}


	public TodoCreateRequest(String description, String title) {
		this.description = description;
		this.title = title;
		this.tag= PredefinedTags.TAGS.get(0);
	}



	public @NotEmpty(message = "Title is required") String getTitle() {
		return title;
	}

	public void setTitle(@NotEmpty(message = "Title is required") String title) {
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
