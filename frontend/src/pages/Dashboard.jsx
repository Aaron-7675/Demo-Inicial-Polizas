import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App.jsx';
import Topbar from '../components/Topbar.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const tipoColor = { Documento: 'blue', Condicionante: 'orange', 'Póliza': 'green', Proyecto: 'blue', Alerta: 'red' };
const fmt = (n) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const h = { Authorization: `Bearer ${user.token}` };
    Promise.all([
      fetch('/api/dashboard', { headers: h }).then(r => r.json()),
      fetch('/api/estadisticas', { headers: h }).then(r => r.json()),
    ]).then(([d, s]) => { setData(d); setStats(s); }).finally(() => setLoading(false));
  }, [user.token]);

  if (loading) return <div className="loading">Cargando dashboard...</div>;

  const isExterno = user.perfil === 'externo';
  const COLORS = ['#22863a', '#D97706', '#2E75B6', '#DC2626'];

  return (
    <>
      <Topbar
        title={isExterno ? `Portal — ${user.empresa}` : 'Dashboard'}
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

        {/* ── PRIMA TOTAL ── */}
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div className="stat-card" style={{ gridColumn: '1 / 2' }}>
              <div className="stat-icon green">💶</div>
              <div><div className="stat-num" style={{ fontSize: 20 }}>{fmt(stats.primaTotal)}</div><div className="stat-label">Prima total acumulada</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">📁</div>
              <div><div className="stat-num">{stats.totalProyectos}</div><div className="stat-label">Total proyectos históricos</div></div>
            </div>
            <div className="stat-card">
              <div className="stat-icon orange">📊</div>
              <div><div className="stat-num">{stats.porRamo?.[0]?.ramo || 'SDD'}</div><div className="stat-label">Ramo principal</div></div>
            </div>
          </div>
        )}

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

        {/* ── ESTADÍSTICAS ── */}
        {stats && !isExterno && (
          <>
            {/* Gráfico barras por mes */}
            <div className="card" style={{ marginTop: 8 }}>
              <div className="card-header"><h3>📈 Proyectos por mes — {new Date().getFullYear()}</h3></div>
              <div style={{ padding: '16px 8px' }}>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={stats.porMes} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-border)" />
                    <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value, name) => [value, name === 'proyectos' ? 'Este año' : 'Año anterior']} />
                    <Legend formatter={(v) => v === 'proyectos' ? `${new Date().getFullYear()}` : `${new Date().getFullYear()-1}`} />
                    <Bar dataKey="proyectos" fill="var(--blue-med)" radius={[4,4,0,0]} />
                    <Bar dataKey="proyectosAnt" fill="var(--blue-light)" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>

              {/* Donut por estado */}
              <div className="card">
                <div className="card-header"><h3>🏗️ Proyectos por estado</h3></div>
                <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={stats.porEstado} dataKey="count" cx="50%" cy="50%" outerRadius={70} innerRadius={40}
                        onClick={(d) => navigate(`/proyectos?estado=${encodeURIComponent(d.estado)}`)}
                        style={{ cursor: 'pointer' }}>
                        {stats.porEstado.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v, n, p) => [v, p.payload.estado]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ flex: 1 }}>
                    {stats.porEstado.map((e, i) => (
                      <div key={i} onClick={() => navigate(`/proyectos?estado=${encodeURIComponent(e.estado)}`)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13, cursor: 'pointer', padding: '4px 6px', borderRadius: 6 }}
                        onMouseEnter={ev => ev.currentTarget.style.background = 'var(--gray-bg)'}
                        onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                          <span>{e.estado}</span>
                        </div>
                        <span style={{ fontWeight: 600 }}>{e.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top comerciales */}
              <div className="card">
                <div className="card-header"><h3>👤 Top comerciales</h3></div>
                <div style={{ padding: '8px 0' }}>
                  {stats.topComerciales.map((c, i) => (
                    <div key={i}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: '1px solid var(--gray-border)', fontSize: 13 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue-dark)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{i+1}</span>
                        <span style={{ fontWeight: 500 }}>{c.comercial}</span>
                        <span className="badge blue">{c.proyectos} proy.</span>
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--blue-dark)' }}>{fmt(c.prima)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top promotoras */}
            <div className="card" style={{ marginTop: 16 }}>
              <div className="card-header"><h3>🏢 Promotoras con más prima generada</h3></div>
              <div style={{ padding: '8px 0' }}>
                {(stats.topPromotoras || []).map((p, i) => {
                  const maxPrima = stats.topPromotoras[0]?.prima || 1;
                  return (
                    <div key={i}
                      onClick={() => navigate(`/proyectos?promotora=${encodeURIComponent(p.promotora)}`)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--gray-border)', cursor: 'pointer' }}
                      onMouseEnter={ev => ev.currentTarget.style.background = 'var(--gray-bg)'}
                      onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue-dark)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i+1}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.promotora}</div>
                        <div style={{ width: '100%', background: 'var(--gray-bg)', borderRadius: 4, height: 6 }}>
                          <div style={{ width: `${(p.prima / maxPrima) * 100}%`, background: 'var(--blue-med)', borderRadius: 4, height: 6 }} />
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue-dark)' }}>{fmt(p.prima)}</div>
                        <div style={{ fontSize: 11, color: 'var(--gray-text)' }}>{p.proyectos} proy.</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Histórico por año */}
            <div className="card" style={{ marginTop: 16 }}>
              <div className="card-header"><h3>📅 Histórico por año</h3></div>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Proyectos</th>
                      <th>Pólizas</th>
                      <th>Prima acumulada</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...stats.porAño].reverse().map(a => (
                      <tr key={a.año} onClick={() => navigate(`/proyectos?año=${a.año}`)} style={{ cursor: 'pointer' }}>
                        <td style={{ fontWeight: 600, color: 'var(--blue-med)' }}>{a.año}</td>
                        <td>{a.proyectos}</td>
                        <td>{a.polizas}</td>
                        <td style={{ fontWeight: 600, color: 'var(--blue-dark)' }}>{fmt(a.prima)}</td>
                        <td>
                          <div style={{ width: 100, background: 'var(--gray-bg)', borderRadius: 4, height: 6 }}>
                            <div style={{ width: `${Math.min(100, (a.prima / Math.max(...stats.porAño.map(x=>x.prima))) * 100)}%`, background: 'var(--blue-med)', borderRadius: 4, height: 6 }} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
