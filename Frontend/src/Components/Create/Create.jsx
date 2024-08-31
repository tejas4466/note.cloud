import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../Slices/noteSlice";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    if (!title && content) {
      alert("Please enter title of your Note");
      return;
    }
    if (!content && title) {
      alert("Please enter content of your Note");
      return;
    }
    if (!content && !title) {
      alert("Please enter title and content of your Note");
      return;
    }
    e.preventDefault();
    setTitle(title);
    setContent(content);
    dispatch(addNote({ title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 overflow-hidden bg-purple-100 dark:bg-gray-900 md:p-8">
      <form 
        onSubmit={handleFormSubmit}
        className="w-full max-w-3xl p-6 bg-purple-200 rounded-lg shadow-2xl dark:bg-gray-800 sm:p-8 lg:p-12"
      >
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
            Title:
          </label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 sm:p-4"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block mb-2 font-bold text-gray-700 dark:text-gray-300">
            Content:
          </label>
          <textarea 
            name="content" 
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 sm:h-56 sm:p-4"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-white bg-purple-500 rounded hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 sm:px-6 sm:py-3"
            type="submit"
          >
            Add a Note
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
