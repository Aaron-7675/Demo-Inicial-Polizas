import Topbar from "./../components/Topbar.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../App.jsx";

export default function Proyectos() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [proyectos, setProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState(
        searchParams.get("estado") || "",
    );
    const [filtroTipo, setFiltroTipo] = useState("");
    const [conPendientes, setConPendientes] = useState(
        searchParams.get("conPendientes") === "true",
    );
    const [filtrosVisibles, setFiltrosVisibles] = useState(
        !!(searchParams.get("estado") || searchParams.get("conPendientes")),
    );

    const isExterno = user.perfil === "externo";
    const hayFiltros = busqueda || filtroEstado || filtroTipo || conPendientes;

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (busqueda) params.set("busqueda", busqueda);
        if (filtroEstado) params.set("estado", filtroEstado);
        if (filtroTipo) params.set("tipo", filtroTipo);
        if (conPendientes) params.set("conPendientes", "true");
        fetch(`/api/proyectos?${params}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        })
            .then((r) => r.json())
            .then(setProyectos)
            .finally(() => setLoading(false));
    }, [busqueda, filtroEstado, filtroTipo, conPendientes]);

    const limpiarFiltros = () => {
        setBusqueda("");
        setFiltroEstado("");
        setFiltroTipo("");
        setConPendientes(false);
    };

    return (
        <>
            <Topbar
                title={isExterno ? "Mis Expedientes" : "Proyectos"}
                right={
                    <span style={{ fontSize: 13, color: "var(--gray-text)" }}>
                        {proyectos.length}{" "}
                        {proyectos.length === 1 ? "proyecto" : "proyectos"}
                    </span>
                }
            />

            <div className="page-content">
                {/* ── BARRA DE BÚSQUEDA ── */}
                <div className="search-bar-row">
                    <input
                        className="search-input"
                        placeholder="🔍  Buscar proyecto, referencia..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <button
                        className={`filter-toggle-btn${filtrosVisibles ? " active" : ""}${hayFiltros ? " has-filters" : ""}`}
                        onClick={() => setFiltrosVisibles((v) => !v)}
                    >
                        ⚙ Filtros {hayFiltros ? "●" : ""}
                    </button>
                    {hayFiltros && (
                        <button className="clear-btn" onClick={limpiarFiltros}>
                            ✕ Limpiar
                        </button>
                    )}
                </div>

                {/* Etiqueta del filtro activo desde el dashboard */}
                {(filtroEstado || conPendientes) && (
                    <div
                        style={{
                            marginBottom: 12,
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
                        <span
                            style={{ fontSize: 13, color: "var(--gray-text)" }}
                        >
                            Mostrando:
                        </span>
                        {conPendientes && (
                            <span className="badge orange">
                                ⏳ Condicionantes pendientes
                            </span>
                        )}
                        {filtroEstado && (
                            <span className="badge red">🔔 {filtroEstado}</span>
                        )}
                    </div>
                )}

                {/* ── FILTROS ── */}
                {filtrosVisibles && (
                    <div className="filters-panel">
                        <select
                            className="filter-select"
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                        >
                            <option value="">Todos los estados</option>
                            <option>En estudio</option>
                            <option>En trámite</option>
                            <option>Poliza emitida</option>
                            <option>Vencimiento próximo</option>
                        </select>
                        <select
                            className="filter-select"
                            value={filtroTipo}
                            onChange={(e) => setFiltroTipo(e.target.value)}
                        >
                            <option value="">Todos los tipos</option>
                            <option value="SDD">SDD</option>
                            <option value="AFCA">AFCA</option>
                            <option value="CAU">CAU</option>
                        </select>
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontSize: 14,
                                cursor: "pointer",
                                padding: "9px 12px",
                                border: "1px solid var(--gray-border)",
                                borderRadius: 8,
                                background: conPendientes
                                    ? "var(--orange-bg)"
                                    : "#fff",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={conPendientes}
                                onChange={(e) =>
                                    setConPendientes(e.target.checked)
                                }
                            />
                            ⏳ Con condicionantes pendientes
                        </label>
                    </div>
                )}

                {loading ? (
                    <div className="loading">Cargando proyectos...</div>
                ) : proyectos.length === 0 ? (
                    <div className="card">
                        <div className="empty-state">
                            <div className="empty-icon">🔍</div>
                            No se encontraron proyectos con los filtros
                            aplicados
                        </div>
                    </div>
                ) : (
                    <>
                        {/* ── VISTA ESCRITORIO: tabla ── */}
                        <div className="card desktop-only">
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Referencia</th>
                                            <th>Proyecto</th>
                                            {!isExterno && <th>Promotora</th>}
                                            <th>Ubicación</th>
                                            <th>Tipo</th>
                                            <th>Estado</th>
                                            <th>Pólizas</th>
                                            <th>Cond. pend.</th>
                                            <th>Fecha prevista</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {proyectos.map((p) => (
                                            <tr
                                                key={p.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/proyectos/${p.id}`,
                                                    )
                                                }
                                            >
                                                <td className="td-ref">
                                                    {p.referencia}
                                                </td>
                                                <td className="td-name">
                                                    {p.nombre}
                                                </td>
                                                {!isExterno && (
                                                    <td
                                                        style={{
                                                            fontSize: 13,
                                                            color: "var(--gray-text)",
                                                        }}
                                                    >
                                                        {p.promotora}
                                                    </td>
                                                )}
                                                <td style={{ fontSize: 13 }}>
                                                    {p.ubicacion}
                                                </td>
                                                <td>
                                                    <span className="badge blue">
                                                        {p.tipo}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        className={`badge ${p.estadoColor}`}
                                                    >
                                                        {p.estado}
                                                    </span>
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {p.numPolizas}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {p.condicionantesPendientes >
                                                    0 ? (
                                                        <span className="badge orange">
                                                            {
                                                                p.condicionantesPendientes
                                                            }
                                                        </span>
                                                    ) : (
                                                        <span
                                                            style={{
                                                                color: "var(--gray-text)",
                                                                fontSize: 13,
                                                            }}
                                                        >
                                                            —
                                                        </span>
                                                    )}
                                                </td>
                                                <td
                                                    style={{
                                                        fontSize: 13,
                                                        color: "var(--gray-text)",
                                                    }}
                                                >
                                                    {new Date(
                                                        p.fechaPrevista,
                                                    ).toLocaleDateString(
                                                        "es-ES",
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ── VISTA MÓVIL: tarjetas ── */}
                        <div className="mobile-only proyecto-cards">
                            {proyectos.map((p) => (
                                <div
                                    key={p.id}
                                    className="proyecto-card"
                                    onClick={() =>
                                        navigate(`/proyectos/${p.id}`)
                                    }
                                >
                                    <div className="proyecto-card-header">
                                        <span className="td-ref">
                                            {p.referencia}
                                        </span>
                                        <span
                                            className={`badge ${p.estadoColor}`}
                                        >
                                            {p.estado}
                                        </span>
                                    </div>
                                    <div className="proyecto-card-name">
                                        {p.nombre}
                                    </div>
                                    {!isExterno && (
                                        <div className="proyecto-card-sub">
                                            {p.promotora}
                                        </div>
                                    )}
                                    <div className="proyecto-card-footer">
                                        <span className="badge blue">
                                            {p.tipo}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 12,
                                                color: "var(--gray-text)",
                                            }}
                                        >
                                            📍 {p.ubicacion}
                                        </span>
                                        {p.condicionantesPendientes > 0 && (
                                            <span className="badge orange">
                                                ⏳ {p.condicionantesPendientes}{" "}
                                                cond.
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
