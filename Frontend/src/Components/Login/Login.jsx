import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/Slices/authSlice'; // Import the login action
import Signup from '../Signup/Signup';
import { Dialog, DialogTrigger } from '../ui/dialog';

function Login() {
  console.log("Login component rendered"); // Debugging log

  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignupOpen, setIsSignupOpen] = useState(false);  // State for Signup dialog

  const handleCloseSignup = () => setIsSignupOpen(false);

  const onSubmit = async (data) => {
    reset();
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        navigate('/');
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800 dark:text-white">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{'  '}
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <button 
                  className="text-blue-600 hover:underline"
                  onClick={() => setIsSignupOpen(true)}
                >
                  Register
                </button>
              </DialogTrigger>
              <Signup onClose={handleCloseSignup} />
            </Dialog>
        </p>
      </div>
      {isModalOpen && <SignupModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Login;
