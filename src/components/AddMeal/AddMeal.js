import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase.init';



const AddMeal = () => {
  const [user] = useAuthState(auth);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const time = current.toLocaleTimeString();
  const month = current.toLocaleString("en-US", { month: "long" });
  const year = current.getFullYear();


  const [comment, setComment] = useState('');





  const [firms, setFirms] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/members')
      .then(res => res.json())
      .then(data => setFirms(data));
  }, [])
  const [searchText, setSearchText] = useState('');
  const [changeSelect, setChangeSelect] = useState('');

const [day,setDay] = useState(0);
const [night,setNight] = useState(0);


  // console.log(searchText)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDate = e.target.date.value;

    const separateTime = newDate.split('/');

    const arrayDate = separateTime[0]
    const arrayMonth = separateTime[1]
    const arrayYear = separateTime[2]
    // console.log("date" + arrayDate)
    // console.log("month" + arrayMonth)
    // console.log("year" + arrayYear)


    const addMeal = {
     name: searchText,
      m_d_n: {
        day: parseInt(day) ,
        night: parseInt(night),
      },
      comment: comment,
      date: newDate,
      time: e.target.time.value,
      month: `${arrayMonth}_${arrayYear}`,
      year: arrayYear,
      


    };

    console.log(addMeal)

    if(searchText!==""){
     
      fetch(`http://localhost:5000/meal`, {
        method: "Post",
        body: JSON.stringify(addMeal),
        headers: {
          authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => response.json())
      .then((json) => {

        toast("Saved");
        // myTimeout();
      });

    }
    else{
      toast.warn('Select Member First', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
     


    // const myTimeout = setTimeout(myGreeting, 1000);
    // function myGreeting() {
    //   window.location.reload(true);
    // }

    e.target.reset();
    setSearchText('');
  };


  const options = [];
  firms.forEach((e) => {
    options.push({ label: `${e.name}`, value: e.name });
  })






  console.log(changeSelect)

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
                  <h2 className="card-title text-white">Add Meal</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="text" name="date" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" defaultValue={date} />
                    <input type="text" name="time" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" value={time} hidden />
                    <input type="text" name="month" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" defaultValue={month} hidden />
                    <input type="text" name="year" placeholder="" className="input input-bordered w-full max-w-xs mb-2 text-black" defaultValue={year} hidden />


                    <Select
                      placeholder="Select a Firm"
                      value={options.value} // set selected value
                      options={options} // set list of the data
                      onChange={handleChange}
                      className=" input-bordered w-full max-w-xs mb-2 text-black required" // assign onChange function
                    />

                   
                   



                 



                    


                  
                    <select name="m_d_n" onChange={e => setChangeSelect(e.target.value)} required className="input input-bordered w-full max-w-xs mb-2 text-black">
                      <option value="">Select Day/Night</option>
                      <option value="Day">Day</option>
                      <option value="Night">Night</option>
                      
                    </select>


              
                    {changeSelect === "Day" || changeSelect==="" ?  <select name="m_count_d" required onChange={e => setDay(e.target.value)} className="input input-bordered w-full max-w-xs mb-2 text-black">
                      <option value="">Day Meal</option>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>: <select name="m_count_n" required  onChange={e => setNight(e.target.value)} className="input input-bordered w-full max-w-xs mb-2 text-black">
                    <option value="">Night Meal</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select> }
                  
                   
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



<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

    </div>





















  );
};

export default AddMeal;