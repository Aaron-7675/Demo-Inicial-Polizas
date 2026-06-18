import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';

const tipoColor = { Documento: 'blue', Condicionante: 'orange', Póliza: 'green', Proyecto: 'blue', Alerta: 'red' };

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard', { headers: { Authorization: `Bearer ${user.token}` } })
      .then(r => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [user.token]);

  if (loading) return <div className="loading">Cargando dashboard...</div>;

  const isExterno = user.perfil === 'externo';

  return (
    <>
      <div className="topbar">
        <span className="topbar-title">
          {isExterno ? `Portal — ${user.empresa}` : 'Dashboard'}
        </span>
        <div className="topbar-right">
          <span style={{ fontSize: 13, color: 'var(--gray-text)' }}>
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          {data?.stats?.vencimientosProximos > 0 && (
            <span className="badge-notif">⚠️ {data.stats.vencimientosProximos} vencimiento</span>
          )}
        </div>
      </div>

      <div className="page-content">
        {isExterno && (
          <div className="info-box" style={{ marginBottom: 24 }}>
            Bienvenido al portal de <strong>{user.nombre}</strong>. Aquí puede consultar el estado de sus expedientes y pólizas en tiempo real.
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">🏗️</div>
            <div>
              <div className="stat-num">{data?.stats?.proyectosActivos ?? 0}</div>
              <div className="stat-label">{isExterno ? 'Mis expedientes' : 'Proyectos activos'}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">📄</div>
            <div>
              <div className="stat-num">{data?.stats?.polizasVigentes ?? 0}</div>
              <div className="stat-label">Pólizas vigentes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>
            <div>
              <div className="stat-num">{data?.stats?.condicionantesPendientes ?? 0}</div>
              <div className="stat-label">Condicionantes pendientes</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">🔔</div>
            <div>
              <div className="stat-num">{data?.stats?.vencimientosProximos ?? 0}</div>
              <div className="stat-label">Vencimientos próximos</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <h3>Actividad reciente</h3>
            </div>
            <div className="activity-list">
              {(data?.actividad || []).length === 0 ? (
                <div className="empty-state"><div className="empty-icon">📭</div>Sin actividad reciente</div>
              ) : (data?.actividad || []).map(a => (
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

          <div className="card">
            <div className="card-header">
              <h3>Acceso rápido</h3>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🏗️', label: isExterno ? 'Ver mis expedientes' : 'Ver todos los proyectos', action: () => navigate('/proyectos') },
                { icon: '⏳', label: 'Condicionantes pendientes', action: () => navigate('/proyectos') },
                { icon: '🔔', label: 'Vencimientos próximos', action: () => navigate('/proyectos') },
              ].map((item, i) => (
                <button key={i} onClick={item.action}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 14px', background: 'var(--gray-bg)',
                    border: '1px solid var(--gray-border)', borderRadius: 8,
                    cursor: 'pointer', fontSize: 14, color: 'var(--blue-dark)',
                    fontWeight: 500, textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-lighter)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--gray-bg)'}
                >
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              {!isExterno && (
                <div style={{ marginTop: 8, padding: '12px 14px', background: 'var(--green-bg)', borderRadius: 8, fontSize: 13, color: 'var(--green)' }}>
                  <strong>Sistema en demo</strong><br />
                  Los módulos Financiero, Listados y Configuración estarán disponibles en fases posteriores del proyecto.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
