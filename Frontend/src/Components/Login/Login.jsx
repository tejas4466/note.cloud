import React from 'react';
import { useForm } from 'react-hook-form';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import axiosInstance from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login({ onClose }) { // Accept onClose prop
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate(); // Initialize navigate

  const onSubmit = async (data) => {
    reset(); // Clear the form
    try {
      const response = await axiosInstance.post('/api/auth/login', data);
      console.log(response);

      // Check if the response contains the accessToken
      if (response.data && response.data.token) {
        // Store the accessToken in localStorage
        localStorage.setItem("token", response.data.token);
        navigate('/'); // Navigate to home
        onClose(); // Close the dialog
      }
      
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        {/* <DialogClose onClick={onClose} /> Add close button */}
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Login
        </button>
      </form>
    </DialogContent>
  );
}

export default Login;
