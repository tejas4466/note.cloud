import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes } from '@/Slices/noteSlice'; // Import fetchNotes action

function Create() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const user = useSelector((state) => state.auth.userData._id);
  console.log(user);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // Add user ID to the data object
      const noteData = { ...data, user };
      
      // Replace 'http://localhost:8000/api/notes' with your actual backend URL
      const response = await axiosInstance.post('/api/notes', noteData);
      console.log(response.data);
      // Reset form fields
      reset();
      
      // Fetch notes after adding a new note
      dispatch(fetchNotes());
      
      // Handle success (e.g., show a success message)
      // alert('Note added successfully');
      navigate('/');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-purple-100 dark:bg-gray-900 md:p-8">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl p-6 bg-purple-200 rounded-lg shadow-2xl dark:bg-gray-800 sm:p-8 lg:p-12"
      >
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
            Title:
          </label>
          <input 
            type="text" 
            id="title" 
            {...register('title', { required: 'Title is required' })}
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 sm:p-4"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
            Content:
          </label>
          <textarea 
            id="content"
            {...register('content', { required: 'Content is required' })}
            className="w-full h-40 p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 sm:h-56 sm:p-4"
          ></textarea>
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 sm:px-6 sm:py-3"
            type="submit"
          >
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
