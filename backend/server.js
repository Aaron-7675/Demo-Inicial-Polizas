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

const proyectosBase = [
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

// ── PROYECTOS HISTÓRICOS ADICIONALES ─────────────────────────────────────────
const comerciales = ['MF', 'GC', 'YM', 'AL', 'RC'];

function proy(id, ref, nombre, promotora, ubi, estado, estadoColor, tipo, ramo, inicio, prevista, sup, viv, ppto, comercial, primaNeta, polizas, condicionantes, documentos) {
  return { id, referencia: ref, nombre, promotora, ubicacion: ubi, estado, estadoColor, tipo, ramo, fechaInicio: inicio, fechaPrevista: prevista, superficie: sup, viviendas: viv, presupuesto: ppto, comercial, primaNeta, descripcion: '', polizas, condicionantes, documentos };
}

function pol(id, numero, tipo, compania, estado, estadoColor, emision, vencimiento, prima, tomador) {
  return { id, numero, tipo, compania, estado, estadoColor, fechaEmision: emision, fechaVencimiento: vencimiento, prima, tomador };
}

const proyectosHistoricos = [
  proy(15,'PROY-2018-015','Residencial Alameda','Promotora Iberia S.L.','Madrid - Carabanchel','Poliza emitida','green','SDD','SDD','2018-01-10','2020-06-30','3.200 m²',32,'2.800.000 €','MF',22400,[pol(1501,'SDD-2018-00101','SDD - Decenal','Mapfre','Vigente','green','2018-03-01','2028-03-01','22.400 €','Promotora Iberia S.L.')],[{id:101,descripcion:'Certificado fin obra',estado:'Entregado',fechaLimite:'2020-06-01'}],[{id:101,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2018-03-01',tamano:'1.1 MB'}]),
  proy(16,'PROY-2018-016','Edificio Central Park','Construcciones García S.L.','Barcelona - Gracia','Poliza emitida','green','SDD','SDD','2018-03-15','2020-09-30','4.100 m²',40,'3.500.000 €','GC',28000,[pol(1601,'SDD-2018-00156','SDD - Decenal','AXA Seguros','Vigente','green','2018-05-10','2028-05-10','28.000 €','Construcciones García S.L.')],[{id:102,descripcion:'Acta recepción',estado:'Entregado',fechaLimite:'2020-09-01'}],[{id:102,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2018-05-10',tamano:'1.2 MB'}]),
  proy(17,'PROY-2018-017','Urbanización Los Pinos','Costa Levante Inmuebles S.A.','Valencia - Benimaclet','Poliza emitida','green','AFCA','AFCA','2018-06-01','2020-12-31','2.800 m²',28,'2.100.000 €','YM',9800,[pol(1701,'AFCA-2018-00201','AFCA - Cantidades Anticipadas','Allianz','Vigente','green','2018-07-15','2020-12-31','9.800 €','Costa Levante Inmuebles S.A.')],[{id:103,descripcion:'Licencia obras',estado:'Entregado',fechaLimite:'2018-08-01'}],[{id:103,nombre:'Póliza AFCA.pdf',tipo:'PDF',fecha:'2018-07-15',tamano:'950 KB'}]),
  proy(18,'PROY-2019-018','Complejo Las Fuentes','Bilbao Desarrollos S.L.','Bilbao - Deusto','Poliza emitida','green','SDD','SDD','2019-02-01','2021-08-31','5.600 m²',56,'4.800.000 €','AL',38400,[pol(1801,'SDD-2019-00089','SDD - Decenal','Zurich','Vigente','green','2019-04-01','2029-04-01','38.400 €','Bilbao Desarrollos S.L.')],[{id:104,descripcion:'Certificado estructura',estado:'Entregado',fechaLimite:'2021-06-01'}],[{id:104,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2019-04-01',tamano:'1.3 MB'}]),
  proy(19,'PROY-2019-019','Viviendas Mediterráneo','Mediterráneo Homes S.L.','Alicante - San Juan','Poliza emitida','green','SDD + AFCA','SDD','2019-04-15','2021-10-31','6.200 m²',60,'5.200.000 €','RC',43200,[pol(1901,'SDD-2019-00134','SDD - Decenal','Generali','Vigente','green','2019-06-01','2029-06-01','33.600 €','Mediterráneo Homes S.L.'),pol(1902,'AFCA-2019-00098','AFCA - Cantidades Anticipadas','Generali','Vigente','green','2019-06-01','2021-10-31','9.600 €','Mediterráneo Homes S.L.')],[{id:105,descripcion:'Informe geotécnico',estado:'Entregado',fechaLimite:'2019-07-01'}],[{id:105,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2019-06-01',tamano:'1.8 MB'}]),
  proy(20,'PROY-2019-020','Torres del Norte','Sierra Desarrollos S.A.','Santander - Centro','Poliza emitida','green','SDD','SDD','2019-07-01','2022-01-31','3.800 m²',38,'3.200.000 €','MF',25600,[pol(2001,'SDD-2019-00267','SDD - Decenal','Mapfre','Vigente','green','2019-09-01','2029-09-01','25.600 €','Sierra Desarrollos S.A.')],[{id:106,descripcion:'Acta final obra',estado:'Entregado',fechaLimite:'2022-01-15'}],[{id:106,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2019-09-01',tamano:'1.1 MB'}]),
  proy(21,'PROY-2019-021','Residencial Olimpo','Aragón Inmobiliaria S.L.','Zaragoza - Romareda','Poliza emitida','green','AFCA','AFCA','2019-09-15','2022-03-31','2.400 m²',24,'1.900.000 €','GC',8400,[pol(2101,'AFCA-2019-00312','AFCA - Cantidades Anticipadas','AXA Seguros','Vigente','green','2019-11-01','2022-03-31','8.400 €','Aragón Inmobiliaria S.L.')],[{id:107,descripcion:'Cédulas habitabilidad',estado:'Entregado',fechaLimite:'2022-03-01'}],[{id:107,nombre:'Póliza AFCA.pdf',tipo:'PDF',fecha:'2019-11-01',tamano:'880 KB'}]),
  proy(22,'PROY-2020-022','Parque Residencial Sur','Renovación Urbana S.L.','Sevilla - Triana','Poliza emitida','green','SDD','SDD','2020-01-10','2022-07-31','4.500 m²',44,'3.800.000 €','YM',30400,[pol(2201,'SDD-2020-00045','SDD - Decenal','Allianz','Vigente','green','2020-03-01','2030-03-01','30.400 €','Renovación Urbana S.L.')],[{id:108,descripcion:'Informe final estructura',estado:'Entregado',fechaLimite:'2022-07-01'}],[{id:108,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2020-03-01',tamano:'1.2 MB'}]),
  proy(23,'PROY-2020-023','Edificio Río Grande','Andalucía Desarrollos S.A.','Córdoba - Centro','Poliza emitida','green','SDD + AFCA','SDD','2020-03-15','2022-09-30','3.100 m²',30,'2.600.000 €','AL',22400,[pol(2301,'SDD-2020-00112','SDD - Decenal','Zurich','Vigente','green','2020-05-15','2030-05-15','18.200 €','Andalucía Desarrollos S.A.'),pol(2302,'AFCA-2020-00089','AFCA - Cantidades Anticipadas','Zurich','Vigente','green','2020-05-15','2022-09-30','4.200 €','Andalucía Desarrollos S.A.')],[{id:109,descripcion:'Escrituras división horizontal',estado:'Entregado',fechaLimite:'2022-09-01'}],[{id:109,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2020-05-15',tamano:'1.5 MB'}]),
  proy(24,'PROY-2020-024','Villas del Mar','Costa Levante Inmuebles S.A.','Málaga - Marbella','Poliza emitida','green','SDD','SDD','2020-06-01','2022-12-31','7.200 m²',72,'6.400.000 €','RC',51200,[pol(2401,'SDD-2020-00198','SDD - Decenal','Mapfre','Vigente','green','2020-08-01','2030-08-01','51.200 €','Costa Levante Inmuebles S.A.')],[{id:110,descripcion:'Acta recepción final',estado:'Entregado',fechaLimite:'2022-12-01'}],[{id:110,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2020-08-01',tamano:'1.4 MB'}]),
  proy(25,'PROY-2020-025','Residencial Pinares','Promotora Iberia S.L.','Valladolid - Parquesol','Poliza emitida','green','AFCA','AFCA','2020-09-01','2023-03-31','2.600 m²',26,'2.000.000 €','MF',8800,[pol(2501,'AFCA-2020-00267','AFCA - Cantidades Anticipadas','AXA Seguros','Vigente','green','2020-10-15','2023-03-31','8.800 €','Promotora Iberia S.L.')],[{id:111,descripcion:'Certificado fin obra',estado:'Entregado',fechaLimite:'2023-03-01'}],[{id:111,nombre:'Póliza AFCA.pdf',tipo:'PDF',fecha:'2020-10-15',tamano:'920 KB'}]),
  proy(26,'PROY-2021-026','Complejo Deportivo','Construcciones García S.L.','Madrid - Arganzuela','Poliza emitida','green','SDD','SDD','2021-01-15','2023-06-30','5.100 m²',0,'4.200.000 €','GC',33600,[pol(2601,'SDD-2021-00034','SDD - Decenal','Generali','Vigente','green','2021-03-01','2031-03-01','33.600 €','Construcciones García S.L.')],[{id:112,descripcion:'Certificado instalaciones',estado:'Entregado',fechaLimite:'2023-06-01'}],[{id:112,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2021-03-01',tamano:'1.3 MB'}]),
  proy(27,'PROY-2021-027','Urbanización Palmeral','Mediterráneo Homes S.L.','Murcia - La Manga','Poliza emitida','green','SDD','SDD','2021-03-01','2023-09-30','8.400 m²',84,'7.200.000 €','YM',57600,[pol(2701,'SDD-2021-00089','SDD - Decenal','AXA Seguros','Vigente','green','2021-05-01','2031-05-01','57.600 €','Mediterráneo Homes S.L.')],[{id:113,descripcion:'Acta recepción urbanización',estado:'Entregado',fechaLimite:'2023-09-01'}],[{id:113,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2021-05-01',tamano:'1.6 MB'}]),
  proy(28,'PROY-2021-028','Edificio Milenio','Bilbao Desarrollos S.L.','San Sebastián - Parte Vieja','Poliza emitida','green','SDD + AFCA','SDD','2021-06-15','2023-12-31','3.600 m²',36,'3.100.000 €','AL',26800,[pol(2801,'SDD-2021-00156','SDD - Decenal','Mapfre','Vigente','green','2021-08-01','2031-08-01','19.200 €','Bilbao Desarrollos S.L.'),pol(2802,'AFCA-2021-00134','AFCA - Cantidades Anticipadas','Mapfre','Vigente','green','2021-08-01','2023-12-31','7.600 €','Bilbao Desarrollos S.L.')],[{id:114,descripcion:'Informe ITE',estado:'Entregado',fechaLimite:'2023-12-01'}],[{id:114,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2021-08-01',tamano:'1.4 MB'}]),
  proy(29,'PROY-2021-029','Residencial Cumbres','Sierra Desarrollos S.A.','Granada - Zaidín','Poliza emitida','green','SDD','SDD','2021-09-01','2024-03-31','4.200 m²',42,'3.600.000 €','RC',28800,[pol(2901,'SDD-2021-00234','SDD - Decenal','Allianz','Vigente','green','2021-11-01','2031-11-01','28.800 €','Sierra Desarrollos S.A.')],[{id:115,descripcion:'Certificado director obra',estado:'Entregado',fechaLimite:'2024-03-01'}],[{id:115,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2021-11-01',tamano:'1.2 MB'}]),
  proy(30,'PROY-2022-030','Torres Gemelas Levante','Costa Levante Inmuebles S.A.','Valencia - Benicalap','Poliza emitida','green','SDD','SDD','2022-01-10','2024-07-31','9.600 m²',96,'8.400.000 €','MF',67200,[pol(3001,'SDD-2022-00023','SDD - Decenal','Zurich','Vigente','green','2022-03-01','2032-03-01','67.200 €','Costa Levante Inmuebles S.A.')],[{id:116,descripcion:'Acta recepción obras',estado:'Entregado',fechaLimite:'2024-07-01'}],[{id:116,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2022-03-01',tamano:'1.8 MB'}]),
  proy(31,'PROY-2022-031','Complejo Residencial Oeste','Promotora Iberia S.L.','Madrid - Latina','Poliza emitida','green','SDD + AFCA','SDD','2022-03-15','2024-09-30','5.800 m²',56,'4.900.000 €','GC',43200,[pol(3101,'SDD-2022-00067','SDD - Decenal','AXA Seguros','Vigente','green','2022-05-15','2032-05-15','32.000 €','Promotora Iberia S.L.'),pol(3102,'AFCA-2022-00145','AFCA - Cantidades Anticipadas','AXA Seguros','Vigente','green','2022-05-15','2024-09-30','11.200 €','Promotora Iberia S.L.')],[{id:117,descripcion:'Licencia primera ocupación',estado:'Entregado',fechaLimite:'2024-09-01'}],[{id:117,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2022-05-15',tamano:'1.5 MB'}]),
  proy(32,'PROY-2022-032','Edificio Bahía','Andalucía Desarrollos S.A.','Cádiz - Centro','Poliza emitida','green','SDD','SDD','2022-06-01','2024-12-31','3.400 m²',34,'2.900.000 €','YM',23200,[pol(3201,'SDD-2022-00134','SDD - Decenal','Generali','Vigente','green','2022-08-01','2032-08-01','23.200 €','Andalucía Desarrollos S.A.')],[{id:118,descripcion:'Certificado eficiencia energética',estado:'Entregado',fechaLimite:'2024-12-01'}],[{id:118,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2022-08-01',tamano:'1.1 MB'}]),
  proy(33,'PROY-2022-033','Vistas al Pirineo','Aragón Inmobiliaria S.L.','Huesca - Centro','Poliza emitida','green','AFCA','AFCA','2022-09-01','2025-03-31','2.200 m²',22,'1.700.000 €','AL',7400,[pol(3301,'AFCA-2022-00289','AFCA - Cantidades Anticipadas','Mapfre','Vigente','green','2022-10-15','2025-03-31','7.400 €','Aragón Inmobiliaria S.L.')],[{id:119,descripcion:'Cédulas habitabilidad',estado:'Entregado',fechaLimite:'2025-03-01'}],[{id:119,nombre:'Póliza AFCA.pdf',tipo:'PDF',fecha:'2022-10-15',tamano:'870 KB'}]),
  proy(34,'PROY-2023-034','Residencial Buen Aire','Renovación Urbana S.L.','Burgos - Centro','Poliza emitida','green','SDD','SDD','2023-01-15','2025-07-31','3.900 m²',38,'3.300.000 €','RC',26400,[pol(3401,'SDD-2023-00012','SDD - Decenal','AXA Seguros','Vigente','green','2023-03-01','2033-03-01','26.400 €','Renovación Urbana S.L.')],[{id:120,descripcion:'Acta recepción',estado:'Entregado',fechaLimite:'2025-07-01'}],[{id:120,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2023-03-01',tamano:'1.2 MB'}]),
  proy(35,'PROY-2023-035','Complejo El Bosque','Construcciones García S.L.','Segovia - Extrarradio','Poliza emitida','green','SDD','SDD','2023-03-01','2025-09-30','4.700 m²',46,'4.000.000 €','MF',32000,[pol(3501,'SDD-2023-00056','SDD - Decenal','Allianz','Vigente','green','2023-05-01','2033-05-01','32.000 €','Construcciones García S.L.')],[{id:121,descripcion:'Informe control calidad',estado:'Entregado',fechaLimite:'2025-09-01'}],[{id:121,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2023-05-01',tamano:'1.3 MB'}]),
  proy(36,'PROY-2023-036','Torres del Ebro','Aragón Inmobiliaria S.L.','Zaragoza - Delicias','Poliza emitida','green','SDD + AFCA','SDD','2023-05-15','2025-11-30','6.100 m²',60,'5.300.000 €','GC',47200,[pol(3601,'SDD-2023-00134','SDD - Decenal','Zurich','Vigente','green','2023-07-01','2033-07-01','36.000 €','Aragón Inmobiliaria S.L.'),pol(3602,'AFCA-2023-00234','AFCA - Cantidades Anticipadas','Zurich','Vigente','green','2023-07-01','2025-11-30','11.200 €','Aragón Inmobiliaria S.L.')],[{id:122,descripcion:'Planos as-built',estado:'Pendiente',fechaLimite:'2025-11-01'}],[{id:122,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2023-07-01',tamano:'1.6 MB'}]),
  proy(37,'PROY-2023-037','Residencial La Rioja','Mediterráneo Homes S.L.','Logroño - Cascajos','En trámite','orange','SDD','SDD','2023-08-01','2025-12-31','3.200 m²',32,'2.700.000 €','YM',21600,[pol(3701,'SDD-2023-00198','SDD - Decenal','Mapfre','Vigente','green','2023-10-01','2033-10-01','21.600 €','Mediterráneo Homes S.L.')],[{id:123,descripcion:'Certificado inicio obra',estado:'Entregado',fechaLimite:'2023-11-01'},{id:124,descripcion:'Informe geotécnico',estado:'Pendiente',fechaLimite:'2025-06-01'}],[{id:123,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2023-10-01',tamano:'1.1 MB'}]),
  proy(38,'PROY-2024-038','Edificio Catedral','Renovación Urbana S.L.','León - Centro histórico','En trámite','orange','SDD','SDD','2024-02-01','2026-06-30','2.100 m²',20,'1.800.000 €','AL',14400,[pol(3801,'SDD-2024-00445','SDD - Decenal','AXA Seguros','Vigente','green','2024-04-01','2034-04-01','14.400 €','Renovación Urbana S.L.')],[{id:125,descripcion:'Autorización patrimonio',estado:'Entregado',fechaLimite:'2024-03-15'},{id:126,descripcion:'Planos restauración',estado:'Pendiente',fechaLimite:'2025-12-01'}],[{id:124,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2024-04-01',tamano:'1.0 MB'}]),
  proy(39,'PROY-2024-039','Urbanización Costa Verde','Costa Levante Inmuebles S.A.','Castellón - Benicàssim','En trámite','orange','SDD + AFCA','SDD','2024-04-15','2026-10-31','7.800 m²',78,'6.700.000 €','RC',56000,[pol(3901,'SDD-2024-00567','SDD - Decenal','Generali','Vigente','green','2024-06-01','2034-06-01','44.800 €','Costa Levante Inmuebles S.A.'),pol(3902,'AFCA-2024-00312','AFCA - Cantidades Anticipadas','Generali','Vigente','green','2024-06-01','2026-10-31','11.200 €','Costa Levante Inmuebles S.A.')],[{id:127,descripcion:'Informe impacto ambiental',estado:'Pendiente',fechaLimite:'2025-09-01'}],[{id:125,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2024-06-01',tamano:'1.7 MB'}]),
  proy(40,'PROY-2024-040','Complejo Retiro','Promotora Iberia S.L.','Madrid - Retiro','En trámite','orange','SDD','SDD','2024-07-01','2026-12-31','4.300 m²',42,'3.700.000 €','MF',29600,[pol(4001,'SDD-2024-00678','SDD - Decenal','Allianz','Vigente','green','2024-09-01','2034-09-01','29.600 €','Promotora Iberia S.L.')],[{id:128,descripcion:'Licencia obra mayor',estado:'Entregado',fechaLimite:'2024-08-15'},{id:129,descripcion:'Control hormigón fase 1',estado:'Pendiente',fechaLimite:'2025-10-01'}],[{id:126,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2024-09-01',tamano:'1.3 MB'}]),
  proy(41,'PROY-2025-041','Residencial Atlántico','Andalucía Desarrollos S.A.','Huelva - Centro','En trámite','orange','SDD','SDD','2025-01-15','2027-05-31','3.600 m²',36,'3.100.000 €','GC',24800,[pol(4101,'SDD-2025-00089','SDD - Decenal','Zurich','Vigente','green','2025-03-01','2035-03-01','24.800 €','Andalucía Desarrollos S.A.')],[{id:130,descripcion:'Certificado inicio obra',estado:'Entregado',fechaLimite:'2025-04-01'},{id:131,descripcion:'Informe estructura fase 1',estado:'Pendiente',fechaLimite:'2026-01-01'}],[{id:127,nombre:'Póliza SDD.pdf',tipo:'PDF',fecha:'2025-03-01',tamano:'1.2 MB'}]),
  proy(42,'PROY-2025-042','Torres Mediterráneo II','Mediterráneo Homes S.L.','Almería - Aguadulce','En trámite','orange','SDD + AFCA','SDD','2025-03-01','2027-09-30','5.400 m²',52,'4.600.000 €','YM',39200,[pol(4201,'SDD-2025-00145','SDD - Decenal','Mapfre','Vigente','green','2025-05-01','2035-05-01','28.800 €','Mediterráneo Homes S.L.'),pol(4202,'AFCA-2025-00089','AFCA - Cantidades Anticipadas','Mapfre','Vigente','green','2025-05-01','2027-09-30','10.400 €','Mediterráneo Homes S.L.')],[{id:132,descripcion:'Memoria calidades',estado:'Entregado',fechaLimite:'2025-06-01'},{id:133,descripcion:'Control cimentación',estado:'Pendiente',fechaLimite:'2025-12-01'}],[{id:128,nombre:'Pólizas.pdf',tipo:'PDF',fecha:'2025-05-01',tamano:'1.5 MB'}]),
  proy(43,'PROY-2025-043','Edificio Vega','Bilbao Desarrollos S.L.','Vitoria - Lakua','En estudio','blue','SDD','SDD','2025-05-01','2028-01-31','2.800 m²',28,'2.400.000 €','AL',0,[],[{id:134,descripcion:'Consulta urbanística',estado:'Pendiente',fechaLimite:'2025-08-01'}],[{id:129,nombre:'Memoria viabilidad.pdf',tipo:'PDF',fecha:'2025-05-10',tamano:'2.1 MB'}]),
  proy(44,'PROY-2025-044','Residencial Ebro Norte','Aragón Inmobiliaria S.L.','Zaragoza - Actur','En estudio','blue','SDD + AFCA','SDD','2025-06-01','2028-03-31','4.100 m²',40,'3.500.000 €','RC',0,[],[{id:135,descripcion:'Estudio viabilidad económica',estado:'Pendiente',fechaLimite:'2025-09-15'}],[{id:130,nombre:'Anteproyecto.pdf',tipo:'PDF',fecha:'2025-06-05',tamano:'3.4 MB'}]),
];

const proyectos = [
  ...proyectosBase,
  ...proyectosHistoricos,
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
    if (req.query.año) {
        const año = parseInt(req.query.año);
        resultado = resultado.filter((p) => new Date(p.fechaInicio).getFullYear() === año);
    }
    if (req.query.comercial) resultado = resultado.filter((p) => p.comercial === req.query.comercial);
    if (req.query.promotora) resultado = resultado.filter((p) => p.promotora === req.query.promotora);

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

// ── ESTADÍSTICAS ─────────────────────────────────────────────────────────────

app.get('/api/estadisticas', authMiddleware, (req, res) => {
  const { perfil, empresa } = req.user;
  const base = perfil === 'externo' ? proyectos.filter(p => p.promotora === empresa) : [...proyectos];

  // Proyectos por estado
  const porEstado = [
    { estado: 'Poliza emitida',     count: base.filter(p => p.estado === 'Poliza emitida').length,     color: '#22863a' },
    { estado: 'En trámite',         count: base.filter(p => p.estado === 'En trámite').length,          color: '#D97706' },
    { estado: 'En estudio',         count: base.filter(p => p.estado === 'En estudio').length,          color: '#2E75B6' },
    { estado: 'Vencimiento próximo',count: base.filter(p => p.estado === 'Vencimiento próximo').length, color: '#DC2626' },
  ];

  // Prima total
  const parsePrima = (str) => {
    // Formato español: "28.400 €" → 28400, "8.900,50 €" → 8900.50
    const limpio = str.replace(/[^0-9.,]/g, '');
    // Si tiene coma, es separador decimal; el punto es miles
    if (limpio.includes(',')) {
      return parseFloat(limpio.replace(/\./g, '').replace(',', '.')) || 0;
    }
    // Solo punto → separador de miles en español
    return parseFloat(limpio.replace(/\./g, '')) || 0;
  };

  const primaTotal = base.reduce((acc, p) => {
    return acc + p.polizas.reduce((a, pol) => parsePrima(pol.prima) + a, 0);
  }, 0);

  // Proyectos y primas por año
  const años = {};
  base.forEach(p => {
    const año = new Date(p.fechaInicio).getFullYear();
    if (!años[año]) años[año] = { año, proyectos: 0, polizas: 0, prima: 0 };
    años[año].proyectos++;
    años[año].polizas += p.polizas.length;
    años[año].prima += p.polizas.reduce((a, pol) => parsePrima(pol.prima) + a, 0);
  });
  const porAño = Object.values(años).sort((a,b) => a.año - b.año);

  // Proyectos por mes (año actual)
  const añoActual = new Date().getFullYear();
  const meses = Array.from({length:12}, (_,i) => ({
    mes: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][i],
    proyectos: 0, prima: 0
  }));
  base.filter(p => new Date(p.fechaInicio).getFullYear() === añoActual).forEach(p => {
    const m = new Date(p.fechaInicio).getMonth();
    meses[m].proyectos++;
    meses[m].prima += p.polizas.reduce((a, pol) => parsePrima(pol.prima) + a, 0);
  });

  // Proyectos por mes año anterior
  const añoAnterior = añoActual - 1;
  base.filter(p => new Date(p.fechaInicio).getFullYear() === añoAnterior).forEach(p => {
    const m = new Date(p.fechaInicio).getMonth();
    meses[m].proyectosAnt = (meses[m].proyectosAnt || 0) + 1;
  });

  // Top comerciales
  const comercialesMap = {};
  base.forEach(p => {
    if (!p.comercial) return;
    if (!comercialesMap[p.comercial]) comercialesMap[p.comercial] = { comercial: p.comercial, proyectos: 0, prima: 0 };
    comercialesMap[p.comercial].proyectos++;
    comercialesMap[p.comercial].prima += p.polizas.reduce((a, pol) => parsePrima(pol.prima) + a, 0);
  });
  const topComerciales = Object.values(comercialesMap).sort((a,b) => b.prima - a.prima);

  // Por ramo
  const ramoMap = {};
  base.forEach(p => {
    const r = p.ramo || p.tipo || 'Otros';
    if (!ramoMap[r]) ramoMap[r] = { ramo: r, proyectos: 0 };
    ramoMap[r].proyectos++;
  });
  const porRamo = Object.values(ramoMap).sort((a,b) => b.proyectos - a.proyectos);

  // Top promotoras por prima
  const promotorasMap = {};
  base.forEach(p => {
    if (!promotorasMap[p.promotora]) promotorasMap[p.promotora] = { promotora: p.promotora, proyectos: 0, prima: 0 };
    promotorasMap[p.promotora].proyectos++;
    promotorasMap[p.promotora].prima += p.polizas.reduce((a, pol) => parsePrima(pol.prima) + a, 0);
  });
  const topPromotoras = Object.values(promotorasMap).sort((a,b) => b.prima - a.prima).slice(0, 8);

  res.json({ porEstado, primaTotal: Math.round(primaTotal), porAño, porMes: meses, topComerciales, topPromotoras, porRamo, totalProyectos: base.length });
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

function validarPromotora({ nombre, cif, email, telefono }) {
  const errores = {};
  if (!nombre || nombre.trim().length < 3)
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  if (!cif || !/^[A-Z]-?\d{7}[A-Z0-9]$/i.test(cif.trim()))
    errores.cif = 'CIF inválido. Formato: B-1234567X o B1234567X';
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errores.email = 'El email no tiene un formato válido';
  if (telefono) {
    const soloDigitos = telefono.replace(/\D/g, '');
    if (soloDigitos.length !== 9)
      errores.telefono = 'El teléfono debe tener 9 dígitos';
    else if (!/^[6789]/.test(soloDigitos))
      errores.telefono = 'Debe empezar por 6, 7, 8 o 9';
  }
  return errores;
}

app.post('/api/promotoras', authMiddleware, (req, res) => {
  if (req.user.perfil === 'externo') return res.status(403).json({ error: 'Sin permiso' });
  const { nombre, cif, contacto, email, telefono, ciudad } = req.body;
  const errores = validarPromotora({ nombre, cif, email, telefono });
  if (Object.keys(errores).length > 0) return res.status(400).json({ errores });
  const cifDuplicado = promotoras.find(p => p.cif.replace('-','').toUpperCase() === cif.replace('-','').toUpperCase());
  if (cifDuplicado) return res.status(400).json({ errores: { cif: 'Ya existe una promotora con este CIF' } });
  const tel = telefono ? telefono.replace(/\D/g,'').slice(0,9) : '';
  const telFmt = tel.length === 9 ? `${tel.slice(0,3)} ${tel.slice(3,6)} ${tel.slice(6)}` : tel;
  const nueva = { id: nextPromotoraId++, nombre: nombre.trim(), cif: cif.trim().toUpperCase(), contacto: contacto?.trim() || '', email: email?.trim() || '', telefono: telFmt, ciudad: ciudad?.trim() || '' };
  promotoras.push(nueva);
  res.status(201).json(nueva);
});

app.put('/api/promotoras/:id', authMiddleware, (req, res) => {
  if (req.user.perfil === 'externo') return res.status(403).json({ error: 'Sin permiso' });
  const idx = promotoras.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'No encontrada' });
  const { nombre, cif, contacto, email, telefono, ciudad } = req.body;
  const errores = validarPromotora({ nombre, cif, email, telefono });
  if (Object.keys(errores).length > 0) return res.status(400).json({ errores });
  const cifDuplicado = promotoras.find(p => p.id !== parseInt(req.params.id) && p.cif.replace('-','').toUpperCase() === cif.replace('-','').toUpperCase());
  if (cifDuplicado) return res.status(400).json({ errores: { cif: 'Ya existe una promotora con este CIF' } });
  const tel2 = telefono ? telefono.replace(/\D/g,'').slice(0,9) : '';
  const telFmt2 = tel2.length === 9 ? `${tel2.slice(0,3)} ${tel2.slice(3,6)} ${tel2.slice(6)}` : tel2;
  promotoras[idx] = { ...promotoras[idx], nombre: nombre.trim(), cif: cif.trim().toUpperCase(), contacto: contacto?.trim() || '', email: email?.trim() || '', telefono: telFmt2, ciudad: ciudad?.trim() || '' };
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
