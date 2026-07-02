import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import Topbar from '../components/Topbar.jsx';

const tipoColor = { Documento: 'blue', Condicionante: 'orange', 'Póliza': 'green', Proyecto: 'blue', Alerta: 'red' };

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(r => r.json())
      .then(d => setData(d))
      .finally(() => setLoading(false));
  }, [user.token]);

  if (loading) return <div className="loading">Cargando...</div>;

  const isExterno = user.perfil === 'externo';

  return (
    <>
      <Topbar
        title={isExterno ? `Portal — ${user.empresa}` : 'Inicio'}
        right={
          <>
            <span style={{ fontSize: 13, color: 'var(--gray-text)' }}>
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {data?.stats?.vencimientosProximos > 0 && (
              <span className="badge-notif">⚠️ {data.stats.vencimientosProximos} vencimiento</span>
            )}
          </>
        }
      />

      <div className="page-content">
        {isExterno && (
          <div className="info-box" style={{ marginBottom: 24 }}>
            Bienvenido al portal de <strong>{user.nombre}</strong>. Aquí puede consultar el estado de sus expedientes y pólizas en tiempo real.
          </div>
        )}

        {/* ── STATS ── */}
        <div className="stats-grid">
          <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/proyectos')}>
            <div className="stat-icon blue">🏗️</div>
            <div><div className="stat-num">{data?.stats?.proyectosActivos ?? 0}</div><div className="stat-label">{isExterno ? 'Mis expedientes' : 'Proyectos activos'}</div></div>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/proyectos?estado=Poliza%20emitida')}>
            <div className="stat-icon green">📄</div>
            <div><div className="stat-num">{data?.stats?.polizasVigentes ?? 0}</div><div className="stat-label">Pólizas vigentes</div></div>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/proyectos?conPendientes=true')}>
            <div className="stat-icon orange">⏳</div>
            <div><div className="stat-num">{data?.stats?.condicionantesPendientes ?? 0}</div><div className="stat-label">Condicionantes pendientes</div></div>
          </div>
          <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/proyectos?estado=Vencimiento próximo')}>
            <div className="stat-icon red">🔔</div>
            <div><div className="stat-num">{data?.stats?.vencimientosProximos ?? 0}</div><div className="stat-label">Vencimientos próximos</div></div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* ── ACTIVIDAD ── */}
          <div className="card">
            <div className="card-header"><h3>Actividad reciente</h3></div>
            <div className="activity-list">
              {(data?.actividad || []).length === 0
                ? <div className="empty-state"><div className="empty-icon">📭</div>Sin actividad reciente</div>
                : (data?.actividad || []).map(a => (
                  <div className="activity-item" key={a.id}>
                    <div className="activity-dot" style={{ background: a.tipo === 'Alerta' ? 'var(--red)' : a.tipo === 'Condicionante' ? 'var(--orange)' : 'var(--blue-med)' }} />
                    <div>
                      <div className="activity-desc">{a.descripcion}</div>
                      <div className="activity-meta">
                        <span className={`badge ${tipoColor[a.tipo] || 'gray'}`}>{a.tipo}</span>
                        {' '}{a.proyecto} · {new Date(a.fecha).toLocaleDateString('es-ES')}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* ── ACCESO RÁPIDO ── */}
          <div className="card">
            <div className="card-header"><h3>Acceso rápido</h3></div>
            <div style={{ padding: '8px 0' }}>
              <div onClick={() => navigate('/proyectos')} className="acceso-rapido-section">
                <div className="acceso-rapido-btn">
                  <span>🏗️ {isExterno ? 'Mis expedientes' : 'Todos los proyectos'}</span>
                  <span className="badge blue">{data?.stats?.proyectosActivos ?? 0}</span>
                </div>
              </div>
              <div className="acceso-rapido-section">
                <div className="acceso-rapido-btn" onClick={() => navigate('/proyectos?conPendientes=true')}>
                  <span>⏳ Condicionantes pendientes</span>
                  <span className="badge orange">{data?.conCondicionantes?.length ?? 0} proyectos</span>
                </div>
                {(data?.conCondicionantes || []).slice(0, 3).map(p => (
                  <div key={p.id} className="acceso-rapido-item" onClick={() => navigate(`/proyectos/${p.id}`)}>
                    <span>{p.nombre}</span>
                    <span className="badge orange">{p.pendientes}</span>
                  </div>
                ))}
                {(data?.conCondicionantes?.length ?? 0) > 3 && (
                  <div className="acceso-rapido-more" onClick={() => navigate('/proyectos?conPendientes=true')}>
                    Ver {data.conCondicionantes.length - 3} más →
                  </div>
                )}
              </div>
              <div className="acceso-rapido-section" style={{ borderBottom: 'none' }}>
                <div className="acceso-rapido-btn" onClick={() => navigate('/proyectos?estado=Vencimiento próximo')}>
                  <span>🔔 Vencimientos próximos</span>
                  <span className="badge red">{data?.conVencimientos?.length ?? 0} proyectos</span>
                </div>
                {(data?.conVencimientos || []).map(p => (
                  <div key={p.id} className="acceso-rapido-item" onClick={() => navigate(`/proyectos/${p.id}`)}>
                    <span>{p.nombre}</span>
                    <span className="badge red">{new Date(p.fechaPrevista).toLocaleDateString('es-ES')}</span>
                  </div>
                ))}
                {(data?.conVencimientos || []).length === 0 && (
                  <div style={{ padding: '8px 16px', fontSize: 13, color: 'var(--gray-text)' }}>✅ Sin vencimientos próximos</div>
                )}
              </div>
            </div>
            {!isExterno && (
              <div style={{ margin: '0 16px 16px', padding: '12px 14px', background: 'var(--green-bg)', borderRadius: 8, fontSize: 13, color: 'var(--green)' }}>
                <strong>Sistema en demo</strong> — Módulos Financiero, Listados y Configuración disponibles en fases posteriores.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
