import React from 'react';
import { useForm } from 'react-hook-form';
import { DialogContent, DialogHeader, DialogTitle} from '../ui/dialog';
import axiosInstance from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import navigate

function Signup({ onClose }) { // Add onClose prop
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate(); // Initialize navigate

  const onSubmit = async (data) => {
    reset(); // Clear the form
    // onClose(); // Close the dialog
    try {
      const response = await axiosInstance.post('/api/auth/register', data);
      console.log(response);

      // if (response.data && response.data.error) {
      //   return;
      // }

      if (response.data) {
        // localStorage.setItem("token", response.data.accessToken);
        navigate('/'); // Navigate to home
        onClose(); // Close the dialog
      }
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
    } 
  };

  return (
    <DialogContent className="w-11/12 p-8 bg-white rounded-sm">
      <DialogHeader>
        <DialogTitle className="mb-4 text-2xl text-center text-black">Create Account</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3"> 
        <label htmlFor="username" className="font-medium text-black">Create a Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <label htmlFor="password" className="mt-4 font-medium text-black">Create a Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-[rgb(46,24,97)] hover:bg-[rgb(64,32,128)]"
        >
          Register
        </button>
      </form>
    </DialogContent>
  );
}

export default Signup;
