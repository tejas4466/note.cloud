import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, deleteNote } from '../../Slices/noteSlice';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GiShare } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";

function View() {
  const [loading, setLoading] = useState(false);
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigating after deletion
  const note = useSelector((state) =>
    state.note.notes.find((note) => note._id === _id)
  );
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getNoteById(_id));
  }, [dispatch, _id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setLoading(true);
      await dispatch(deleteNote(_id)).unwrap();
      setLoading(false);
      navigate('/'); // Redirect to manage page after deletion
    }
  };

  if (!note) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen gap-6 p-4 py-24 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-6 text-left rounded-lg shadow-lg dark:bg-gray-700 h-[80vh] overflow-auto">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {note.title}
            </h1>
            {userData && (
              <p className="mt-1 text-sm font-medium text-blue-800 dark:text-gray-400">
                Created by {userData.username}
              </p>
            )}
          </div>
          <div className="flex gap-6">
            <GiShare className="text-3xl text-purple-900 cursor-pointer hover:scale-110" />
            <FaEdit className="text-3xl text-yellow-400 cursor-pointer hover:scale-110" />
            <RiDeleteBin6Fill
              className="text-3xl text-red-700 cursor-pointer hover:scale-110"
              onClick={handleDelete}
            />
          </div>
        </div>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          {note.content}
        </p>
      </div>
    </div>
  );
}

export default View;
