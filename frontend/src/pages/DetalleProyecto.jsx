import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';

export default function DetalleProyecto() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('info');

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
      <div className="topbar">
        <span className="topbar-title">{proyecto.referencia}</span>
        <div className="topbar-right">
          <span className={`badge ${proyecto.estadoColor}`}>{proyecto.estado}</span>
        </div>
      </div>

      <div className="page-content">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/proyectos')}>
            ← Volver
          </button>
          <div className="page-title">
            <h2>{proyecto.nombre}</h2>
            <p>{proyecto.promotora} · {proyecto.ubicacion}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-body">
            <div style={{ padding: '16px 20px' }}>
              <div className="detail-grid">
                <div className="detail-field">
                  <label>Referencia</label>
                  <span style={{ fontFamily: 'monospace' }}>{proyecto.referencia}</span>
                </div>
                <div className="detail-field">
                  <label>Tipo de seguro</label>
                  <span><span className="badge blue">{proyecto.tipo}</span></span>
                </div>
                <div className="detail-field">
                  <label>Promotora</label>
                  <span>{proyecto.promotora}</span>
                </div>
                <div className="detail-field">
                  <label>Ubicación</label>
                  <span>{proyecto.ubicacion}</span>
                </div>
                <div className="detail-field">
                  <label>Superficie</label>
                  <span>{proyecto.superficie}</span>
                </div>
                <div className="detail-field">
                  <label>Nº viviendas</label>
                  <span>{proyecto.viviendas}</span>
                </div>
                <div className="detail-field">
                  <label>Presupuesto de ejecución</label>
                  <span style={{ fontWeight: 600 }}>{proyecto.presupuesto}</span>
                </div>
                <div className="detail-field">
                  <label>Fecha prevista finalización</label>
                  <span>{new Date(proyecto.fechaPrevista).toLocaleDateString('es-ES')}</span>
                </div>
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
        </div>

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
            {/* PÓLIZAS */}
            {tab === 'polizas' && (
              proyecto.polizas?.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📄</div>
                  No hay pólizas emitidas para este proyecto
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Tipo</th>
                        <th>Compañía</th>
                        <th>Tomador</th>
                        <th>Estado</th>
                        <th>Prima</th>
                        <th>Emisión</th>
                        <th>Vencimiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyecto.polizas?.map(pol => (
                        <tr key={pol.id}>
                          <td className="td-ref">{pol.numero}</td>
                          <td><span className="badge blue">{pol.tipo}</span></td>
                          <td>{pol.compania}</td>
                          <td style={{ fontSize: 13, color: 'var(--gray-text)' }}>{pol.tomador}</td>
                          <td><span className={`badge ${pol.estadoColor}`}>{pol.estado}</span></td>
                          <td style={{ fontWeight: 600 }}>{pol.prima}</td>
                          <td style={{ fontSize: 13 }}>{new Date(pol.fechaEmision).toLocaleDateString('es-ES')}</td>
                          <td style={{ fontSize: 13, color: pol.estadoColor === 'red' ? 'var(--red)' : 'inherit' }}>
                            {new Date(pol.fechaVencimiento).toLocaleDateString('es-ES')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {/* CONDICIONANTES */}
            {tab === 'condicionantes' && (
              proyecto.condicionantes?.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  No hay condicionantes para este proyecto
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Condicionante</th>
                        <th>Estado</th>
                        <th>Fecha límite</th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyecto.condicionantes?.map(c => (
                        <tr key={c.id}>
                          <td>{c.descripcion}</td>
                          <td>
                            <span className={`badge ${c.estado === 'Entregado' ? 'green' : 'orange'}`}>
                              {c.estado === 'Entregado' ? '✓ ' : '⏳ '}{c.estado}
                            </span>
                          </td>
                          <td style={{ fontSize: 13, color: c.estado === 'Pendiente' ? 'var(--orange)' : 'var(--gray-text)' }}>
                            {new Date(c.fechaLimite).toLocaleDateString('es-ES')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            {/* DOCUMENTOS */}
            {tab === 'documentos' && (
              proyecto.documentos?.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📁</div>
                  No hay documentos adjuntos
                </div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Fecha</th>
                        <th>Tamaño</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {proyecto.documentos?.map(doc => (
                        <tr key={doc.id}>
                          <td>
                            <span style={{ marginRight: 8 }}>
                              {doc.tipo === 'PDF' ? '📕' : doc.tipo === 'Excel' ? '📗' : '📄'}
                            </span>
                            {doc.nombre}
                          </td>
                          <td><span className={`badge ${doc.tipo === 'PDF' ? 'red' : doc.tipo === 'Excel' ? 'green' : 'blue'}`}>{doc.tipo}</span></td>
                          <td style={{ fontSize: 13, color: 'var(--gray-text)' }}>{new Date(doc.fecha).toLocaleDateString('es-ES')}</td>
                          <td style={{ fontSize: 13, color: 'var(--gray-text)' }}>{doc.tamano}</td>
                          <td>
                            <button style={{ background: 'none', border: '1px solid var(--gray-border)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12, color: 'var(--blue-med)' }}>
                              ↓ Descargar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
