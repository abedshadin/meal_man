import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.init';
const AddMember = () => {
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth)
  const onSubmit = data => {
    reset();
    const addMember = {
      name: data.name,
      dept: data.dept,
      email: data.email,
      phone: data.phone,
      week_1: 0,
      week_2: 0,
      week_3: 0,
      week_4: 0,
      week_5: 0,
    };
    console.log(addMember)
    fetch(`http://localhost:5000/addMember`, {
      method: "Post",
      body: JSON.stringify(addMember),
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        toast("Member Added");
      });
  }
  return (
    <div className='bg-base-200'>
      <div className="flex justify-center items-center justify-items-center mt-2">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-white">Add New Member</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("name", { required: true, maxLength: 200 })} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs mb-2 text-white" name="name" required />
              <input {...register("dept", { required: false, maxLength: 200 })} type="text" placeholder="Dept." className="input input-bordered w-full max-w-xs mb-2 text-white" name="dept" />
              <input {...register("email", { required: false, maxLength: 200 })} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs mb-2 text-white" name="email" />

              <input {...register("phone", { required: false, maxLength: 200 })} type="text" placeholder="Mobile" className="input input-bordered w-full max-w-xs mb-2 text-white" name="phone" />



              <div className="card-actions justify-center">
                <input type="submit" value="Add" className="btn btn-primary text-white" />

              </div>
            </form>

          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AddMember;