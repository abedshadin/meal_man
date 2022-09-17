import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useAuthState } from 'react-firebase-hooks/auth';

import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../firebase.init';
const SPay = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [user] = useAuthState(auth)
  const [firm, setFirm] = useState({});
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const navigate = useNavigate();
  useEffect(() => {
    const url = `http://localhost:5000/pay/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setFirm(data));
  }, [firm]);
  const onSubmit = e => {
    e.preventDefault();
    const week_1 = parseInt(e.target.week_1.value);
    const week_2 = parseInt(e.target.week_2.value);
    const week_3 = parseInt(e.target.week_3.value);
    const week_4 = parseInt(e.target.week_4.value);
    const week_5 = parseInt(e.target.week_5.value);

    console.log(firm.name)
    const newDate = e.target.date.value;

    const separateTime = newDate.split('/');
    const arrayMonth = separateTime[1]
    const arrayYear = separateTime[2]
    const updateFirm = {
week_1:week_1,
week_2:week_2,
week_3:week_3,
week_4:week_4,
week_5:week_5,
w_month: `${arrayMonth}_${arrayYear}`,

    };
    fetch(`http://localhost:5000/pay/${id}`, {
      method: "put",
      body: JSON.stringify(updateFirm),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        toast("Payment Updated");
          myTimeout();
      });
       const myTimeout = setTimeout(myGreeting, 2000);
    function myGreeting() {
      navigate(`/pay`);
    }

  }
  return (
    <div className='bg-base-200'>
      <div className="flex justify-center items-center justify-items-center mt-2">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-white">Update {firm.name}</h2>
            <form onSubmit={onSubmit}>
            <input type="text" name="date" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" defaultValue={date} hidden/>
                <label htmlFor="Week 1">Week 1</label>
              <input type="text" placeholder="Week 1" className="input input-bordered w-full max-w-xs mb-2 text-white" name="week_1" defaultValue={firm.week_1}   />
                <label htmlFor="Week 2">Week 2</label>
              <input type="text" placeholder="Week 2" className="input input-bordered w-full max-w-xs mb-2 text-white" name="week_2" defaultValue={firm.week_2}   />
                <label htmlFor="Week 3">Week 3</label>
              <input type="text" placeholder="Week 3" className="input input-bordered w-full max-w-xs mb-2 text-white" name="week_3" defaultValue={firm.week_3}   />
                <label htmlFor="Week 1">Week 4</label>
              <input type="text" placeholder="Week 4" className="input input-bordered w-full max-w-xs mb-2 text-white" name="week_4" defaultValue={firm.week_4}   />
                <label htmlFor="Week 5">Week 5</label>
              <input type="text" placeholder="Week 5" className="input input-bordered w-full max-w-xs mb-2 text-white" name="week_5" defaultValue={firm.week_5}   />
              

              <div className="card-actions justify-center">
                <input type="submit" value="Update" className="btn btn-primary text-white" />

              </div>
            </form>

          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SPay;