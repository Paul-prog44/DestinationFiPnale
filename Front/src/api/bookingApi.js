import API from "./authApi";

export const getBookingsByUserId = (userId) =>
    API.get(`/booking/user/${userId}`).then((r) => r.data);