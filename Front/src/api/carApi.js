import API from "./authApi";

// Routes publiques
export const getCars = () =>
    API.get("/cars").then((r) => r.data);

export const getCar = (id) =>
    API.get(`/cars/${id}`).then((r) => r.data);

export const getCarsByCity = (cityId) =>
    API.get(`/cars/city/${cityId}`).then((r) => r.data);

export const getCities = () =>
    API.get("/cars/cities").then((r) => r.data);

// Routes protégées
export const bookCar = (data) =>
    API.post("/bookings/cars", data).then((r) => r.data);

export const getMyCarBookings = () =>
    API.get("/bookings/my").then((r) => r.data);

export const cancelCarBooking = (id) =>
    API.patch(`/bookings/cars/${id}/cancel`).then((r) => r.data);