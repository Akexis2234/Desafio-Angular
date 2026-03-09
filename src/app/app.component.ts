import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  editing?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tienda-pulseras';
  greeting = '';
  whatsappMessage = 'Hola, quiero más información sobre tus productos.';
  selectedProduct: Product | null = null;

  private readonly adminPassword = 'holamundo';

  products: Product[] = [
    { id: 1, name: 'Pulsera Luna', description: 'Pulsera artesanal con dijes plateados.', price: 12.99, image: 'assets/OIP.jpg' },
    { id: 2, name: 'Pulsera Sol', description: 'Diseño elegante con cuentas doradas.', price: 14.5, image: 'assets/Godzilla-PNG-HD.png' },
    { id: 3, name: 'Pulsera Mar', description: 'Tonos turquesa y estilo veraniego.', price: 10.75, image: 'assets/Godzilla.jpg' },
    { id: 4, name: 'Pulsera Aurora', description: 'Combinación de colores pastel.', price: 13.2, image: 'assets/Godzilla_vs_Kong-370227109-large.jpg' },
    { id: 5, name: 'Pulsera Cristal', description: 'Acabado brillante con cristales.', price: 16.0, image: 'assets/MV5BOGFjYWNkMTMtMTg1ZC00Y2I4LTg0ZTYtN2ZlMzI4MGQwNzg4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg' },
    { id: 6, name: 'Pulsera Terra', description: 'Materiales naturales y diseño boho.', price: 11.3, image: 'assets/1t0FcqSsBs51PDhDkFd7EiEytU6.jpg' },
    { id: 7, name: 'Pulsera Perla', description: 'Perlas sintéticas con acabado clásico.', price: 18.95, image: 'assets/OIP.jpg' },
    { id: 8, name: 'Pulsera Noche', description: 'Diseño oscuro y minimalista.', price: 12.4, image: 'assets/Godzilla.jpg' },
    { id: 9, name: 'Pulsera Estrella', description: 'Detalles en forma de estrella.', price: 15.99, image: 'assets/Godzilla-PNG-HD.png' }
  ];

  ngOnInit(): void {
    this.setGreeting();
  }

  setGreeting(): void {
    const hour = new Date().getHours();

    if (hour < 12) {
      this.greeting = 'Buenos días';
    } else if (hour < 19) {
      this.greeting = 'Buenas tardes';
    } else {
      this.greeting = 'Buenas noches';
    }
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }

  requestEdit(product: Product, event: Event): void {
    event.stopPropagation();

    const password = window.prompt('Ingresa la contraseña para editar este producto:');

    if (password !== this.adminPassword) {
      window.alert('Contraseña incorrecta.');
      return;
    }

    product.editing = !product.editing;
  }

  updatePrice(product: Product, value: string): void {
    const parsedPrice = Number(value);

    if (!Number.isNaN(parsedPrice) && parsedPrice > 0) {
      product.price = parsedPrice;
    }
  }

  updateImage(product: Product, event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || !input.files[0]) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      product.image = String(reader.result);
    };
    reader.readAsDataURL(input.files[0]);
  }

  getWhatsappLink(): string {
    return `https://wa.me/?text=${encodeURIComponent(this.whatsappMessage)}`;
  }
}
