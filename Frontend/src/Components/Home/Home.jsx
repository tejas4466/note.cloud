import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotes } from '@/Slices/noteSlice'; // Import the action to fetch notes
import { getCurrentUser } from '@/Slices/authSlice';
import Loading from '@/Components/ui/Loading/Loading';
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog';
import Create from '../Create/Create';

function Home() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const notesStatus = useSelector((state) => state.note.status);
  const notesError = useSelector((state) => state.note.error);
  const user = useSelector((state) => state.auth.userData); // Get the user data
  const userStatus = useSelector((state) => state.auth.status);
  const userError = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  // State to control the dialog open/close state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle the click event for creating a new note
  const handleCreateNote = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog after note creation
  const handleNoteAdded = () => {
    setIsDialogOpen(false);
    // Optionally refetch notes after adding
    dispatch(fetchNotes(user._id)); 
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  
  // Fetch notes when the user data is available
  useEffect(() => {
    if (user && userStatus === 'succeeded') {
      dispatch(fetchNotes(user._id)); // Pass the user ID to fetch their notes
    }
  }, [dispatch, user, userStatus]);

  return (
    <div className="min-h-screen p-4 pt-16 overflow-auto bg-white pb-14 dark:bg-gray-800">
      {(userStatus === 'loading' || notesStatus === 'loading') && (
        <p className="text-xl font-medium text-gray-800 dark:text-white">
          <Loading />
        </p>
      )}
      {(userStatus === 'failed' || notesStatus === 'failed') && (
        <p className="text-xl font-medium text-red-600 dark:text-red-400">
          {userStatus === 'failed' ? `Failed to load user: ${userError.message || JSON.stringify(userError)}` : `Failed to load notes: ${notesError.message || JSON.stringify(notesError)}`}
        </p>
      )}
      {userStatus === 'succeeded' && notesStatus === 'succeeded' && (
        <>
          <div className='flex justify-between mb-6'>
            <h1 className="pl-1 mt-2 text-xl font-medium text-left text-gray-800 md:text-2xl dark:text-white">
              {notes.length ? 'Your saved notes' : 'You have no notes'}
            </h1>
          </div>

          {/* Display notes */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex flex-col justify-between p-4 my-auto bg-purple-200 rounded shadow-lg cursor-pointer dark:bg-gray-700 hover:scale-105"
              >
                <p className="overflow-hidden text-xl font-semibold text-gray-800 dark:text-white text-ellipsis">{note.title}</p>
                <Link
                  to={`/view/${note._id}`}
                  className="block px-6 py-2 mt-4 text-center text-white bg-purple-700 rounded hover:bg-purple-600 dark:bg-purple-800 dark:hover:bg-purple-600"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Dialog for adding a note */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <FaCirclePlus 
            className='fixed w-12 h-12 text-purple-900 rounded-full cursor-pointer bottom-6 right-6 hover:scale-105'
            onClick={handleCreateNote}
          />
        </DialogTrigger>
        <DialogContent>
          <Create onNoteAdded={handleNoteAdded} />
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default Home;
