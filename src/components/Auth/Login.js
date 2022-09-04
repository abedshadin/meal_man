
import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


const Login = () => {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: "",
    })

    const [signInWithEmail, user, loading, hookError] = useSignInWithEmailAndPassword(auth);


    const handleEmailChange = (e) => {
        const emailRegex = /\S+@\S+\.\S+/;
        const validEmail = emailRegex.test(e.target.value);

        if (validEmail) {
            setUserInfo({ ...userInfo, email: e.target.value })
            setErrors({ ...errors, email: "" })
        } else {
            setErrors({ ...errors, email: "Invalid email" })
            setUserInfo({ ...userInfo, email: "" })
        }



        // setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        const passwordRegex = /.{6,}/;
        const validPassword = passwordRegex.test(e.target.value);

        if (validPassword) {
            setUserInfo({ ...userInfo, password: e.target.value });
            setErrors({ ...errors, password: "" });
        } else {
            setErrors({ ...errors, password: "Minimum 6 characters!" });
            setUserInfo({ ...userInfo, password: "" })
        }

    }

    const handleLogin = (e) => {
        e.preventDefault();

        console.log(userInfo)

        signInWithEmail(userInfo.email, userInfo.password);

    }

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            // const url = 'https://new-aghgfhfgh.herokuapp.com/login'


            // fetch(url, {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         email: userInfo.email
            //     }),
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            // })
            //     .then((response) => response.json())
            //     .then((data) => {
            //         localStorage.setItem("accessToken", data.token);

            //     })
            navigate(from);
        }
    }, [user]);


    useEffect(() => {
        const error = hookError;
        if (error) {
            switch (error?.code) {
                case "auth/invalid-email":
                    toast("Invalid email provided, please provide a valid email");
                    break;

                case "auth/invalid-password":
                    toast("Wrong password. Intruder!!")
                    break;
                default:
                    toast("something went wrong")
            }
        }
    }, [hookError])
    return (
        <div>

            <div className="flex justify-center items-center justify-items-center mt-2 bg-base-200">
                <div className="card w-96 bg-neutral text-neutral-content">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-white">Login</h2>
                        <form className="login-form" onSubmit={handleLogin}>
                            <input type="text" className="input w-full max-w-xs mb-2 text-black" placeholder="Your Email" onChange={handleEmailChange} />
                            {errors?.email && <p className="error-message">{errors.email}</p>}
                            <input type="password" className="input w-full max-w-xs text-black" placeholder="password" onChange={handlePasswordChange} />
                            {errors?.password && <p className="error-message">{errors.password}</p>}
                            <button className="btn btn-primary mt-2 text-white">Login</button>





                        </form>








                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;