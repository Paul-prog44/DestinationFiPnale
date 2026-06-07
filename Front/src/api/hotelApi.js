import API from "./authApi";

export const getHotels = () =>
    API.get("/hotel").then((response) => response.data);

export const getHotel = (hotelId) =>
    API.get(`/hotel/${hotelId}`).then((response) => response.data);

export const bookRoom = (data) =>
    API.post("/booking/room", data).then((response) => response.data);

// pour ajouter les reservations d'hotel dans mes reservations
export const getMyHotelBookings = (userId) =>
    API.get(`/api/booking/user/${userId}`).then((r) => r.data);