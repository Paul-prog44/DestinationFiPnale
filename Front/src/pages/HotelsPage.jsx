import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getHotels } from "../api/hotelApi";
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
                key={`hotel-star-${stars}-${index}`}
                style={{ color: index < stars ? "#D39B2A" : "#D9D2C8", fontSize: "0.95rem", lineHeight: 1 }}
            >
                ★
            </span>
        ))}
    </div>
);

export default function HotelsPage() {
    const [hotels, setHotels] = useState([]);
    const [cityFilter, setCityFilter] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [breakfastOnly, setBreakfastOnly] = useState(false);
    const [sortOrder, setSortOrder] = useState("title");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") ?? "";
    const selectedBreakfast = searchParams.get("breakfast") === "true";

    useEffect(() => {
        const loadHotels = async () => {
            try {
                const data = await getHotels();
                setHotels(data.hotels ?? []);
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
        setBreakfastOnly(selectedBreakfast);
    }, [selectedBreakfast, selectedCity]);

    const cities = [...new Set(hotels.map((hotel) => hotel.city))].sort((left, right) => left.localeCompare(right));
    const filteredHotels = useMemo(() => {
        const visibleHotels = hotels.filter((hotel) => {
            const matchesCity = !selectedCity || hotel.city.toLowerCase() === selectedCity.toLowerCase();
            const matchesBreakfast = !breakfastOnly || hotel.services?.some((service) => service.toLowerCase().includes("petit dejeuner"));

            return matchesCity && matchesBreakfast;
        });

        return [...visibleHotels].sort((left, right) => {
            if (sortOrder === "stars") {
                return right.stars - left.stars;
            }

            if (sortOrder === "price") {
                return (left.minPrice ?? Number.MAX_SAFE_INTEGER) - (right.minPrice ?? Number.MAX_SAFE_INTEGER);
            }

            return left.title.localeCompare(right.title);
        });
    }, [breakfastOnly, hotels, selectedCity, sortOrder]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const nextParams = {};

        if (cityFilter) {
            nextParams.city = cityFilter;
        }

        if (breakfastOnly) {
            nextParams.breakfast = "true";
        }

        if (Object.keys(nextParams).length === 0) {
            setSearchParams({});
            return;
        }

        setSearchParams(nextParams);
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="hotel" />

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
                            <div className="col-lg-3 col-md-6">
                                <label className="form-label fw-medium">Options</label>
                                <div className="bg-white border-0 shadow-sm rounded-3 d-flex align-items-center px-3" style={{ height: "38px" }}>
                                    <div className="form-check form-switch mb-0">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            role="switch"
                                            id="hotel-breakfast-filter"
                                            checked={breakfastOnly}
                                            onChange={(event) => setBreakfastOnly(event.target.checked)}
                                            style={{ "--bs-form-check-input-checked-bg-color": "#8EA604", "--bs-form-check-input-checked-border-color": "#8EA604" }}
                                        />
                                        <label className="form-check-label fw-medium" htmlFor="hotel-breakfast-filter">Petit dejeuner</label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-12 d-grid">
                                <button className="btn btn-light border shadow-sm fw-semibold" type="submit">Recherche</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                    <div>
                        <h1 className="h2 fw-semibold mb-2">{selectedCity ? `${selectedCity} et ses environs` : "Selection d'hotels"}</h1>
                        <p className="text-secondary mb-0">{filteredHotels.length} hotel{filteredHotels.length > 1 ? "s" : ""} disponible{filteredHotels.length > 1 ? "s" : ""}</p>
                        {breakfastOnly && <p className="text-secondary mb-0 mt-2">Filtre actif : petit-déjeuner uniquement.</p>}
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
                {!loading && !error && filteredHotels.length === 0 && <div className="alert alert-secondary">Aucun hotel ne correspond aux filtres actuels.</div>}

                {!loading && !error && (
                    <div className="row g-4">
                        {filteredHotels.map((hotel) => (
                            <div className="col-12" key={hotel.id}>
                                <div className="card border-0 shadow-sm overflow-hidden rounded-5 h-100">
                                    <div className="row g-0">
                                        <div className="col-lg-3">
                                            <img className="w-100 h-100 d-block" src={hotel.imgPath} alt={hotel.title} style={{ minHeight: "250px", objectFit: "cover" }} />
                                        </div>
                                        <div className="col-lg-6 d-flex align-items-center">
                                            <div className="card-body p-4 p-lg-5 w-100">
                                                <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                                                    <span className="badge rounded-pill px-3 py-2 text-dark" style={{ backgroundColor: "#F5D0C5" }}>
                                                        {hotel.city}
                                                    </span>
                                                    <div className="d-flex align-items-center gap-2">
                                                        {renderStars(hotel.stars)}
                                                        <span className="small text-secondary">{hotel.stars} etoiles</span>
                                                    </div>
                                                </div>
                                                <h2 className="h3 fw-semibold mb-3">{hotel.title}</h2>
                                                <div className="d-flex flex-wrap gap-2 mb-3">
                                                    {hotel.services?.slice(0, 3).map((service) => (
                                                        <span className="badge rounded-pill text-dark border px-3 py-2" key={`${hotel.id}-${service}`}>
                                                            {formatDisplayLabel(service)}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-secondary mb-0">{hotel.summary}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="card-body p-4 p-lg-5 h-100 d-flex flex-column justify-content-center align-items-lg-end text-lg-end">
                                                <p className="text-secondary mb-1">Prix par nuit</p>
                                                <p className="h4 fw-semibold mb-2" style={{ color: "#8EA604" }}>
                                                    {hotel.minPrice ? `${hotel.minPrice} EUR` : "Sur demande"}
                                                </p>
                                                <p className="small text-secondary mb-4">
                                                    {hotel.maxPrice && hotel.maxPrice !== hotel.minPrice ? `jusqu'a ${hotel.maxPrice} EUR` : "Tarif unique"}
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