import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../App.jsx";

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const initials =
        user?.nombre
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";
    const isExterno = user?.perfil === "externo";

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img
                        src="/logo.png"
                        alt="SSR Iberia"
                        style={{
                            height: "38px",
                            marginBottom: "6px",
                            filter: "brightness(1) invert(0)",
                        }}
                    />
                    <span>Sistema de Seguros — Demo</span>
                </div>

                <nav className="sidebar-nav">
                    {!isExterno && (
                        <div className="sidebar-section">Principal</div>
                    )}
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <span className="nav-icon">📊</span> Dashboard
                    </NavLink>
                    <NavLink
                        to="/proyectos"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <span className="nav-icon">🏗️</span>
                        {isExterno ? "Mis Expedientes" : "Proyectos"}
                    </NavLink>

                    {!isExterno && (
                        <>
                            <div className="sidebar-section">Gestión</div>
                            <NavLink
                                to="#"
                                style={{ opacity: 0.4, pointerEvents: "none" }}
                            >
                                <span className="nav-icon">📄</span> Pólizas
                            </NavLink>
                            <NavLink
                                to="#"
                                style={{ opacity: 0.4, pointerEvents: "none" }}
                            >
                                <span className="nav-icon">💰</span> Financiero
                            </NavLink>
                            <NavLink
                                to="#"
                                style={{ opacity: 0.4, pointerEvents: "none" }}
                            >
                                <span className="nav-icon">📋</span> Listados
                            </NavLink>
                            <div className="sidebar-section">Sistema</div>
                            <NavLink
                                to="#"
                                style={{ opacity: 0.4, pointerEvents: "none" }}
                            >
                                <span className="nav-icon">⚙️</span>{" "}
                                Configuración
                            </NavLink>
                            <NavLink
                                to="#"
                                style={{ opacity: 0.4, pointerEvents: "none" }}
                            >
                                <span className="nav-icon">👥</span> Usuarios
                            </NavLink>
                        </>
                    )}
                </nav>

                <div className="sidebar-footer">
                    <div className="avatar">{initials}</div>
                    <div className="user-info">
                        <div className="user-name">{user?.nombre}</div>
                        <div className="user-role">
                            {user?.perfil === "admin"
                                ? "Administrador"
                                : user?.perfil === "gestor"
                                  ? "Gestor"
                                  : "Acceso externo"}
                        </div>
                    </div>
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        title="Cerrar sesión"
                    >
                        ⏏
                    </button>
                </div>
            </aside>

            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}
