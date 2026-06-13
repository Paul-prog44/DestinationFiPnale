import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const sections = [
    { key: "flights", label: "Vol", to: "/flights" },
    { key: "hotel", label: "Hotel", to: "/hotels" },
    { key: "car", label: "Voiture", to: "/cars" },
];

export default function Navbar({ currentSection = "hotel" }) {
    const { isAuthenticated, user, logout } = useAuth();
    const accountLabel = user?.firstname || "Mon espace";
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg py-0" style={{ background: "linear-gradient(90deg, #91C7B1 0%, #9BCFBD 100%)" }}>
            <div className="container py-3">
                <div className="d-flex align-items-center gap-3 order-1">
                    <Link className="navbar-brand d-flex align-items-center gap-3 mb-0 text-decoration-none" to="/">
                        <span
                            className="d-inline-flex align-items-center justify-content-center rounded-4 shadow-sm"
                            style={{ width: "52px", height: "52px", backgroundColor: "#8EA604" }}
                        >
                            <img
                                src="/images/branding/destination-fipnale-logo-white.svg"
                                alt=""
                                aria-hidden="true"
                                style={{ width: "34px", height: "34px", objectFit: "contain" }}
                            />
                        </span>
                        <span className="fw-semibold text-white fs-5">Destination FIPNALE</span>
                    </Link>
                </div>

                <ul className="navbar-nav flex-row mx-lg-auto my-3 my-lg-0 gap-2 gap-lg-3 order-3 order-lg-2">
                    {sections.map((section) => {
                        const isActive = section.key === currentSection;
                        const baseClass = "nav-link px-3 px-lg-4 py-2 rounded-pill";

                        return (
                            <li className="nav-item" key={section.key}>
                                {section.to ? (
                                    <Link
                                        className={`${baseClass} ${isActive ? "bg-white text-dark shadow-sm" : "text-white"}`}
                                        to={section.to}
                                    >
                                        {section.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={`${baseClass} text-white border border-white border-opacity-50`}
                                        style={{ opacity: 0.85 }}
                                    >
                                        {section.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className="d-flex align-items-center gap-2 gap-lg-3 order-2 order-lg-3 ms-lg-auto">
                    {isAuthenticated ? (
                        <>
                            <Link className="btn btn-light btn-sm rounded-pill px-3 fw-semibold" to="/profile">
                                {accountLabel}
                            </Link>
                            <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <div className="d-flex gap-2">
                            <Link className="btn btn-light btn-sm rounded-pill px-3" to="/login">Connexion</Link>
                            <Link className="btn btn-outline-light btn-sm rounded-pill px-3" to="/register">Inscription</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}