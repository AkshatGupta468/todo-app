package com.backend.todolist.service;

import java.util.List;

import com.backend.todolist.model.PredefinedTags;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.backend.todolist.controller.CountResponse;
import com.backend.todolist.controller.TodoCreateRequest;
import com.backend.todolist.controller.TodoUpdateRequest;
import com.backend.todolist.errorhandler.BadRequestException;
import com.backend.todolist.errorhandler.InvalidPageException;
import com.backend.todolist.errorhandler.ResourceNotFoundException;
import com.backend.todolist.model.Todo;
import com.backend.todolist.repository.TodoRepository;
import com.backend.todolist.repository.TodoPagingRepository;

@Service
public class TodoService {

	@Autowired
	private TodoRepository todoRepository;

	@Autowired
	private TodoPagingRepository todoPagingRepository;

	public Todo create(TodoCreateRequest todoCreateRequest, String username) {
		Todo todo = new Todo(todoCreateRequest.getTitle(), todoCreateRequest.getDescription(), username);
		return todoRepository.save(todo);
	}

	public Todo readById(long id, String username) {
		Todo todo = todoRepository.findByUsernameAndId(username, id);
		if (todo == null) {
			throw new ResourceNotFoundException("Todo not found");
		}
		return todo;
	}

	public List<Todo> readAll(String username) {
		return todoRepository.findAllByUsername(username);
	}

	public List<Todo> readAllPageable(String username, String pageNumber, String pageSize) {
		int _pageNumber = pageNumberStringToInteger(pageNumber);
		int _pageSize = pageSizeStringToInteger(pageSize);

		Pageable pageable = PageRequest.of(_pageNumber, _pageSize);
		return todoPagingRepository.findAllByUsername(username, pageable);
	}

	public List<Todo> readAllByTag(String username, String tag) {
		return todoRepository.findAllByUsernameAndTag(username, tag);
	}

	public List<Todo> readAllByTagPageable(String username, String tag, String pageNumber, String pageSize) {
		int _pageNumber = pageNumberStringToInteger(pageNumber);
		int _pageSize = pageSizeStringToInteger(pageSize);

		Pageable pageable = PageRequest.of(_pageNumber, _pageSize);
		return todoPagingRepository.findAllByUsernameAndTag(username, tag, pageable);
	}

	public List<Todo> readAllFavourite(String username, String pageNumber, String pageSize) {
		int _pageNumber = pageNumberStringToInteger(pageNumber);
		int _pageSize = pageSizeStringToInteger(pageSize);
		Pageable pageable = PageRequest.of(_pageNumber, _pageSize);
		return todoPagingRepository.findAllByUsernameAndFavourite(username, true, pageable);
	}

	public List<Todo> readAllByFavouriteAndTagPageable(String username, boolean favourite, String tag, String pageNumber, String pageSize) {
		int _pageNumber = pageNumberStringToInteger(pageNumber);
		int _pageSize = pageSizeStringToInteger(pageSize);

		Pageable pageable = PageRequest.of(_pageNumber, _pageSize);
		if (tag == null) {
			return todoPagingRepository.findAllByUsernameAndFavourite(username, favourite, pageable);
		}
		return todoPagingRepository.findAllByUsernameAndFavouriteAndTag(username, favourite, tag, pageable);
	}

	public void deleteById(long id, String username) {
		Todo todo = todoRepository.findByUsernameAndId(username, id);
		if (todo == null) {
			throw new ResourceNotFoundException("Todo not found");
		}
		todoRepository.deleteById(id);
	}

	public Todo updateById(long id, TodoUpdateRequest todoUpdateRequest, String username) {
		Todo todo = todoRepository.findByUsernameAndId(username, id);
		if (todo == null) {
			throw new ResourceNotFoundException("Todo not found");
		}

		todo.setTitle(todoUpdateRequest.getTitle());
		todo.setDescription(todoUpdateRequest.getDescription());
		todo.setTag(todoUpdateRequest.getTag());
		todo.setFavourite(todoUpdateRequest.getFavourite());

		return todoRepository.save(todo);
	}

	public Todo setTagById(long id, String username, String tag) {
		Todo todo = todoRepository.findByUsernameAndId(username, id);
		if (todo == null) {
			throw new ResourceNotFoundException("Todo not found");
		}
		if (!PredefinedTags.TAGS.contains(tag)) {
			throw new BadRequestException("Invalid tag");
		}

		todo.setTag(tag);
		return todoRepository.save(todo);
	}

	public CountResponse countAll(String username) {
		return new CountResponse(todoRepository.countByUsername(username));
	}

	public CountResponse countAllByIsCompleted(String username, String tag) {
		return new CountResponse(todoRepository.countByUsernameAndTag(username, tag));
	}

	private int pageNumberStringToInteger(String pageNumber) {
		int _pageNumber;

		try {
			_pageNumber = Integer.parseInt(pageNumber);
		} catch (Exception e) {
			throw new InvalidPageException("Invalid Page Number");
		}

		if (_pageNumber < 0) {
			throw new InvalidPageException("Invalid page number");
		}

		return _pageNumber;
	}

	private int pageSizeStringToInteger(String pageSize) {
		int _pageSize;

		try {
			_pageSize = Integer.parseInt(pageSize);
		} catch (Exception e) {
			throw new InvalidPageException("Invalid Page Size");
		}

		if (_pageSize < 1) {
			throw new InvalidPageException("Invalid page size");
		}

		return _pageSize;
	}
}
