# Frontend Agency - Proyecto Vue 3 + Vite

Sitio web moderno para agencia digital construido con Vue 3, Vite y TailwindCSS.

## 🚀 Tecnologías

- **Vue 3** - Framework JavaScript progresivo
- **Vite** - Build tool y dev server ultrarrápido
- **Vue Router** - Enrutamiento oficial de Vue
- **TailwindCSS** - Framework CSS utility-first
- **Tabler Icons** - Iconografía moderna

## 📁 Estructura del Proyecto

```
frontend-agency/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── navbar/         # Componentes del navbar
│   │   │   ├── Logo.vue
│   │   │   └── Lists.vue
│   │   ├── buttons/        # Botones personalizados
│   │   │   ├── ButtonContactComponents.vue
│   │   │   └── ButtonContactSecComponents.vue
│   │   └── ...
│   ├── views/              # Vistas/Páginas
│   │   ├── HomeView.vue
│   │   ├── AboutUsView.vue
│   │   ├── WorksView.vue
│   │   ├── SuccessView.vue
│   │   └── ContactView.vue
│   ├── router/             # Configuración de rutas
│   ├── assets/             # Recursos estáticos
│   │   └── css/           # Estilos CSS personalizados
│   └── layout/            # Layouts de la aplicación
```

## ✨ Características Implementadas

### Sistema de Variantes del Navbar

Se ha implementado un sistema dinámico de variantes para el navbar que cambia automáticamente según la ruta actual.

#### 🎨 Estilos por Vista

**Home (`/`)**
- Links de navegación: texto blanco
- Hover: fondo blanco con texto `#2E5A8F`
- Botón contacto: borde blanco, texto blanco
- Hover botón: fondo blanco, texto `#2E5A8F`

**Otras Vistas (About Us, Works, Success, Contact)**
- Links de navegación: texto `#1D4580`
- Hover: fondo `#1D4580` con texto blanco
- Botón contacto: borde `#1D4580`, texto `#1D4580`
- Hover botón: fondo `#1D4580`, texto blanco

#### 🔧 Implementación Técnica

**1. Componente Lists.vue**
```vue
<Lists variant="home" />      <!-- Para Home -->
<Lists variant="secondary" /> <!-- Para otras vistas -->
```

El componente acepta la prop `variant` que determina los estilos:
- Clases dinámicas computadas según la variante
- Transiciones suaves entre estados
- Responsive design integrado

**2. Componente NavbarComponents.vue**
```javascript
const navbarVariant = computed(() => {
  return route.path === "/" ? "home" : "secondary";
});
```

Detecta automáticamente la ruta actual usando Vue Router y aplica la variante correspondiente tanto a:
- Componente `Lists`
- Botones de contacto (`ButtonContactComponents` vs `ButtonContactSecComponents`)

**3. Botones de Contacto**
- `ButtonContactComponents.vue`: Diseño para Home
- `ButtonContactSecComponents.vue`: Diseño para vistas secundarias
- Estilos con efectos skew y transiciones suaves
- Efectos hover solo en pantallas grandes (lg+)

#### 📝 Archivos Modificados

- `src/components/NavbarComponents.vue` - Lógica de detección de ruta y renderizado condicional
- `src/components/navbar/Lists.vue` - Sistema de props y clases dinámicas
- `src/components/buttons/ButtonContactSecComponents.vue` - Estilos variante secondary
- `src/assets/css/buttons/contactsec.css` - Efectos hover y transiciones

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

## 📱 Responsive Design

El sitio está optimizado para múltiples tamaños de pantalla:
- **Mobile**: Menú hamburguesa colapsable
- **Tablet (md)**: Navbar horizontal básico
- **Desktop (lg/xl)**: Navbar completo con efectos hover

## 🎯 Convenciones de Código

- **Script Setup**: Uso de `<script setup>` para componentes Vue 3
- **Composition API**: Uso de `computed`, `ref`, y composables
- **Tailwind**: Clases utility-first con soporte para clases dinámicas
- **Props**: Validación de props con TypeScript-like patterns

## 📅 Última Actualización

7 de marzo de 2026

---

Desarrollado con ❤️ usando Vue 3 + Vite
