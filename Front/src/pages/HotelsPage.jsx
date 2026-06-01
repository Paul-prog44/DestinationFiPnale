import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getHotel, getHotels } from "../api/hotelApi";
import TravelNavbar from "../components/TravelNavbar";

export default function HotelsPage() {
    const [hotels, setHotels] = useState([]);
    const [cityFilter, setCityFilter] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [guests, setGuests] = useState("2");
    const [sortOrder, setSortOrder] = useState("title");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") ?? "";

    useEffect(() => {
        const loadHotels = async () => {
            try {
                const data = await getHotels();
                const baseHotels = data.hotels ?? [];
                const hotelsWithDetails = await Promise.all(
                    baseHotels.map(async (hotel) => {
                        try {
                            const details = await getHotel(hotel.id);
                            const services = details.hotel?.services ?? [];
                            const prices = (details.hotel?.rooms ?? [])
                                .map((room) => room.pricePerNight)
                                .filter((price) => typeof price === "number");

                            return {
                                ...hotel,
                                services,
                                minPrice: prices.length ? Math.min(...prices) : null,
                                maxPrice: prices.length ? Math.max(...prices) : null,
                            };
                        } catch {
                            return { ...hotel, services: [], minPrice: null, maxPrice: null };
                        }
                    }),
                );

                setHotels(hotelsWithDetails);
            } catch {
                setError("Impossible de charger les hotels.");
            } finally {
                setLoading(false);
            }
        };

        loadHotels();
    }, []);

    useEffect(() => {
        setCityFilter(selectedCity);
    }, [selectedCity]);

    const cities = [...new Set(hotels.map((hotel) => hotel.city))].sort((left, right) => left.localeCompare(right));
    const filteredHotels = useMemo(() => {
        const visibleHotels = selectedCity
            ? hotels.filter((hotel) => hotel.city.toLowerCase() === selectedCity.toLowerCase())
            : hotels;

        return [...visibleHotels].sort((left, right) => {
            if (sortOrder === "stars") {
                return right.stars - left.stars;
            }

            if (sortOrder === "price") {
                return (left.minPrice ?? Number.MAX_SAFE_INTEGER) - (right.minPrice ?? Number.MAX_SAFE_INTEGER);
            }

            return left.title.localeCompare(right.title);
        });
    }, [hotels, selectedCity, sortOrder]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!cityFilter) {
            setSearchParams({});
            return;
        }

        setSearchParams({ city: cityFilter });
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <TravelNavbar currentSection="hotel" />

            <div className="container py-4 py-lg-5">
                <div className="card border-0 shadow-sm rounded-5 mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                    <div className="card-body p-4 p-lg-5">
                        <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
                            <div className="col-lg-3 col-md-6">
                                <label className="form-label fw-medium">Lieu</label>
                                <select className="form-select border-0 shadow-sm" value={cityFilter} onChange={(event) => setCityFilter(event.target.value)}>
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Date d'arrivee</label>
                                <input className="form-control border-0 shadow-sm" type="date" value={arrivalDate} onChange={(event) => setArrivalDate(event.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Date de depart</label>
                                <input className="form-control border-0 shadow-sm" type="date" value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Nombre de personne</label>
                                <select className="form-select border-0 shadow-sm" value={guests} onChange={(event) => setGuests(event.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4+</option>
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-12 d-grid">
                                <button className="btn btn-light border shadow-sm fw-semibold" type="submit">Recherche</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                    <div>
                        <h1 className="h2 fw-semibold mb-2">{selectedCity ? `${selectedCity} et ses environs` : "Selection d'hotels"}</h1>
                        <p className="text-secondary mb-0">Des cartes horizontales plus proches des maquettes, tout en gardant le parcours actuel.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-secondary">Trier</label>
                        <select className="form-select" style={{ width: "220px" }} value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                            <option value="title">Nom A-Z</option>
                            <option value="stars">Etoiles decroissantes</option>
                            <option value="price">Prix croissant</option>
                        </select>
                    </div>
                </div>

                {loading && <div className="alert alert-secondary">Chargement des hotels...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                    <div className="row g-4">
                        {filteredHotels.map((hotel) => (
                            <div className="col-12" key={hotel.id}>
                                <div className="card border-0 shadow-sm overflow-hidden rounded-5 h-100">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-lg-3">
                                            <img className="w-100 h-100" src={hotel.imgPath} alt={hotel.title} style={{ minHeight: "250px", objectFit: "cover" }} />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card-body p-4 p-lg-5">
                                                <p className="text-secondary mb-2">{hotel.city}</p>
                                                <h2 className="h3 fw-semibold mb-3">{hotel.title}</h2>
                                                <div className="d-flex flex-wrap gap-2 mb-3">
                                                    {(hotel.services?.slice(0, 3).length ? hotel.services.slice(0, 3) : ["Petit dej", "Wifi", "Centre ville"]).map((service) => (
                                                        <span className="badge rounded-pill text-dark border px-3 py-2" key={`${hotel.id}-${service}`}>
                                                            {service}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-secondary mb-0">{hotel.summary}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="card-body p-4 p-lg-5 h-100 d-flex flex-column justify-content-center align-items-lg-end text-lg-end border-top border-lg-top-0">
                                                <p className="text-secondary mb-1">Prix</p>
                                                <p className="h4 fw-semibold mb-2" style={{ color: "#8EA604" }}>
                                                    {hotel.minPrice ? `${hotel.minPrice} EUR` : "Sur demande"}
                                                </p>
                                                <p className="small text-secondary mb-4">
                                                    {hotel.maxPrice && hotel.maxPrice !== hotel.minPrice ? `jusqu'a ${hotel.maxPrice} EUR` : `${hotel.stars} etoiles`}
                                                </p>
                                                <Link className="btn btn-outline-dark rounded-pill px-4" to={`/hotels/${hotel.id}`}>
                                                    Configurer
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}