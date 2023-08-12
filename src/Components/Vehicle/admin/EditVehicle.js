import React, { useEffect, useState } from 'react'
import { getVehicle, updateVehicle } from '../../../networkcalls/vehicle'
import { useParams } from 'react-router-dom'
import Strings from '../../../utils/Strings'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'

const EditVehicle = () => {
    let authToken = localStorage.getItem("authToken");
    let navigate = useNavigate();
    const { vid } = useParams()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState();
    const [availableQuantity, setAvailableQuantity] = useState();
    const [manufacturer, setmanufacturer] = useState('');
    const [model, setModel] = useState('');
    const [VehiclePic, setVehiclePic] = useState("");
    const [primaryImage, setPrimaryImage] = useState({});
    const [imageErrorMessage, setImageErrorMessage] = useState();
    useEffect(() => {
        getVehicle({ vehicleId: vid }).then((data) => {
            setName(data.data.name);
            setDescription(data.data.description);
            setPrice(data.data.price);
            setAvailableQuantity(data.data.availableQuantity);
            setmanufacturer(data.data.manufacturer);
            setModel(data.data.model);
            setVehiclePic(Strings.UPLOADS + data.data.primaryImage);
            setPrimaryImage(data.data.primaryImage);
        });
    }, []);

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
        formData.append("vehicleId", vid);
        let config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${authToken}`
            },
        };
        if (validate) {
            updateVehicle(formData, config).then((res) => {
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
    }


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

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center p-5">
                    <div className="col-lg-6">
                        <div className="card p-3 rounded-5 shadow">
                            <h2 className="text-center mb-4">Add Vehicle</h2>
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
                                        value={manufacturer || ""}
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
                                        Update Vehicle
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditVehicle
