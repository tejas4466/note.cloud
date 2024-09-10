import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, addNote, updateNote } from '@/Slices/noteSlice'; // Import thunks
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'; // Import Dialog
import { toast } from 'react-toastify';

function Create({ existingNote, onNoteAdded }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  // Pre-fill the form with existing note data if present
  useEffect(() => {
    if (existingNote) {
      reset({
        title: existingNote.title,
        content: existingNote.content,
      });
    }
  }, [existingNote, reset]);

  const onSubmit = async (data) => {
    if (!user) {
      alert('User not found. Please log in again.');
      return;
    }

    const noteData = { ...data, user: user._id }; // Use userId instead of user object

    try {
      if (existingNote) {
        // Update existing note
        await dispatch(updateNote({ ...noteData, id: existingNote._id })).unwrap();
        toast.success('Note updated successfully!', {
          position: 'bottom-left',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          style: {
            fontSize: '1rem',
            width: '200px',
            color: 'black',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '46px',
          },
        });
        
      } else {
        // Add new note
        await dispatch(addNote(noteData)).unwrap();
        toast.success('Note added successfully!', {
          position: 'bottom-left',
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          style: {
            fontSize: '1rem',
            width: '200px',
            color: 'black',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '46px',
          },
        });
      }

      console.log(existingNote ? 'Note updated:' : 'Note added:', noteData);

      // Reset form fields
      reset();
      onNoteAdded(); // Notify parent component of the change

      // Fetch updated notes
      dispatch(fetchNotes());

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    }
  };

  return (
    <DialogContent className="w-11/12 h-[90vh] dark:bg-gray-100 rounded">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center dark:text-gray-200">
          {existingNote ? 'Update Note' : 'Create a Note'}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="p-0 rounded-lg sm:p-6 md:p-2 dark:bg-gray-600">
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
            Title:
          </label>
          <input 
            type="text" 
            id="title" 
            {...register('title', { required: 'Title is required' })}
            className="w-full p-3 border-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 sm:p-4"
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
            className="w-full px-4 py-2 text-white bg-[rgb(42,13,108)] rounded hover:bg-[rgb(51,14,137)] dark:bg-purple-700 dark:hover:bg-purple-800 sm:px-6 sm:py-3"
            type="submit"
          >
            {existingNote ? 'Save Changes' : 'Add Note'}
          </button>
        </div>
      </form>
    </DialogContent>
  );
}

export default Create;
