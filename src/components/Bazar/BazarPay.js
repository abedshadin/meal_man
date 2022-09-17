import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase.init';



const BazarPay = () => {
  const [user] = useAuthState(auth);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const time = current.toLocaleTimeString();
  const month = current.toLocaleString("en-US", { month: "long" });
  const year = current.getFullYear();

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [tId, setTId] = useState(0);
  const [pay, setPay] = useState(0);


  let m_amount = 500;

  let payment = m_amount - pay;

  const [firms, setFirms] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/members')
      .then(res => res.json())
      .then(data => setFirms(data));
  }, [])
  const [searchText, setSearchText] = useState('');

  // console.log(searchText)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDate = e.target.date.value;
    console.log(newDate)
    const separateTime = newDate.split('/');

    const arrayDate = separateTime[0]
    const arrayMonth = separateTime[1]
    const arrayYear = separateTime[2]
    // console.log("date" + arrayDate)
    // console.log("month" + arrayMonth)
    // console.log("year" + arrayYear)

    const bazarPay = {
      name: name,
      bazar_cost: parseInt(e.target.pay.value),
      comment: comment,
      date: newDate,
      time: e.target.time.value,
      month: `${arrayMonth}_${arrayYear}`,
      year: arrayYear,
     


    };

    console.log(bazarPay)
    fetch(`http://localhost:5000/bazar`, {
      method: "Post",
      body: JSON.stringify(bazarPay),
      headers: {
        'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {

        toast("Saved");
        // myTimeout();
      });



    // const myTimeout = setTimeout(myGreeting, 1000);
    // function myGreeting() {
    //   window.location.reload(true);
    // }

    e.target.reset();
    setTId('');
    setPay('');
    setSearchText('');
  };


  const options = [];
  firms.forEach((e) => {
    options.push({ label: `${e.name}`, value: e.name });
  })






  // handle onChange event of the dropdown
  const handleChange = e => {
    setSearchText(e.value);
  }
  return (
    <div>

      <div className="hero  bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
        



          <div>
            <div className="flex justify-center items-center justify-items-center">
              <div className="card sm:w-94 lg:w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-white">Bazar</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="text" name="date" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-white" defaultValue={date} />
                    <input type="text" name="time" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" value={time} hidden />
                    <input type="text" name="month" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" defaultValue={month} hidden />
                    <input type="text" name="year" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" defaultValue={year} hidden />


                  

                
            
                    <input type="name" name="name" placeholder="Name" className="input input-bordered w-full max-w-xs mb-2 text-white" onChange={e => setName(e.target.value)} />

                   
                    <input type="number" name="pay" placeholder="Bazar Cost" className="input input-bordered w-full max-w-xs mb-2 text-white" onChange={e => setPay(e.target.value)} />



               


                  
                   
                    <textarea type="text" name="comment" placeholder="Comment" className="input input-bordered w-full max-w-xs mb-2 text-black" onChange={e => setComment(e.target.value)} />
                    <div className="card-actions justify-center">
                      <input type="submit" value="Save" className="btn btn-primary text-white" />

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-4">
        <div className='sm:order-2'>   
        
        
           <div className="flex justify-center items-center justify-items-center">
          <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Receipt</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text"  {...register("date")} placeholder="" className="input input-bordered w-full max-w-xs mb-2" value={date} hidden />
                <input type="text"  {...register("time")} placeholder="" className="input input-bordered w-full max-w-xs mb-2" value={time} hidden />
                <input type="text"  {...register("month")} placeholder="" className="input input-bordered w-full max-w-xs mb-2" value={month} hidden />
                <input type="text"  {...register("year")} placeholder="" className="input input-bordered w-full max-w-xs mb-2" value={year} hidden />





                <select name="firmName"  {...register("firmName", { required: true })} className="input input-bordered w-full max-w-xs mb-2">
                  <option value="">Select Firm</option>
                  {firms.map((firm) => (
                    <option value={firm.firmName}>{firm.firmName}</option>
                  ))}
                </select>

                <input type="text"  {...register("tender_id", { required: true })} placeholder="Tender ID" className="input input-bordered w-full max-w-xs mb-2" onChange={e => setTId(e.target.value)} />
                <input type="text"  {...register("rate", { required: true })} placeholder="Rate" className="input input-bordered w-full max-w-xs mb-2" onChange={e => setRate(e.target.value)} />

                {/* <input type="text"  {...register("amount")} placeholder="Amount" className="input input-bordered w-full max-w-xs mb-2" value={m_amount} /> */}

      {/* 
                {
                  pay > m_amount && toast('Payment is Greater than Amount')
                }
                <input type="number"  {...register("pay")} placeholder="Payment" className="input input-bordered w-full max-w-xs mb-2" onChange={e => setPay(e.target.value)} /> */}



      {/* <input type="text"  {...register("due")} placeholder="Due" className="input input-bordered w-full max-w-xs mb-2" value={payment}    /> */}


      {/* <select  {...register("t_method")} className="input input-bordered w-full max-w-xs mb-2">
                  <option value="Single">Single</option>
                  <option value="">JVCA</option>
                </select>
                <select  {...register("t_purpose")} className="input input-bordered w-full max-w-xs mb-2">
                  <option value="LTM">LTM</option>
                  <option value="">OTM</option>
                  <option value="">OSTe</option>
                  <option value="">RF</option>
                  <option value="">Manually</option>
                </select>

                <div className="card-actions justify-center">
                  <input type="submit" value="Save" className="btn btn-primary" />

                </div>
              </form>
            </div>
          </div>
        </div>
        
        </div>

        <div className='order-1'>

          <div className="flex justify-center items-center justify-items-center">
            <div className="stats shadow">

              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">Total Amount</div>
                <div className="stat-value text-green-500">{m_amount}</div>
                <div className="stat-desc">21% more than last month</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div className="stat-title">Total Due</div>
                <div className="stat-value text-red-500">{payment}</div>
                <div className="stat-desc">21% more than last month</div>
              </div>




            </div>

          </div>






        </div>
      </div> */}



      <ToastContainer></ToastContainer>

    </div>





















  );
};

export default BazarPay;