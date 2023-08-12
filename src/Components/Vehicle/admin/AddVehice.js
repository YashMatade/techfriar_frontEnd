import React, { useState } from 'react';

import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { addVehicle } from '../../../networkcalls/vehicle';

const AddVehice = () => {
    let authToken = localStorage.getItem("authToken");
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [availableQuantity, setAvailableQuantity] = useState();
    const [manufacturer, setmanufacturer] = useState('');
    const [model, setModel] = useState('');
    // to change state of pic-
    const [VehiclePic, setVehiclePic] = useState("http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRSN9jFbHcIbI0NOhmCS3Xsp3VfEVl44GKZEofbTcgZIP5GsKR-1tVfeg5VwVVqqtm0Vu29TdTxMJ4ktx6lTOA");
    // to upload pic in dataBase -
    const [primaryImage, setPrimaryImage] = useState({});
    const [imageErrorMessage, setImageErrorMessage] = useState();

    const [nameErr, setNameErr] = useState();
    const [descriptionErr, setDescriptionErr] = useState();


    const setImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result != null) {
                setVehiclePic(reader.result.toString());
            }
        };
        setPrimaryImage(file);
        setImageErrorMessage("");
    };
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        let validate = true;
        let data = {
            name, description, price, availableQuantity, manufacturer, model, primaryImage
        }
        console.log(data);
        var formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price || 0);
        formData.append("availableQuantity", availableQuantity || 0);
        formData.append("manufacturer", manufacturer);
        formData.append("model", model);
        formData.append("primaryImage", primaryImage);
        let config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authToken}`
            },
        };

        if (!primaryImage?.name?.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            setImageErrorMessage("Please select valid image");
            validate = false;
        }

        if (validate) {
            addVehicle(formData, config).then((res) => {
                if (res.err === 200) {
                    swal("Success", res.msg, "success").then((ok) => {
                        if (ok) {
                            navigate("/admin/dashboard");
                        }
                    })
                } else {
                    swal("Warning", res.msg, "warning");
                }
            }).catch(err => swal("Error", "Server Error", "error"))
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center p-5">
                <div className="col-lg-6">
                    <div className="card p-3 rounded-5 shadow">
                        <h2 className="text-center mb-4">Update Vehicle</h2>
                        <form className="form">
                            <div className="form-outline mb-4">
                                <img
                                    src={VehiclePic}
                                    alt="image"
                                    type="file"
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "50%",
                                    }}
                                />
                                <br />
                                <label htmlFor="" className="mb-2">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    autoComplete="false"
                                    className="form-control"
                                    onChange={setImage}
                                    accept='image/*'
                                />
                                <span className="text-danger">{imageErrorMessage}</span>
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Vehicle Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Vehicle Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Vehicle Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Vehicle Quantity"
                                    value={availableQuantity}
                                    onChange={(e) => setAvailableQuantity(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Vehicle Manufacturer"
                                    value={manufacturer}
                                    onChange={(e) => setmanufacturer(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Vehicle Model"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </div>

                            <div className="text-center">
                                <button className="btn btn-success" onClick={submit}>
                                    Add Vehicle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVehice;
