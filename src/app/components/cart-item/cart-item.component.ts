import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartState } from '../../models/cart-state';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit{
  @Input() CartState!: CartState;
  @Output() Remove = new EventEmitter<CartState>();
  @Output() Increase = new EventEmitter<CartState>();
  @Output() Decrease = new EventEmitter<CartState>();
  apiUrl: string = environment.API_URL;
  imagen: string = '';
  constructor(){
    
  }
  ngOnInit(): void {
    if (this.CartState.product?.images) {
      // Si product tiene un campo de imágenes, mapear las URLs
      this.imagen = this.CartState.product.images.map((imagen) => {
        // Asegúrate de que cada imagen tenga una URL completa
        return `imagen.url`;
      })[0];
    }
  }
  handleDecrease() {
    if (this.CartState.quantity > 0) {
      this.Decrease.emit(this.CartState);
    }
  }

  handleIncrease() {
    this.Increase.emit(this.CartState);
  }

  handleRemove() {
    this.Remove.emit(this.CartState);
  }
}
