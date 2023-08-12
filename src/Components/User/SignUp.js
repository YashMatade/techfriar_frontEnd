import React, { useState } from 'react';
import swal from "sweetalert";
import signup from "../../assets/signup.png"
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../networkcalls/user';

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [nameErr, setNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passErr, setPassErr] = useState("")
    let navigate = useNavigate();
    const handleSignUp = () => {
        let validate = true;
        if (name.trim() === "") {
            setNameErr("Name is required");
            validate = false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailErr("Please enter valid email");
            validate = false;
        }
        if (email.trim() === "") {
            setEmailErr("Email is required");
            validate = false;
        }
        if (pass.trim() === "") {
            setPassErr("Password is required")
            validate = false;
        }
        if (validate) {
            let data = {
                name, email, password: pass
            }
            signUp(data).then((data) => {
                if (data.err === 200) {
                    swal("Success", data.msg, "success").then((ok) => {
                        if (ok) {
                            navigate("/")
                        }
                    })
                } else {
                    swal("Warning", data.msg, "warning")
                }
            })
            // navigate("/")
            // swal("Success", "Registered successfully", "success");    
        }

    }
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4">
                        <img src={signup} className='img-fluid animate__animated animate__bounceInLeft' alt="" />
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow p-4 mt-5">
                            <input type="text" className='mt-3 form-control' placeholder='Enter Your Name' value={name} onChange={(e) => { setName(e.target.value); setNameErr("") }} />
                            <span className="text-danger">{nameErr}</span>
                            <input type="text" className='mt-3 form-control' placeholder='Enter Your Email' value={email} onChange={(e) => { setEmail(e.target.value); setEmailErr("") }} />
                            <span className="text-danger">{emailErr}</span>
                            <input type="password" className='mt-3 form-control' placeholder='Enter Password' value={pass} onChange={(e) => { setPass(e.target.value); setPassErr("") }} />
                            <span className="text-danger">{passErr}</span>
                            <button className='btn btn-primary mt-4 rounded-pill' onClick={handleSignUp}>Sign Up</button>
                            <br />
                            <span>Already have an account? <b onClick={() => navigate("/")} className='text-primary' style={{ cursor: "pointer" }}>Log in</b></span>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
