import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App.jsx";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error al iniciar sesión");
                return;
            }
            login(data);
            navigate("/");
        } catch {
            setError("No se pudo conectar con el servidor");
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (u) => {
        setUsuario(u);
        setPassword("demo123");
        setError("");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-logo">
                    <img
                        src="logo.png"
                        alt="SSR Iberia"
                        style={{ height: "56px", marginBottom: "12px" }}
                    />
                    <h1>Gestión de Pólizas</h1>
                    <p>Sistema de Seguros de Construcción</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            autoComplete="username"
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder="Introduce tu usuario"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <div className="error-msg">⚠️ {error}</div>}
                    <button
                        className="btn-primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Entrando..." : "Iniciar sesión"}
                    </button>
                </form>

                <div className="demo-hint">
                    <strong>👤 Usuarios de prueba (contraseña: demo123)</strong>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 6,
                            marginTop: 4,
                        }}
                    >
                        {[
                            {
                                u: "admin",
                                label: "Administrador — acceso completo",
                            },
                            { u: "gestor", label: "Gestor interno" },
                            {
                                u: "externo",
                                label: "Empresa externa — solo sus expedientes",
                            },
                        ].map(({ u, label }) => (
                            <div
                                key={u}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>
                                    <code>{u}</code> — {label}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => fillDemo(u)}
                                    style={{
                                        background: "rgba(46,117,182,0.15)",
                                        border: "none",
                                        borderRadius: 4,
                                        padding: "2px 8px",
                                        fontSize: 11,
                                        cursor: "pointer",
                                        color: "var(--blue-dark)",
                                        fontWeight: 600,
                                    }}
                                >
                                    Usar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
