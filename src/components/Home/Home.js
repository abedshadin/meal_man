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
  let totalamount_weekall = 0;
  const [firms, setFirms] = useState([]);
  useEffect(() => {
      fetch('http://localhost:5000/members')
          .then(res => res.json())
          .then(data => setFirms(data));
  }, [])
  return (
    <div className='bg-base-200'>

      <div className='text-center pt-2'>
      
   
       
        <div>
          <h1 className='text-3xl font-bold text-green-500 mt-10 mb-6'>Total Summary</h1>
          <div className="stats shadow">

            <div className="stat">
              <div className="stat-figure text-secondary">

              </div>
              <div className=" text-white font-bold"> Meal</div>

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
              <div className=" text-white font-bold">Bazar Cost</div>
              {
                        firms.forEach(rec => {
                            totalamount_weekall = parseInt(totalamount_weekall +  rec.week_1+  rec.week_2+  rec.week_3+  rec.week_4+  rec.week_5);

                        })

                    }
              <div className="stat-value text-green-400">{totalamount_weekall}</div>

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