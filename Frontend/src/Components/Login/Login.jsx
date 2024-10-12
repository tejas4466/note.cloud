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
  const [isLoading, setIsLoading] = useState(false);  // New state for loading

  const handleCloseSignup = () => setIsSignupOpen(false);

  const onSubmit = async (data) => {
    setIsLoading(true);  // Set loading to true when login starts
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result.token) {
        localStorage.setItem("authToken", result.token);
        reset();
        navigate('/');
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);  // Set loading to false when login process ends
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
            disabled={isLoading}  // Disable input when loading
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(42,15,103)] text-black bg-gray-100 dark:bg-gray-200"
            disabled={isLoading}  // Disable input when loading
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="px-4 py-2 mt-4 text-white bg-[rgb(54,19,134)] rounded-md hover:bg-[rgb(42,15,103)] focus:outline-none focus:ring-2 focus:ring-[rgb(42,15,103)] dark:bg-purple-700 dark:hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}  // Disable button when loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              </div>
            ) : (
              'Login'
            )}
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
                disabled={isLoading}  // Disable button when loading
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
