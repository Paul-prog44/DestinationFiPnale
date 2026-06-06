import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cancelCarBooking, getMyCarBookings } from "../api/carApi";
import Navbar from "../components/Navbar";

export default function MyCarBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getMyCarBookings();
                setBookings(data);
            } catch {
                setError("Impossible de charger vos réservations.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleCancel = async (id) => {
        if (!confirm("Annuler cette réservation ?")) return;
        try {
            await cancelCarBooking(id);
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" } : b))
            );
        } catch {
            setError("Impossible d'annuler cette réservation.");
        }
    };

    const statusColor = (status) => {
        if (status === "PENDING") return "#8EA604";
        if (status === "CANCELLED") return "#dc3545";
        return "#91C7B1";
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="car" />

            <div className="container py-4 py-lg-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="h2 fw-semibold mb-1">Mes réservations de voiture</h1>
                        <p className="text-secondary mb-0">{bookings.length} réservation(s)</p>
                    </div>
                    <Link className="btn btn-outline-dark rounded-pill px-4" to="/cars">
                        Réserver une voiture
                    </Link>
                </div>

                {loading && <div className="alert alert-secondary">Chargement...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && bookings.length === 0 && (
                    <div className="text-center py-5">
                        <p className="text-secondary mb-3">Vous n'avez pas encore de réservation.</p>
                        <Link className="btn btn-outline-dark rounded-pill px-4" to="/cars">
                            Voir les voitures
                        </Link>
                    </div>
                )}

                <div className="row g-4">
                    {bookings.map((booking) => (
                        <div className="col-12" key={booking.id}>
                            <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                                <div className="card-body p-4 p-lg-5">
                                    <div className="row g-3 align-items-center">
                                        <div className="col-lg-3">
                                            <p className="text-secondary mb-1">Véhicule</p>
                                            <h2 className="h5 fw-semibold mb-0">
                                                {booking.carBrand} {booking.carModel}
                                            </h2>
                                            <p className="text-secondary small mb-0">{booking.cityName} — {booking.country}</p>
                                        </div>
                                        <div className="col-lg-3">
                                            <p className="text-secondary mb-1">Dates</p>
                                            <p className="fw-medium mb-0">
                                                {booking.startDate} → {booking.endDate}
                                            </p>
                                            <p className="text-secondary small mb-0">{booking.numberOfDays} jour(s)</p>
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="text-secondary mb-1">Total</p>
                                            <p className="h5 fw-semibold mb-0" style={{ color: "#8EA604" }}>
                                                {booking.price} EUR
                                            </p>
                                        </div>
                                        <div className="col-lg-2">
                                            <p className="text-secondary mb-1">Statut</p>
                                            <span
                                                className="badge rounded-pill px-3 py-2"
                                                style={{ backgroundColor: statusColor(booking.status), color: "white" }}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="col-lg-2 text-lg-end">
                                            {booking.status === "PENDING" && (
                                                <button
                                                    className="btn btn-outline-danger rounded-pill px-3"
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
            </div>
        </div>
    );
}