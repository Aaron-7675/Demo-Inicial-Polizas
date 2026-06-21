import React, { useEffect, useState } from 'react';
import { useAuth } from '../App.jsx';
import Topbar from '../components/Topbar.jsx';

const EMPTY = { nombre: '', cif: '', contacto: '', email: '', telefono: '', ciudad: '' };

// ── Validación frontend (mismas reglas que backend) ──────────────────────────
function validar(form) {
  const errores = {};
  if (!form.nombre || form.nombre.trim().length < 3)
    errores.nombre = 'Mínimo 3 caracteres';
  if (!form.cif || !/^[A-Z]-?\d{7}[A-Z0-9]$/i.test(form.cif.trim()))
    errores.cif = 'Formato inválido. Ejemplo: B-1234567X';
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errores.email = 'Email no válido';
  if (form.telefono) {
    const soloDigitos = form.telefono.replace(/\D/g, '');
    if (soloDigitos.length !== 9)
      errores.telefono = 'El teléfono debe tener 9 dígitos';
    else if (!/^[6789]/.test(soloDigitos))
      errores.telefono = 'Debe empezar por 6, 7, 8 o 9';
  }
  return errores;
}

function formatTelefono(valor) {
  const digits = valor.replace(/\D/g, '').slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0,3)} ${digits.slice(3)}`;
  return `${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
}

export default function Promotoras() {
  const { user } = useAuth();
  const [promotoras, setPromotoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [errores, setErrores] = useState({});
  const [touched, setTouched] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const headers = { Authorization: `Bearer ${user.token}`, 'Content-Type': 'application/json' };

  const cargar = () => {
    const params = busqueda ? `?busqueda=${encodeURIComponent(busqueda)}` : '';
    fetch(`/api/promotoras${params}`, { headers })
      .then(r => r.json())
      .then(setPromotoras)
      .finally(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, [busqueda]);

  const abrirNueva = () => { setForm(EMPTY); setErrores({}); setTouched({}); setModal({ mode: 'new' }); };
  const abrirEditar = (p) => { setForm({ ...p }); setErrores({}); setTouched({}); setModal({ mode: 'edit', id: p.id }); };
  const cerrarModal = () => { setModal(null); setErrores({}); setTouched({}); };

  const handleChange = (field, value) => {
    const formatted = field === 'telefono' ? formatTelefono(value) : value;
    const newForm = { ...form, [field]: formatted };
    setForm(newForm);
    if (touched[field]) setErrores(validar(newForm));
  };

  const handleBlur = (field) => {
    setTouched(t => ({ ...t, [field]: true }));
    setErrores(validar(form));
  };

  const guardar = async () => {
    // Marcar todos como tocados y validar
    setTouched({ nombre: true, cif: true, email: true, telefono: true });
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    setSaving(true);
    try {
      const url = modal.mode === 'new' ? '/api/promotoras' : `/api/promotoras/${modal.id}`;
      const method = modal.mode === 'new' ? 'POST' : 'PUT';
      const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) {
        if (data.errores) setErrores(data.errores);
        return;
      }
      cerrarModal();
      setBusqueda('');
      cargar();
    } finally { setSaving(false); }
  };

  const eliminar = async (id) => {
    await fetch(`/api/promotoras/${id}`, { method: 'DELETE', headers });
    setConfirmDelete(null);
    cargar();
  };

  return (
    <>
      <Topbar
        title="Promotoras"
        right={
          <button onClick={abrirNueva} style={{ padding: '8px 16px', background: 'var(--blue-dark)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            + Nueva promotora
          </button>
        }
      />

      <div className="page-content">
        <div className="search-bar-row" style={{ marginBottom: 16 }}>
          <input
            className="search-input"
            placeholder="🔍 Buscar por nombre, CIF, ciudad..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <span style={{ fontSize: 13, color: 'var(--gray-text)', marginLeft: 8 }}>
            {promotoras.length} {promotoras.length === 1 ? 'promotora' : 'promotoras'}
          </span>
        </div>

        {loading ? <div className="loading">Cargando...</div> : (
          <>
            {/* Tabla escritorio */}
            <div className="card desktop-only">
              {promotoras.length === 0
                ? <div className="empty-state"><div className="empty-icon">🏢</div>No se encontraron promotoras</div>
                : <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Nombre</th><th>CIF</th><th>Contacto</th>
                          <th>Email</th><th>Teléfono</th><th>Ciudad</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {promotoras.map(p => (
                          <tr key={p.id}>
                            <td className="td-name">{p.nombre}</td>
                            <td className="td-ref">{p.cif}</td>
                            <td style={{ fontSize: 13 }}>{p.contacto || '—'}</td>
                            <td style={{ fontSize: 13 }}>{p.email || '—'}</td>
                            <td style={{ fontSize: 13 }}>{p.telefono || '—'}</td>
                            <td style={{ fontSize: 13 }}>{p.ciudad || '—'}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                              <button onClick={() => abrirEditar(p)} style={btnSt('var(--blue-med)')}>✏️ Editar</button>
                              <button onClick={() => setConfirmDelete(p)} style={{ ...btnSt('var(--red)'), marginLeft: 6 }}>🗑️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              }
            </div>

            {/* Tarjetas móvil */}
            <div className="mobile-only item-cards">
              {promotoras.map(p => (
                <div key={p.id} className="item-card">
                  <div className="item-card-row">
                    <span className="item-card-title">{p.nombre}</span>
                    <span className="td-ref">{p.cif}</span>
                  </div>
                  {p.contacto && <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>👤 {p.contacto}</div>}
                  {p.email    && <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>✉️ {p.email}</div>}
                  {p.telefono && <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>📞 {p.telefono}</div>}
                  {p.ciudad   && <div style={{ fontSize: 13, color: 'var(--gray-text)' }}>📍 {p.ciudad}</div>}
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button onClick={() => abrirEditar(p)} style={btnSt('var(--blue-med)')}>✏️ Editar</button>
                    <button onClick={() => setConfirmDelete(p)} style={btnSt('var(--red)')}>🗑️ Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── MODAL CREAR / EDITAR ── */}
      {modal && (
        <div style={overlayStyle} onClick={cerrarModal}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: 'var(--blue-dark)', fontSize: 17 }}>
                {modal.mode === 'new' ? '➕ Nueva promotora' : '✏️ Editar promotora'}
              </h3>
              <button onClick={cerrarModal} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--gray-text)' }}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label="Nombre *" value={form.nombre} error={touched.nombre && errores.nombre}
                  onChange={v => handleChange('nombre', v)} onBlur={() => handleBlur('nombre')}
                  placeholder="Razón social completa" />
              </div>
              <Field label="CIF *" value={form.cif} error={touched.cif && errores.cif}
                onChange={v => handleChange('cif', v)} onBlur={() => handleBlur('cif')}
                placeholder="B-1234567X" />
              <Field label="Ciudad" value={form.ciudad}
                onChange={v => handleChange('ciudad', v)}
                placeholder="Madrid" />
              <Field label="Persona de contacto" value={form.contacto}
                onChange={v => handleChange('contacto', v)}
                placeholder="Nombre y apellidos" />
              <Field label="Teléfono" value={form.telefono} error={touched.telefono && errores.telefono}
                onChange={v => handleChange('telefono', v)} onBlur={() => handleBlur('telefono')}
                placeholder="91 234 56 78" />
              <div style={{ gridColumn: '1 / -1' }}>
                <Field label="Email" value={form.email} error={touched.email && errores.email}
                  onChange={v => handleChange('email', v)} onBlur={() => handleBlur('email')}
                  placeholder="contacto@empresa.es" type="email" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
              <button onClick={cerrarModal} style={{ padding: '9px 18px', border: '1px solid var(--gray-border)', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14 }}>
                Cancelar
              </button>
              <button onClick={guardar} disabled={saving} style={{ padding: '9px 18px', background: 'var(--blue-dark)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600, opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Guardando...' : modal.mode === 'new' ? 'Crear' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL CONFIRMAR ELIMINAR ── */}
      {confirmDelete && (
        <div style={overlayStyle} onClick={() => setConfirmDelete(null)}>
          <div style={{ ...modalStyle, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: 'var(--blue-dark)', marginBottom: 12 }}>¿Eliminar promotora?</h3>
            <p style={{ fontSize: 14, color: 'var(--gray-text)', marginBottom: 20 }}>
              Se eliminará <strong>{confirmDelete.nombre}</strong>. Esta acción no se puede deshacer.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: '9px 18px', border: '1px solid var(--gray-border)', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 14 }}>
                Cancelar
              </button>
              <button onClick={() => eliminar(confirmDelete.id)} style={{ padding: '9px 18px', background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, value, onChange, onBlur, error, placeholder, type = 'text' }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--gray-text)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '9px 12px', fontSize: 14, fontFamily: 'inherit',
          border: `1px solid ${error ? 'var(--red)' : 'var(--gray-border)'}`,
          borderRadius: 8, outline: 'none',
          background: error ? 'var(--red-bg)' : '#fff',
        }}
        onFocus={e => { if (!error) e.target.style.borderColor = 'var(--blue-med)'; }}
        onBlurCapture={e => { if (!error) e.target.style.borderColor = 'var(--gray-border)'; }}
      />
      {error && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 4 }}>⚠️ {error}</div>}
    </div>
  );
}

const overlayStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: 16 };
const modalStyle = { background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 560, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' };
const btnSt = (color) => ({ padding: '6px 12px', background: 'none', border: `1px solid ${color}`, borderRadius: 6, cursor: 'pointer', fontSize: 12, color });
