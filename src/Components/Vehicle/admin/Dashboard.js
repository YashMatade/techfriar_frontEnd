import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import swal from 'sweetalert';
import { deleteVehicle, getAll } from '../../../networkcalls/vehicle';
import Strings from '../../../utils/Strings';

const Dashboard = () => {
    const [vehicleData, setvehicleData] = useState();
    useEffect(() => {
        getAll("", "", "", "").then((res) => {
            if (res.err === 200) {
                setvehicleData(res.data)
            }
        })
    }, []);

    let navigate = useNavigate();
    const handleDelete = (id) => {
        deleteVehicle({ vehicleId: id }).then((res) => {
            if (res.err === 200) {
                swal("Success", res.msg, "success").then(() => {
                    window.location.reload();
                })
            }
        })
    }
    useEffect(() => {
        if (localStorage.getItem("authToken") === null || !localStorage.getItem("authToken")) {
            swal("Warning", "Unauthenticated User", "error").then((data) => {
                if (data) {
                    navigate("/");
                }
            })
        }
    }, [])

    return (
        <div>

            <div className="container">
                <div className="row">

                    <h4 className='text-center mt-1 mb-4'>Admin Dashboard </h4>



                    <div className="col-lg-1"></div>
                    <div className="col-lg-10 card shadow rounded-5">
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-sm btn-success mt-2' onClick={() => navigate("/admin/vehicle/add")}>Add Vehicle</button>&nbsp;&nbsp;   <button className='btn btn-sm btn-danger mt-2' onClick={() => { localStorage.clear(); navigate("/") }}>Logout</button>
                        </div>
                        <table class="table hover  ">

                            <thead>
                                <tr>
                                    <th scope="col">sr</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">Manufacturer</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    vehicleData ? (<>
                                        {
                                            vehicleData?.map((data, index) => {
                                                console.log(data)
                                                return <tr>
                                                    <th scope="row" key={index}>{index + 1}</th>
                                                    <td>{data.name}</td>
                                                    <td>{data.price}</td>
                                                    <td>{data.availableQuantity}</td>
                                                    <td>{data.manufacturer}</td>
                                                    <td>{data.model}</td>
                                                    <td><img src={Strings.UPLOADS + data.primaryImage} style={{ width: "30px", height: "30px" }} alt="" /></td>
                                                    <td>
                                                        <button className='btn btn-sm btn-secondary' onClick={() => navigate("/admin/vehicle/update/" + data._id)}>Update</button>&nbsp;&nbsp;
                                                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(data._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </>) : (<>

                                        <tr className='text-center'>
                                            <td colSpan="9">No data found</td>
                                        </tr>

                                    </>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;

