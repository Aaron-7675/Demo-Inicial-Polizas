const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());

// Servir frontend en producción
const frontendDist = path.join(__dirname, "public");
app.use(express.static(frontendDist));

// ── MOCK DATA ────────────────────────────────────────────────────────────────

const usuarios = [
    {
        id: 1,
        usuario: "admin",
        password: "demo123",
        nombre: "Ana García",
        perfil: "admin",
        empresa: null,
    },
    {
        id: 2,
        usuario: "gestor",
        password: "demo123",
        nombre: "Carlos Martínez",
        perfil: "gestor",
        empresa: null,
    },
    {
        id: 3,
        usuario: "externo",
        password: "demo123",
        nombre: "Promotora Iberia S.L.",
        perfil: "externo",
        empresa: "Promotora Iberia S.L.",
    },
];

const proyectos = [
    {
        id: 1,
        referencia: "PROY-2024-001",
        nombre: "Promoción Residencial Las Acacias",
        promotora: "Promotora Iberia S.L.",
        ubicacion: "Valladolid",
        estado: "En trámite",
        estadoColor: "orange",
        tipo: "SDD",
        fechaInicio: "2024-03-15",
        fechaPrevista: "2026-09-30",
        superficie: "4.500 m²",
        viviendas: 48,
        presupuesto: "3.200.000 €",
        descripcion:
            "Promoción de 48 viviendas de obra nueva en Valladolid capital. Edificio de 8 plantas con garaje y trasteros.",
        polizas: [
            {
                id: 101,
                numero: "SDD-2024-00142",
                tipo: "SDD - Decenal",
                compania: "AXA Seguros",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2024-05-10",
                fechaVencimiento: "2034-05-10",
                prima: "28.400 €",
                tomador: "Promotora Iberia S.L.",
            },
            {
                id: 102,
                numero: "AFCA-2024-00089",
                tipo: "AFCA - Cantidades Anticipadas",
                compania: "Allianz",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2024-04-20",
                fechaVencimiento: "2026-09-30",
                prima: "12.100 €",
                tomador: "Promotora Iberia S.L.",
            },
        ],
        condicionantes: [
            {
                id: 1,
                descripcion: "Certificado de inicio de obra",
                estado: "Pendiente",
                fechaLimite: "2024-07-15",
            },
            {
                id: 2,
                descripcion: "Informe geotécnico firmado",
                estado: "Entregado",
                fechaLimite: "2024-05-30",
            },
            {
                id: 3,
                descripcion: "Licencia municipal de obras",
                estado: "Pendiente",
                fechaLimite: "2024-08-01",
            },
        ],
        documentos: [
            {
                id: 1,
                nombre: "Póliza SDD firmada.pdf",
                tipo: "PDF",
                fecha: "2024-05-10",
                tamano: "1.2 MB",
            },
            {
                id: 2,
                nombre: "Proyecto básico arquitectura.pdf",
                tipo: "PDF",
                fecha: "2024-03-20",
                tamano: "8.4 MB",
            },
            {
                id: 3,
                nombre: "Presupuesto de ejecución.xlsx",
                tipo: "Excel",
                fecha: "2024-03-18",
                tamano: "340 KB",
            },
        ],
    },
    {
        id: 2,
        referencia: "PROY-2024-002",
        nombre: "Edificio Torre Azul",
        promotora: "Construcciones García S.L.",
        ubicacion: "Madrid - Valdebebas",
        estado: "Poliza emitida",
        estadoColor: "green",
        tipo: "SDD",
        fechaInicio: "2023-11-01",
        fechaPrevista: "2025-12-15",
        superficie: "7.200 m²",
        viviendas: 72,
        presupuesto: "5.800.000 €",
        descripcion:
            "Torre residencial de 12 plantas con 72 viviendas en la zona de Valdebebas, Madrid.",
        polizas: [
            {
                id: 201,
                numero: "SDD-2023-00871",
                tipo: "SDD - Decenal",
                compania: "Mapfre",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2023-12-05",
                fechaVencimiento: "2033-12-05",
                prima: "47.200 €",
                tomador: "Construcciones García S.L.",
            },
        ],
        condicionantes: [
            {
                id: 4,
                descripcion: "Acta final de obra",
                estado: "Pendiente",
                fechaLimite: "2025-12-30",
            },
            {
                id: 5,
                descripcion: "Certificado director obra",
                estado: "Entregado",
                fechaLimite: "2024-01-15",
            },
        ],
        documentos: [
            {
                id: 4,
                nombre: "Póliza SDD Torre Azul.pdf",
                tipo: "PDF",
                fecha: "2023-12-05",
                tamano: "2.1 MB",
            },
            {
                id: 5,
                nombre: "Memoria descriptiva.pdf",
                tipo: "PDF",
                fecha: "2023-11-10",
                tamano: "5.7 MB",
            },
        ],
    },
    {
        id: 3,
        referencia: "PROY-2024-003",
        nombre: "Urbanización Vistas del Mar",
        promotora: "Costa Levante Inmuebles S.A.",
        ubicacion: "Alicante - Playa San Juan",
        estado: "En estudio",
        estadoColor: "blue",
        tipo: "SDD + AFCA",
        fechaInicio: "2024-06-01",
        fechaPrevista: "2027-03-30",
        superficie: "12.400 m²",
        viviendas: 120,
        presupuesto: "9.400.000 €",
        descripcion:
            "Gran urbanización de 120 viviendas con zonas comunes, piscina y acceso directo a la playa.",
        polizas: [],
        condicionantes: [
            {
                id: 6,
                descripcion: "Estudio de viabilidad económica",
                estado: "Pendiente",
                fechaLimite: "2024-09-15",
            },
        ],
        documentos: [
            {
                id: 6,
                nombre: "Anteproyecto urbanización.pdf",
                tipo: "PDF",
                fecha: "2024-06-10",
                tamano: "11.2 MB",
            },
        ],
    },
    {
        id: 4,
        referencia: "PROY-2024-004",
        nombre: "Complejo Residencial Norte",
        promotora: "Bilbao Desarrollos S.L.",
        ubicacion: "Bilbao - Basurto",
        estado: "Poliza emitida",
        estadoColor: "green",
        tipo: "SDD",
        fechaInicio: "2023-07-15",
        fechaPrevista: "2025-06-30",
        superficie: "5.100 m²",
        viviendas: 56,
        presupuesto: "4.200.000 €",
        descripcion:
            "Complejo residencial en el barrio de Basurto, Bilbao. 56 viviendas protegidas.",
        polizas: [
            {
                id: 401,
                numero: "SDD-2023-00654",
                tipo: "SDD - Decenal",
                compania: "Zurich",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2023-09-01",
                fechaVencimiento: "2033-09-01",
                prima: "33.600 €",
                tomador: "Bilbao Desarrollos S.L.",
            },
        ],
        condicionantes: [
            {
                id: 7,
                descripcion: "Certificado eficiencia energética",
                estado: "Entregado",
                fechaLimite: "2024-02-28",
            },
            {
                id: 8,
                descripcion: "Informe final estructura",
                estado: "Pendiente",
                fechaLimite: "2025-05-15",
            },
        ],
        documentos: [
            {
                id: 7,
                nombre: "Póliza SDD Bilbao.pdf",
                tipo: "PDF",
                fecha: "2023-09-01",
                tamano: "1.8 MB",
            },
        ],
    },
    {
        id: 5,
        referencia: "PROY-2024-005",
        nombre: "Viviendas El Pinar",
        promotora: "Promotora Iberia S.L.",
        ubicacion: "Sevilla - Dos Hermanas",
        estado: "Vencimiento próximo",
        estadoColor: "red",
        tipo: "AFCA",
        fechaInicio: "2022-09-01",
        fechaPrevista: "2024-08-31",
        superficie: "3.200 m²",
        viviendas: 32,
        presupuesto: "2.100.000 €",
        descripcion:
            "Promoción de 32 viviendas en Dos Hermanas, Sevilla. Proyecto en fase final.",
        polizas: [
            {
                id: 501,
                numero: "AFCA-2022-00312",
                tipo: "AFCA - Cantidades Anticipadas",
                compania: "AXA Seguros",
                estado: "Próximo vencimiento",
                estadoColor: "red",
                fechaEmision: "2022-09-15",
                fechaVencimiento: "2024-08-31",
                prima: "8.900 €",
                tomador: "Promotora Iberia S.L.",
            },
        ],
        condicionantes: [
            {
                id: 9,
                descripcion: "Acta de recepción de obra",
                estado: "Pendiente",
                fechaLimite: "2024-08-15",
            },
        ],
        documentos: [
            {
                id: 8,
                nombre: "Póliza AFCA El Pinar.pdf",
                tipo: "PDF",
                fecha: "2022-09-15",
                tamano: "980 KB",
            },
            {
                id: 9,
                nombre: "Certificado final obra.pdf",
                tipo: "PDF",
                fecha: "2024-06-20",
                tamano: "1.4 MB",
            },
        ],
    },
    {
        id: 6,
        referencia: "PROY-2025-006",
        nombre: "Residencial Parque Sur",
        promotora: "Mediterráneo Homes S.L.",
        ubicacion: "Valencia - Patraix",
        estado: "En trámite",
        estadoColor: "orange",
        tipo: "SDD",
        fechaInicio: "2025-01-10",
        fechaPrevista: "2027-06-30",
        superficie: "6.800 m²",
        viviendas: 64,
        presupuesto: "5.100.000 €",
        descripcion:
            "Promoción de 64 viviendas en el barrio de Patraix, Valencia. Incluye local comercial en planta baja.",
        polizas: [
            {
                id: 601,
                numero: "SDD-2025-00203",
                tipo: "SDD - Decenal",
                compania: "Allianz",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2025-02-14",
                fechaVencimiento: "2035-02-14",
                prima: "41.800 €",
                tomador: "Mediterráneo Homes S.L.",
            },
        ],
        condicionantes: [
            {
                id: 10,
                descripcion: "Certificado inicio de obra",
                estado: "Entregado",
                fechaLimite: "2025-03-01",
            },
            {
                id: 11,
                descripcion: "Informe control de calidad hormigón",
                estado: "Pendiente",
                fechaLimite: "2025-09-30",
            },
            {
                id: 12,
                descripcion: "Planos as-built estructura",
                estado: "Pendiente",
                fechaLimite: "2026-12-31",
            },
        ],
        documentos: [
            {
                id: 10,
                nombre: "Póliza SDD Parque Sur.pdf",
                tipo: "PDF",
                fecha: "2025-02-14",
                tamano: "1.6 MB",
            },
            {
                id: 11,
                nombre: "Proyecto ejecutivo.pdf",
                tipo: "PDF",
                fecha: "2025-01-20",
                tamano: "14.2 MB",
            },
            {
                id: 12,
                nombre: "Plan gestión residuos.pdf",
                tipo: "PDF",
                fecha: "2025-01-25",
                tamano: "760 KB",
            },
        ],
    },
    {
        id: 7,
        referencia: "PROY-2025-007",
        nombre: "Edificio Mirador de Gredos",
        promotora: "Sierra Desarrollos S.A.",
        ubicacion: "Ávila - Centro",
        estado: "Poliza emitida",
        estadoColor: "green",
        tipo: "SDD + AFCA",
        fechaInicio: "2024-08-01",
        fechaPrevista: "2026-07-31",
        superficie: "2.900 m²",
        viviendas: 28,
        presupuesto: "2.400.000 €",
        descripcion:
            "Edificio de 28 viviendas en el centro histórico de Ávila con vistas a la sierra de Gredos.",
        polizas: [
            {
                id: 701,
                numero: "SDD-2024-00788",
                tipo: "SDD - Decenal",
                compania: "Generali",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2024-09-15",
                fechaVencimiento: "2034-09-15",
                prima: "19.200 €",
                tomador: "Sierra Desarrollos S.A.",
            },
            {
                id: 702,
                numero: "AFCA-2024-00441",
                tipo: "AFCA - Cantidades Anticipadas",
                compania: "Generali",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2024-09-15",
                fechaVencimiento: "2026-07-31",
                prima: "7.300 €",
                tomador: "Sierra Desarrollos S.A.",
            },
        ],
        condicionantes: [
            {
                id: 13,
                descripcion: "Memoria de calidades firmada",
                estado: "Entregado",
                fechaLimite: "2024-10-01",
            },
            {
                id: 14,
                descripcion: "Certificado coordinador seguridad",
                estado: "Entregado",
                fechaLimite: "2024-10-01",
            },
        ],
        documentos: [
            {
                id: 13,
                nombre: "Póliza SDD Gredos.pdf",
                tipo: "PDF",
                fecha: "2024-09-15",
                tamano: "1.3 MB",
            },
            {
                id: 14,
                nombre: "Póliza AFCA Gredos.pdf",
                tipo: "PDF",
                fecha: "2024-09-15",
                tamano: "980 KB",
            },
            {
                id: 15,
                nombre: "Licencia obra mayor.pdf",
                tipo: "PDF",
                fecha: "2024-08-10",
                tamano: "2.1 MB",
            },
            {
                id: 16,
                nombre: "Presupuesto contrata.xlsx",
                tipo: "Excel",
                fecha: "2024-08-05",
                tamano: "290 KB",
            },
        ],
    },
    {
        id: 8,
        referencia: "PROY-2025-008",
        nombre: "Complejo Terrazas del Ebro",
        promotora: "Aragón Inmobiliaria S.L.",
        ubicacion: "Zaragoza - Almozara",
        estado: "En estudio",
        estadoColor: "blue",
        tipo: "SDD",
        fechaInicio: "2025-03-01",
        fechaPrevista: "2027-12-31",
        superficie: "9.600 m²",
        viviendas: 96,
        presupuesto: "7.800.000 €",
        descripcion:
            "Gran complejo residencial en el barrio de La Almozara con 96 viviendas y zonas ajardinadas junto al Ebro.",
        polizas: [],
        condicionantes: [
            {
                id: 15,
                descripcion: "Estudio de impacto ambiental",
                estado: "Pendiente",
                fechaLimite: "2025-07-01",
            },
            {
                id: 16,
                descripcion: "Informe arqueológico preventivo",
                estado: "Pendiente",
                fechaLimite: "2025-06-15",
            },
        ],
        documentos: [
            {
                id: 17,
                nombre: "Anteproyecto Terrazas Ebro.pdf",
                tipo: "PDF",
                fecha: "2025-03-10",
                tamano: "9.8 MB",
            },
            {
                id: 18,
                nombre: "Estudio de mercado.xlsx",
                tipo: "Excel",
                fecha: "2025-03-08",
                tamano: "450 KB",
            },
        ],
    },
    {
        id: 9,
        referencia: "PROY-2023-009",
        nombre: "Conjunto Residencial Montaña Verde",
        promotora: "Costa Levante Inmuebles S.A.",
        ubicacion: "Murcia - La Alberca",
        estado: "Poliza emitida",
        estadoColor: "green",
        tipo: "SDD",
        fechaInicio: "2023-04-01",
        fechaPrevista: "2025-03-31",
        superficie: "4.100 m²",
        viviendas: 40,
        presupuesto: "3.600.000 €",
        descripcion:
            "Conjunto de 40 adosados en La Alberca, Murcia, con jardín privado y piscina comunitaria.",
        polizas: [
            {
                id: 901,
                numero: "SDD-2023-00390",
                tipo: "SDD - Decenal",
                compania: "Mapfre",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2023-06-01",
                fechaVencimiento: "2033-06-01",
                prima: "26.400 €",
                tomador: "Costa Levante Inmuebles S.A.",
            },
        ],
        condicionantes: [
            {
                id: 17,
                descripcion: "Escrituras de división horizontal",
                estado: "Entregado",
                fechaLimite: "2024-12-01",
            },
            {
                id: 18,
                descripcion: "Acta final de obra notarial",
                estado: "Pendiente",
                fechaLimite: "2025-03-15",
            },
        ],
        documentos: [
            {
                id: 19,
                nombre: "Póliza SDD Montaña Verde.pdf",
                tipo: "PDF",
                fecha: "2023-06-01",
                tamano: "1.5 MB",
            },
            {
                id: 20,
                nombre: "Informe ITE.pdf",
                tipo: "PDF",
                fecha: "2024-11-20",
                tamano: "3.2 MB",
            },
        ],
    },
    {
        id: 10,
        referencia: "PROY-2025-010",
        nombre: "Promotora Casco Antiguo",
        promotora: "Renovación Urbana S.L.",
        ubicacion: "Toledo - Casco histórico",
        estado: "En trámite",
        estadoColor: "orange",
        tipo: "SDD + AFCA",
        fechaInicio: "2025-02-15",
        fechaPrevista: "2027-02-28",
        superficie: "1.800 m²",
        viviendas: 16,
        presupuesto: "1.900.000 €",
        descripcion:
            "Rehabilitación de edificio histórico en el casco antiguo de Toledo. 16 viviendas de lujo con protección patrimonial.",
        polizas: [
            {
                id: 1001,
                numero: "SDD-2025-00055",
                tipo: "SDD - Decenal",
                compania: "AXA Seguros",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2025-03-20",
                fechaVencimiento: "2035-03-20",
                prima: "15.700 €",
                tomador: "Renovación Urbana S.L.",
            },
        ],
        condicionantes: [
            {
                id: 19,
                descripcion: "Autorización Patrimonio Histórico",
                estado: "Entregado",
                fechaLimite: "2025-03-01",
            },
            {
                id: 20,
                descripcion: "Informe restauración fachada",
                estado: "Pendiente",
                fechaLimite: "2025-10-31",
            },
            {
                id: 21,
                descripcion: "Plano estructural consolidación",
                estado: "Pendiente",
                fechaLimite: "2025-12-31",
            },
        ],
        documentos: [
            {
                id: 21,
                nombre: "Póliza SDD Toledo.pdf",
                tipo: "PDF",
                fecha: "2025-03-20",
                tamano: "1.1 MB",
            },
            {
                id: 22,
                nombre: "Proyecto rehabilitación.pdf",
                tipo: "PDF",
                fecha: "2025-02-20",
                tamano: "18.6 MB",
            },
            {
                id: 23,
                nombre: "Informe Patrimonio aprobado.pdf",
                tipo: "PDF",
                fecha: "2025-02-28",
                tamano: "2.4 MB",
            },
        ],
    },
    {
        id: 11,
        referencia: "PROY-2024-011",
        nombre: "Torres Gemelas del Puerto",
        promotora: "Mediterráneo Homes S.L.",
        ubicacion: "Málaga - Puerto",
        estado: "Poliza emitida",
        estadoColor: "green",
        tipo: "SDD",
        fechaInicio: "2024-01-10",
        fechaPrevista: "2026-12-31",
        superficie: "11.200 m²",
        viviendas: 110,
        presupuesto: "12.400.000 €",
        descripcion:
            "Dos torres residenciales de 15 plantas junto al Puerto de Málaga. Viviendas premium con vistas al mar.",
        polizas: [
            {
                id: 1101,
                numero: "SDD-2024-00310",
                tipo: "SDD - Decenal",
                compania: "Zurich",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2024-03-01",
                fechaVencimiento: "2034-03-01",
                prima: "98.500 €",
                tomador: "Mediterráneo Homes S.L.",
            },
            {
                id: 1102,
                numero: "RCD-2024-00041",
                tipo: "RC Decenal Promotor",
                compania: "Zurich",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2024-03-01",
                fechaVencimiento: "2034-03-01",
                prima: "22.100 €",
                tomador: "Mediterráneo Homes S.L.",
            },
        ],
        condicionantes: [
            {
                id: 22,
                descripcion: "Certificado cimentación (control)",
                estado: "Entregado",
                fechaLimite: "2024-06-30",
            },
            {
                id: 23,
                descripcion: "Informe control estructura Torre A",
                estado: "Entregado",
                fechaLimite: "2025-01-15",
            },
            {
                id: 24,
                descripcion: "Informe control estructura Torre B",
                estado: "Pendiente",
                fechaLimite: "2025-06-30",
            },
            {
                id: 25,
                descripcion: "Certificado instalaciones comunes",
                estado: "Pendiente",
                fechaLimite: "2026-10-01",
            },
        ],
        documentos: [
            {
                id: 24,
                nombre: "Póliza SDD Torres Puerto.pdf",
                tipo: "PDF",
                fecha: "2024-03-01",
                tamano: "2.3 MB",
            },
            {
                id: 25,
                nombre: "Póliza RCD Torres Puerto.pdf",
                tipo: "PDF",
                fecha: "2024-03-01",
                tamano: "1.7 MB",
            },
            {
                id: 26,
                nombre: "Proyecto básico Torre A.pdf",
                tipo: "PDF",
                fecha: "2024-01-15",
                tamano: "22.4 MB",
            },
            {
                id: 27,
                nombre: "Proyecto básico Torre B.pdf",
                tipo: "PDF",
                fecha: "2024-01-15",
                tamano: "21.9 MB",
            },
            {
                id: 28,
                nombre: "Estudio seguridad y salud.pdf",
                tipo: "PDF",
                fecha: "2024-02-10",
                tamano: "4.1 MB",
            },
        ],
    },
    {
        id: 12,
        referencia: "PROY-2023-012",
        nombre: "Urbanización Los Naranjos",
        promotora: "Andalucía Desarrollos S.A.",
        ubicacion: "Córdoba - Poniente Norte",
        estado: "Poliza emitida",
        estadoColor: "green",
        tipo: "AFCA",
        fechaInicio: "2023-02-01",
        fechaPrevista: "2025-01-31",
        superficie: "5.600 m²",
        viviendas: 52,
        presupuesto: "4.700.000 €",
        descripcion:
            "Urbanización de 52 viviendas unifamiliares en Córdoba con zonas verdes y colegio próximo.",
        polizas: [
            {
                id: 1201,
                numero: "AFCA-2023-00188",
                tipo: "AFCA - Cantidades Anticipadas",
                compania: "Allianz",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2023-04-10",
                fechaVencimiento: "2025-01-31",
                prima: "18.200 €",
                tomador: "Andalucía Desarrollos S.A.",
            },
            {
                id: 1202,
                numero: "SDD-2023-00510",
                tipo: "SDD - Decenal",
                compania: "Allianz",
                estado: "Vigente",
                estadoColor: "green",
                fechaEmision: "2023-04-10",
                fechaVencimiento: "2033-04-10",
                prima: "35.900 €",
                tomador: "Andalucía Desarrollos S.A.",
            },
        ],
        condicionantes: [
            {
                id: 26,
                descripcion: "Informe geotécnico fase 2",
                estado: "Entregado",
                fechaLimite: "2023-06-30",
            },
            {
                id: 27,
                descripcion: "Certificado red saneamiento",
                estado: "Entregado",
                fechaLimite: "2024-03-01",
            },
            {
                id: 28,
                descripcion: "Cédulas de habitabilidad lote 1",
                estado: "Entregado",
                fechaLimite: "2024-09-01",
            },
        ],
        documentos: [
            {
                id: 29,
                nombre: "Póliza AFCA Los Naranjos.pdf",
                tipo: "PDF",
                fecha: "2023-04-10",
                tamano: "1.2 MB",
            },
            {
                id: 30,
                nombre: "Póliza SDD Los Naranjos.pdf",
                tipo: "PDF",
                fecha: "2023-04-10",
                tamano: "1.4 MB",
            },
            {
                id: 31,
                nombre: "Plano urbanización general.pdf",
                tipo: "PDF",
                fecha: "2023-02-15",
                tamano: "7.3 MB",
            },
        ],
    },
    {
        id: 13,
        referencia: "PROY-2025-013",
        nombre: "Residencial Santa Clara",
        promotora: "Bilbao Desarrollos S.L.",
        ubicacion: "San Sebastián - Gros",
        estado: "En estudio",
        estadoColor: "blue",
        tipo: "SDD + AFCA",
        fechaInicio: "2025-04-01",
        fechaPrevista: "2028-03-31",
        superficie: "3.700 m²",
        viviendas: 34,
        presupuesto: "4.900.000 €",
        descripcion:
            "Edificio de 34 viviendas en el barrio de Gros, San Sebastián. Diseño bioclimático con paneles solares.",
        polizas: [],
        condicionantes: [
            {
                id: 29,
                descripcion: "Consulta urbanística previa",
                estado: "Pendiente",
                fechaLimite: "2025-07-15",
            },
        ],
        documentos: [
            {
                id: 32,
                nombre: "Memoria de viabilidad.pdf",
                tipo: "PDF",
                fecha: "2025-04-05",
                tamano: "3.8 MB",
            },
        ],
    },
    {
        id: 14,
        referencia: "PROY-2024-014",
        nombre: "Parque Empresarial Gran Vía",
        promotora: "Construcciones García S.L.",
        ubicacion: "Madrid - Las Rozas",
        estado: "Vencimiento próximo",
        estadoColor: "red",
        tipo: "SDD",
        fechaInicio: "2021-06-01",
        fechaPrevista: "2024-09-30",
        superficie: "8.300 m²",
        viviendas: 0,
        presupuesto: "6.200.000 €",
        descripcion:
            "Parque empresarial de oficinas y locales en Las Rozas, Madrid. Proyecto de uso terciario.",
        polizas: [
            {
                id: 1401,
                numero: "SDD-2021-00099",
                tipo: "SDD - Decenal",
                compania: "AXA Seguros",
                estado: "Próximo vencimiento",
                estadoColor: "red",
                fechaEmision: "2021-08-01",
                fechaVencimiento: "2024-09-30",
                prima: "52.400 €",
                tomador: "Construcciones García S.L.",
            },
        ],
        condicionantes: [
            {
                id: 30,
                descripcion: "Acta recepción parcela A",
                estado: "Entregado",
                fechaLimite: "2024-03-01",
            },
            {
                id: 31,
                descripcion: "Certificado instalación eléctrica BT",
                estado: "Pendiente",
                fechaLimite: "2024-09-15",
            },
        ],
        documentos: [
            {
                id: 33,
                nombre: "Póliza SDD Gran Vía.pdf",
                tipo: "PDF",
                fecha: "2021-08-01",
                tamano: "1.9 MB",
            },
            {
                id: 34,
                nombre: "Acta recepción parcela A.pdf",
                tipo: "PDF",
                fecha: "2024-03-01",
                tamano: "800 KB",
            },
            {
                id: 35,
                nombre: "Planos instalaciones.pdf",
                tipo: "PDF",
                fecha: "2021-07-15",
                tamano: "12.6 MB",
            },
            {
                id: 36,
                nombre: "Contrato arrendamiento locales.pdf",
                tipo: "PDF",
                fecha: "2024-05-10",
                tamano: "1.1 MB",
            },
        ],
    },
];

const promotoras = [
  { id: 1, nombre: 'Promotora Iberia S.L.',         cif: 'B-28123456', contacto: 'Carlos Ruiz',    email: 'cruiz@promotora-iberia.es',    telefono: '91 234 56 78', ciudad: 'Madrid' },
  { id: 2, nombre: 'Construcciones García S.L.',    cif: 'B-28654321', contacto: 'Ana García',     email: 'agarcia@construcciones-g.es',   telefono: '91 876 54 32', ciudad: 'Madrid' },
  { id: 3, nombre: 'Costa Levante Inmuebles S.A.',  cif: 'A-46987654', contacto: 'Pedro Martínez', email: 'pmartinez@costalevante.es',     telefono: '96 345 67 89', ciudad: 'Valencia' },
  { id: 4, nombre: 'Bilbao Desarrollos S.L.',       cif: 'B-48321654', contacto: 'Miren Etxebarria', email: 'metxebarria@bilbaodesarrollos.es', telefono: '94 456 78 90', ciudad: 'Bilbao' },
  { id: 5, nombre: 'Mediterráneo Homes S.L.',       cif: 'B-29111222', contacto: 'José Sánchez',   email: 'jsanchez@med-homes.es',         telefono: '95 567 89 01', ciudad: 'Málaga' },
  { id: 6, nombre: 'Sierra Desarrollos S.A.',       cif: 'A-05222333', contacto: 'Laura Blanco',   email: 'lblanco@sierradesarrollos.es',  telefono: '920 12 34 56', ciudad: 'Ávila' },
  { id: 7, nombre: 'Aragón Inmobiliaria S.L.',      cif: 'B-50444555', contacto: 'Diego Molina',   email: 'dmolina@aragon-inm.es',        telefono: '976 23 45 67', ciudad: 'Zaragoza' },
  { id: 8, nombre: 'Renovación Urbana S.L.',        cif: 'B-45555666', contacto: 'Isabel Torres',  email: 'itorres@renovacion-urbana.es', telefono: '925 34 56 78', ciudad: 'Toledo' },
  { id: 9, nombre: 'Andalucía Desarrollos S.A.',    cif: 'A-14666777', contacto: 'Manuel Jiménez', email: 'mjimenez@andalucia-dev.es',    telefono: '957 45 67 89', ciudad: 'Córdoba' },
];
let nextPromotoraId = 10;

const dashboardStats = {
    proyectosActivos: 14,
    polizasVigentes: 18,
    condicionantesPendientes: 14,
    vencimientosProximos: 2,
};

const actividadReciente = [
    {
        id: 1,
        fecha: "2025-06-18",
        tipo: "Póliza",
        descripcion: "Póliza SDD emitida",
        proyecto: "Residencial Parque Sur",
    },
    {
        id: 2,
        fecha: "2025-06-15",
        tipo: "Proyecto",
        descripcion: "Nuevo proyecto registrado",
        proyecto: "Residencial Santa Clara",
    },
    {
        id: 3,
        fecha: "2025-06-12",
        tipo: "Condicionante",
        descripcion: "Autorización Patrimonio entregada",
        proyecto: "Promotora Casco Antiguo",
    },
    {
        id: 4,
        fecha: "2025-06-10",
        tipo: "Alerta",
        descripcion: "Vencimiento en menos de 90 días",
        proyecto: "Parque Empresarial Gran Vía",
    },
    {
        id: 5,
        fecha: "2025-06-08",
        tipo: "Documento",
        descripcion: "Proyecto ejecutivo subido al sistema",
        proyecto: "Residencial Parque Sur",
    },
    {
        id: 6,
        fecha: "2025-05-30",
        tipo: "Póliza",
        descripcion: "Póliza SDD + AFCA emitidas",
        proyecto: "Edificio Mirador de Gredos",
    },
    {
        id: 7,
        fecha: "2025-05-22",
        tipo: "Condicionante",
        descripcion: "Informe control estructura Torre A OK",
        proyecto: "Torres Gemelas del Puerto",
    },
    {
        id: 8,
        fecha: "2025-05-15",
        tipo: "Alerta",
        descripcion: "Vencimiento próximo AFCA",
        proyecto: "Viviendas El Pinar",
    },
];

// ── AUTH MIDDLEWARE ───────────────────────────────────────────────────────────

function authMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ error: "Sin autorización" });
    const user = usuarios.find((u) => `Bearer demo-token-${u.id}` === token);
    if (!user) return res.status(401).json({ error: "Token inválido" });
    req.user = user;
    next();
}

// ── RUTAS ─────────────────────────────────────────────────────────────────────

// Login
app.post("/api/auth/login", (req, res) => {
    const { usuario, password } = req.body;
    const user = usuarios.find(
        (u) => u.usuario === usuario && u.password === password,
    );
    if (!user)
        return res
            .status(401)
            .json({ error: "Usuario o contraseña incorrectos" });
    res.json({
        token: `demo-token-${user.id}`,
        nombre: user.nombre,
        perfil: user.perfil,
        empresa: user.empresa,
    });
});

// Dashboard
app.get("/api/dashboard", authMiddleware, (req, res) => {
    const { perfil, empresa } = req.user;
    const base =
        perfil === "externo"
            ? proyectos.filter((p) => p.promotora === empresa)
            : [...proyectos];

    const conCondicionantes = base
        .filter((p) => p.condicionantes.some((c) => c.estado === "Pendiente"))
        .map((p) => ({
            id: p.id,
            nombre: p.nombre,
            referencia: p.referencia,
            pendientes: p.condicionantes.filter((c) => c.estado === "Pendiente")
                .length,
        }));

    const conVencimientos = base
        .filter((p) => p.estado === "Vencimiento próximo")
        .map((p) => ({
            id: p.id,
            nombre: p.nombre,
            referencia: p.referencia,
            fechaPrevista: p.fechaPrevista,
        }));

    if (perfil === "externo") {
        return res.json({
            stats: {
                proyectosActivos: base.length,
                polizasVigentes: base.reduce(
                    (acc, p) => acc + p.polizas.length,
                    0,
                ),
                condicionantesPendientes: base.reduce(
                    (acc, p) =>
                        acc +
                        p.condicionantes.filter((c) => c.estado === "Pendiente")
                            .length,
                    0,
                ),
                vencimientosProximos: conVencimientos.length,
            },
            actividad: actividadReciente.filter((a) =>
                base.some((p) =>
                    a.proyecto.includes(p.nombre.substring(0, 10)),
                ),
            ),
            conCondicionantes,
            conVencimientos,
        });
    }

    res.json({
        stats: dashboardStats,
        actividad: actividadReciente,
        conCondicionantes,
        conVencimientos,
    });
});

// Lista de proyectos
app.get("/api/proyectos", authMiddleware, (req, res) => {
    const { perfil, empresa } = req.user;
    const { busqueda, estado, tipo } = req.query;
    let resultado =
        perfil === "externo"
            ? proyectos.filter((p) => p.promotora === empresa)
            : [...proyectos];

    if (busqueda) {
        const q = busqueda.toLowerCase();
        resultado = resultado.filter(
            (p) =>
                p.nombre.toLowerCase().includes(q) ||
                p.referencia.toLowerCase().includes(q) ||
                p.promotora.toLowerCase().includes(q),
        );
    }
    if (estado) resultado = resultado.filter((p) => p.estado === estado);
    if (tipo) resultado = resultado.filter((p) => p.tipo.includes(tipo));
    if (req.query.conPendientes === "true")
        resultado = resultado.filter((p) =>
            p.condicionantes.some((c) => c.estado === "Pendiente"),
        );

    res.json(
        resultado.map((p) => ({
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
            condicionantesPendientes: p.condicionantes.filter(
                (c) => c.estado === "Pendiente",
            ).length,
        })),
    );
});

// Detalle de proyecto
app.get("/api/proyectos/:id", authMiddleware, (req, res) => {
    const proyecto = proyectos.find((p) => p.id === parseInt(req.params.id));
    if (!proyecto)
        return res.status(404).json({ error: "Proyecto no encontrado" });
    if (
        req.user.perfil === "externo" &&
        proyecto.promotora !== req.user.empresa
    ) {
        return res.status(403).json({ error: "Sin acceso a este proyecto" });
    }
    res.json(proyecto);
});

// ── PROMOTORAS CRUD ──────────────────────────────────────────────────────────

app.get('/api/promotoras', authMiddleware, (req, res) => {
  const { busqueda } = req.query;
  let resultado = [...promotoras];
  if (busqueda) {
    const q = busqueda.toLowerCase();
    resultado = resultado.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.cif.toLowerCase().includes(q) ||
      p.contacto.toLowerCase().includes(q) ||
      p.ciudad.toLowerCase().includes(q)
    );
  }
  res.json(resultado);
});

app.get('/api/promotoras/:id', authMiddleware, (req, res) => {
  const p = promotoras.find(p => p.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ error: 'No encontrada' });
  res.json(p);
});

app.post('/api/promotoras', authMiddleware, (req, res) => {
  if (req.user.perfil === 'externo') return res.status(403).json({ error: 'Sin permiso' });
  const { nombre, cif, contacto, email, telefono, ciudad } = req.body;
  if (!nombre || !cif) return res.status(400).json({ error: 'Nombre y CIF son obligatorios' });
  const nueva = { id: nextPromotoraId++, nombre, cif, contacto: contacto || '', email: email || '', telefono: telefono || '', ciudad: ciudad || '' };
  promotoras.push(nueva);
  res.status(201).json(nueva);
});

app.put('/api/promotoras/:id', authMiddleware, (req, res) => {
  if (req.user.perfil === 'externo') return res.status(403).json({ error: 'Sin permiso' });
  const idx = promotoras.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  const { nombre, cif, contacto, email, telefono, ciudad } = req.body;
  if (!nombre || !cif) return res.status(400).json({ error: 'Nombre y CIF son obligatorios' });
  promotoras[idx] = { ...promotoras[idx], nombre, cif, contacto: contacto || '', email: email || '', telefono: telefono || '', ciudad: ciudad || '' };
  res.json(promotoras[idx]);
});

app.delete('/api/promotoras/:id', authMiddleware, (req, res) => {
  if (req.user.perfil === 'externo') return res.status(403).json({ error: 'Sin permiso' });
  const idx = promotoras.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  promotoras.splice(idx, 1);
  res.json({ ok: true });
});

// Catch-all: devolver index.html para rutas de React Router
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
});

// ── START ─────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log("Usuarios: admin / gestor / externo  (contraseña: demo123)");
});
