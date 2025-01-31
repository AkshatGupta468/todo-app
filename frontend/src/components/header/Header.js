import React from 'react';
import { Link } from 'react-router-dom';

function Header({isAuthenticated, setIsAuthenticated}) {
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark bg-primary sticky-top">
        <div className="navbar-brand container">Todo List</div>
        <ul className="navbar-nav justify-content-end container">
          <li className="nav-link px-4"><Link to='/'>Home</Link></li>
          {isAuthenticated && <li className="nav-link px-4"><Link to='/todo'>View Todo</Link></li>}
          {!isAuthenticated && <li className="nav-link px-4"><Link to='/signin'>Signin</Link></li>}
          {!isAuthenticated && <li className="nav-link px-4"><Link to='/signup'>Signup</Link></li>}
          {isAuthenticated && <li className="nav-link px-4"><Link to='/signout'>Signout</Link></li>}
        </ul>
      </nav>
		</header>
	)
}

export default Header;