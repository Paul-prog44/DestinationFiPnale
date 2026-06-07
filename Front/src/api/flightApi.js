import API from "./authApi";


export const getFlight = (id) =>
    API.get(`/hotel/${id}`).then((response) => response.data)

export const searchFlights = (filters = {}) => {
    const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== "")
    );

    return API.get("/flight/search", { params: cleanFilters }).then((response) => response.data);
}