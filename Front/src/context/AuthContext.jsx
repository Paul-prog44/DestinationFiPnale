import { useState } from "react";
import { AuthContext } from "./auth-context";


// composant qui fournit l'état d'authentification à tous les composants enfants
export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    // sauvegarde du token de l'utilisateur dans le localstorage et le state
    const setAuth = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    // supprime le token et met le state à null
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, setAuth, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}