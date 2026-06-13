import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHotel } from "../api/hotelApi";
import Navbar from "../components/Navbar";

const formatDisplayLabel = (value) => {
    const label = String(value ?? "").trim();

    if (!label) {
        return "";
    }

    if (/[A-Z]/.test(label) || label.includes(" ")) {
        return label;
    }

    const normalizedLabel = label.replace(/-/g, " ");

    return normalizedLabel.charAt(0).toUpperCase() + normalizedLabel.slice(1);
};

const renderStars = (stars) => (
    <div className="d-flex align-items-center gap-1" aria-label={`${stars} etoiles`}>
        {Array.from({ length: 5 }, (_, index) => (
            <span
                key={`detail-star-${stars}-${index}`}
                style={{ color: index < stars ? "#D39B2A" : "#D9D2C8", fontSize: "1rem", lineHeight: 1 }}
            >
                ★
            </span>
        ))}
    </div>
);

export default function HotelDetailsPage() {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHotel = async () => {
            try {
                const data = await getHotel(hotelId);
                setHotel(data.hotel ?? null);
            } catch {
                setError("Impossible de charger cet hotel.");
            } finally {
                setLoading(false);
            }
        };

        loadHotel();
    }, [hotelId]);

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="hotel" />

            <div className="container py-4 py-lg-5">
                {loading && <div className="alert alert-secondary">Chargement de l'hotel...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {hotel && (
                    <>
                        <div className="card border-0 shadow-sm rounded-5 overflow-hidden mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                            <div className="card-body p-4 p-lg-5">
                                <div className="row g-4 align-items-center">
                                    <div className="col-xl-4">
                                        <div className="bg-white rounded-4 overflow-hidden shadow-sm">
                                            <img src={hotel.imgPath} alt={hotel.title} className="w-100 d-block" style={{ height: "280px", objectFit: "cover" }} />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <h1 className="h2 fw-semibold mb-3">{hotel.title}</h1>
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            {renderStars(hotel.stars)}
                                            <span className="small text-secondary">{hotel.stars} etoiles</span>
                                        </div>
                                        <p className="mb-2"><strong>Ville :</strong> {hotel.city}</p>
                                        <p className="mb-2"><strong>Adresse :</strong> {hotel.adress}</p>
                                        <p className="mb-0"><strong>Selection :</strong> Hotel disponible a la reservation</p>
                                    </div>
                                    <div className="col-xl-4">
                                        <h2 className="h5 fw-semibold mb-3">Services</h2>
                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            {hotel.services?.map((service) => (
                                                <span className="badge rounded-pill text-dark border px-3 py-2 bg-white" key={service}>
                                                    {formatDisplayLabel(service)}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-secondary mb-0">{hotel.summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                            <div>
                                <h2 className="h3 fw-semibold mb-1">Selection de la chambre</h2>
                                <p className="text-secondary mb-0">{hotel.rooms?.length ?? 0} chambre{hotel.rooms?.length > 1 ? "s" : ""} disponible{hotel.rooms?.length > 1 ? "s" : ""}</p>
                            </div>
                            <Link className="btn btn-outline-dark rounded-pill px-4" to="/hotels">Retour a la liste</Link>
                        </div>

                        <div className="row g-4">
                            {hotel.rooms?.map((room) => (
                                <div className="col-12" key={room.id}>
                                    <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-lg-3">
                                                <img className="w-100 h-100 d-block" src={room.imgPath} alt={room.title} style={{ minHeight: "220px", objectFit: "cover" }} />
                                            </div>
                                            <div className="col-lg-6 d-flex align-items-center">
                                                <div className="card-body p-4 p-lg-5 w-100">
                                                    <h3 className="h4 fw-semibold mb-3">{room.title}</h3>
                                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                                        <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: "#DDE8B0" }}>
                                                            {room.capacity} pers.
                                                        </span>
                                                        <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: "#DDE8B0" }}>
                                                            N° {room.number}
                                                        </span>
                                                        {room.highlights?.map((highlight) => (
                                                            <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: "#F5D0C5" }} key={`${room.id}-${highlight}`}>
                                                                {formatDisplayLabel(highlight)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    <p className="text-secondary mb-0">{room.summary}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="card-body p-4 p-lg-5 h-100 d-flex flex-column justify-content-center align-items-lg-end text-lg-end">
                                                    <p className="text-secondary mb-1">Prix</p>
                                                    <p className="h4 fw-semibold mb-4" style={{ color: "#8EA604" }}>{room.pricePerNight} EUR</p>
                                                    <Link className="btn btn-outline-dark rounded-pill px-4" to={`/hotels/${hotel.id}/rooms/${room.id}/confirm`}>
                                                        Reserver
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}