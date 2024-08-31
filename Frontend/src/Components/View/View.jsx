import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function View() {
  const { id } = useParams();
  const note = useSelector((state) =>
    state.notes.notes.find((note) => note.id === id)
  );

  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-6 p-4 py-24 bg-white dark:bg-gray-800">
      <div className="w-full p-3 text-center bg-purple-200 rounded shadow-lg md:w-1/2 dark:bg-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{note.title}</h1>
      </div>
      <div className="w-full md:w-4/5 p-6 text-left bg-purple-200 rounded shadow-lg dark:bg-gray-700 h-[62vh] overflow-auto">
        <p className="text-gray-700 dark:text-gray-300">{note.content}</p>
      </div>
    </div>
  );
}

export default View;
