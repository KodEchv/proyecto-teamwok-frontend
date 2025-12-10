# TeamWork Frontend

Proyecto frontend desarrollado con Vite, React y TypeScript para el sistema de gestión de equipos TeamWork.

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   └── ProtectedRoute.tsx
├── models/             # Interfaces y tipos TypeScript
│   └── auth.model.ts
├── services/           # Servicios para llamadas API
│   ├── api.service.ts
│   ├── auth.service.ts
│   └── user.service.ts
├── store/             # Gestión de estado con Zustand
│   ├── auth.store.ts
│   └── user.store.ts
├── views/             # Vistas principales
│   ├── auth/
│   │   ├── LoginView.tsx
│   │   ├── RegisterView.tsx
│   │   └── Auth.css
│   ├── dashboard/
│   │   ├── DashboardView.tsx
│   │   ├── UserDetailView.tsx
│   │   ├── Dashboard.css
│   │   └── UserDetail.css
│   ├── Unauthorized.tsx
│   └── Unauthorized.css
├── App.tsx            # Componente principal con rutas
├── main.tsx          # Punto de entrada
└── index.css         # Estilos globales
```

## Características

- **Autenticación**: Login y registro de usuarios
- **Dashboard**: Panel de control con listado de usuarios
- **Gestión de Usuarios**: Ver, editar y eliminar usuarios (solo Admin)
- **Rutas Protegidas**: Acceso controlado según rol de usuario
- **Gestión de Estado**: Con Zustand para auth y usuarios
- **API Integration**: Comunicación con el backend mediante Axios
- **TypeScript**: Tipado completo para mayor seguridad

## Roles

- **ADMIN**: Acceso total al sistema
- **LIDER**: Acceso limitado
- **AUDITOR**: Acceso de solo lectura
- **DOCUMENTADOR**: Acceso para crear documentación
- **USUARIO**: Acceso básico

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

3. Configurar la URL del API:
```
VITE_API_URL=http://localhost:3000/api
```

## Uso

### Desarrollo
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Dependencias Principales

- **React 18**: Librería de UI
- **React Router v6**: Gestión de rutas
- **Zustand**: Gestión de estado
- **Axios**: Cliente HTTP
- **TypeScript**: Lenguaje con tipado estático

## Flujo de Autenticación

1. Usuario se registra/inicia sesión
2. Backend retorna token JWT
3. Token se almacena en localStorage
4. Axios agrega token automáticamente a cada petición
5. Rutas protegidas verifican si hay token y rol válido

## Componentes Principales

### ProtectedRoute
Protege rutas que requieren autenticación o roles específicos.

### LoginView / RegisterView
Vistas para autenticación de usuarios.

### DashboardView
Panel principal con listado de usuarios.

### UserDetailView
Detalles de usuario con opción de edición (solo Admin).

## Almacenamiento Local

Se almacenan en localStorage:
- `token`: Token JWT para autenticación
- `role`: Rol del usuario
- `userId`: ID del usuario

## Contacto y Soporte

Para más información sobre el backend, consulta el README del proyecto backend.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
