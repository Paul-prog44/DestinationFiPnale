import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { register } from "../api/authApi";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstname: "", lastname: "", email: "", password: "", dateOfBirth: "",
    });
    const [error, setError] = useState("");
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await register(form);
            setAuth(data.token, { email: data.email, firstname: data.firstname });
            navigate(location.state?.from || "/dashboard", { replace: true });
        } catch {
            setError("Erreur lors de l'inscription. Email peut-être déjà utilisé.");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center py-4"
             style={{ background: "linear-gradient(135deg, #F5D0C5 0%, #91C7B1 100%)" }}>
            <div className="card border-0 shadow-sm p-4" style={{ width: "100%", maxWidth: "480px" }}>

                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: "#8EA604" }}>Créer un compte</h2>
                    <p className="text-muted small">Rejoignez-nous et partez à l'aventure</p>
                </div>

                {error && (
                    <div className="alert alert-danger py-2 small">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row g-3 mb-3">
                        <div className="col-6">
                            <label className="form-label small fw-semibold text-muted">Prénom</label>
                            <input name="firstname" className="form-control"
                                   value={form.firstname} onChange={handleChange} placeholder="Kenza" required />
                        </div>
                        <div className="col-6">
                            <label className="form-label small fw-semibold text-muted">Nom</label>
                            <input name="lastname" className="form-control"
                                   value={form.lastname} onChange={handleChange} placeholder="Dupont" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">Email</label>
                        <input name="email" type="email" className="form-control"
                               value={form.email} onChange={handleChange} placeholder="votre@email.com" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label small fw-semibold text-muted">Mot de passe</label>
                        <input name="password" type="password" className="form-control"
                               value={form.password} onChange={handleChange} placeholder="••••••••" required />
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-semibold text-muted">Date de naissance</label>
                        <input name="dateOfBirth" type="date" className="form-control"
                               value={form.dateOfBirth} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn w-100 py-2 fw-semibold text-white" style={{ backgroundColor: "#8EA604" }}>
                        Créer mon compte
                    </button>
                </form>

                <p className="text-center mt-3 small text-muted">
                    Déjà un compte ?{" "}
                    <Link to="/login" state={{ from: location.state?.from }} className="fw-semibold text-decoration-none" style={{ color: "#8EA604" }}>Se connecter</Link>
                </p>
            </div>
        </div>
    );
}