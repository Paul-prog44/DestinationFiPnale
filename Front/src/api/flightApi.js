import API from "./authApi";

export const getFlights = () =>
    API.get("/flight/arrivalCity/3").then((response) => response.data);

export const getFlight = (id) =>
    API.get(`/hotel/${id}`).then((response) => response.data);

