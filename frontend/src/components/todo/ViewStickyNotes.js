import { useState, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import StickyNoteGrid from "./StickyNoteGrid";
import AddTodo from "./AddTodo";
import './ViewStickyNotes.css'; // Import CSS file for styling
import { AuthContext } from "../../App";
import axios from "axios";

const sampleTodos = [
  { id: 1, title: "Shopping List", description: "Buy milk, eggs, and bread from the grocery store" , tag:"Pending"},
  { id: 2, title: "Workout Plan", description: "Complete a 30-minute run and 15 minutes of strength training" , tag:"Pending"},
  { id: 3, title: "Project Meeting", description: "Discuss project milestones with the team at 10 AM" , tag:"Pending"},
  { id: 4, title: "Book Reading", description: "Read 50 pages of the novel 'The Great Gatsby'" , tag:"Pending"},
  { id: 5, title: "Dentist Appointment", description: "Visit the dentist for a regular check-up at 3 PM" , tag:"Pending"},
  { id: 6, title: "Guitar Practice", description: "Practice the new song for 45 minutes in the evening" , tag:"Pending"},
  { id: 7, title: "Dinner Preparation", description: "Prepare a healthy dinner with chicken, vegetables, and rice" , tag:"Pending"},
  { id: 8, title: "Laundry", description: "Wash, dry, and fold clothes by the end of the day" , tag:"Pending"},
  { id: 9, title: "Email Follow-up", description: "Send a follow-up email to the client regarding the project update", tag:"Pending" },
  { id: 10, title: "Garden Maintenance", description: "Water the plants and trim the hedges in the garden" , tag:"Pending"},
];

function ViewStickyNotes() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to track modal open/close
  const [todos, setTodos] = useState(sampleTodos);
	const [changed, setChanged] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [inputPageNumber, setInputPageNumber] = useState(pageNumber);
	const [inputPageSize, setInputPageSize] = useState(pageSize);
	const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  

	const {isAuthenticated, setIsAuthenticated}=useContext(AuthContext)

	useEffect(() => {
		if (!isAuthenticated) {
		navigate("/")
		}
	}, [isAuthenticated, navigate])

	useEffect(() => {
		const loadData = async () => {
			let response = null;
			try {
				let url = `http://localhost:3001/api/todo/${pageNumber - 1}/${pageSize}`;
        
        if(filter!=="All"){
          url = `http://localhost:3001/api/todo/${pageNumber - 1}/${pageSize}/?tag=${filter}`
        }
				response = await axios.get(url, {headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`,}});
			} catch(error){
				if (error.response) {
					setErrorMessage(error.response.data.message);
				} else {
					setErrorMessage('Error: something happened');
				}
				return;
			}
			setErrorMessage('');
			setTodos(response.data);
      console.log(response.data)
		}

		loadData();
	}, [changed, pageNumber, pageSize, filter])

	const nextPage = () => {
		setPageNumber(pageNumber + 1);
		setInputPageNumber(pageNumber + 1);
	}

	const previousPage = () => {
		if(pageNumber > 1){
			setPageNumber(pageNumber - 1);
			setInputPageNumber(pageNumber - 1);
		}
	}

	const enterPageNumber = (enteredPageNumber) => {
		if(enteredPageNumber >= 1){
			setPageNumber(parseInt(enteredPageNumber));
		} else {
			setPageNumber(1);
			setInputPageNumber(1);
		}
	}

	const enterPageSize = (enteredPageSize) => {
		if(enteredPageSize >= 1){
			setPageSize(parseInt(enteredPageSize));
		} else {
			setPageSize(1);
			setInputPageSize(1);
		}
	}

	const pageNumberControl = () => {
		return <div>
			<center>
				<div className="input-group col-lg-4 col-md-6 col-sm-8 col-9">
					<div className="input-group-append">
						<button className="btn btn-outline-secondary" onClick={() => previousPage()} >Previous Page</button>
					</div>
					<input className="form-control text-center" type="number" value={inputPageNumber} onChange={e => setInputPageNumber(e.target.value)} onKeyPress={e => {
									if (e.key === 'Enter') {
										enterPageNumber(e.target.value)
									}
								}}/>
					<div className="input-group-append">
						<button className="btn btn-outline-secondary" onClick={() => nextPage()}>Next Page</button>
					</div>
				</div>
			</center>
		</div>
	}

	const pageSizeControl = () => {
		return <center>
			<div className="input-group col-xl-3 col-md-4 col-sm-5 col-6">
				<div className="input-group-append">
					<span className="input-group-text" id="">Todo per page: </span>
				</div>
				<input className="form-control text-center" type="number" value={inputPageSize} onChange={e => setInputPageSize(e.target.value)} onKeyPress={e => {
								if (e.key === 'Enter') {
									enterPageSize(e.target.value)
								}
							}}
				/>
			</div>
		</center>
	}

	const filterControl = () => {
		return <center>
			<div className="col-6 offset-8">
				<label>Show</label>
				<select value={filter} onChange={(e) => setFilter(e.target.value)}>
					<option value="All">All</option>
					<option value="Pending">Pending</option>
					<option value="In-Progress">In-Progress</option>
					<option value="Completed">Completed</option>
				</select>
			</div>
		</center>
	}

	const markCompleted = async (id) => {
		try {
      await axios.put(`http://localhost:3001/api/todo/${id}/markcomplete`, {}, {
				headers: {
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			});
    } catch(error){
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
		}
		setErrorMessage('');
		setChanged(!changed);
	}

	const deleteTodo = async (id) => {
		try {
      await axios.delete(`http://localhost:3001/api/todo/${id}`, {
				headers: {
					'Authorization': `Bearer ${sessionStorage.getItem('token')}`
				}
			});
    } catch(error){
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
		}
		setErrorMessage('');
		setChanged(!changed);
	}

	const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

  const handleShowAddTodo = () => {
    setIsAddModalOpen(true); // Open the modal
    navigate("/todo/add")
    // document.body.classList.add('blur');
  };

  const handleCloseAddTodo = () => {
    setIsAddModalOpen(false); // Close the modal
    navigate("/todo")
    // document.body.classList.remove('blur');
  };

  const handleEdit = (id) => {
    console.log("Edit note with id:", id);
    // Implement edit functionality here
  };

  const handleDelete = (id) => {
    console.log("Delete note with id:", id);
    // Implement delete functionality here
  };


  return (
    <div  style={{ padding: 20 }}>
      <button onClick={handleShowAddTodo} className="btn btn-primary">Add Todo</button>
      <div className={`sticky-notes-container ${isAddModalOpen ? 'blur' : ''}`} style={{minHeight:"80%"}}>
        {filterControl()}
        <StickyNoteGrid
          notes={todos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          />
          {pageSizeControl()}
          {pageNumberControl()}
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
      </Routes>
    </div>
  );
}

export default ViewStickyNotes;
