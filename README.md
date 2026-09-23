# BlackNoise 

E-commerce móvil de ropa, desarrollado como prueba técnica para **Grupo Merpes** (Desarrollador Full Stack).

No es solo el mínimo que pedía el enunciado — le metí tiempo extra a la experiencia de usuario porque quería mostrar cómo pienso un producto completo, no solo cómo resuelvo un checklist.

---

## Qué hace la app

Es una tienda de ropa funcional de punta a punta: el usuario se registra, explora un catálogo filtrable por categorías, ve el detalle de cada producto con sus tallas, arma un carrito, paga (con dirección, teléfono y método de pago simulados) y recibe la confirmación de su pedido. También puede guardar favoritos y gestionar su perfil.

### Pantallas

| Pantalla | Qué hace |
|---|---|
| **Intro** | Splash animado con las iniciales BN, transición de fondo negro a blanco, botón de entrada |
| **Login** | Email y contraseña, con validaciones y enlace a registro |
| **Registro** | Nombre, email y contraseña, con validaciones básicas |
| **Home** | Buscador (busca productos, o te lleva directo a favoritos/carrito/perfil si escribes eso), filtro por categoría (pantalones, camisetas, chaquetas), catálogo de 9 productos |
| **Detalle de producto** | Imagen grande, descripción, selector de talla obligatorio, favorito, botón de compra |
| **Carrito** | Productos agregados con control de cantidad (+/-), total en tiempo real, botón de retroceso |
| **Checkout** | Dirección, teléfono y método de pago (tarjeta/efectivo/transferencia) — sin validación estricta, es un flujo simulado |
| **Confirmación de compra** | Resumen del pedido, datos de envío/pago, mensaje de éxito |
| **Favoritos** | Solo los productos marcados, con opción de quitarlos o llevarlos a comprar |
| **Perfil** | Datos del usuario logueado, contador de pedidos y favoritos, cerrar sesión |

Hay una **barra de navegación inferior flotante** (Home, Favoritos, Carrito, Perfil) con notificaciones (badges) que se actualizan en tiempo real cuando agregas o quitas algo del carrito o de favoritos.

---

## Stack técnico

- **Ionic 8** — componentes de interfaz
- **Angular 22** (con NgModules, no Standalone Components — lo explico más abajo)
- **Cordova** — empaquetado a APK Android nativo
- **TypeScript**
- **RxJS** (Observables, `BehaviorSubject`, `combineLatest`) para el estado reactivo del carrito, favoritos y filtros de búsqueda
- **LocalStorage** como persistencia — no usé backend, el enunciado lo dejaba opcional y prioricé tener el flujo completo sólido

No usé librerías de manejo de estado como NgRx porque para el tamaño de esta app hubiera sido sobreingeniería. Los servicios de Angular con `BehaviorSubject` ya me daban todo lo que necesitaba: una única fuente de verdad por dominio (carrito, favoritos, usuario), reactiva, sin código de más.

---

## Cómo está organizado el código

```
src/app/
├── core/
│   ├── models/      → interfaces: User, Product, CartItem, Order
│   ├── services/     → AuthService, ProductService, CartService, FavoritesService, OrderService
│   └── guards/        → AuthGuard (protege rutas si no hay sesión)
├── shared/
│   └── components/   → product-card, bottom-nav, back-button (reutilizables en toda la app)
└── pages/             → una carpeta por pantalla, cada una con su propio módulo (lazy loading)
```

La idea detrás de esto: las pantallas nunca se hablan directamente entre sí. Todo pasa por los servicios, que son singletons (`providedIn: 'root'`) y actúan como la única fuente de verdad. Por ejemplo, cuando agregas un producto al carrito desde el detalle, el `CartService` actualiza su estado interno, y automáticamente el badge del carrito en la barra inferior se entera y se actualiza — sin que nadie tenga que "avisarle" manualmente.

---

## Decisiones que tomé (y por qué)

**¿Por qué comprar obliga a pasar por el detalle del producto?**
Al principio dejé que "Comprar" desde la tarjeta del catálogo agregara directo al carrito, pero eso rompía la lógica de tallas (podías comprar sin elegir talla desde el catálogo, pero no desde el detalle). Lo unifiqué: comprar, desde cualquier parte de la app, siempre te lleva primero a elegir talla. Es una decisión de consistencia de producto, no solo de código.

**¿Por qué NgModules y no Standalone Components?**
Porque el ecosistema de Cordova todavía tiene mucho más soporte y documentación madura sobre el patrón clásico de módulos. Con el plazo que tenía, prioricé estabilidad sobre usar lo más nuevo de Angular.

**¿Por qué Ionic + Cordova y no Capacitor?**
Porque el enunciado lo pedía explícitamente. En un proyecto libre hoy recomendaría Capacitor, que es lo que el propio equipo de Ionic mantiene activamente — pero acá seguí la consigna tal cual la dieron.

**¿Por qué localStorage y no una base de datos real?**
El enunciado permitía persistencia local. Con el tiempo disponible, decidí invertir ese esfuerzo en pulir el flujo completo y la experiencia de usuario en vez de sumar la complejidad de un backend que no era obligatorio.

---

## Retos que tuve en el camino

Quiero ser honesto sobre esto porque creo que dice más de mí que si todo hubiera salido perfecto a la primera: el ecosistema de Ionic + Cordova + Angular tiene piezas que se mueven rápido y no siempre están sincronizadas entre sí. Me tocó resolver, entre otras cosas:

- Conflictos de versiones entre Angular 22 (lo último disponible al momento de generar el proyecto) y las herramientas de Cordova, que todavía no estaban preparadas para esa versión.
- Configurar desde cero el entorno nativo de Android (JDK, SDK, Gradle) sin instalar Android Studio completo, para no consumir recursos innecesarios de mi equipo.
- Un downgrade controlado de Ionic (de la 9 a la 8) porque la versión más nueva cambió su arquitectura por defecto a Standalone Components, lo cual chocaba con la decisión de usar NgModules.
- Un bug conocido y reportado del propio framework de Ionic con el nuevo motor de desarrollo de Angular (Vite), que hacía que la pantalla se quedara en blanco al reiniciar el servidor — confirmé que era un issue abierto en su repositorio oficial, no algo que yo hubiera roto.
- Zone.js desaparecido del proyecto en algún punto de los downgrades, lo cual hacía que la detección de cambios de Angular no se disparara — esto es lo que causaba que ciertas pantallas se "congelaran" visualmente aunque la lógica sí corriera bien por debajo.

Lo que más rescato de esto es que aprendí a diferenciar rápido entre "mi código tiene un bug" y "esto es un problema de configuración/versiones del entorno" — son dos tipos de debugging distintos y confundirlos hace perder mucho tiempo.

---

## Cómo correr el proyecto

```bash
npm install
ionic serve
```

La app abre en `http://localhost:8100`.

## Cómo generar el APK

```bash
ng build --configuration production
cordova build android
```

El APK queda en:
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Requisitos para compilar

- JDK 17
- Android SDK (API 36, build-tools 36.0.0)
- Gradle 8.14.2
- Cordova CLI

---

## Qué haría distinto si tuviera más tiempo

- Agregar tests unitarios (no llegué a escribirlos con el plazo que tenía, y es algo que sí haría en un proyecto real).
- Guardar la talla seleccionada dentro del `CartItem`, para que se refleje en el resumen del pedido (ahora mismo se valida que se elija una talla, pero no queda registrada en el pedido final).
- Conectar un backend real (mencionan que valoran .NET) en vez de localStorage, si el proyecto fuera a producción.
- Agregar animaciones de transición más elaboradas entre pantallas.

---

## Autor

Desarrollado por Wil como prueba técnica para Grupo Merpes.
