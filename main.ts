import { ecommerceRepo } from './ecommerceService';
import { CartManager } from './cartService';
import { OrderProcessor } from './orderService';

console.log("=== INICIO DE PRUEBAS: ENTERPRISE E-COMMERCE BACKEND ===");

// 1. Ver catálogo inicial
console.log("\n1. Catálogo disponible en el sistema:");
console.log(ecommerceRepo.getAllProducts());

// 2. Inicializar el carrito de compras del usuario
const myCart = new CartManager();

// 3. Seleccionar productos y agregarlos al carrito
const laptop = ecommerceRepo.getProductById(1)!; // Notebook Gamer
const mouse = ecommerceRepo.getProductById(4)!;   // Mouse Pro G

console.log("\n2. Agregando productos al carrito...");
myCart.addItem(laptop, 1); // Agregamos 1 Notebook
myCart.addItem(mouse, 2);   // Agregamos 2 Mouses

console.log("Ítems actuales en el carrito:", myCart.getItems());
console.log("Monto total a pagar: $", myCart.getTotalAmount());

// 4. Procesar la orden de compra exitosa
try {
  console.log("\n3. Procesando el checkout y pago de la orden...");
  const order = OrderProcessor.checkout(myCart);
  console.log("✅ ¡Orden generada con éxito!");
  console.log(order);
} catch (error: any) {
  console.error("❌ Error en la transacción:", error.message);
}

// 5. Verificar stock actualizado tras la compra
console.log("\n4. Estado del stock en el catálogo tras la compra:");
console.log(ecommerceRepo.getAllProducts());

// 6. Prueba de fallo: Intentar comprar más stock del disponible (Concurrencia / Validación)
console.log("\n5. Simulando fallo por stock insuficiente...");
const secondCart = new CartManager();
const monitor = ecommerceRepo.getProductById(2)!; // Monitor (stock: 8)

try {
  secondCart.addItem(monitor, 10); // Intentamos pedir 10 cuando hay 8
} catch (error: any) {
  console.error("⚠️ Excepción controlada correctamente:", error.message);
}

console.log("\n=== FIN DE LAS PRUEBAS INTEGRALES ===");