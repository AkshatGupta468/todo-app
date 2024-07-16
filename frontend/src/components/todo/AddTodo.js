import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./NoteForm";

const emptyTodo={
  title:"",
  description:"",
  tag:"Pending",
  favourte:false
}

function AddTodo({ onClose }) {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (title,description,status,isFavourite) => {
    try {
      await axios.post(
        "http://localhost:3001/api/todo",
        { title, description,status,favourite:isFavourite },
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

  const showMessage = () => {
    if (message === "") {
      return <div></div>;
    }
    return (
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    );
  };

  const showErrorMessage = () => {
    if (errorMessage === "") {
      return <div></div>;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  };

  return (
    <NoteForm formTitle="Add New Todo" formButtonLabel="Add"  onClose={onClose} onSubmit={handleSubmit} initTodo={{}}>
      {showMessage()}
      {showErrorMessage()}
    </NoteForm>
  );
}

export default AddTodo;
