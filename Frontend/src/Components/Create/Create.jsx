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
          position: window.innerWidth > 768 ? 'top-right' : 'bottom-center', // Position based on screen width (768px is a common breakpoint for tablets)
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          // className: `
          //   text-sm sm:text-base md:text-lg  // Adjust text size based on screen width
          //   p-2 sm:p-4 md:p-6               // Adjust padding based on screen width
          //   bg-gray-100 dark:bg-gray-800    // Background color for both light and dark mode
          //   text-gray-800 dark:text-gray-200 // Text color for both light and dark mode
          //   rounded-lg shadow-lg            // Add rounded corners and a shadow
          //   max-w-xs sm:max-w-md md:max-w-lg // Set maximum width to handle larger screen sizes
          //   m-2                             // Add margin to prevent overlap with screen edges
          // `,
          // bodyClassName: 'flex items-center justify-between', // Additional styling for inner content
        });
        
      } else {
        // Add new note
        await dispatch(addNote(noteData)).unwrap();
        toast.success('Note added successfully!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
    <DialogContent className="w-full h-[90vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">
          {existingNote ? 'Update Note' : 'Create a Note'}
        </DialogTitle>
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
            {existingNote ? 'Save Changes' : 'Add Note'}
          </button>
        </div>
      </form>
    </DialogContent>
  );
}

export default Create;
