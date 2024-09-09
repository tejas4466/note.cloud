import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '@/Slices/noteSlice'; // Import fetchNotes action
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'; // Import Dialog

function Create({onNoteAdded}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the user ID from the Redux store
  const user = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    if (!user) {
      alert('User not found. Please log in again.');
      return;
    }

    // Add user ID to the note data
    const noteData = { ...data, user };

    try {
      // Send the request to add a new note
      const response = await axiosInstance.post('/api/notes', noteData);
      console.log('Note added:', response.data);
      
      // Reset form fields
      reset();
      onNoteAdded();
      
      
      // Fetch updated notes
      dispatch(fetchNotes(user));
      
      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note');
    }
  };

  return (
    <DialogContent className="w-full h-[90vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Create a Note</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="dark:bg-gray-800">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
            Title:
          </label>
          <input 
            type="text" 
            id="title" 
            {...register('title', { required: 'Title is required' })}
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 sm:p-4"
            placeholder="Give a title to your note"
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
            placeholder="Write your note here"
          ></textarea>
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>
        <div className="flex justify-center">
          <button
            className="w-full px-4 py-2 text-white bg-purple-700 rounded hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-800 sm:px-6 sm:py-3"
            type="submit"
          >
            Add Note
          </button>
        </div>
      </form>
    </DialogContent>
  );
}

export default Create;
