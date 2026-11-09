import { ecommerceRepo, Order } from './ecommerceService';
import { CartManager } from './cartService';

export class OrderProcessor {
  // Transacción principal de compra
  public static checkout(cart: CartManager): Order {
    const items = cart.getItems();

    if (items.length === 0) {
      throw new Error("El carrito está vacío. No se puede procesar ninguna orden.");
    }

    // 1. Validación estricta de concurrencia y stock en tiempo real
    for (const item of items) {
      const currentProduct = ecommerceRepo.getProductById(item.product.id);
      
      if (!currentProduct) {
        throw new Error(`El producto con ID ${item.product.id} ya no existe en el catálogo.`);
      }

      if (currentProduct.stock < item.quantity) {
        throw new Error(`Transacción abortada: Stock insuficiente para '${currentProduct.title}'. Disponibles: ${currentProduct.stock}, solicitados: ${item.quantity}`);
      }
    }

    // 2. Descontar stock oficialmente de la base de datos simulada
    for (const item of items) {
      const currentProduct = ecommerceRepo.getProductById(item.product.id)!;
      const newStock = currentProduct.stock - item.quantity;
      ecommerceRepo.updateStock(currentProduct.id, newStock);
    }

    // 3. Generar la Orden de Compra oficial
    const newOrder: Order = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items], // Copiamos los ítems actuales
      totalAmount: cart.getTotalAmount(),
      status: 'COMPLETED',
      createdAt: new Date(),
    };

    // 4. Limpiar el carrito tras el éxito de la transacción
    cart.clearCart();

    return newOrder;
  }
}