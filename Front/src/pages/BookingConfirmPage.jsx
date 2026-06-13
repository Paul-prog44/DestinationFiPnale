import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { bookRoom, getHotel } from "../api/hotelApi";
import Navbar from "../components/Navbar";

export default function BookingConfirmPage() {
    const { hotelId, roomId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [form, setForm] = useState({ startDate: "", endDate: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadHotel = async () => {
            try {
                const data = await getHotel(hotelId);
                setHotel(data.hotel ?? null);
            } catch {
                setError("Impossible de charger la reservation.");
            } finally {
                setLoading(false);
            }
        };

        loadHotel();
    }, [hotelId]);

    const room = useMemo(() => {
        if (!hotel?.rooms) {
            return null;
        }

        return hotel.rooms.find((currentRoom) => currentRoom.id === Number(roomId)) ?? null;
    }, [hotel, roomId]);

    const nights = useMemo(() => {
        if (!form.startDate || !form.endDate) {
            return 0;
        }

        const start = new Date(form.startDate);
        const end = new Date(form.endDate);
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        return Number.isFinite(diff) && diff > 0 ? diff : 0;
    }, [form.endDate, form.startDate]);

    const totalPrice = room ? room.pricePerNight * Math.max(nights, 1) : 0;

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess(null);
        setSubmitting(true);

        try {
            const booking = await bookRoom({
                roomId: Number(roomId),
                startDate: form.startDate,
                endDate: form.endDate,
            });

            setSuccess(booking);
        } catch (requestError) {
            setError(requestError?.response?.data?.error || "Impossible de confirmer la reservation.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="hotel" />

            <div className="container py-4 py-lg-5">
                {loading && <div className="alert alert-secondary">Chargement de la reservation...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {hotel && room && (
                    <>
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                            <div>
                                <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: "#DEDEDE", color: "#212529" }}>Confirmation</span>
                                <h1 className="h2 fw-semibold mb-2">Confirmation de votre reservation</h1>
                                <p className="text-secondary mb-0">{hotel.city} — {hotel.adress}</p>
                            </div>
                            <Link className="btn btn-outline-dark rounded-pill px-4" to={`/hotels/${hotelId}`}>Modifier</Link>
                        </div>

                        <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                            <div className="row g-0">
                                <div className="col-lg-6 border-end">
                                    <div className="p-4 p-lg-5 h-100">
                                        <h2 className="h4 fw-semibold mb-4">Recapitulatif</h2>
                                        <div className="d-flex align-items-center gap-3 mb-4">
                                            <img src={room.imgPath} alt={room.title} className="rounded-4 d-block" style={{ width: "120px", height: "120px", objectFit: "cover" }} />
                                            <div>
                                                <p className="text-secondary mb-1">{hotel.title}</p>
                                                <h3 className="h5 fw-semibold mb-1">{room.title}</h3>
                                                <p className="mb-0">{hotel.city}</p>
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-4">
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Lieu</p>
                                                <p className="mb-0 fw-medium">{hotel.city}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Chambre</p>
                                                <p className="mb-0 fw-medium">{room.title}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Adresse</p>
                                                <p className="mb-0 fw-medium">{hotel.adress}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Capacite</p>
                                                <p className="mb-0 fw-medium">{room.capacity}</p>
                                            </div>
                                            <div className="col-6">
                                                <p className="text-secondary mb-1">Numero</p>
                                                <p className="mb-0 fw-medium">{room.number}</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-top">
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-secondary">Prix / nuit</span>
                                                <span className="fw-medium">{room.pricePerNight} EUR</span>
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                <span className="text-secondary">Nombre de nuits</span>
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
                                            <h2 className="h4 fw-semibold mb-4">Votre reservation</h2>
                                            <p className="text-secondary mb-4">Renseignez vos dates pour confirmer la reservation de cette chambre.</p>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label">Date d'arrivee</label>
                                                        <input type="date" name="startDate" className="form-control" value={form.startDate} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label">Date de depart</label>
                                                        <input type="date" name="endDate" className="form-control" value={form.endDate} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="rounded-4 p-3 border bg-light">
                                                            <p className="fw-semibold mb-2">Infos chambre</p>
                                                            <div className="d-flex flex-wrap gap-2">
                                                                {room.highlights?.map((highlight) => (
                                                                    <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: "#F5D0C5" }} key={`${room.id}-${highlight}`}>
                                                                        {highlight}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn w-100 mt-4 fw-semibold text-white" style={{ backgroundColor: "#8EA604" }} disabled={submitting}>
                                                    {submitting ? "Confirmation..." : "Confirmer et reserver"}
                                                </button>
                                            </form>
                                        </div>

                                        {success && (
                                            <div className="alert alert-success mt-4 mb-0">
                                                <p className="fw-semibold mb-2">
                                                    Réservation confirmée ! Numéro : <strong>#{success.id}</strong>
                                                </p>
                                                <div className="d-flex gap-2 flex-wrap">
                                                    <Link
                                                        to="/profile"
                                                        className="btn btn-sm btn-success rounded-pill px-3"
                                                    >
                                                        Voir mes réservations
                                                    </Link>
                                                    <Link
                                                        to="/hotels"
                                                        className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                                                    >
                                                        Retour aux hôtels
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