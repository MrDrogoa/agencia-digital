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

## 🎨 Componentes Personalizables con Clases Dinámicas

### TextH1Components - Aceptar Clases desde Componentes Padres

Se implementó la capacidad de pasar clases CSS personalizadas a componentes reutilizables usando `$attrs.class`.

#### Implementación

**Componente TextH1Components.vue**
```vue
<script setup></script>

<template>
  <h1
    :class="[
      'font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold',
      $attrs.class
    ]"
  >
    <slot></slot>
  </h1>
</template>
```

#### Uso desde Componentes Padres
```vue
<TextH1Components class="text-center mb-4 text-blue-500">
  Mi Título Personalizado
</TextH1Components>
```

#### Ventajas
- ✅ **Fusión automática**: Las clases del padre se suman a las clases base
- ✅ **No hay override**: Las clases base se mantienen, solo se agregan las nuevas
- ✅ **Flexibilidad**: Cada uso del componente puede tener estilos únicos sin duplicar código
- ✅ **Vue nativo**: Usa `$attrs` sin necesidad de props adicionales

## 📐 Superposición de Contenido sobre Imágenes

### HeroAbout - Posicionamiento Absoluto

Se implementó la superposición del componente `AboutContent` sobre `AboutImg` usando posicionamiento CSS.

#### Implementación

**Componente HeroAbout.vue**
```vue
<script setup>
import AboutContent from "@/components/hero/aboutus/AboutContent.vue";
import AboutImg from "@/components/hero/aboutus/Aboutimg.vue";
</script>

<template>
  <div class="mt-8 md:mt-16 relative">
    <about-img />
    <about-content 
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
             bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl 
             max-w-2xl text-center"
    />
  </div>
</template>
```

#### Técnicas de Posicionamiento

**Opción 1 - Centrado Perfecto (Recomendado)**
```vue
<about-content 
  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
/>
```

**Opción 2 - Cubriendo Toda la Imagen**
```vue
<about-content 
  class="absolute inset-0 flex items-center justify-center p-8"
/>
```

**Opción 3 - Esquina Superior**
```vue
<about-content 
  class="absolute top-8 left-8 md:top-16 md:left-16"
/>
```

**Opción 4 - Parte Inferior**
```vue
<about-content 
  class="absolute bottom-8 left-8 right-8 md:bottom-16"
/>
```

#### Mejoras de Legibilidad

**Fondo Semi-transparente**
```vue
<about-content 
  class="absolute inset-0 bg-black/50 rounded-3xl"
/>
```

**Capa de Oscurecimiento**
```vue
<div class="mt-8 md:mt-16 relative">
  <!-- Capa oscura -->
  <div class="absolute inset-0 bg-black/40 rounded-3xl z-10"></div>
  
  <about-img />
  
  <about-content 
    class="absolute inset-0 flex items-center justify-center z-20 text-white"
  />
</div>
```

#### Claves del Posicionamiento

- 🔑 **Contenedor `relative`**: El div padre debe tener `position: relative`
- 🔑 **Hijo `absolute`**: El contenido superpuesto usa `position: absolute`
- 🔑 **Z-index**: Usa `z-10`, `z-20`, etc. para controlar el orden de apilamiento
- 🔑 **Responsive**: Ajusta padding y posiciones con breakpoints de Tailwind (`md:`, `lg:`)

## 🆕 Cambios Realizados Hoy (14 de marzo de 2026)

### Sección visual adicional en About Us

Se agregó una nueva franja visual reutilizable para la vista About Us con ícono y texto central.

#### Implementación técnica

- Se creó el componente `FillLine.vue` en `src/components/main/aboutusmain/FillLine.vue`
- Se importó `IconPhone` desde `@tabler/icons-vue`
- Se diseñó una sección responsive con:
  - Fondo azul `#1D4580`
  - Ícono de teléfono en color blanco
  - Título principal en tipografía `font-primary`
  - Escalado por breakpoints (`sm`, `md`, `lg`, `xl`)
- Se integró `FillLine` en `AboutUsComponents.vue` para renderizarlo debajo de `HeroAbout`

#### Archivos actualizados hoy

- `src/components/main/aboutusmain/FillLine.vue` (nuevo)
- `src/components/AboutUsComponents.vue` (importación y render del nuevo componente)

## 🆕 Cambios Realizados Hoy (18 de marzo de 2026)

### Sección de tarjetas en About Us

Se implementó una nueva sección visual de 3 tarjetas en la vista About Us, alineada con el diseño de referencia.

#### Implementación técnica

- Se creó el componente `CardsAboutUs.vue` con 3 tarjetas dinámicas renderizadas con `v-for`
- Se configuró un layout responsive:
  - Mobile: 1 tarjeta por fila (`w-full`)
  - Desktop: distribución en fila con Flex
- Se agregaron títulos personalizados por tarjeta:
  - Medio Ambiente
  - Diversidad Inclusión
  - Calidad
- Se aplicó superposición oscura (`bg-black/45`) para mejorar legibilidad del texto
- Se centró el texto sobre la imagen con posicionamiento absoluto y `z-index`
- Se usó `white-space: pre-line` para respetar saltos de línea en títulos de dos líneas

### Corrección de error en tiempo de ejecución

Se corrigió el error `ReferenceError: ref is not defined` en `CardsAboutUs.vue`.

#### Causa

- Se estaba usando `ref(...)` sin importar `ref` desde Vue en `<script setup>`

#### Solución aplicada

- Se agregó `import { ref } from "vue";` en el componente para habilitar la reactividad declarada

#### Archivos actualizados hoy

- `src/components/main/aboutusmain/CardsAboutUs.vue` (nuevo componente y corrección de runtime)
- `src/components/AboutUsComponents.vue` (integración de la sección de tarjetas)
- `src/views/AboutUsView.vue` (estructura de la vista con componentes de About Us)
- `src/assets/card/cardaboutus/` (imágenes de tarjetas)
- `README.md` (documentación de cambios del día)

## 🆕 Cambios Realizados Hoy (21 de marzo de 2026)

### Nuevo bloque descriptivo en About Us

Se agregó una sección de texto informativo dentro del flujo de About Us para reforzar el contexto de la página.

#### Implementación técnica

- Se creó el componente `TextAboutUs.vue` en `src/components/main/aboutusmain/TextAboutUs.vue`
- Se implementó estructura con:
  - Título principal (`h2`) centrado con tipografía `font-primary`
  - Párrafo reutilizable mediante `ParagraphComponents`
  - Espaciados y escalado responsive por breakpoints (`md`, `lg`, `xl`)
- Se integró `TextAboutUs` en `AboutUsComponents.vue` para renderizarlo debajo de la sección de tarjetas

### Archivos base creados para próximas secciones

Se dejaron creados archivos iniciales (placeholders) para continuar el desarrollo de nuevas secciones.

#### Archivos actualizados hoy

- `src/components/main/aboutusmain/TextAboutUs.vue` (nuevo componente de contenido)
- `src/components/AboutUsComponents.vue` (importación y render de `TextAboutUs`)
- `src/components/WorksComponents.vue` (archivo base creado)
- `src/components/hero/job/JobHero.vue` (archivo base creado)

## 🆕 Cambios Realizados Hoy (29 de marzo de 2026)

### Primera estructura de la vista Works

Se implementó la base de la página Works conectando la vista principal con un nuevo bloque hero reutilizable para esta sección.

#### Implementación técnica

- Se actualizó `WorksView.vue` para renderizar `WorksComponents`
- Se construyó `WorksComponents.vue` con un contenedor central (`max-w-325`) y padding responsive
- Se creó `JobHero.vue` como wrapper visual de la sección hero de Works
- Se aplicó superposición de contenido sobre imagen en `JobHero.vue` con `position: absolute` para ubicar texto en la parte inferior izquierda
- Se crearon `JobContent.vue` y `JobImg.vue` para separar responsabilidades entre contenido textual e imagen de fondo
- Se incorporó un asset SVG dedicado para esta sección (`VectorHeroJob.svg`)

#### Archivos actualizados hoy

- `src/views/WorksView.vue` (integración de `WorksComponents`)
- `src/components/WorksComponents.vue` (estructura principal de la sección Works)
- `src/components/hero/job/JobHero.vue` (composición de imagen + contenido superpuesto)
- `src/components/hero/job/JobContent.vue` (texto y layout interno del hero)
- `src/components/hero/job/JobImg.vue` (render de imagen principal)
- `src/assets/VectorHeroJob.svg` (nuevo recurso visual)

## 🆕 Cambios Realizados Hoy (30 de marzo de 2026)

### Mejoras de composición y responsive en Hero de Works

Se refinó la composición del hero de la sección Works para lograr mejor alineación del contenido, más consistencia visual y comportamiento responsive en mobile y desktop.

#### Implementación técnica

- En `JobHero.vue` se cambió el posicionamiento de `JobContent` a una capa centrada verticalmente (`absolute inset-0 flex items-center`) para una superposición más estable sobre la imagen
- En `JobContent.vue` se agregó `ButtonAllComponents` para incluir una acción visible dentro del bloque principal
- Se extrajo el texto descriptivo a la constante `contentParagraph` para mejorar legibilidad y mantenimiento del componente
- Se reestructuró el layout interno con Flex responsive (`flex-col` en mobile y `sm:flex-row` en pantallas mayores)
- Se ajustaron anchos, alineaciones y espaciados del título y párrafo para mejor distribución en distintos breakpoints
- En `JobImg.vue` se definió altura mínima en mobile (`h-70 sm:h-auto`) para mantener presencia visual de la imagen

#### Archivos actualizados hoy

- `src/components/hero/job/JobHero.vue` (nuevo contenedor de superposición centrada)
- `src/components/hero/job/JobContent.vue` (botón, texto extraído a constante y layout responsive)
- `src/components/hero/job/JobImg.vue` (ajuste de altura responsive)

## 🆕 Cambios Realizados (4 de abril de 2026)

### Estructura inicial de sección de tarjetas para Works

Se agregó una primera versión modular para la sección de cards de la vista Works, separando responsabilidades por bloques reutilizables.

#### Implementación técnica

- Se creó `CardsJobs.vue` como sección contenedora con título (`TextH2Components`) y render de `CardsJobIcons`
- Se creó `CardsJobIcons.vue` con tarjetas dinámicas renderizadas con `v-for`
- Se dejó preparado un campo de ícono por tarjeta para reemplazar el placeholder visual con íconos de librería
- Se aplicó layout responsive con Flex:
  - Mobile: 1 tarjeta por fila
  - Tablet: 2 tarjetas por fila
  - Desktop: 3 tarjetas por fila
- Se creó `CardsJobDoble.vue` como segunda sección contenedora para variantes de tarjetas con botón

#### Archivos actualizados ese día

- `src/components/main/Jobmain/CardsJobs.vue` (nuevo componente contenedor)
- `src/components/main/Jobmain/CardsJobIcons.vue` (nuevo listado dinámico de cards)
- `src/components/main/Jobmain/CardsJobDoble.vue` (nuevo componente contenedor)

## 🆕 Cambios Realizados Hoy (9 de abril de 2026)

### Integración y refinamiento de cards en Works

Se integraron nuevas secciones en el flujo principal de Works y se refinó una variante de tarjetas para que el contenido sea dinámico, responsive y alineado al diseño visual definido.

#### Implementación técnica

- En `WorksComponents.vue` se integraron `CardsJobs` y `CardsJobDoble` debajo del hero para ampliar el contenido de la vista
- En `CardsJobContent.vue` se implementó data local dinámica de 4 tarjetas (`id`, `title`, `description`, `buttonText`, `iconText`)
- Se mantuvo el `div` del ícono y el componente de botón existentes, reposicionándolos para ajustarlos a la composición visual
- Se aplicó layout con Flexbox y breakpoints responsive:
  - Mobile: 1 tarjeta por fila
  - Tablet: 2 tarjetas por fila
  - Desktop: 2+ tarjetas según ancho disponible
- Se definieron colores de diseño para consistencia visual:
  - Borde y título: `#2E5A8F`
  - Texto de párrafo: `#5C6F91`
- Se añadieron comentarios breves en el componente para mejorar mantenibilidad y lectura del código

#### Archivos actualizados hoy

- `src/components/WorksComponents.vue` (integración de nuevas secciones de cards)
- `src/components/main/Jobmain/CardsJobContent.vue` (cards dinámicas con botón e ícono)
- `src/components/main/Jobmain/CardsJobDoble.vue` (render de `CardsJobContent`)

## 🆕 Cambios Realizados Hoy (13 de abril de 2026)

### Nueva sección de carrusel en Works

Se implementó e integró un nuevo carrusel visual en la página Works, con navegación por flechas, autoplay y estructura dinámica basada en datos locales.

#### Implementación técnica

- Se creó `JobCarrusel.vue` como contenedor de sección para título + contenido del carrusel
- Se creó `JobCarruselContent.vue` con lógica dinámica usando `ref`, `onMounted` y `onUnmounted`
- Se configuró un arreglo reactivo de 3 slides reutilizando temporalmente la misma imagen `image-1.webp`
- Se implementó autoplay cada 5 segundos con reinicio automático tras interacción manual
- Se añadieron controles de navegación anterior/siguiente con `@tabler/icons-vue`
- Se aplicó layout responsive con Tailwind y Flexbox para imagen central + botones inferiores
- Se reemplazó la transición CSS local por clases utilitarias Tailwind en el componente `transition`, eliminando estilos scoped del archivo
- Se integró la nueva sección en `WorksComponents.vue` para renderizar el carrusel dentro del flujo principal de Works

#### Archivos actualizados hoy

- `src/components/WorksComponents.vue` (importación y render de `JobCarrusel`)
- `src/components/main/Jobmain/JobCarrusel.vue` (nuevo componente contenedor de sección)
- `src/components/main/Jobmain/JobCarruselContent.vue` (nuevo carrusel dinámico con autoplay y controles)

## 📅 Última Actualización

13 de abril de 2026

---

Desarrollado con ❤️ usando Vue 3 + Vite
