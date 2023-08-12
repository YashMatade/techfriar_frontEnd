import { axiosPrivate } from "./axios";

export const signUp = async (data) => {
    let res = await axiosPrivate.post("/user/signup", data);
    return res.data;
};

export const loginAPI = async (data) => {
    let res = await axiosPrivate.post("/user/login", data);
    return res.data;
}

export const forgetPass = async (email) => {
    let res = await axiosPrivate.post("/user/forgotpass", email);
    return res.data;
}

export const resetPass = async (data) => {
    let res = await axiosPrivate.post("/user/resetpass", data);
    return res.data;
}