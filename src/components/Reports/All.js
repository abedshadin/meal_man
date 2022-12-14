import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const All = () => {


    const [searchText, setSearchText] = useState('');
    const [indi, setIndi] = useState([]);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
    const time = current.toLocaleTimeString();



    useEffect(() => {
        fetch('http://localhost:5000/meals')
            .then(res => res.json())
            .then(data => setIndi(data));

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
            const url = `http://localhost:5000/meals/${id}`;
            fetch(url, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((data) => {
                    const remaining = indi.filter((iteml) => iteml._id !== id);
                    setIndi(remaining);
                    toast("Delete Successful");
                });
        }
    };


    // handle onChange event of the dropdown
    const handleChange = e => {
        setSearchText(e.value);
    }


 
    return (
        <div>

         
            <div className="overflow-x-auto w-full">
                <div className='text-center'>
                    {
                        indi.forEach(rec => {
                            totalamount = parseInt(totalamount +  rec.m_d_n.day + rec.m_d_n.night);

                        })

                    }
                    <span className='text-blue-500 font-bold'>Total Meal: {totalamount}</span> <br></br>
                    {
                        indi.forEach(rec => {
                            totalpay = parseInt(totalpay + rec.m_d_n.day);

                        })

                    }
                    <span className='text-green-800 font-bold' >Total Day: {totalpay}</span> <br></br>

                    {
                        indi.forEach(rec => {
                            totaldue = parseInt(totaldue + rec.m_d_n.night);

                        })

                    }
                    <span className='text-red-500 font-bold'>Total Night: {totaldue}</span><br></br>





                </div>
                <table className="table w-full ">

                    <thead>
                        <tr>


                            <th>Date</th>
                            <th> Name</th>
                            <th>Comment</th>
                            <th>Day</th>
                            <th>Night</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            indi.map(receipt => <><tr>

                                <td>
                                    {receipt.date}, {receipt.time}<br />
                                    {
                                        receipt.update_date && <div className="badge badge-accent">Last Update: {receipt.update_date}, {receipt.update_time}</div>
                                    }
                                </td>
                                <td>{receipt.name}</td>
                                {
                                    receipt.comment ? <td><div className="tooltip tooltip-secondary   font-bold " data-tip={receipt.comment}>
                                        <button className="btn">????</button>
                                    </div></td> : <td></td>
                                }


                                <td>{receipt.m_d_n.day}</td>
                                <td>{receipt.m_d_n.night}</td>
                         
                    





                               <td>
                                    <button className='btn mr-2' onClick={() => handleDelete(receipt._id)}>???</button>


                                </td> 
                            </tr></>
                            ).reverse()
                        }

                    </tbody>



                </table>


            </div>

            {/* <div className='text-center '>
                <span className="btn btn-primary"
                    onClick={print}>
                    PRINT
                </span>
            </div> */}
            <ToastContainer></ToastContainer>
            {/* <div className='text-center '>
                <span className="btn btn-primary"
                    onClick={print}>
                    PRINT
                </span>
            </div> */}
           
        </div>
    );
};

export default All;