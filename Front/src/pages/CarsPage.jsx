import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCars, getCities } from "../api/carApi";
import Navbar from "../components/Navbar";

export default function CarsPage() {
    const [cars, setCars] = useState([]);
    const [cities, setCities] = useState([]);
    const [cityFilter, setCityFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("brand");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCity = searchParams.get("city") ?? "";

    useEffect(() => {
        const load = async () => {
            try {
                const [carsData, citiesData] = await Promise.all([getCars(), getCities()]);
                setCars(carsData);
                setCities(citiesData);
            } catch {
                setError("Impossible de charger les voitures.");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        setCityFilter(selectedCity);
    }, [selectedCity]);

    const filteredCars = useMemo(() => {
        const visible = selectedCity
            ? cars.filter((car) => car.city?.name?.toLowerCase() === selectedCity.toLowerCase())
            : cars;

        return [...visible].sort((a, b) => {
            if (sortOrder === "price") return a.pricePerDay - b.pricePerDay;
            if (sortOrder === "price_desc") return b.pricePerDay - a.pricePerDay;
            return a.brand.localeCompare(b.brand);
        });
    }, [cars, selectedCity, sortOrder]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cityFilter) { setSearchParams({}); return; }
        setSearchParams({ city: cityFilter });
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="car" />

            <div className="container py-4 py-lg-5">
                {/* Barre de recherche */}
                <div className="card border-0 shadow-sm rounded-5 mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                    <div className="card-body p-4 p-lg-5">
                        <form className="row g-3 align-items-end" onSubmit={handleSubmit}>
                            <div className="col-lg-4 col-md-6">
                                <label className="form-label fw-medium">Ville</label>
                                <select
                                    className="form-select border-0 shadow-sm"
                                    value={cityFilter}
                                    onChange={(e) => setCityFilter(e.target.value)}
                                >
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.name}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <label className="form-label fw-medium">Trier par</label>
                                <select
                                    className="form-select border-0 shadow-sm"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="brand">Marque A-Z</option>
                                    <option value="price">Prix croissant</option>
                                    <option value="price_desc">Prix décroissant</option>
                                </select>
                            </div>
                            <div className="col-lg-4 col-md-12 d-grid">
                                <button className="btn btn-light border shadow-sm fw-semibold" type="submit">
                                    Rechercher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="h2 fw-semibold mb-1">
                            {selectedCity ? `Voitures à ${selectedCity}` : "Toutes nos voitures"}
                        </h1>
                        <p className="text-secondary mb-0">{filteredCars.length} véhicule(s) disponible(s)</p>
                    </div>
                </div>

                {loading && <div className="alert alert-secondary">Chargement des voitures...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {!loading && !error && (
                    <div className="row g-4">
                        {filteredCars.map((car) => (
                            <div className="col-12" key={car.id}>
                                <div className="card border-0 shadow-sm overflow-hidden rounded-5 h-100">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-lg-3">
                                            <img
                                                className="w-100 h-100"
                                                src={car.imgPath}
                                                alt={`${car.brand} ${car.model}`}
                                                style={{ minHeight: "220px", objectFit: "cover" }}
                                            />
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card-body p-4 p-lg-5">
                                                <p className="text-secondary mb-2">{car.city?.name} — {car.city?.country}</p>
                                                <h2 className="h3 fw-semibold mb-3">{car.brand} {car.model}</h2>
                                                <div className="d-flex flex-wrap gap-2">
                                                    <span className="badge rounded-pill border text-dark px-3 py-2">{car.brand}</span>
                                                    <span className="badge rounded-pill border text-dark px-3 py-2">Location</span>
                                                    <span className="badge rounded-pill border text-dark px-3 py-2">Disponible</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-center align-items-lg-end text-lg-end border-top border-lg-top-0">
                                                <p className="text-secondary mb-1">À partir de</p>
                                                <p className="h4 fw-semibold mb-1" style={{ color: "#8EA604" }}>
                                                    {car.pricePerDay} EUR
                                                </p>
                                                <p className="small text-secondary mb-4">par jour</p>
                                                <Link
                                                    className="btn btn-outline-dark rounded-pill px-4"
                                                    to={`/cars/${car.id}`}
                                                >
                                                    Voir le véhicule
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