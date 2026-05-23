import { useNavigate } from "react-router-dom";
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
                <span className="navbar-brand fw-bold text-white">✈️ DestinationFIP</span>
                <div className="d-flex align-items-center gap-3">
                    <span className="text-white small">Bonjour, <strong>{user?.firstname}</strong></span>
                    <button className="btn btn-sm btn-light fw-semibold" onClick={handleLogout}>
                        Se déconnecter
                    </button>
                </div>
            </nav>

            <div className="container py-5">
                <div className="card card-auth p-4 text-center" style={{ maxWidth: "500px", margin: "0 auto" }}>
                    <div style={{ fontSize: "3rem" }}>🌴</div>
                    <h3 className="fw-bold mt-3" style={{ color: "#8EA604" }}>
                        Bienvenue, {user?.firstname} !
                    </h3>
                    <p className="text-muted">Prêt à planifier votre prochain voyage ?</p>
                </div>
            </div>
        </div>
    );
}