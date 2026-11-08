export interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
}

class EcommerceRepository {
  private products: Product[] = [
    { id: 1, title: 'Notebook Gamer Pro 16"', price: 1400, stock: 5, category: 'Hardware' },
    { id: 2, title: 'Monitor Curvo 27" 144Hz', price: 350, stock: 8, category: 'Monitores' },
    { id: 3, title: 'Teclado Mecánico RGB Switch Red', price: 90, stock: 12, category: 'Periféricos' },
    { id: 4, title: 'Mouse Inalámbrico Pro G', price: 70, stock: 15, category: 'Periféricos' },
  ];

  public getAllProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }


  public updateStock(productId: number, newStock: number): void {
    const product = this.getProductById(productId);
    if (product) {
      product.stock = newStock;
    }
  }
}

export const ecommerceRepo = new EcommerceRepository();