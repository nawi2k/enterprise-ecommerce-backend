import { Product, CartItem } from './ecommerceService';

export class CartManager {
  private items: CartItem[] = [];

  public addItem(product: Product, quantity: number): void {
    if (product.stock < quantity) {
      throw new Error(`Stock insuficiente para '${product.title}'. Disponibles: ${product.stock}`);
    }

    const existingItem = this.items.find(item => item.product.id === product.id);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        throw new Error(`No puedes agregar más unidades. Supera el stock disponible (${product.stock}).`);
      }
      existingItem.quantity = newQuantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  public getItems(): CartItem[] {
    return this.items;
  }

  public getTotalAmount(): number {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  public clearCart(): void {
    this.items = [];
  }
}