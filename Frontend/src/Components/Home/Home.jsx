import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNotes } from '@/Slices/noteSlice'


function Home() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const status = useSelector((state) => state.notes.status);
  const error = useSelector((state) => state.notes.error);
  const user = useSelector((state) => state.auth.userData);
  console.log(notes);


  // Fetch notes when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      alert("useEffect running")
      dispatch(fetchNotes());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen p-4 pt-24 overflow-auto bg-white pb-14 dark:bg-gray-800">
      {status === 'loading' && (
        <p className="text-xl font-medium text-gray-800 dark:text-white">
          Loading your notes...
        </p>
      )}
      {status === 'failed' && (
        <p className="text-xl font-medium text-red-600 dark:text-red-400">
          Failed to load notes: {error}
        </p>
      )}
      {status === 'succeeded' && (
        <>
          <h1 className="pb-4 pl-1 text-xl font-medium text-left text-gray-800 md:text-2xl dark:text-white">
            {notes.length ? 'Your saved notes' : 'You have no notes'}
          </h1>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="flex flex-col justify-between p-4 my-auto bg-purple-300 rounded shadow-lg dark:bg-gray-700 hover:scale-105"
              >
                <p className="text-xl font-semibold text-gray-800 dark:text-white">{note.title}</p>
                <Link
                  to={`/view/${note.id}`}
                  className="block px-6 py-2 mt-4 text-center text-white bg-purple-500 rounded hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-600"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
