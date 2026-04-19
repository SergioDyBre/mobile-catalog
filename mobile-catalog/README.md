# Mobile Catalog

Aplicación web desarrollada como solución para una prueba técnica de catálogo de smartphones. La app permite visualizar un listado de teléfonos, consultar su detalle, buscar por nombre o marca y gestionar un carrito persistente.

## Objetivo

El proyecto implementa una aplicación enfocada en la visualización, búsqueda y gestión de un catálogo de teléfonos móviles, incluyendo tres vistas principales: listado, detalle y carrito. La solución también contempla diseño responsive, accesibilidad, testing, uso de linters y una arquitectura clara y mantenible.

## Funcionalidades

- Listado inicial de los primeros 20 teléfonos obtenidos desde la API
- Buscador en tiempo real por nombre o marca usando filtrado por API
- Indicador del número de resultados encontrados
- Navegación principal con acceso a inicio y contador de productos en carrito
- Vista de detalle con imagen, marca, nombre, selectores de color y almacenamiento, y precio actualizado
- Botón de añadir al carrito habilitado solo cuando se han seleccionado color y almacenamiento
- Vista de carrito con productos añadidos, especificaciones seleccionadas, precio individual, total y opción de eliminar
- Persistencia del carrito mediante `localStorage`
- Diseño responsive

## Stack tecnológico

- React 17
- React Router
- React Context API
- Sass / CSS modular
- Jest + Testing Library
- Node 18

## Requisitos previos

Antes de arrancar el proyecto, asegúrate de tener instalado:

- Node.js 18 o superior
- npm o yarn
- Acceso a la API y uso del header `x-api-key` en cada petición

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd mobile-catalog
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Configura las variables necesarias para la API

Si estás usando un archivo `.env`, puedes definir algo parecido a esto:

```env
VITE_API_URL=<API_URL>
VITE_API_KEY=87909682e6cd74208f41a6ef39fe4191
```

Todas las peticiones a la API deben incluir el header `x-api-key`.

## Ejecución en desarrollo

```bash
npm run dev
```

o, si el proyecto está configurado con Create React App:

```bash
npm start
```

## Build de producción

```bash
npm run build
```

Si existe previsualización local de la build:

```bash
npm run preview
```

## Docker

También puedes ejecutar la aplicación usando Docker.

### Construir la imagen

```bash
docker build -t mobile-catalog .
```

### Ejecutar el contenedor

```bash
docker run -dit --name mobile-catalog -p 8080:80 mobile-catalog
```

La aplicación quedará disponible en:

```bash
http://localhost:8080
```

## Testing

Para ejecutar los tests:

```bash
npm run test
```

Si quieres cobertura:

```bash
npm run test -- --coverage
```

## Lint y formateo

Ejemplos habituales:

```bash
npm run lint
npm run format
```

## Estructura del proyecto

```bash
src/
  api/
    phoneApi.js
  components/
    Header/
      Header.jsx
    PhoneCard/
      PhoneCard.jsx
  context/
    CartContext.jsx
  pages/
    HomePage.jsx
    DetailPage.jsx
    CartPage.jsx
  styles/
    main.scss
    _variables.scss
    _reset.scss
    _header.scss
    _home.scss
    _detail.scss
    _cart.scss
  utils/
    formatPrice.js
  App.jsx
  main.jsx
```

Esta organización separa vistas, componentes reutilizables, contexto global, utilidades y estilos por secciones, lo que facilita mantenimiento y escalabilidad.

## Arquitectura

La aplicación está planteada como una SPA con tres vistas principales:

### Listado
Muestra los primeros 20 teléfonos, permite búsqueda por marca o nombre y redirige al detalle del producto seleccionado.

### Detalle
Presenta la información completa del dispositivo, variantes seleccionables y lógica de actualización de precio e imagen según configuración.

### Carrito
Gestiona productos añadidos, persistencia local, eliminación de líneas y cálculo del total.

## Gestión de estado

El carrito se gestiona con React Context API y se persiste en `localStorage` para conservar el estado entre recargas.

Responsabilidades principales del contexto:

- Añadir productos al carrito
- Eliminar una línea concreta
- Vaciar carrito si aplica
- Calcular contador total
- Mantener sincronización con `localStorage`

## Integración con la API

Todas las llamadas a la API REST deben incluir autenticación mediante el header `x-api-key`.

Ejemplo de petición:

```js
fetch(`${API_URL}/products`, {
  headers: {
    'x-api-key': API_KEY,
  },
});
```

## Decisiones de implementación

- Se usa `PhoneCard` como componente reutilizable para mantener homogéneo el render del catálogo
- El formateo de precios se centraliza en `formatPrice`
- El estado del carrito vive en contexto para evitar prop drilling
- Los estilos se separan por vista (`_home.scss`, `_detail.scss`, `_cart.scss`, etc.) para mantener el código más modular
- Se usan variables CSS para colores, spacing y tipografía

## Accesibilidad

Se ha buscado cumplir accesibilidad mediante:

- Uso de HTML semántico
- Textos alternativos en imágenes
- Estados claros en botones y enlaces
- Navegación comprensible entre vistas
- Contraste legible y estructura de encabezados consistente

## Responsive design

La interfaz se adapta a:
- Desktop
- Tablet
- Mobile

## Posibles mejoras

- Skeleton loading en listado y detalle
- Manejo visual de errores de API
- Mejoras extra de accesibilidad
- Deploy online
- SSR con Next.js

## Scripts habituales

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
npm run lint
```

## Estado del proyecto

Proyecto desarrollado con foco en:
- arquitectura clara
- componentes reutilizables
- persistencia del carrito
- estilos modulares
- cumplimiento de requisitos funcionales

## Contacto

Si quieres ampliar información del proyecto, puedes hacerlo directamente desde este repositorio.