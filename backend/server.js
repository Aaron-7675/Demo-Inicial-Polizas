const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Servir frontend en producción
const frontendDist = path.join(__dirname, 'public');
app.use(express.static(frontendDist));

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const usuarios = [
  { id: 1, usuario: 'admin',    password: 'demo123', nombre: 'Ana García',      perfil: 'admin',    empresa: null },
  { id: 2, usuario: 'gestor',   password: 'demo123', nombre: 'Carlos Martínez', perfil: 'gestor',   empresa: null },
  { id: 3, usuario: 'externo',  password: 'demo123', nombre: 'Promotora Iberia S.L.', perfil: 'externo', empresa: 'Promotora Iberia S.L.' },
];

const proyectos = [
  {
    id: 1,
    referencia: 'PROY-2024-001',
    nombre: 'Promoción Residencial Las Acacias',
    promotora: 'Promotora Iberia S.L.',
    ubicacion: 'Valladolid',
    estado: 'En trámite',
    estadoColor: 'orange',
    tipo: 'SDD',
    fechaInicio: '2024-03-15',
    fechaPrevista: '2026-09-30',
    superficie: '4.500 m²',
    viviendas: 48,
    presupuesto: '3.200.000 €',
    descripcion: 'Promoción de 48 viviendas de obra nueva en Valladolid capital. Edificio de 8 plantas con garaje y trasteros.',
    polizas: [
      {
        id: 101,
        numero: 'SDD-2024-00142',
        tipo: 'SDD - Decenal',
        compania: 'AXA Seguros',
        estado: 'Vigente',
        estadoColor: 'green',
        fechaEmision: '2024-05-10',
        fechaVencimiento: '2034-05-10',
        prima: '28.400 €',
        tomador: 'Promotora Iberia S.L.',
      },
      {
        id: 102,
        numero: 'AFCA-2024-00089',
        tipo: 'AFCA - Cantidades Anticipadas',
        compania: 'Allianz',
        estado: 'Vigente',
        estadoColor: 'green',
        fechaEmision: '2024-04-20',
        fechaVencimiento: '2026-09-30',
        prima: '12.100 €',
        tomador: 'Promotora Iberia S.L.',
      },
    ],
    condicionantes: [
      { id: 1, descripcion: 'Certificado de inicio de obra', estado: 'Pendiente', fechaLimite: '2024-07-15' },
      { id: 2, descripcion: 'Informe geotécnico firmado', estado: 'Entregado', fechaLimite: '2024-05-30' },
      { id: 3, descripcion: 'Licencia municipal de obras', estado: 'Pendiente', fechaLimite: '2024-08-01' },
    ],
    documentos: [
      { id: 1, nombre: 'Póliza SDD firmada.pdf', tipo: 'PDF', fecha: '2024-05-10', tamano: '1.2 MB' },
      { id: 2, nombre: 'Proyecto básico arquitectura.pdf', tipo: 'PDF', fecha: '2024-03-20', tamano: '8.4 MB' },
      { id: 3, nombre: 'Presupuesto de ejecución.xlsx', tipo: 'Excel', fecha: '2024-03-18', tamano: '340 KB' },
    ],
  },
  {
    id: 2,
    referencia: 'PROY-2024-002',
    nombre: 'Edificio Torre Azul',
    promotora: 'Construcciones García S.L.',
    ubicacion: 'Madrid - Valdebebas',
    estado: 'Poliza emitida',
    estadoColor: 'green',
    tipo: 'SDD',
    fechaInicio: '2023-11-01',
    fechaPrevista: '2025-12-15',
    superficie: '7.200 m²',
    viviendas: 72,
    presupuesto: '5.800.000 €',
    descripcion: 'Torre residencial de 12 plantas con 72 viviendas en la zona de Valdebebas, Madrid.',
    polizas: [
      {
        id: 201,
        numero: 'SDD-2023-00871',
        tipo: 'SDD - Decenal',
        compania: 'Mapfre',
        estado: 'Vigente',
        estadoColor: 'green',
        fechaEmision: '2023-12-05',
        fechaVencimiento: '2033-12-05',
        prima: '47.200 €',
        tomador: 'Construcciones García S.L.',
      },
    ],
    condicionantes: [
      { id: 4, descripcion: 'Acta final de obra', estado: 'Pendiente', fechaLimite: '2025-12-30' },
      { id: 5, descripcion: 'Certificado director obra', estado: 'Entregado', fechaLimite: '2024-01-15' },
    ],
    documentos: [
      { id: 4, nombre: 'Póliza SDD Torre Azul.pdf', tipo: 'PDF', fecha: '2023-12-05', tamano: '2.1 MB' },
      { id: 5, nombre: 'Memoria descriptiva.pdf', tipo: 'PDF', fecha: '2023-11-10', tamano: '5.7 MB' },
    ],
  },
  {
    id: 3,
    referencia: 'PROY-2024-003',
    nombre: 'Urbanización Vistas del Mar',
    promotora: 'Costa Levante Inmuebles S.A.',
    ubicacion: 'Alicante - Playa San Juan',
    estado: 'En estudio',
    estadoColor: 'blue',
    tipo: 'SDD + AFCA',
    fechaInicio: '2024-06-01',
    fechaPrevista: '2027-03-30',
    superficie: '12.400 m²',
    viviendas: 120,
    presupuesto: '9.400.000 €',
    descripcion: 'Gran urbanización de 120 viviendas con zonas comunes, piscina y acceso directo a la playa.',
    polizas: [],
    condicionantes: [
      { id: 6, descripcion: 'Estudio de viabilidad económica', estado: 'Pendiente', fechaLimite: '2024-09-15' },
    ],
    documentos: [
      { id: 6, nombre: 'Anteproyecto urbanización.pdf', tipo: 'PDF', fecha: '2024-06-10', tamano: '11.2 MB' },
    ],
  },
  {
    id: 4,
    referencia: 'PROY-2024-004',
    nombre: 'Complejo Residencial Norte',
    promotora: 'Bilbao Desarrollos S.L.',
    ubicacion: 'Bilbao - Basurto',
    estado: 'Poliza emitida',
    estadoColor: 'green',
    tipo: 'SDD',
    fechaInicio: '2023-07-15',
    fechaPrevista: '2025-06-30',
    superficie: '5.100 m²',
    viviendas: 56,
    presupuesto: '4.200.000 €',
    descripcion: 'Complejo residencial en el barrio de Basurto, Bilbao. 56 viviendas protegidas.',
    polizas: [
      {
        id: 401,
        numero: 'SDD-2023-00654',
        tipo: 'SDD - Decenal',
        compania: 'Zurich',
        estado: 'Vigente',
        estadoColor: 'green',
        fechaEmision: '2023-09-01',
        fechaVencimiento: '2033-09-01',
        prima: '33.600 €',
        tomador: 'Bilbao Desarrollos S.L.',
      },
    ],
    condicionantes: [
      { id: 7, descripcion: 'Certificado eficiencia energética', estado: 'Entregado', fechaLimite: '2024-02-28' },
      { id: 8, descripcion: 'Informe final estructura', estado: 'Pendiente', fechaLimite: '2025-05-15' },
    ],
    documentos: [
      { id: 7, nombre: 'Póliza SDD Bilbao.pdf', tipo: 'PDF', fecha: '2023-09-01', tamano: '1.8 MB' },
    ],
  },
  {
    id: 5,
    referencia: 'PROY-2024-005',
    nombre: 'Viviendas El Pinar',
    promotora: 'Promotora Iberia S.L.',
    ubicacion: 'Sevilla - Dos Hermanas',
    estado: 'Vencimiento próximo',
    estadoColor: 'red',
    tipo: 'AFCA',
    fechaInicio: '2022-09-01',
    fechaPrevista: '2024-08-31',
    superficie: '3.200 m²',
    viviendas: 32,
    presupuesto: '2.100.000 €',
    descripcion: 'Promoción de 32 viviendas en Dos Hermanas, Sevilla. Proyecto en fase final.',
    polizas: [
      {
        id: 501,
        numero: 'AFCA-2022-00312',
        tipo: 'AFCA - Cantidades Anticipadas',
        compania: 'AXA Seguros',
        estado: 'Próximo vencimiento',
        estadoColor: 'red',
        fechaEmision: '2022-09-15',
        fechaVencimiento: '2024-08-31',
        prima: '8.900 €',
        tomador: 'Promotora Iberia S.L.',
      },
    ],
    condicionantes: [
      { id: 9, descripcion: 'Acta de recepción de obra', estado: 'Pendiente', fechaLimite: '2024-08-15' },
    ],
    documentos: [
      { id: 8, nombre: 'Póliza AFCA El Pinar.pdf', tipo: 'PDF', fecha: '2022-09-15', tamano: '980 KB' },
      { id: 9, nombre: 'Certificado final obra.pdf', tipo: 'PDF', fecha: '2024-06-20', tamano: '1.4 MB' },
    ],
  },
];

const dashboardStats = {
  proyectosActivos: 5,
  polizasVigentes: 5,
  condicionantesPendientes: 6,
  vencimientosProximos: 1,
};

const actividadReciente = [
  { id: 1, fecha: '2024-06-17', tipo: 'Documento',    descripcion: 'Certificado final de obra subido',       proyecto: 'Viviendas El Pinar' },
  { id: 2, fecha: '2024-06-15', tipo: 'Condicionante', descripcion: 'Condicionante marcado como entregado',   proyecto: 'Edificio Torre Azul' },
  { id: 3, fecha: '2024-06-12', tipo: 'Póliza',        descripcion: 'Nueva póliza AFCA emitida',              proyecto: 'Prom. Residencial Las Acacias' },
  { id: 4, fecha: '2024-06-10', tipo: 'Proyecto',      descripcion: 'Proyecto creado en el sistema',          proyecto: 'Urbanización Vistas del Mar' },
  { id: 5, fecha: '2024-06-08', tipo: 'Alerta',        descripcion: 'Vencimiento en menos de 90 días',        proyecto: 'Viviendas El Pinar' },
];

// ── AUTH MIDDLEWARE ───────────────────────────────────────────────────────────

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Sin autorización' });
  const user = usuarios.find(u => `Bearer demo-token-${u.id}` === token);
  if (!user) return res.status(401).json({ error: 'Token inválido' });
  req.user = user;
  next();
}

// ── RUTAS ─────────────────────────────────────────────────────────────────────

// Login
app.post('/api/auth/login', (req, res) => {
  const { usuario, password } = req.body;
  const user = usuarios.find(u => u.usuario === usuario && u.password === password);
  if (!user) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  res.json({
    token: `demo-token-${user.id}`,
    nombre: user.nombre,
    perfil: user.perfil,
    empresa: user.empresa,
  });
});

// Dashboard
app.get('/api/dashboard', authMiddleware, (req, res) => {
  const { perfil, empresa } = req.user;
  if (perfil === 'externo') {
    const misProyectos = proyectos.filter(p => p.promotora === empresa);
    return res.json({
      stats: {
        proyectosActivos: misProyectos.length,
        polizasVigentes: misProyectos.reduce((acc, p) => acc + p.polizas.length, 0),
        condicionantesPendientes: misProyectos.reduce((acc, p) => acc + p.condicionantes.filter(c => c.estado === 'Pendiente').length, 0),
        vencimientosProximos: misProyectos.filter(p => p.estado === 'Vencimiento próximo').length,
      },
      actividad: actividadReciente.filter(a =>
        misProyectos.some(p => a.proyecto.includes(p.nombre.substring(0, 10)))
      ),
    });
  }
  res.json({ stats: dashboardStats, actividad: actividadReciente });
});

// Lista de proyectos
app.get('/api/proyectos', authMiddleware, (req, res) => {
  const { perfil, empresa } = req.user;
  const { busqueda, estado, tipo } = req.query;
  let resultado = perfil === 'externo'
    ? proyectos.filter(p => p.promotora === empresa)
    : [...proyectos];

  if (busqueda) {
    const q = busqueda.toLowerCase();
    resultado = resultado.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.referencia.toLowerCase().includes(q) ||
      p.promotora.toLowerCase().includes(q)
    );
  }
  if (estado) resultado = resultado.filter(p => p.estado === estado);
  if (tipo) resultado = resultado.filter(p => p.tipo.includes(tipo));

  res.json(resultado.map(p => ({
    id: p.id,
    referencia: p.referencia,
    nombre: p.nombre,
    promotora: p.promotora,
    ubicacion: p.ubicacion,
    estado: p.estado,
    estadoColor: p.estadoColor,
    tipo: p.tipo,
    fechaPrevista: p.fechaPrevista,
    numPolizas: p.polizas.length,
    condicionantesPendientes: p.condicionantes.filter(c => c.estado === 'Pendiente').length,
  })));
});

// Detalle de proyecto
app.get('/api/proyectos/:id', authMiddleware, (req, res) => {
  const proyecto = proyectos.find(p => p.id === parseInt(req.params.id));
  if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
  if (req.user.perfil === 'externo' && proyecto.promotora !== req.user.empresa) {
    return res.status(403).json({ error: 'Sin acceso a este proyecto' });
  }
  res.json(proyecto);
});

// Catch-all: devolver index.html para rutas de React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// ── START ─────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
  console.log('Usuarios: admin / gestor / externo  (contraseña: demo123)');
});
