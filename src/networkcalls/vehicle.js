import { axiosPrivate } from "./axios";

let authToken = localStorage.getItem("authToken");

export const getAll = async (name, manufacturer, model, price) => {
    let res = await axiosPrivate.get(`/vehicle/getall?name=${name}&manufacturer=${manufacturer}&model=${model}&price=${price}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return res.data;
}

export const addVehicle = async (data, config) => {
    let res = await axiosPrivate.post(`/vehicle/add`, data, config);
    return res.data;
}

export const updateVehicle = async (data, config) => {
    let res = await axiosPrivate.post(`/vehicle/update`, data, config);
    return res.data;
}

export const deleteVehicle = async (data) => {
    let res = await axiosPrivate.post(`/vehicle/delete`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return res.data;
}

export const getVehicle = async (vehicleId) => {
    let res = await axiosPrivate.post(`/vehicle/getvehicle`, vehicleId, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return res.data;
}