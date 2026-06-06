import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bookCar, getCar } from "../api/carApi";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function CarBookingConfirmPage() {
    const { carId } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [form, setForm] = useState({ startDate: "", endDate: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Redirige vers login si pas connecté
    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getCar(carId);
                setCar(data);
            } catch {
                setError("Impossible de charger ce véhicule.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [carId]);

    const nights = useMemo(() => {
        if (!form.startDate || !form.endDate) return 0;
        const diff = Math.ceil(
            (new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24)
        );
        return diff > 0 ? diff : 0;
    }, [form.startDate, form.endDate]);

    const totalPrice = car ? car.pricePerDay * Math.max(nights, 1) : 0;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const booking = await bookCar({
                carId: Number(carId),
                startDate: form.startDate,
                endDate: form.endDate,
            });
            setSuccess(booking);
        } catch (err) {
            setError(err?.response?.data?.message || "Impossible de confirmer la réservation.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="car" />

            <div className="container py-4 py-lg-5">
                {loading && <div className="alert alert-secondary">Chargement...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {car && (
                    <>
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                            <div>
                                <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: "#DEDEDE", color: "#212529" }}>
                                    Confirmation
                                </span>
                                <h1 className="h2 fw-semibold mb-2">Confirmation de votre réservation</h1>
                                <p className="text-secondary mb-0">Choisissez vos dates et confirmez.</p>
                            </div>
                            <Link className="btn btn-outline-dark rounded-pill px-4" to={`/cars/${carId}`}>
                                Modifier
                            </Link>
                        </div>

                        <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                            <div className="row g-0">
                                <div className="col-lg-6 border-end">
                                    <div className="p-4 p-lg-5 h-100">
                                        <h2 className="h4 fw-semibold mb-4">Récapitulatif</h2>
                                        <div className="d-flex align-items-center gap-3 mb-4">
                                            <img
                                                src={car.imgPath}
                                                alt={`${car.brand} ${car.model}`}
                                                className="rounded-4"
                                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                            />
                                            <div>
                                                <p className="text-secondary mb-1">{car.city?.name} — {car.city?.country}</p>
                                                <h3 className="h5 fw-semibold mb-0">{car.brand} {car.model}</h3>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-4">
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Ville</p>
                                                <p className="mb-0 fw-medium">{car.city?.name}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Pays</p>
                                                <p className="mb-0 fw-medium">{car.city?.country}</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-top">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-secondary">Prix / jour</span>
                                                <span className="fw-medium">{car.pricePerDay} EUR</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-secondary">Nombre de jours</span>
                                                <span className="fw-medium">{nights || "-"}</span>
                                            </div>
                                            <div className="d-flex justify-content-between fs-5 fw-semibold pt-2">
                                                <span>Total</span>
                                                <span style={{ color: "#8EA604" }}>{totalPrice} EUR</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="p-4 p-lg-5 h-100 d-flex flex-column justify-content-between">
                                        <div>
                                            <h2 className="h4 fw-semibold mb-4">Vos dates</h2>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Date de début</label>
                                                        <input
                                                            type="date"
                                                            name="startDate"
                                                            className="form-control"
                                                            value={form.startDate}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Date de fin</label>
                                                        <input
                                                            type="date"
                                                            name="endDate"
                                                            className="form-control"
                                                            value={form.endDate}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="rounded-4 p-3 border bg-light">
                                                            <p className="text-secondary mb-2">Statut</p>
                                                            <p className="mb-0">
                                                                Une fois confirmée, la réservation sera créée avec le statut <strong>PENDING</strong>.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn w-100 mt-4 fw-semibold text-white"
                                                    style={{ backgroundColor: "#8EA604" }}
                                                    disabled={submitting}
                                                >
                                                    {submitting ? "Confirmation..." : "Confirmer et réserver"}
                                                </button>
                                            </form>
                                        </div>

                                        {success && (
                                            <div className="alert alert-success mt-4 mb-0">
                                                Réservation confirmée ! Numéro : <strong>{success.id}</strong>
                                                <div className="mt-2">
                                                    <Link to="/cars/bookings" className="btn btn-sm btn-outline-success rounded-pill">
                                                        Voir mes réservations
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}