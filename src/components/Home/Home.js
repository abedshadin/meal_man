import React, { useEffect, useState } from 'react';

const Home = () => {

  const [daily, setDaily] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  // const month = current.toLocaleString("en-US", { month: "long" });
  const month = current.getMonth() + 1;
  const year = current.getFullYear();
  const searchMonth = `${month}_${year}`;
  useEffect(() => {
    fetch(`https://new-aghgfhfgh.herokuapp.com/home?date=${date}`)
      .then(res => res.json())
      .then(data => setDaily(data))
  }, [])

  let dtotalamount = 0;
  let dtotalpaid = 0;
  let dtotaldue = 0;

  useEffect(() => {
    fetch(`http://localhost:5000/homes?month=${searchMonth}`)
      .then(res => res.json())
      .then(data => setMonthly(data))
  }, [])
  let mtotalamount = 0;
  let mtotalpaid = 0;
  let mtotaldue = 0;
  return (
    <div className='bg-base-200'>

      <div className='text-center pt-2'>
      
        <h1 className='text-3xl font-bold text-green-500 mt-10 mb-6'>Daily Summary</h1>
        <div className="stats shadow ">

          <div className="stat">
            <div className="stat-figure text-secondary">

            </div>
            <div className=" text-black font-bold">Amount</div>

            {
              daily.forEach(rec => {
                dtotalamount = parseInt(dtotalamount + rec.amount);

              })

            }
            <div className="stat-value text-yellow-500 ">{dtotalamount}</div>

          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">

            </div>
            <div className=" text-black font-bold">Paid</div>
            {
              daily.forEach(rec => {
                dtotalpaid = parseInt(dtotalpaid + rec.pay);

              })

            }
            <div className="stat-value text-green-400">{dtotalpaid}</div>

          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">

            </div>
            <div className=" text-black font-bold">Due</div>
            {
              daily.forEach(rec => {
                dtotaldue = parseInt(dtotaldue + rec.due);

              })

            }
            <div className="stat-value text-red-500">{dtotaldue}</div>

          </div>

        </div>
        <div>
          <h1 className='text-3xl font-bold text-green-500 mt-10 mb-6'>Monthly Summary</h1>
          <div className="stats shadow">

            <div className="stat">
              <div className="stat-figure text-secondary">

              </div>
              <div className=" text-white font-bold">Total Meal</div>

              {
                monthly.forEach(rec => {
                  mtotalamount = parseInt(mtotalamount + rec.m_d_n.day+rec.m_d_n.night);

                })

              }
              <div className="stat-value text-yellow-500">{mtotalamount}</div>

            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">

              </div>
              <div className=" text-black font-bold">Paid</div>
              {
                monthly.forEach(rec => {
                  mtotalpaid = parseInt(mtotalpaid + rec.pay);

                })

              }
              <div className="stat-value text-green-400">{mtotalpaid}</div>

            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">

              </div>
              <div className=" text-black font-bold">Due</div>
              {
                monthly.forEach(rec => {
                  mtotaldue = parseInt(mtotaldue + rec.due);

                })

              }
              <div className="stat-value text-red-500">{mtotaldue}</div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;