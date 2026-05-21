# ReservaHoteles - Frontend Angular 21

## Requisitos
- Node.js 18+
- Angular CLI 21: `npm install -g @angular/cli`

## Instalación y arranque

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo
ng serve
```

La app estará disponible en: http://localhost:4200

## Conexión con el backend

El backend debe estar corriendo en http://localhost:8080

Configura la URL en: `src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## Estructura del proyecto

```
src/app/
├── components/
│   ├── navbar/        → Barra de navegación
│   ├── home/          → Dashboard con estadísticas (usa Signals)
│   ├── usuarios/      → CRUD usuarios (formulario reactivo + Signals)
│   ├── hoteles/       → CRUD hoteles (formulario reactivo + Signals)
│   ├── habitaciones/  → CRUD habitaciones (formulario reactivo + Signals)
│   └── alquileres/    → CRUD alquileres (formulario reactivo + Signals)
├── services/          → Llamadas HTTP a la API REST (Observables)
├── models/            → Interfaces TypeScript
└── environments/      → URL del backend
```

## Rutas disponibles

| Ruta            | Vista          |
|-----------------|----------------|
| /               | Dashboard      |
| /usuarios       | Usuarios       |
| /hoteles        | Hoteles        |
| /habitaciones   | Habitaciones   |
| /alquileres     | Alquileres     |

## Tecnologías usadas

- Angular 21 con componentes Standalone
- Signals para manejo de estado
- Formularios Reactivos
- Observables + HttpClient
- Router con navegación entre vistas
