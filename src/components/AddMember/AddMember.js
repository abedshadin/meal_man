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
    const addFirm = {
      firmName: data.firmName,
      proName: data.proName,
      email: data.email,
      phone: data.phone,
      address: data.address,

      area: data.area
    };
    fetch(`https://new-aghgfhfgh.herokuapp.com/addfirm`, {
      method: "Post",
      body: JSON.stringify(addFirm),
      headers: {
        'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        toast("Firm Added");
      });
  }
  return (
    <div className='bg-base-200'>
      <div className="flex justify-center items-center justify-items-center mt-2">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-white">Add New Member</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("firmName", { required: true, maxLength: 200 })} type="text" placeholder="Name" className="input input-bordered w-full max-w-xs mb-2 text-white" name="firmName" required />
              <input {...register("proName", { required: false, maxLength: 200 })} type="text" placeholder="Dept." className="input input-bordered w-full max-w-xs mb-2 text-white" name="proName" />
              <input {...register("email", { required: false, maxLength: 200 })} type="text" placeholder="Email" className="input input-bordered w-full max-w-xs mb-2 text-white" name="email" />

              <input {...register("phone", { required: false, maxLength: 200 })} type="text" placeholder="Mobile" className="input input-bordered w-full max-w-xs mb-2 text-white" name="phone" />
              <input {...register("address", { required: false, maxLength: 200 })} type="text" placeholder="Address" className="input input-bordered w-full max-w-xs mb-2 text-white" name="address"  />
              <input {...register("area", { required: false, maxLength: 200 })} type="text" placeholder="Area" className="input input-bordered w-full max-w-xs mb-2 text-white" name="area"  />

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