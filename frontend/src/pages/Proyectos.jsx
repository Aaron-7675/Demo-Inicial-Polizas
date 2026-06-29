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
  const [busqueda, setBusqueda] = useState(searchParams.get("busqueda") || "");
  const [filtroEstado, setFiltroEstado] = useState(searchParams.get("estado") || "");
  const [filtroTipo, setFiltroTipo] = useState(searchParams.get("tipo") || "");
  const [conPendientes, setConPendientes] = useState(searchParams.get("conPendientes") === "true");
  const [filtroAño, setFiltroAño] = useState(searchParams.get("año") || "");
  const [filtroComercial, setFiltroComercial] = useState(searchParams.get("comercial") || "");
  const [filtroPromotora, setFiltroPromotora] = useState(searchParams.get("promotora") || "");
  const [filtrosVisibles, setFiltrosVisibles] = useState(
    !!(searchParams.get("estado") || searchParams.get("conPendientes") || searchParams.get("año") || searchParams.get("comercial") || searchParams.get("promotora"))
  );

  const isExterno = user.perfil === "externo";
  const hayFiltros = busqueda || filtroEstado || filtroTipo || conPendientes || filtroAño || filtroComercial || filtroPromotora;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (busqueda) params.set("busqueda", busqueda);
    if (filtroEstado) params.set("estado", filtroEstado);
    if (filtroTipo) params.set("tipo", filtroTipo);
    if (conPendientes) params.set("conPendientes", "true");
    if (filtroAño) params.set("año", filtroAño);
    if (filtroComercial) params.set("comercial", filtroComercial);
    if (filtroPromotora) params.set("promotora", filtroPromotora);
    fetch(`/api/proyectos?${params}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((r) => r.json())
      .then(setProyectos)
      .finally(() => setLoading(false));
  }, [busqueda, filtroEstado, filtroTipo, conPendientes, filtroAño, filtroComercial, filtroPromotora]);

  const limpiarFiltros = () => {
    setBusqueda(""); setFiltroEstado(""); setFiltroTipo("");
    setConPendientes(false); setFiltroAño(""); setFiltroComercial("");
  };

  // Etiquetas visibles de filtros activos
  const etiquetas = [
    filtroEstado && { label: filtroEstado, onRemove: () => setFiltroEstado(""), color: "orange" },
    conPendientes && { label: "⏳ Condicionantes pendientes", onRemove: () => setConPendientes(false), color: "orange" },
    filtroAño && { label: `📅 Año ${filtroAño}`, onRemove: () => setFiltroAño(""), color: "blue" },
    filtroComercial && { label: `👤 Comercial: ${filtroComercial}`, onRemove: () => setFiltroComercial(""), color: "blue" },
    filtroPromotora && { label: `🏢 ${filtroPromotora}`, onRemove: () => setFiltroPromotora(""), color: "blue" },
    filtroTipo && { label: filtroTipo, onRemove: () => setFiltroTipo(""), color: "blue" },
  ].filter(Boolean);

  return (
    <>
      <Topbar
        title={isExterno ? "Mis Expedientes" : "Proyectos"}
        right={
          <span style={{ fontSize: 13, color: "var(--gray-text)" }}>
            {proyectos.length} {proyectos.length === 1 ? "proyecto" : "proyectos"}
          </span>
        }
      />

      <div className="page-content">
        {/* Barra búsqueda */}
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
          {hayFiltros && <button className="clear-btn" onClick={limpiarFiltros}>✕ Limpiar</button>}
        </div>

        {/* Etiquetas de filtros activos */}
        {etiquetas.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "var(--gray-text)", alignSelf: "center" }}>Filtrando por:</span>
            {etiquetas.map((e, i) => (
              <span key={i} className={`badge ${e.color}`} style={{ cursor: "pointer", padding: "4px 10px" }} onClick={e.onRemove}>
                {e.label} ✕
              </span>
            ))}
          </div>
        )}

        {/* Panel filtros */}
        {filtrosVisibles && (
          <div className="filters-panel">
            <select className="filter-select" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              <option value="En estudio">En estudio</option>
              <option value="En trámite">En trámite</option>
              <option value="Poliza emitida">Póliza emitida</option>
              <option value="Vencimiento próximo">Vencimiento próximo</option>
            </select>
            <select className="filter-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="">Todos los tipos</option>
              <option value="SDD">SDD</option>
              <option value="AFCA">AFCA</option>
              <option value="CAU">CAU</option>
            </select>
            <select className="filter-select" value={filtroAño} onChange={(e) => setFiltroAño(e.target.value)}>
              <option value="">Todos los años</option>
              {[2026,2025,2024,2023,2022,2021,2020,2019,2018].map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", padding: "9px 12px", border: "1px solid var(--gray-border)", borderRadius: 8, background: conPendientes ? "var(--orange-bg)" : "#fff" }}>
              <input type="checkbox" checked={conPendientes} onChange={(e) => setConPendientes(e.target.checked)} />
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
              No se encontraron proyectos con los filtros aplicados
            </div>
          </div>
        ) : (
          <>
            {/* Tabla escritorio */}
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
                      <tr key={p.id} onClick={() => navigate(`/proyectos/${p.id}`)}>
                        <td className="td-ref">{p.referencia}</td>
                        <td className="td-name">{p.nombre}</td>
                        {!isExterno && <td style={{ fontSize: 13, color: "var(--gray-text)" }}>{p.promotora}</td>}
                        <td style={{ fontSize: 13 }}>{p.ubicacion}</td>
                        <td><span className="badge blue">{p.tipo}</span></td>
                        <td><span className={`badge ${p.estadoColor}`}>{p.estado}</span></td>
                        <td style={{ textAlign: "center" }}>{p.numPolizas}</td>
                        <td style={{ textAlign: "center" }}>
                          {p.condicionantesPendientes > 0
                            ? <span className="badge orange">{p.condicionantesPendientes}</span>
                            : <span style={{ color: "var(--gray-text)", fontSize: 13 }}>—</span>}
                        </td>
                        <td style={{ fontSize: 13, color: "var(--gray-text)" }}>
                          {new Date(p.fechaPrevista).toLocaleDateString("es-ES")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tarjetas móvil */}
            <div className="mobile-only proyecto-cards">
              {proyectos.map((p) => (
                <div key={p.id} className="proyecto-card" onClick={() => navigate(`/proyectos/${p.id}`)}>
                  <div className="proyecto-card-header">
                    <span className="td-ref">{p.referencia}</span>
                    <span className={`badge ${p.estadoColor}`}>{p.estado}</span>
                  </div>
                  <div className="proyecto-card-name">{p.nombre}</div>
                  {!isExterno && <div className="proyecto-card-sub">{p.promotora}</div>}
                  <div className="proyecto-card-footer">
                    <span className="badge blue">{p.tipo}</span>
                    <span style={{ fontSize: 12, color: "var(--gray-text)" }}>📍 {p.ubicacion}</span>
                    {p.condicionantesPendientes > 0 && (
                      <span className="badge orange">⏳ {p.condicionantesPendientes} cond.</span>
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
