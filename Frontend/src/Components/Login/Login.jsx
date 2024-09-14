import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/Slices/authSlice'; // Import the login action
import Signup from '../Signup/Signup';
import { Dialog, DialogTrigger } from '../ui/dialog';

function Login() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignupOpen, setIsSignupOpen] = useState(false);  // State for Signup dialog

  const handleCloseSignup = () => setIsSignupOpen(false);

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        reset();
        navigate('/');
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white dark:bg-gray-800">
      <div className="w-full max-w-lg p-8 bg-white rounded-sm shadow-lg dark:bg-gray-900">
        <h2 className="mb-6 text-2xl font-semibold text-center text-black dark:text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(42,15,103)] text-black bg-gray-100 dark:bg-gray-200"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(42,15,103)] text-black bg-gray-100 dark:bg-gray-200"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-[rgb(54,19,134)] rounded-md hover:bg-[rgb(42,15,103)] focus:outline-none focus:ring-2 focus:ring-[rgb(42,15,103)] dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            Login
          </button>
        </form>

        {/* Signup Section */}
        <p className="mt-4 text-center text-black dark:text-white">
          Don't have an account?{' '}
          <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
            <DialogTrigger asChild>
              <button
                className="text-[rgb(46,24,97)] hover:underline dark:text-purple-300"
                onClick={() => setIsSignupOpen(true)}
              >
                Register
              </button>
            </DialogTrigger>
            <Signup onClose={handleCloseSignup} />
          </Dialog>
        </p>
      </div>
    </div>
  );
}

export default Login;
