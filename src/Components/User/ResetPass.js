import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { resetPass } from '../../networkcalls/user';
import resetpassImg from "../../assets/secure.png"
import swal from 'sweetalert';

const ResetPass = () => {
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");
    const [passErr, setPassErr] = useState("");
    const [cpasserr, setCpassErr] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const { token } = useParams();



    let navigate = useNavigate();
    const handleResetPass = () => {
        if (pass === undefined || pass === "") {
            setPassErr("Password is required");
        } else if (cpass !== pass) {
            setCpassErr("Password Doesen't match");
        } else {
            let data = {
                token,
                newPassword: pass
            }
            resetPass(data).then((data) => {
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
                        <img src={resetpassImg} className='img-fluid animate__animated animate__bounceInLeft' alt="" />
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow p-4 mt-5">
                            <input type={showPassword ? 'text' : 'password'}
                                className='mt-3 form-control' placeholder='Enter Your New Password' value={pass} onChange={(e) => { setPass(e.target.value); setPassErr("") }} />
                            <label className='password-toggle-label'>
                                <input
                                    type='checkbox'
                                    checked={showPassword}
                                    onChange={handleTogglePassword}
                                />&nbsp;
                                Show Password
                            </label>
                            <span className="text-danger">{passErr}</span>
                            <input type="password" className='mt-3 form-control' placeholder='Confirm your pass' value={cpass} onChange={(e) => { setCpass(e.target.value); setCpassErr("") }} />
                            <span className="text-danger">{cpasserr}</span>
                            <button className='btn btn-primary mt-4 rounded-pill' onClick={handleResetPass}>Submit</button>
                        </div>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </div>
        </div>
    )
}

export default ResetPass;