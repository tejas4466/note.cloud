import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, deleteNote } from '../../Slices/noteSlice';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GiShare } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import Create from '../Create/Create';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog';
import { toast } from 'react-toastify';

function View() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) =>
    state.note.notes.find((note) => note._id === _id)
  );
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    dispatch(getNoteById(_id));
  }, [dispatch, _id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteNote(_id)).unwrap();
      toast.success('Note deleted successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/'); // Redirect to home page after deletion
    } catch (error) {
      toast.error('Failed to delete note.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleNoteUpdated = () => {
    setIsModalOpen(false); // Close the modal after update
    dispatch(getNoteById(_id)); // Refresh the note data
  };

  const handleShare = () => {
    const shareableLink = `${window.location.origin}/view/${_id}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast.success('Note link copied to clipboard!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch((error) => {
      toast.error('Failed to copy link.');
    });
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
            {/* Share Icon */}
            <GiShare 
              className="text-3xl text-purple-900 cursor-pointer hover:scale-110"
              onClick={handleShare}
            />

            {/* Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <FaEdit
                  className="text-3xl text-yellow-400 cursor-pointer hover:scale-110"
                  onClick={handleEdit}
                />
              </DialogTrigger>
              <DialogContent className="w-full h-[90vh]">
                <Create
                  existingNote={note}
                  onNoteAdded={handleNoteUpdated}
                  onClose={() => setIsModalOpen(false)}
                />
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
              <AlertDialogTrigger asChild>
                <RiDeleteBin6Fill
                  className="text-3xl text-red-700 cursor-pointer hover:scale-110"
                />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this note?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Once deleted, your note will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-700 hover:bg-red-600">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
