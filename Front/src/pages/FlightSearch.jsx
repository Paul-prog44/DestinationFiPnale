import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getFlight, getFlights } from "../api/flightApi";
import { getCities } from "../api/cityApi";
import Navbar from "../components/Navbar";

export default function FlightSearch() {
    const [flights, setFlights] = useState([])
    const [departureFilter, setDepartureFilter] = useState("");
    const [arrivalFilter, setArrivalFilter] = useState([]);
    const [departureDate, setDepartureDate] = useState([]);
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState("1");
    const [sortOrder, setSortOrder] = useState("duration");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [cities, setCities] = useState([])
    
    const selectedDeparture = searchParams.get("from") ?? "";

    useEffect(() => {
        const loadFlights = async () => {
            try {
                const data = await getFlights();
                const baseFlights = data.flights ?? [];
                
                const flightsWithDetails = await Promise.all(
                    baseFlights.map(async (flight) => {
                        try {
                            console.log(flight)
                            const details = await getFlight(flight.id);
                            const stopovers = details.flight?.stopovers ?? [];
                            const prices = (details.flight?.classes ?? [])
                                .map((c) => c.price)
                                .filter((price) => typeof price === "number");

                            return {
                                ...flight,
                                stopovers,
                                minPrice: prices.length ? Math.min(...prices) : null,
                                maxPrice: prices.length ? Math.max(...prices) : null,
                            };
                        } catch {
                            return { ...flight, stopovers: [], minPrice: null, maxPrice: null };
                        }
                    }),
                );

                setFlights(flightsWithDetails);
            } catch {
                setError("Impossible de charger les vols.");
            } finally {
                setLoading(false);
            }
        };

        const cities = async () => {
            try {
                const data = await getCities()
                console.log(data)
                setCities(data.cities)
            } catch {
                console.log("Une erreur est survenue pour getCities")
            }
        
        }

        
        cities()
        loadFlights();
    }, []);

    useEffect(() => {
        setDepartureFilter(selectedDeparture);
    }, [selectedDeparture]);

    
    const filteredFlights = useMemo(() => {
        const visibleFlights = selectedDeparture
            ? flights.filter((flight) => flight.departureCity.toLowerCase() === selectedDeparture.toLowerCase())
            : flights;

        return [...visibleFlights].sort((left, right) => {
            if (sortOrder === "price") {
                return (left.minPrice ?? Number.MAX_SAFE_INTEGER) - (right.minPrice ?? Number.MAX_SAFE_INTEGER);
            }

            if (sortOrder === "duration") {
                return left.durationMinutes - right.durationMinutes;
            }

            return left.airline.localeCompare(right.airline);
        });
    }, [flights, selectedDeparture, sortOrder]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!departureFilter) {
            setSearchParams({});
            return;
        }

        setSearchParams({ from: departureFilter });
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="flight" />

            <div className="container py-4 py-lg-5">
                <div className="card border-0 shadow-sm rounded-5 mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                    <div className="card-body p-4 p-lg-5">
                        <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
                            <div className="col-lg-3 col-md-6">
                                <label className="form-label fw-medium">Départ de</label>
                                <select className="form-select border-0 shadow-sm" value={departureFilter} onChange={(event) => setDepartureFilter(event.target.value)}>
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <label className="form-label fw-medium">A destination de</label>
                                <select className="form-select border-0 shadow-sm" value={departureFilter} onChange={(event) => setArrivalFilter(event.target.value)}>
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Date aller</label>
                                <input className="form-control border-0 shadow-sm" type="date" value={departureDate} onChange={(event) => setDepartureDate(event.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Date retour</label>
                                <input className="form-control border-0 shadow-sm" type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <label className="form-label fw-medium">Passagers</label>
                                <select className="form-select border-0 shadow-sm" value={passengers} onChange={(event) => setPassengers(event.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4+</option>
                                </select>
                            </div>
                            <div className="col-lg-3 col-md-12 d-grid">
                                <button className="btn btn-light border shadow-sm fw-semibold" type="submit">Rechercher un vol</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                    <div>
                        <h1 className="h2 fw-semibold mb-2">{selectedDeparture ? `Vols au départ de ${selectedDeparture}` : "Sélection de vols"}</h1>
                        <p className="text-secondary mb-0">Trouvez les meilleures options pour votre prochain voyage.</p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-secondary">Trier</label>
                        <select className="form-select" style={{ width: "220px" }} value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                            <option value="duration">Durée la plus courte</option>
                            <option value="price">Prix croissant</option>
                            <option value="airline">Compagnie A-Z</option>
                        </select>
                    </div>
                </div>

                {loading && <div className="alert alert-secondary">Chargement des vols...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                    <div className="row g-4">
                        {filteredFlights.map((flight) => (
                            <div className="col-12" key={flight.id}>
                                <div className="card border-0 shadow-sm overflow-hidden rounded-5 h-100">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-lg-3">
                                            <img className="w-100 h-100" src={flight.imgPath || "https://via.placeholder.com/250x150?text=Avion"} alt={flight.airline} style={{ minHeight: "200px", objectFit: "cover" }} />
                                        </div>
                                        
                                        <div className="col-lg-6">
                                            <div className="card-body p-4 p-lg-5">
                                                <p className="text-secondary mb-2">{flight.airline}</p>
                                                <h2 className="h3 fw-semibold mb-3">
                                                    {flight.departureCity} ➔ {flight.arrivalCity}
                                                </h2>
                                                
                                                <div className="d-flex flex-wrap gap-2 mb-3">
                                                    {(flight.stopovers?.length ? flight.stopovers : ["Vol Direct"]).map((stopover, index) => (
                                                        <span className="badge rounded-pill text-dark border px-3 py-2" key={`${flight.id}-${index}`}>
                                                            {stopover}
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-secondary mb-0">
                                                    Durée du vol : {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-3">
                                            <div className="card-body p-4 p-lg-5 h-100 d-flex flex-column justify-content-center align-items-lg-end text-lg-end border-top border-lg-top-0">
                                                <p className="text-secondary mb-1">Prix dès</p>
                                                <p className="h4 fw-semibold mb-2" style={{ color: "#8EA604" }}>
                                                    {flight.minPrice ? `${flight.minPrice} EUR` : "Sur demande"}
                                                </p>
                                                <p className="small text-secondary mb-4">
                                                    {flight.maxPrice && flight.maxPrice !== flight.minPrice ? `jusqu'à ${flight.maxPrice} EUR` : "Tarif standard"}
                                                </p>
                                                <Link className="btn btn-outline-dark rounded-pill px-4" to={`/flights/${flight.id}`}>
                                                    Réserver
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