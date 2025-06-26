import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import Home from './pages/Dashboard/Home';

import UserProvider from './context/UserContext';
import { UserContext } from './context/UserContext';

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            <Route path="/Dashboard" exact element={<Home />} />
            <Route path="/Income" exact element={<Income />} />
            <Route path="/Expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ?
    (<Navigate to="/Dashboard" />
    ) : (
      <Navigate to="/login" />);
}
