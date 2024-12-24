import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CartState } from '../../models/cart-state';
import { CartStateService } from '../../services/cart-state.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,CartItemComponent, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  estadopayment = 'CARRITO';
  CreateIOpen = false;
  CartStates: CartState [] = [];
  message = '';
  total: number = 0;
  @ViewChild('carrito') divcarrito!: ElementRef;
  @ViewChild('datos') divdatos!: ElementRef;
  @ViewChild('pagar') divpagar!: ElementRef;
  data = {
    amount: 100,
    currency: 'PEN',
    orderId: 'ORDER-',
    customer: {
      email: '',
      billingDetails: {
        firstName: '',
        lastName: '',
        cellPhoneNumber: '',
        address: '',
        district: 'Ficus',
        city: 'Santa Anita',
        state: 'Lima',
        country: 'PE',
        identityCode: '',
        identityType: 'DNI',
      },
    },
  };
  constructor(private StateService: CartStateService){}
  ngOnInit(): void {
    this.StateService.getState().subscribe(res => this.CartStates = res);
    this.StateService.getTotalPrice().subscribe(res => {this.data.amount = res*100;
      this.total = res;
    });
  }

  onRemove(state: CartState) {
    this.StateService.remove(state);
  }

  onIncrease(state: CartState) {
    this.StateService.save(state.product);
  }

  onDecrease(state: CartState) {
    this.StateService.decrease(state);
  }
  openCIModal() {
    this.CreateIOpen = !this.CreateIOpen;
  }
  checkCartItems(){
    if(this.CartStates.length > 0){
      this.estadopayment = 'DATOS';
      this.divcarrito.nativeElement.classList.add('activate');
      this.divdatos.nativeElement.classList.add('activate');
      this.divpagar.nativeElement.classList.remove('activate');
    }else{
      this.openCIModal();
    }
    
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.estadopayment = 'PAYMENT';
    }
  }
  Regresar() {
    this.estadopayment = 'CARRITO';
    this.divcarrito.nativeElement.classList.add('activate');
    this.divdatos.nativeElement.classList.remove('activate');
    this.divpagar.nativeElement.classList.remove('activate');
  }
  Regresar2() {
    this.estadopayment = 'DATOS';
    this.divcarrito.nativeElement.classList.add('activate');
    this.divdatos.nativeElement.classList.add('activate');
    this.divpagar.nativeElement.classList.remove('activate');
  }

  onContinue(form: NgForm) {
    if (form.valid) {
      this.estadopayment = 'PAYMENT';
      this.divcarrito.nativeElement.classList.add('activate');
      this.divdatos.nativeElement.classList.add('activate');
      this.divpagar.nativeElement.classList.add('activate');
    } 
  }
  ProcesoPagoTarjeta(){

  }
}
