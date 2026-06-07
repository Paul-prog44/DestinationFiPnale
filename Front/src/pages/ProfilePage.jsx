import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyCarBookings, cancelCarBooking } from "../api/carApi";
import { getBookingsByUserId } from "../api/bookingApi";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [carBookings, setCarBookings] = useState([]);
    const [hotelBookings, setHotelBookings] = useState([]);
    const [loadingCars, setLoadingCars] = useState(true);
    const [loadingHotels, setLoadingHotels] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Voitures
        getMyCarBookings()
            .then(setCarBookings)
            .catch(() => setError("Impossible de charger les réservations voiture."))
            .finally(() => setLoadingCars(false));

        // Hôtels — décode le userId depuis le token JWT
        const raw = localStorage.getItem("user");
        const storedUser = raw ? JSON.parse(raw) : null;
        const userId = storedUser?.id;

        if (userId) {
            getBookingsByUserId(userId)
                .then((data) => {
                    const hotelOnly = (data.booking ?? []).filter((b) => b.roomBookingId != null);
                    setHotelBookings(hotelOnly);
                })
                .catch(() => {})
                .finally(() => setLoadingHotels(false));
        } else {
            setLoadingHotels(false);
        }
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleCancel = async (id) => {
        if (!confirm("Annuler cette réservation ?")) return;
        try {
            await cancelCarBooking(id);
            setCarBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b))
            );
        } catch {
            setError("Impossible d'annuler cette réservation.");
        }
    };

    const statusColor = (status) => {
        if (status === "PENDING") return "#8EA604";
        if (status === "CANCELLED") return "#dc3545";
        if (status === "CONFIRMED") return "#91C7B1";
        return "#6c757d";
    };

    const totalBookings = carBookings.length + hotelBookings.length;

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="profile" />

            <div className="container py-4 py-lg-5">

                {/* Infos personnelles */}
                <div className="card border-0 shadow-sm rounded-5 overflow-hidden mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                    <div className="card-body p-4 p-lg-5">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-2 text-center">
                                <div
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white fw-bold mx-auto"
                                    style={{ width: "80px", height: "80px", fontSize: "2rem", color: "#8EA604" }}
                                >
                                    {user?.firstname?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <h1 className="h3 fw-semibold mb-1">{user?.firstname}</h1>
                                <p className="text-secondary mb-1">{user?.email}</p>
                                <p className="text-secondary mb-0 small">
                                    {totalBookings} réservation(s) au total
                                </p>
                            </div>
                            <div className="col-lg-3 text-lg-end">
                                <button
                                    className="btn btn-outline-danger rounded-pill px-4"
                                    onClick={handleLogout}
                                >
                                    Se déconnecter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {/* Section voitures */}
                <h2 className="h4 fw-semibold mb-3 d-flex align-items-center gap-2">
                     Voitures
                    <span className="badge rounded-pill px-3 py-2 ms-1"
                          style={{ backgroundColor: "#F5D0C5", color: "#212529" }}>
                        {carBookings.length}
                    </span>
                </h2>

                {loadingCars && <div className="alert alert-secondary mb-4">Chargement...</div>}

                {!loadingCars && carBookings.length === 0 && (
                    <div className="card border-0 shadow-sm rounded-5 p-4 text-center mb-5">
                        <p className="text-secondary mb-3">Aucune réservation de voiture.</p>
                        <Link className="btn btn-outline-dark rounded-pill px-4 mx-auto"
                              style={{ width: "fit-content" }} to="/cars">
                            Explorer les voitures
                        </Link>
                    </div>
                )}

                {!loadingCars && carBookings.length > 0 && (
                    <div className="row g-3 mb-5">
                        {carBookings.map((booking) => (
                            <div className="col-12" key={booking.id}>
                                <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-lg-3">
                                                <p className="text-secondary mb-1 small">Véhicule</p>
                                                <h4 className="h6 fw-semibold mb-0">{booking.carBrand} {booking.carModel}</h4>
                                                <p className="text-secondary small mb-0">{booking.cityName} — {booking.country}</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <p className="text-secondary mb-1 small">Dates</p>
                                                <p className="fw-medium mb-0 small">{booking.startDate} → {booking.endDate}</p>
                                                <p className="text-secondary small mb-0">{booking.numberOfDays} jour(s)</p>
                                            </div>
                                            <div className="col-lg-2">
                                                <p className="text-secondary mb-1 small">Total</p>
                                                <p className="fw-semibold mb-0" style={{ color: "#8EA604" }}>
                                                    {booking.price} EUR
                                                </p>
                                            </div>
                                            <div className="col-lg-2">
                                                <span className="badge rounded-pill px-3 py-2"
                                                      style={{ backgroundColor: statusColor(booking.status), color: "white" }}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                            <div className="col-lg-2 text-lg-end">
                                                {booking.status === "PENDING" && (
                                                    <button
                                                        className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                                        onClick={() => handleCancel(booking.id)}
                                                    >
                                                        Annuler
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Section hôtels */}
                <h2 className="h4 fw-semibold mb-3 d-flex align-items-center gap-2">
                     Hôtels
                    <span className="badge rounded-pill px-3 py-2 ms-1"
                          style={{ backgroundColor: "#F5D0C5", color: "#212529" }}>
                        {hotelBookings.length}
                    </span>
                </h2>

                {loadingHotels && <div className="alert alert-secondary mb-4">Chargement...</div>}

                {!loadingHotels && hotelBookings.length === 0 && (
                    <div className="card border-0 shadow-sm rounded-5 p-4 text-center mb-5">
                        <p className="text-secondary mb-3">Aucune réservation d'hôtel.</p>
                        <Link className="btn btn-outline-dark rounded-pill px-4 mx-auto"
                              style={{ width: "fit-content" }} to="/hotels">
                            Explorer les hôtels
                        </Link>
                    </div>
                )}

                {!loadingHotels && hotelBookings.length > 0 && (
                    <div className="row g-3 mb-5">
                        {hotelBookings.map((booking) => (
                            <div className="col-12" key={booking.id}>
                                <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                                    <div className="card-body p-4">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-lg-4">
                                                <p className="text-secondary mb-1 small">Réservation</p>
                                                <h4 className="h6 fw-semibold mb-0">Chambre #{booking.roomBookingId}</h4>
                                                <p className="text-secondary small mb-0">Booking #{booking.id}</p>
                                            </div>
                                            <div className="col-lg-3">
                                                <p className="text-secondary mb-1 small">Créée le</p>
                                                <p className="fw-medium mb-0 small">
                                                    {new Date(booking.createdAt).toLocaleDateString("fr-FR")}
                                                </p>
                                            </div>
                                            <div className="col-lg-3">
                                                <span className="badge rounded-pill px-3 py-2"
                                                      style={{ backgroundColor: statusColor(booking.status), color: "white" }}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Vols — à venir */}
                <h2 className="h4 fw-semibold mb-3 d-flex align-items-center gap-2">
                     Vols
                    <span className="badge rounded-pill px-3 py-2 ms-1"
                          style={{ backgroundColor: "#F5D0C5", color: "#212529" }}>0</span>
                </h2>
                <div className="card border-0 shadow-sm rounded-5 p-4 text-center">
                    <p className="text-secondary mb-0">Les réservations de vols seront disponibles prochainement.</p>
                </div>
            </div>
        </div>
    );
}