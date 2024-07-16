import React, { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import axios from "axios";
import { useLocation } from "react-router-dom";

function EditTodo({ onClose }) {
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const { todo } = location.state || {};
    
    const handleSubmit = async (title,description,tag,isFavourite) => {
        try {
          await axios.put(
            `http://localhost:3001/api/todo/${todo.id}`,
            { ...todo, title, description, tag, favourite : isFavourite },
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          onClose()
        } catch (error) {
        setMessage("");
        if (error.response) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage("Error: something happened");
        }
        }
      };

  return (
    <NoteForm
        formTitle="Edit Todo"
        formButtonLabel="Update"
        onSubmit={handleSubmit}
        onClose={onClose}
        initTodo={todo}
    >
      <h5>Edit Todo</h5>
    </NoteForm>
  );
}

export default EditTodo;
