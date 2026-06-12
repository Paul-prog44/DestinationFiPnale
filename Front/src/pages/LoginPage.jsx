import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await login({ email, password });
            setAuth(data.token, { id: data.id, email: data.email, firstname: data.firstname });
            navigate(location.state?.from || "/dashboard", { replace: true });
        } catch {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center"
             style={{ background: "linear-gradient(135deg, #F5D0C5 0%, #91C7B1 100%)" }}>
            <div className="card border-0 shadow-sm p-4" style={{ width: "100%", maxWidth: "420px" }}>

                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: "#8EA604" }}>Bon retour !</h2>
                    <p className="text-muted small">Connectez-vous à votre compte</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 small">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="votre@email.com"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-semibold text-muted">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn w-100 py-2 fw-semibold text-white" style={{ backgroundColor: "#8EA604" }}>
                        Se connecter
                    </button>
                </form>

                <p className="text-center mt-3 small text-muted">
                    Pas encore de compte ?{" "}
                    <Link to="/register" state={{ from: location.state?.from }} className="fw-semibold text-decoration-none" style={{ color: "#8EA604" }}>S'inscrire</Link>
                </p>
            </div>
        </div>
    );
}