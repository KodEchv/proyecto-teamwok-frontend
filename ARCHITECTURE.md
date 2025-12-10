# Arquitectura del Proyecto Frontend

## Patrón MVC Adaptado para React

El proyecto sigue una arquitectura inspirada en MVC (Modelo-Vista-Controlador), adaptada para aplicaciones React modernas:

### 1. **Modelo (Models)**
Ubicación: `src/models/`

Define las interfaces y tipos TypeScript que representan los datos de la aplicación:
- `auth.model.ts`: Define interfaces para autenticación, usuario, etc.

**Responsabilidades:**
- Definir la estructura de datos
- Validación de tipos en tiempo de compilación
- Contrato entre frontend y backend

### 2. **Vista (Views)**
Ubicación: `src/views/`

Componentes que representan las páginas/pantallas de la aplicación:
- `auth/LoginView.tsx`: Vista de inicio de sesión
- `auth/RegisterView.tsx`: Vista de registro
- `dashboard/DashboardView.tsx`: Panel principal
- `dashboard/UserDetailView.tsx`: Detalles de usuario
- `Unauthorized.tsx`: Página de no autorizado

**Responsabilidades:**
- Renderizar la interfaz
- Mostrar datos del estado
- Capturar eventos del usuario
- No contienen lógica de negocio

**Estructura:**
```
views/
├── auth/
│   ├── LoginView.tsx
│   ├── RegisterView.tsx
│   └── Auth.css
├── dashboard/
│   ├── DashboardView.tsx
│   ├── UserDetailView.tsx
│   ├── Dashboard.css
│   └── UserDetail.css
└── Unauthorized.tsx
```

### 3. **Controlador (Store/Services)**
Ubicación: `src/store/` y `src/services/`

Gestiona la lógica de la aplicación y la comunicación con el backend:

#### **Store (Zustand)**
- `auth.store.ts`: Gestiona el estado de autenticación
- `user.store.ts`: Gestiona el estado de usuarios

**Responsabilidades:**
- Centralizar el estado de la aplicación
- Manejar acciones (login, register, logout, etc.)
- Persistencia de datos en localStorage
- Manejo de errores y estados de carga

#### **Services**
- `api.service.ts`: Cliente HTTP configurado
- `auth.service.ts`: Operaciones de autenticación
- `user.service.ts`: Operaciones de usuarios

**Responsabilidades:**
- Comunicación con el API
- Transformación de datos
- Manejo de errores de red
- Autenticación en peticiones

### 4. **Componentes (Components)**
Ubicación: `src/components/`

Componentes reutilizables que no son vistas:
- `ProtectedRoute.tsx`: Protege rutas que requieren autenticación

**Responsabilidades:**
- Lógica reutilizable
- No dependen de rutas específicas
- Pueden ser usados en múltiples vistas

## Flujo de Datos

```
Vista (LoginView)
    ↓
    Evento (onClick, onSubmit)
    ↓
Store (useAuthStore)
    ↓
Service (authService)
    ↓
API (axios)
    ↓
Backend
    ↓
Response
    ↓
Store (actualiza estado)
    ↓
Vista (re-render)
```

## Gestión de Estado con Zustand

### Auth Store
```typescript
useAuthStore()
├── Estado
│   ├── token
│   ├── user
│   ├── role
│   └── isLoading
├── Acciones
│   ├── register()
│   ├── login()
│   ├── logout()
│   └── setToken()
```

### User Store
```typescript
useUserStore()
├── Estado
│   ├── users
│   ├── selectedUser
│   └── isLoading
├── Acciones
│   ├── fetchAllUsers()
│   ├── fetchUserById()
│   ├── updateUser()
│   └── deleteUser()
```

## Protección de Rutas

Las rutas están protegidas en dos niveles:

1. **ProtectedRoute Component**: Verifica si el usuario está autenticado
2. **Rol-based Access**: Verifica si el usuario tiene el rol requerido

```typescript
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole={['ADMIN']}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

## Estructura de Carpetas Completa

```
proyecto-teamwok-frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.tsx
│   ├── models/
│   │   └── auth.model.ts
│   ├── services/
│   │   ├── api.service.ts
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   ├── store/
│   │   ├── auth.store.ts
│   │   └── user.store.ts
│   ├── views/
│   │   ├── auth/
│   │   │   ├── LoginView.tsx
│   │   │   ├── RegisterView.tsx
│   │   │   └── Auth.css
│   │   ├── dashboard/
│   │   │   ├── DashboardView.tsx
│   │   │   ├── UserDetailView.tsx
│   │   │   ├── Dashboard.css
│   │   │   └── UserDetail.css
│   │   ├── Unauthorized.tsx
│   │   └── Unauthorized.css
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── .env
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Ventajas de esta Arquitectura

✅ **Separación de Responsabilidades**: Cada capa tiene una función clara
✅ **Reutilización**: Componentes y servicios reutilizables
✅ **Testabilidad**: Fácil de testear cada capa
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades
✅ **Mantenibilidad**: Código organizado y comprensible
✅ **Type Safety**: TypeScript en todas las capas

## Flujos Principales

### Flujo de Login
1. Usuario ingresa email y contraseña en LoginView
2. LoginView llama a `useAuthStore().login()`
3. Auth store llama a `authService.login()`
4. Service hace petición POST a `/api/auth/login`
5. Backend retorna token
6. Store guarda token en localStorage y estado
7. LoginView navega a `/dashboard`

### Flujo de Carga de Usuarios
1. DashboardView se monta
2. Llama a `useUserStore().fetchAllUsers()`
3. Store llama a `userService.getAllUsers()`
4. Service hace petición GET a `/api/users`
5. Backend retorna lista de usuarios
6. Store actualiza estado
7. Vista re-renderiza con la lista

## Mejores Prácticas Aplicadas

- ✅ Tipado completo con TypeScript
- ✅ Componentes funcionales con hooks
- ✅ Estado centralizado con Zustand
- ✅ Separación de logica en services
- ✅ Rutas protegidas
- ✅ Manejo de errores
- ✅ Loading states
- ✅ Variables de entorno
- ✅ Interceptores de Axios
