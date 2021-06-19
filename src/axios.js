import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:5001",
    baseURL: "http://app-72d19b9f-f493-4977-85cf-f04d289f5132.cleverapps.io/",
})

export default instance;