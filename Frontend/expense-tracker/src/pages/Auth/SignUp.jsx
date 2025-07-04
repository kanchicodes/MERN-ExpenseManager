import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadimage';
import { UserContext } from '../../context/UserContext';


const SignUp = () => {
  const [profilepic, setProfilePic] = useState(null);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Sign UP Form Submit

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullname) {
      setError('Please enter your full name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    if (!profilepic) {
      setError('Please upload a profile picture');
      return;
    }

    setError("");

    // Sign Up API call
    try {

      //Uploade image if present
      if (profilepic) {
        const imagUpRes = await uploadImage(profilepic);
        profileImageUrl = imagUpRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        // updateUser(user);
        setError(error.response.data.message);
        console.error(error)
      } else {
        setError('Something wents wrong. Please try again later.');
        console.error(error)
      }
    }
  };


  return (

    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt[5px] mb-6'>
          Join us today for entering your detailes below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Input
              value={fullname}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Kanchi"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="kanchi@example.com"
              type="text"
            />

            <div className="col-span-2">

              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}


          <button type="submit" className=' btn-primary '> Sign Up </button>

          <p className='text-xs text-slate-700 mt-4'>
            Already have an account?{' '}
            <span
              className='text-primary cursor-pointer'
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </form>
      </div>

    </AuthLayout>

  );
};

export default SignUp;