import Topbar from '../components/Topbar.jsx';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';

export default function DetalleProyecto() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('polizas');

  useEffect(() => {
    fetch(`/api/proyectos/${id}`, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(r => r.json())
      .then(data => { setProyecto(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, user.token]);

  if (loading) return <div className="loading">Cargando proyecto...</div>;
  if (!proyecto || proyecto.error) return (
    <div className="page-content">
      <div className="empty-state">
        <div className="empty-icon">❌</div>
        Proyecto no encontrado o sin acceso
        <br />
        <button onClick={() => navigate('/proyectos')} style={{ marginTop: 16, padding: '8px 16px', cursor: 'pointer', borderRadius: 8, border: '1px solid var(--gray-border)', background: '#fff' }}>
          Volver a la lista
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Topbar
        title={proyecto.referencia}
        right={<span className={`badge ${proyecto.estadoColor}`}>{proyecto.estado}</span>}
      />

      <div className="page-content">

        {/* ── CABECERA ── */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/proyectos')}>← Volver</button>
          <div className="page-title">
            <h2>{proyecto.nombre}</h2>
            <p>{proyecto.promotora} · {proyecto.ubicacion}</p>
          </div>
        </div>

        {/* ── DATOS DEL PROYECTO ── */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header"><h3>Información del proyecto</h3></div>
          <div style={{ padding: '16px 20px' }}>
            <div className="detail-grid">
              <div className="detail-field"><label>Referencia</label><span style={{ fontFamily: 'monospace' }}>{proyecto.referencia}</span></div>
              <div className="detail-field"><label>Tipo de seguro</label><span><span className="badge blue">{proyecto.tipo}</span></span></div>
              <div className="detail-field"><label>Promotora</label><span>{proyecto.promotora}</span></div>
              <div className="detail-field"><label>Ubicación</label><span>{proyecto.ubicacion}</span></div>
              <div className="detail-field"><label>Superficie</label><span>{proyecto.superficie}</span></div>
              <div className="detail-field"><label>Nº viviendas</label><span>{proyecto.viviendas}</span></div>
              <div className="detail-field"><label>Presupuesto de ejecución</label><span style={{ fontWeight: 600 }}>{proyecto.presupuesto}</span></div>
              <div className="detail-field"><label>Fecha prevista finalización</label><span>{new Date(proyecto.fechaPrevista).toLocaleDateString('es-ES')}</span></div>
            </div>
            {proyecto.descripcion && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--gray-border)' }}>
                <div className="detail-field">
                  <label>Descripción</label>
                  <span style={{ display: 'block', marginTop: 4 }}>{proyecto.descripcion}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="card">
          <div className="tabs">
            {[
              { key: 'polizas',        label: `📄 Pólizas (${proyecto.polizas?.length ?? 0})` },
              { key: 'condicionantes', label: `⏳ Condicionantes (${proyecto.condicionantes?.length ?? 0})` },
              { key: 'documentos',     label: `📁 Documentos (${proyecto.documentos?.length ?? 0})` },
            ].map(t => (
              <button key={t.key} className={`tab-btn${tab === t.key ? ' active' : ''}`} onClick={() => setTab(t.key)}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="tab-content">

            {/* ── PÓLIZAS ── */}
            {tab === 'polizas' && (
              proyecto.polizas?.length === 0
                ? <div className="empty-state"><div className="empty-icon">📄</div>No hay pólizas emitidas</div>
                : <div className="item-cards">
                    {proyecto.polizas?.map(pol => (
                      <div key={pol.id} className="item-card">
                        <div className="item-card-row">
                          <span className="td-ref">{pol.numero}</span>
                          <span className={`badge ${pol.estadoColor}`}>{pol.estado}</span>
                        </div>
                        <div className="item-card-title">{pol.tipo}</div>
                        <div className="item-card-meta">
                          <span>🏢 {pol.compania}</span>
                          <span style={{ fontWeight: 700, color: 'var(--blue-dark)', fontSize: 15 }}>💶 {pol.prima}</span>
                        </div>
                        <div className="item-card-dates">
                          <span>Emisión: {new Date(pol.fechaEmision).toLocaleDateString('es-ES')}</span>
                          <span style={{ color: pol.estadoColor === 'red' ? 'var(--red)' : 'var(--gray-text)' }}>
                            Vence: {new Date(pol.fechaVencimiento).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
            )}

            {/* ── CONDICIONANTES ── */}
            {tab === 'condicionantes' && (
              proyecto.condicionantes?.length === 0
                ? <div className="empty-state"><div className="empty-icon">✅</div>No hay condicionantes</div>
                : <div className="item-cards">
                    {proyecto.condicionantes?.map(c => (
                      <div key={c.id} className={`item-card cond-card ${c.estado === 'Pendiente' ? 'cond-pending' : 'cond-done'}`}>
                        <div className="item-card-row">
                          <span className={`badge ${c.estado === 'Entregado' ? 'green' : 'orange'}`}>
                            {c.estado === 'Entregado' ? '✓ Entregado' : '⏳ Pendiente'}
                          </span>
                          <span style={{ fontSize: 12, color: c.estado === 'Pendiente' ? 'var(--orange)' : 'var(--gray-text)' }}>
                            📅 {new Date(c.fechaLimite).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="item-card-title" style={{ fontSize: 14, fontWeight: 500 }}>{c.descripcion}</div>
                      </div>
                    ))}
                  </div>
            )}

            {/* ── DOCUMENTOS ── */}
            {tab === 'documentos' && (
              proyecto.documentos?.length === 0
                ? <div className="empty-state"><div className="empty-icon">📁</div>No hay documentos adjuntos</div>
                : <div className="item-cards">
                    {proyecto.documentos?.map(doc => (
                      <div key={doc.id} className="item-card doc-card">
                        <div className="item-card-row">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 24 }}>
                              {doc.tipo === 'PDF' ? '📕' : doc.tipo === 'Excel' ? '📗' : '📄'}
                            </span>
                            <span className="item-card-title" style={{ fontSize: 14, margin: 0 }}>{doc.nombre}</span>
                          </div>
                          <span className={`badge ${doc.tipo === 'PDF' ? 'red' : doc.tipo === 'Excel' ? 'green' : 'blue'}`}>{doc.tipo}</span>
                        </div>
                        <div className="item-card-meta">
                          <span style={{ color: 'var(--gray-text)', fontSize: 12 }}>
                            {new Date(doc.fecha).toLocaleDateString('es-ES')} · {doc.tamano}
                          </span>
                          <button style={{ background: 'none', border: '1px solid var(--gray-border)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer', fontSize: 13, color: 'var(--blue-med)', fontWeight: 500 }}>
                            ↓ Descargar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
