import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getHotels } from "../api/hotelApi";
import Navbar from "../components/Navbar";

export default function HomePage() {
    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [travellers, setTravellers] = useState("2");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadHotels = async () => {
            try {
                const data = await getHotels();
                setHotels(data.hotels ?? []);
            } catch {
                setError("Impossible de charger les hotels pour le moment.");
            }
        };

        loadHotels();
    }, []);

    const cities = [...new Set(hotels.map((hotel) => hotel.city))].sort((left, right) => left.localeCompare(right));
    const featuredHotels = hotels.slice(0, 3);
    const heroImage = hotels[2]?.imgPath || "/images/hotels/871745815.jpg";

    const handleSubmit = (event) => {
        event.preventDefault();

        if (city) {
            navigate(`/hotels?city=${encodeURIComponent(city)}`);
            return;
        }

        navigate("/hotels");
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="hotel" />

            <section className="py-4 py-lg-5">
                <div className="container">
                    <div
                        className="rounded-5 overflow-hidden shadow-lg position-relative"
                        style={{
                            minHeight: "520px",
                            backgroundImage: `linear-gradient(rgba(18, 32, 36, 0.22), rgba(18, 32, 36, 0.48)), url(${heroImage})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    >
                        <div className="position-absolute top-0 start-0 end-0 h-100 d-flex flex-column justify-content-between p-4 p-lg-5">
                            <div className="col-lg-7 text-white">
                                <span className="badge rounded-pill bg-white text-dark px-3 py-2 mb-3">Accueil hotel</span>
                                <h1 className="display-5 fw-semibold mb-3">Un hotel pour une nuit ou pour toute la vie</h1>
                                <p className="fs-5 mb-0 text-white text-opacity-75">
                                    Recherche d'hotel simple.
                                </p>
                            </div>

                            <div className="row justify-content-center mt-4 mt-lg-5">
                                <div className="col-xl-10">
                                    <div className="rounded-5 shadow-lg" style={{ backgroundColor: "rgba(245, 208, 197, 0.94)" }}>
                                        <div className="p-4 p-lg-4">
                                            {error && <div className="alert alert-warning py-2 mb-3">{error}</div>}
                                            <form onSubmit={handleSubmit}>
                                                <div className="row g-3 align-items-end">
                                                    <div className="col-lg-3 col-md-6">
                                                        <label className="form-label fw-medium mb-2">Lieu</label>
                                                        <select className="form-select rounded-3 border-0 shadow-sm" value={city} onChange={(event) => setCity(event.target.value)}>
                                                            <option value="">Toutes les villes</option>
                                                            {cities.map((cityOption) => (
                                                                <option key={cityOption} value={cityOption}>{cityOption}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-3 col-md-6">
                                                        <label className="form-label fw-medium mb-2">Date d'arrivee</label>
                                                        <input
                                                            type="date"
                                                            className="form-control rounded-3 border-0 shadow-sm"
                                                            value={checkIn}
                                                            onChange={(event) => setCheckIn(event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-3 col-md-6">
                                                        <label className="form-label fw-medium mb-2">Date de depart</label>
                                                        <input
                                                            type="date"
                                                            className="form-control rounded-3 border-0 shadow-sm"
                                                            value={checkOut}
                                                            onChange={(event) => setCheckOut(event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-1 col-md-6">
                                                        <label className="form-label fw-medium mb-2">Pers.</label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            className="form-control rounded-3 border-0 shadow-sm text-center"
                                                            value={travellers}
                                                            onChange={(event) => setTravellers(event.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-lg-2 col-md-12">
                                                        <button
                                                            type="submit"
                                                            className="btn w-100 rounded-3 fw-semibold text-white"
                                                            style={{ backgroundColor: "#8EA604", borderColor: "#8EA604" }}
                                                        >
                                                            Recherche
                                                        </button>
                                                    </div>
                                                    <div className="col-lg-12 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 pt-2">
                                                        <div className="form-check mb-0">
                                                            <input className="form-check-input" type="checkbox" id="surprise-hotel" />
                                                            <label className="form-check-label" htmlFor="surprise-hotel">Petit dej souhaite</label>
                                                        </div>
                                                        <div className="d-flex gap-2 flex-wrap">
                                                            <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.68)" }}>Espace vol reserve</span>
                                                            <span className="badge rounded-pill text-dark px-3 py-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.68)" }}>Espace voiture reserve</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-5">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="fw-semibold mb-2" style={{ color: "#91C7B1" }}>Offres speciales</h2>
                    </div>

                    <div className="row justify-content-center g-4">
                        {featuredHotels.map((hotel) => (
                            <div className="col-sm-6 col-lg-4 col-xl-3" key={hotel.id}>
                                <div className="card h-100 border-0 overflow-hidden rounded-5 shadow-sm bg-white">
                                    <img className="w-100" src={hotel.imgPath} alt={hotel.title} style={{ height: "220px", objectFit: "cover" }} />
                                    <div className="card-body px-4 py-3" style={{ backgroundColor: "#F5D0C5" }}>
                                        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                                            <div>
                                                <p className="fw-semibold mb-1" style={{ color: "#91C7B1" }}>{hotel.city}</p>
                                                <h3 className="h6 fw-semibold mb-0">{hotel.title}</h3>
                                            </div>
                                            <span className="small text-nowrap">{hotel.stars} etoiles</span>
                                        </div>
                                        <p className="small text-secondary mb-3">{hotel.summary}</p>
                                        <Link className="btn btn-sm btn-outline-dark rounded-pill px-3" to={`/hotels/${hotel.id}`}>
                                            Voir l'hotel
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        
        </div>
    );
}