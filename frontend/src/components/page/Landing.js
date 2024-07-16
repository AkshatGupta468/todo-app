import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Landing({isAuthenticated, setIsAuthenticated}) {
  const [message, setMessage] = useState('')
  const [numberAllTodo, setNumberAllTodo] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

  useEffect(() => {
    async function getAndSetNumberAllTodo() {
      try{
        const response = await axios.get('http://localhost:3001/api/todo/count', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          }
        });
        setNumberAllTodo(response.data.count);
      } catch (error) {
        setMessage('');
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something happened');
        }
      }
    }

    
    if(isAuthenticated){
      getAndSetNumberAllTodo();
      setMessage(`Welcome, ${sessionStorage.getItem('name')}. You have ${numberAllTodo} todos. Click on View Todo`);
    } else {
      setMessage('Please sign in to continue');
    }
  }, [isAuthenticated, numberAllTodo])

	return (
		<div className="text-center">
			<h1>Todo List Application</h1>
      {showErrorMessage()}
			{message}
		</div>
	)
}