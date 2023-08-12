import React, { useState } from 'react'
import forgetpass from "../../assets/forgetpass.png"
import { forgetPass } from '../../networkcalls/user';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
const ForgetPass = () => {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");

    let navigate = useNavigate();
    const handleForgetPass = () => {
        if (email === undefined || email === "") {
            setEmailErr("Email is required")
        } else {
            forgetPass({ email }).then((data) => {
                if (data.err === 200) {
                    swal("Success", data.msg, "success").then((ok) => {
                        if (ok) {
                            navigate("/")
                        }
                    })
                } else {
                    swal("Warning", data.msg, "warning");
                }
            })
        }
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4">
                        <img src={forgetpass} className='img-fluid animate__animated animate__bounceInLeft' alt="" />
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow p-4 mt-5">
                            <input type="text" className='mt-3 form-control' placeholder='Enter Your Email' value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr("") }} />
                            <span className="text-danger">{emailErr}</span>
                            <button className='btn btn-primary mt-4 rounded-pill' onClick={handleForgetPass}>Submit</button>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>        </div>
    )
}

export default ForgetPass
