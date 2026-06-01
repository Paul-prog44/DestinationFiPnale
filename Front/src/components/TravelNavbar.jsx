import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const sections = [
    { key: "vol", label: "Vol" },
    { key: "hotel", label: "Hotel" },
    { key: "voiture", label: "Voiture" },
];

export default function TravelNavbar({ currentSection = "hotel" }) {
    const { isAuthenticated, user } = useAuth();
    const accountLabel = user?.email || user?.firstname || "Mon espace";

    return (
        <nav className="navbar navbar-expand-lg py-0" style={{ background: "linear-gradient(90deg, #91C7B1 0%, #9BCFBD 100%)" }}>
            <div className="container py-3">
                <div className="d-flex align-items-center gap-3 order-1">
                    <Link className="navbar-brand d-flex align-items-center gap-3 mb-0 text-decoration-none" to="/">
                        <span
                            className="d-inline-flex align-items-center justify-content-center rounded-4 fw-bold text-white"
                            style={{ width: "52px", height: "52px", backgroundColor: "#8EA604", letterSpacing: "0.08em" }}
                        >
                            DF
                        </span>
                        <span className="fw-semibold text-white fs-5">Destination FIPNALE</span>
                    </Link>
                </div>

                <ul className="navbar-nav flex-row mx-lg-auto my-3 my-lg-0 gap-2 gap-lg-3 order-3 order-lg-2">
                    {sections.map((section) => {
                        const isActive = section.key === currentSection;

                        return (
                            <li className="nav-item" key={section.key}>
                                {section.key === "hotel" ? (
                                    <Link
                                        className={`nav-link px-3 px-lg-4 py-2 rounded-pill ${isActive ? "bg-white text-dark shadow-sm" : "text-white"}`}
                                        to="/hotels"
                                    >
                                        {section.label}
                                    </Link>
                                ) : (
                                    <span
                                        className="nav-link px-3 px-lg-4 py-2 rounded-pill text-white border border-white border-opacity-50"
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
                        <Link className="text-decoration-none" to="/dashboard">
                            <div className="d-flex align-items-center gap-2 bg-white bg-opacity-25 rounded-pill px-2 px-lg-3 py-2 shadow-sm">
                                <span
                                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-white text-dark fw-semibold"
                                    style={{ width: "34px", height: "34px" }}
                                >
                                    {accountLabel.charAt(0).toUpperCase()}
                                </span>
                                <span className="text-white small d-none d-md-inline">{accountLabel}</span>
                            </div>
                        </Link>
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