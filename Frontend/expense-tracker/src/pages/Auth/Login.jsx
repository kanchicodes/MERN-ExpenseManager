import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  //handle Login form submit 
  const handleLogin = async (e) => {
    e.preventDefault();


    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }


    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
  if (error.response && error.response.data.message) {
    setError(error.response.data.message);
  } else {
    setError('Something went wrong. Please try again later.');
  }
}
  }
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt[5px] mb-6'>
          Please enter youre details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="kanchi@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          {/* <p>Please enter a valid email address</p> */}

          <button type="submit" className=' btn-primary '> Login </button>

          <p className='text-xs text-slate-700 mt-4'>
            Don't have an account?{' '}
            <span
              className='text-primary cursor-pointer'
              onClick={() => navigate('/signUp')}
            >
              Sign Up
            </span>
          </p>

        </form>

      </div>
    </AuthLayout>
  );
};

export default Login;