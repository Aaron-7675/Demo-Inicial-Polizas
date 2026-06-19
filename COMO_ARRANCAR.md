# Demo — Gestión de Pólizas

## Requisitos
- Node.js instalado (versión 18 o superior)
- pnpm instalado (`npm install -g pnpm`)

## Cómo arrancar (desarrollo)

Necesitas abrir **dos terminales**.

### Terminal 1 — Backend (API)

```bash
cd demo/backend
pnpm install
node server.js
```

El backend arranca en http://localhost:3001

### Terminal 2 — Frontend (Web)

```bash
cd demo/frontend
pnpm install
pnpm run dev
```

La web arranca en http://localhost:3000

## Cómo arrancar (modo rápido — archivos compilados)

### Terminal 1 — Backend

```bash
cd demo/backend
pnpm install
node server.js
```

### Terminal 2 — Frontend compilado

```bash
cd demo/frontend
pnpm run build
pnpm dlx serve dist -p 3000
```

## Usuarios de prueba

| Usuario | Contraseña | Acceso                                        |
| ------- | ---------- | --------------------------------------------- |
| admin   | demo123    | Administrador — acceso completo               |
| gestor  | demo123    | Gestor interno                                |
| externo | demo123    | Portal empresa externa (solo sus expedientes) |

## Lo que muestra la demo

- Login con 3 perfiles diferentes
- Dashboard con estadísticas en tiempo real
- Lista de proyectos con búsqueda y filtros
- Ficha de proyecto con pestañas: Pólizas, Condicionantes, Documentos
- Vista de empresa externa (solo ve sus propios proyectos)
