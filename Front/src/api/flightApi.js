import API from "./authApi";

export const getFlights = () =>
    API.get("/flight/arrivalCity/3").then((response) => response.data) //TODO : Donnée en dur

export const getFlight = (id) =>
    API.get(`/hotel/${id}`).then((response) => response.data)

export const searchFlight = (filters = {}) => {
    const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== "")
    );

    return API.get("/flight/search", { params: cleanFilters }).then((response) => response.data);
};