import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import './AddTodo.css';  // For the blur effect on the body

function AddTodo({ onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [addBtnEnabled,seAddBtnEnabled]=useState(true)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      seAddBtnEnabled(false)
      await axios.post(
        "http://localhost:3001/api/todo",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      setErrorMessage("");
      setMessage("Todo successfully created");
      seAddBtnEnabled(true)
      onClose()
    } catch (error) {
      setMessage("");
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: something happened");
      }
      seAddBtnEnabled(true)
    }
  };

  useEffect(() => {
    setMessage("");
  }, [title, description]);

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
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Todo</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  value={description}
                  type="text"
                  placeholder="A short description here"
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                />
              </div>
              <button disabled={!addBtnEnabled} type="submit" className="btn btn-primary">Add Todo</button>
            </form>
            {showMessage()}
            {showErrorMessage()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
