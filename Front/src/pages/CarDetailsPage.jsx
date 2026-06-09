import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCar } from "../api/carApi";
import Navbar from "../components/Navbar";

export default function CarDetailsPage() {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#F7F5F0" }}>
            <Navbar currentSection="car" />

            <div className="container py-4 py-lg-5">
                {loading && <div className="alert alert-secondary">Chargement du véhicule...</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                {car && (
                    <>
                        <div className="card border-0 shadow-sm rounded-5 overflow-hidden mb-5" style={{ backgroundColor: "#DEDEDE" }}>
                            <div className="card-body p-4 p-lg-5">
                                <div className="row g-4 align-items-center">
                                    <div className="col-xl-4">
                                        <div className="bg-white rounded-4 overflow-hidden shadow-sm">
                                            <img
                                                src={car.imgPath}
                                                alt={`${car.brand} ${car.model}`}
                                                className="w-100"
                                                style={{ height: "280px", objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-4">
                                        <h1 className="h2 fw-semibold mb-3">{car.brand} {car.model}</h1>
                                        <p className="mb-2"><strong>Ville :</strong> {car.city?.name}</p>
                                        <p className="mb-2"><strong>Pays :</strong> {car.city?.country}</p>
                                        <p className="mb-0">
                                            <strong>Prix :</strong>{" "}
                                            <span style={{ color: "#8EA604" }} className="fw-semibold">
                                                {car.pricePerDay} EUR / jour
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-xl-4">
                                        <h2 className="h5 fw-semibold mb-3">Caractéristiques</h2>
                                        <div className="d-flex flex-wrap gap-2">
                                            <span className="badge rounded-pill border text-dark px-3 py-2 bg-white">{car.brand}</span>
                                            <span className="badge rounded-pill border text-dark px-3 py-2 bg-white">{car.model}</span>
                                            <span className="badge rounded-pill border text-dark px-3 py-2 bg-white">Location courte durée</span>
                                            <span className="badge rounded-pill border text-dark px-3 py-2 bg-white">Assurance incluse</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 className="h3 fw-semibold mb-1">Réserver ce véhicule</h2>
                                <p className="text-secondary mb-0">Choisissez vos dates et confirmez votre réservation.</p>
                            </div>
                            <Link className="btn btn-outline-dark rounded-pill px-4" to="/cars">
                                Retour à la liste
                            </Link>
                        </div>

                        <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
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
                                        <h3 className="h4 fw-semibold mb-3">{car.brand} {car.model}</h3>
                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            <span className="badge rounded-pill border text-dark px-3 py-2">{car.city?.name}</span>
                                            <span className="badge rounded-pill border text-dark px-3 py-2">Disponible</span>
                                        </div>
                                        <p className="text-secondary mb-0">
                                            Profitez de ce véhicule pour explorer {car.city?.name} et ses environs.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="card-body p-4 p-lg-5 d-flex flex-column justify-content-center align-items-lg-end text-lg-end border-top border-lg-top-0">
                                        <p className="text-secondary mb-1">Prix</p>
                                        <p className="h4 fw-semibold mb-4" style={{ color: "#8EA604" }}>
                                            {car.pricePerDay} EUR / jour
                                        </p>
                                        <Link
                                            className="btn btn-outline-dark rounded-pill px-4"
                                            to={`/cars/${car.id}/confirm`}
                                        >
                                            Réserver
                                        </Link>
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