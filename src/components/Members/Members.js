import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Members = () => {
    const [searchText, setSearchText] = useState('');
    const [indi, setIndi] = useState([]);
    const [firms, setFirms] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/members')
            .then(res => res.json())
            .then(data => setIndi(data))
    }, [])
    const navigate = useNavigate();

    const handleDelete = (id) => {
        const proceed = window.confirm("Are you sure?");

        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
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
    const print = () => {
        window.print();
    }



    useEffect(() => {
        fetch('http://localhost:5000/smembers')
            .then(res => res.json())
            .then(data => setFirms(data));

    }, [])
    const options = [];
    firms.forEach((e) => {
        options.push({ label: `${e.name}`, value: e.name });
    })
    const handleChange = e => {
        setSearchText(e.value);

    }
    const handlesearch = e => {

        fetch(`http://localhost:5000/users/user?name=${searchText}`)
            .then(res => res.json())
            .then(data => setIndi(data))

    }
    return (
        <div>

            <div className='text-center'>
                {/* <select onChange={handleSelect} className="input input-bordered w-full max-w-xs mb-2 mt-4">
                    <option value="">Select Firm</option>
                    {firms.map((firm) => (
                        <option className='text-2xl' value={firm.firmName}>{firm.firmName}</option>

                    ))}
                </select> */}
                <div className='flex justify-center'>
                    <div className='input  mt-4 w-96'>
                        <Select className='text-black z-20 '
                            placeholder="Select a Firm"
                            value={options.value} // set selected value
                            options={options} // set list of the data
                            onChange={handleChange} // assign onChange function
                        />
                    </div>
                </div>
                <br></br>
                <button className='btn btn-primary mb-4' onClick={handlesearch}>Search</button>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>



                            <th>Name</th>
                            <th>Dept.</th>
                            <th>Email</th>
                            <th>Mobile</th>

                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            indi.map(firm => <><tr>


                                <td>{firm.name}</td>
                                <td>{firm.dept}</td>
                                <td><a href={"mailto:" + firm.email}>{firm.email}</a></td>
                                <td><a href={"tel:" + firm.phone}>{firm.phone}</a></td>
                              










                                <td>
                                    
                                    <button className='btn mr-2' onClick={() => handleDelete(firm._id)}>Delete</button>


                                </td>

                            </tr></>
                            )
                        }

                    </tbody>



                </table>


            </div>






            <ToastContainer></ToastContainer>




            <div className='text-center '>
                <span className="btn btn-primary"
                    onClick={print}>
                    PRINT
                </span>
            </div>
        </div>
    );
};

export default Members;