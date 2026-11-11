# 🛒 Enterprise E-Commerce Backend (TypeScript)

Backend robusto desarrollado en TypeScript aplicando **arquitectura por capas**, control transaccional de inventario y gestión avanzada de carritos de compras. Diseñado para simular un entorno de producción real con manejo estricto de concurrencia y validaciones de stock.

---

## 🚀 Características Principales

* **Arquitectura Limpia y Modular:** Separación estricta de responsabilidades entre Modelos (DTOs), Capa de Datos (Repositorios), Lógica de Negocio (Servicios de Carrito y Órdenes) y Controladores de Ejecución.
* **Control de Concurrencia y Transacciones:** Validación en tiempo real del stock disponible durante el proceso de *checkout* para evitar sobreventas.
* **Manejo Estricto de Excepciones:** Control de errores de negocio personalizados (stock insuficiente, ítems inexistentes, carritos vacíos).
* **Tipado Fuerte:** Uso de TypeScript avanzado con interfaces estrictas, modificadores de acceso (`private`, `public`) y utilidades de tipos (`Omit`).

---

## 🛠️ Tecnologías Utilizadas

* **TypeScript** (Tipado estricto y programación orientada a objetos)
* **Node.js** (Entorno de ejecución)
* **Git & GitHub** (Control de versiones y flujo profesional)

---

## 📂 Estructura del Proyecto

```text
enterprise-ecommerce-backend/
│
├── ecommerceService.ts    # Entidades (Product, CartItem, Order) y Repositorio de Catálogo
├── cartService.ts         # Gestor de lógica del carrito de compras (CartManager)
├── orderService.ts        # Procesador transaccional de órdenes y control de stock
└── main.ts                # Script de pruebas integrales y simulación de flujos