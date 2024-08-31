import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../Slices/noteSlice';
import { Link } from 'react-router-dom';

function Manage() {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen p-4 pt-24 overflow-auto bg-purple-100 pb-14 dark:bg-gray-800">
      <h1 className="pb-4 pl-1 text-xl font-medium text-left text-gray-800 md:text-2xl dark:text-white">
        {notes.length ? 'Your saved notes' : 'Create notes to manage'}
      </h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="flex flex-col justify-between p-3 bg-purple-300 rounded shadow-lg dark:bg-gray-700"
          >
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{note.title}</p>
            <div className="flex items-center gap-4 mt-4">
              <Link
                className="px-6 py-2 text-white bg-purple-500 rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                to={`/update/${note.id}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232a3 3 0 114.242 4.242L7.5 21H3v-4.5l11.732-11.732z"
                  />
                </svg>
              </Link>

              <button
                className="px-6 py-2 text-white bg-purple-500 rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                type="submit"
                onClick={() => {
                  dispatch(deleteNote(note.id));
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Manage;
