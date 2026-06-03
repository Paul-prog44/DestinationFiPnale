import API from "./authApi"

export const getCities = () =>
    API.get("/city").then((response) => response.data)

export const getCity = (id)  => 
    API.get(`/city/${id}`).then((response) => response.data)