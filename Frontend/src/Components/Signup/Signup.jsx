import React from 'react';
import { useForm } from 'react-hook-form';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Signup</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        
        <input
          type="text"
          placeholder="Username"
          {...register('username', { required: 'Username is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: 'Password is required' })}
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Signup
        </button>
      </form>
      {/* <DialogClose className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        &#x2715;
      </DialogClose> */}
    </DialogContent>
  );
}

export default Signup;
