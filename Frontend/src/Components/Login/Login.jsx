import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';
import axiosInstance from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@/Slices/authSlice';

function Login({ onClose }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserData = async (token) => {
    try {
      const response = await axiosInstance.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      dispatch(login(response.data));
    } catch (error) {
      console.log("Failed to fetch user data:", error);
    }
  };

  const onSubmit = async (data) => {
    reset();
    try {
      const response = await axiosInstance.post('/api/auth/login', data);
      console.log(response.data);

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        fetchUserData(response.data.token); // Fetch user data after login
        navigate('/');
        onClose();
      }
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token); // Fetch user data if token exists
    }
  }, []);

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
