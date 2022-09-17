import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const PayReports = () => {
    const [searchText, setSearchText] = useState('');
    const [monthly, setMonthly] = useState([]);
    const current = new Date();
    const year = current.getFullYear();
    // const month = current.toLocaleString("en-US", { month: "long" });
    const month = current.getMonth() + 1;
    const searchMonth = `${month}_${year}`;
    console.log(searchMonth)
    const handleSelect = event => {
        const text = event.target.value;
        setSearchText(text);


    }
    const handlesearch = e => {

        fetch(`http://localhost:5000/pays?month=${searchText}`)
            .then(res => res.json())
            .then(data => setMonthly(data))

    }


    useEffect(() => {
        fetch(`http://localhost:5000/pays?month=${searchMonth}`)
            .then(res => res.json())
            .then(data => setMonthly(data))
    }, [])


    let totaldue = 0;
    let totalamount = 0;
    let totalpay = 0;
    const print = () => {
        window.print();
    }

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure?");

        if (proceed) {
            const url = `https://new-aghgfhfgh.herokuapp.com/receipt/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    const remaining = monthly.filter((iteml) => iteml._id !== id);
                    setMonthly(remaining);
                    toast("Delete Successful");
                });
        }
    };
    const navigate = useNavigate();

    const navigateToItemDetail = id => {
        navigate(`/sreceipt/${id}`);
    }
    return (
        <div>

            <div className='text-center'>
                <select onChange={handleSelect} className="input input-bordered w-full max-w-xs mb-2 mt-4">
                    <option value={"12_" + year}>December</option>
                    <option value={"11_" + year}>November</option>
                    <option value={"10_" + year}>October</option>
                    <option value={"9_" + year}>September</option>
                    <option value={"8_" + year}>August</option>
                    <option value={"7_" + year}>July</option>
                    <option value={"6_" + year}>June</option>
                    <option value={"5_" + year}>May</option>
                    <option value={"4_" + year}>April</option>
                    <option value={"3_" + year}>March</option>
                    <option value={"2_" + year}>February</option>
                    <option value={"1_" + year}>January</option>
                </select>
                <br></br>
                <button className='btn btn-primary mb-4' onClick={handlesearch}>Search</button>
            </div>

            <div className="overflow-x-auto w-full">
            {/* <div className='text-center'>
                    {
                        monthly.forEach(rec => {
                            totalamount = parseInt(totalamount +  rec.m_d_n.day + rec.m_d_n.night);

                        })

                    }
                    <span className='text-blue-500 font-bold'>Total Meal: {totalamount}</span> <br></br>
                    {
                        monthly.forEach(rec => {
                            totalpay = parseInt(totalpay + rec.m_d_n.day);

                        })

                    }
                    <span className='text-green-800 font-bold' >Total Day: {totalpay}</span> <br></br>

                    {
                        monthly.forEach(rec => {
                            totaldue = parseInt(totaldue + rec.m_d_n.night);

                        })

                    } */}
                    {/* <span className='text-red-500 font-bold'>Total Night: {totaldue}</span><br></br>





                </div> */}
                <table className="table w-full ">
                <thead>
                        <tr>


                            <th colSpan="3">Total</th>
                            
                            <th>Week 1</th>
                            <th>Week 2</th>
                            <th>Week 3</th>
                            <th>Week 4</th>
                            <th>Week 5</th>
                          
                            <th>Total</th>

                        </tr>
                    </thead>
                    <thead>
                        <tr>


                            <th>Date</th>
                            <th> Name</th>
                            <th>Comment</th>
                            <th>Week 1</th>
                            <th>Week 2</th>
                            <th>Week 3</th>
                            <th>Week 4</th>
                            <th>Week 5</th>
                          
                            <th>Total</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            monthly.map(receipt => <><tr>

                                <td>
                                    {receipt.date}, {receipt.time}<br />
                                    {
                                        receipt.update_date && <div className="badge badge-accent">Last Update: {receipt.update_date}, {receipt.update_time}</div>
                                    }
                                </td>
                                <td>{receipt.name}</td>
                                {
                                    receipt.comment ? <td><div className="tooltip tooltip-secondary   font-bold " data-tip={receipt.comment}>
                                        <button className="btn">📋</button>
                                    </div></td> : <td></td>
                                }


                           
                         <td>{receipt.week.Week_1.amount}</td>
                         <td>{receipt.week.Week_2.amount}</td>
                       
                    





                            </tr></>
                            ).reverse()
                        }

                    </tbody>



                </table>



            </div>











            <div className='text-center '>
                <span className="btn btn-primary"
                    onClick={print}>
                    PRINT
                </span>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default PayReports;