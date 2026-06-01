import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHotel } from "../api/hotelApi";
import TravelNavbar from "../components/TravelNavbar";

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
            <TravelNavbar currentSection="hotel" />

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
                                            <img src={hotel.imgPath} alt={hotel.title} className="w-100" style={{ height: "280px", objectFit: "cover" }} />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <h1 className="h2 fw-semibold mb-3">{hotel.title}</h1>
                                        <p className="mb-2"><strong>Ville :</strong> {hotel.city}</p>
                                        <p className="mb-2"><strong>Adresse :</strong> {hotel.adress}</p>
                                        <p className="mb-0"><strong>Classement :</strong> {hotel.stars} etoiles</p>
                                    </div>
                                    <div className="col-xl-4">
                                        <h2 className="h5 fw-semibold mb-3">Services</h2>
                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            {hotel.services?.map((service) => (
                                                <span className="badge rounded-pill text-dark border px-3 py-2 bg-white" key={service}>
                                                    {service}
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
                                <p className="text-secondary mb-0">Des cartes horizontales plus proches de la maquette, avec le meme parcours de reservation.</p>
                            </div>
                            <Link className="btn btn-outline-dark rounded-pill px-4" to="/hotels">Retour a la liste</Link>
                        </div>

                        <div className="row g-4">
                            {hotel.rooms?.map((room) => (
                                <div className="col-12" key={room.id}>
                                    <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
                                        <div className="row g-0 align-items-center">
                                            <div className="col-lg-3">
                                                <img className="w-100 h-100" src={room.imgPath} alt={room.title} style={{ minHeight: "220px", objectFit: "cover" }} />
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="card-body p-4 p-lg-5">
                                                    <h3 className="h4 fw-semibold mb-3">{room.title}</h3>
                                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                                        <span className="badge rounded-pill border text-dark px-3 py-2">{room.capacity} pers.</span>
                                                        <span className="badge rounded-pill border text-dark px-3 py-2">Chambre {room.number}</span>
                                                        <span className="badge rounded-pill border text-dark px-3 py-2">Reservation simple</span>
                                                    </div>
                                                    <p className="text-secondary mb-0">{room.summary}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-center align-items-lg-end text-lg-end border-top border-lg-top-0">
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