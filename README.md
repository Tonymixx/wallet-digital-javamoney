# 📱 Wallet Digital - Curso JavaScript

¡Bienvenido a mi Wallet Digital! Este es un proyecto interactivo que simula el comportamiento de una billetera bancaria virtual. Fue desarrollado como parte de mi proceso de aprendizaje en JavaScript, aplicando conceptos avanzados de manipulación del DOM, persistencia de datos y modularización.

## 🚀 Características del Proyecto
* **Autenticación Simulada:** Validación de credenciales con control de sesión activo.
* **Gestión de Saldo:** Operaciones matemáticas precisas para depósitos y transferencias.
* **Control de Sobregiro:** Validación lógica para impedir transferencias si no hay fondos suficientes.
* **Historial Interactivo:** Listado de movimientos filtrable por categorías sin recargar la página.
* **Persistencia Local:** Uso de `LocalStorage` para mantener tus datos a salvo si recargas el sitio.

## 🛠️ Tecnologías Utilizadas
* **HTML5 & CSS3** - Estructura y estilos personalizados.
* **Bootstrap 5** - Diseño responsivo y componentes interactivos (Modales y Acordeones).
* **jQuery 3.7.1** - Animaciones fluidas, captura de eventos y renderizado dinámico.
* **JavaScript (ES6)** - Lógica financiera y manipulación de estructuras de datos (Arrays, JSON).

## 📁 Estructura de Archivos
```text
├── 📄 login.html / js/login.js               -> Control de acceso y sesión
├── 📄 menu.html / js/menu.js                 -> Panel de control del usuario
├── 📄 deposit.html / js/deposit.js           -> Módulo para recargar fondos
├── 📄 sendmoney.html / js/sendmoney.js       -> Módulo para enviar dinero a terceros
└── 📄 transactions.html / js/transactions.js -> Historial y filtros de actividad