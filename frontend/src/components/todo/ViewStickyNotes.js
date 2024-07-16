import { useState, useContext, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import StickyNoteGrid from "./StickyNoteGrid";
import AddTodo from "./AddTodo";
import './ViewStickyNotes.css'; // Import CSS file for styling
import { AuthContext } from "../../App";
import axios from "axios";
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Pagination } from "@mui/material";
import EditTodo from "./EditTodo";

function ViewStickyNotes() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [changed, setChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
  const [filter, setFilter] = useState("All");
  const [showFavourite, setShowFavourite] = useState(false);
	
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  const handleCheckboxChange = (event) => {
    setShowFavourite(event.target.checked);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadData = async () => {
      let response = null;
      let params = {};
      if (filter !== "All") params = { ...params, tag: filter };
      if (showFavourite) params = { ...params, favourite: true };
      try {
        let url = `http://localhost:3001/api/todo/${pageNumber - 1}/${pageSize}`;
        response = await axios.get(url, {
          params: params,
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
        });
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something happened');
        }
        return;
      }
      setErrorMessage('');
      setTodos(response.data);
    };

    loadData();
  }, [changed, pageNumber, pageSize, filter, showFavourite]);

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  const filterControl = () => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
        <Button variant="contained" color="primary" onClick={handleShowAddTodo}>
          Add Todo
        </Button>
        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={showFavourite}
                onChange={handleCheckboxChange}
                name="favourite"
                color="primary"
                sx={{ padding: '0 8px' }} // Add padding to the checkbox
              />
            }
            label="favourite"
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, ml: 2 }}>
            <InputLabel id="filter-label">Show</InputLabel>
            <Select
              labelId="filter-label"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Show"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In-Progress">In-Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    );
  };
  

  const deleteTodo = useCallback( async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todo/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
    }
    setErrorMessage('');
    setChanged(!changed);
  },[changed]);

  const showErrorMessage = () => {
    if (errorMessage === '') {
      return <div></div>;
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>;
  };

  const handleShowAddTodo = () => {
    setIsAddModalOpen(true); // Open the modal
    navigate("/todo/add");
    // document.body.classList.add('blur');
  };

  const handleCloseAddTodo = () => {
    setIsAddModalOpen(false); // Close the modal
    navigate("/todo");
    // document.body.classList.remove('blur');
  };

  const handleShowEditTodo = useCallback((todo) => {
    setIsEditModalOpen(true);
    navigate(`/todo/edit/${todo.id}`,{ state: { todo } });
  },[navigate]);

  const handleCloseEditTodo = () => {
    setIsEditModalOpen(false);
    navigate("/todo");
    setChanged(!changed)
  };

  const handleDelete = useCallback((note) => {
    console.log("Delete note :", note);
    deleteTodo(note.id)
  },[deleteTodo]);

  return (
    <div style={{ padding: 20 }}>
      <div className={`sticky-notes-container ${isAddModalOpen || isEditModalOpen ? 'blur' : ''}`} 
           style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column' }}
      >
        {filterControl()}
        <StickyNoteGrid
          notes={todos}
          handleShowEditTodo={handleShowEditTodo}
          onDelete={handleDelete}
        />
        <Box mt="auto" display="flex" justifyContent="center" alignContent="center" flexDirection="column" padding={2}>
          {showErrorMessage()}
          <Pagination
            count={Math.ceil(100 / pageSize)}
            
            page={pageNumber}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Box>
      </div>
      <Routes>
        <Route
          path="add"
          element={
            <AddTodo
              onClose={handleCloseAddTodo}
            />
          }
        />
        <Route
          path="edit/:id"
          element={
            <EditTodo
              onClose={handleCloseEditTodo}
            />
          }
          />
      </Routes>
    </div>
  );
}

export default ViewStickyNotes;
