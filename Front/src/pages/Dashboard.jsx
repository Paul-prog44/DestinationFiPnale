import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-vh-100" style={{ background: "#fafafa" }}>
            <nav className="navbar px-4 py-3" style={{ backgroundColor: "#91C7B1" }}>
                <Link className="navbar-brand fw-bold text-white text-decoration-none" to="/">DestinationFIPnale</Link>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-white small">Bonjour, <strong>{user?.firstname}</strong></span>
                    <button className="btn btn-sm btn-light fw-semibold" onClick={handleLogout}>
                        Se déconnecter
                    </button>
                </div>
            </nav>

            <div className="container py-5">
                <div className="card border-0 shadow-sm p-4 text-center" style={{ maxWidth: "540px", margin: "0 auto" }}>
                    <h1 className="h3 fw-bold" style={{ color: "#8EA604" }}>
                        Bienvenue, {user?.firstname} !
                    </h1>
                    <p className="text-muted mb-4">Votre espace est pret pour consulter l'accueil et les hotels.</p>
                    <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <Link className="btn btn-dark" to="/hotels">Voir les hotels</Link>
                        <Link className="btn btn-outline-secondary" to="/">Retour a l'accueil</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}