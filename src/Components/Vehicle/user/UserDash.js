import React, { useEffect, useState } from 'react'
import { getAll } from '../../../networkcalls/vehicle';
import Navbar from '../../Navbar';
import Strings from '../../../utils/Strings';

const UserDash = () => {
    const [name, setName] = useState("");
    const [manufacturer, setManufracturer] = useState("");
    const [model, setModel] = useState("");
    const [data, setData] = useState([]);
    const [price, setPrice] = useState("asc");

    useEffect(() => {
        getAll("", "", "", "").then(res => {
            setData(res.data)
        })
    }, []);

    const handleSearch = () => {
        getAll(name, manufacturer, model, price).then((data) => {
            setData(data.data);
        })
    }
    const handleClear = () => {
        setName("");
        setManufracturer("");
        setModel("");
        setPrice("asc");
        getAll("", "", "", "").then((data) => {
            setData(data.data)
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row bg-white p-5 shadow">
                    <div className="col-lg-3">
                        <input type="text" placeholder='Search by name' className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="col-lg-3">
                        <input type="text" placeholder='Search by manufracturer' className='form-control' value={manufacturer} onChange={(e) => { setManufracturer(e.target.value) }} />
                    </div>
                    <div className="col-lg-3">
                        <input type="text" placeholder='Search by Model' className='form-control' value={model} onChange={(e) => { setModel(e.target.value) }} />
                    </div>
                    <div className="col-lg-3">
                        <select name="" id="" className='form-select' onChange={(e) => { setPrice(e.target.value) }}>
                            <option value=""></option>
                            <option value="asc">low to high</option>
                            <option value="desc">High to low</option>
                        </select>
                    </div>
                    <div className="col-lg-12 mt-3 text-center">
                        <button className='btn btn-success' onClick={handleSearch}>Search</button>
                        <button className='btn btn-danger ms-2' onClick={handleClear}>Clear</button>
                    </div>
                </div>


                {
                    data ? (<>

                        <div className="row mt-4 p-3 justify-content-between">
                            {
                                data?.map((v) => {
                                    return <div class="card col-lg-4 mb-5 shadow" style={{ width: "300px" }}>
                                        <img src={Strings.UPLOADS + v.primaryImage} style={{ height: "200px" }} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{v.name}</h5>
                                            <p class="card-text">{v.description}</p>
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">Rs. {v.price}</li>
                                            <li class="list-group-item">Quantity {v.availableQuantity}</li>
                                            <li class="list-group-item">Manufactured By {v.manufacturer}</li>
                                            <li class="list-group-item">Model {v.model}</li>
                                        </ul>
                                    </div>
                                })
                            }

                        </div>
                    </>) : (<>
                        <div className="col-lg-12 card shadow mt-4 text-center">
                            <h4>No data found</h4>
                        </div>
                    </>)
                }

            </div>
        </div>
    )
}

export default UserDash
