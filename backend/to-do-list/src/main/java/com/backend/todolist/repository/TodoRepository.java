package com.backend.todolist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.todolist.model.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
	List<Todo> findAllByUsername(String username);
	List<Todo> findAllByUsernameAndTag(String username,String tag);
	List<Todo> findAllByUsernameAndFavourite(String username,boolean favourite);

	Todo findByUsernameAndId(String username, long Id);
	
	Long countByUsername(String username);
	Long countByUsernameAndTag(String username, String tag);
}
