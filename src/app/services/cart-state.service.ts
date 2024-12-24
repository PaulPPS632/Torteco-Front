import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { StorageService } from './storage.service';
import { CartState } from '../models/cart-state';

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  private cartSubject: BehaviorSubject<CartState[]> = new BehaviorSubject<CartState[]>([]);

  constructor(private storageService: StorageService) { 
    const state = this.storageService.get() || [];;
    this.cartSubject.next(state);
  }
  save(product: Product): void{
    const currentState  = this.cartSubject.value;
    const existingCartState  = currentState.find((state) => state.product.documentId === product.documentId);
    let updatedState: CartState[];
    if(existingCartState ){
      updatedState = currentState.map(state =>
        state.product.documentId === product.documentId
          ? {
              ...state,
              quantity: state.quantity + 1,
              total: state.total + product.price
            }
          : state
      );
    }else{
      const newCartState: CartState = {
        product,
        quantity: 1,
        total: product.price
      };
      updatedState = [...currentState, newCartState];
    }
    this.saveUpdate(updatedState);
  }
  remove(cartState: CartState): void{
    const stateActual = this.cartSubject.value;
    const updateState = stateActual.filter((state) => state.product.documentId !== cartState.product.documentId)
    this.saveUpdate(updateState);
  }
  decrease(cartState: CartState): void{
    const currentState  = this.cartSubject.value;
    const existingCartState  = currentState.find((state) => state.product.documentId === cartState.product.documentId);
    let updatedState: CartState[];
    if(existingCartState){
      if(cartState.quantity >= 1){
        const updatedState = currentState.map(state =>
          state.product.documentId === cartState.product.documentId
            ? {
                ...state,
                quantity: state.quantity - 1,
                total: state.total - cartState.product.price
              }
            : state
        );
        this.saveUpdate(updatedState);
      }else{
        this.remove(cartState);
      }
    }
  }
  getTotalQuantity(): Observable<number> {
    return this.cartSubject.asObservable().pipe(
      map(cartStates => 
        cartStates.reduce((total, cartState) => total + cartState.quantity, 0)
      )
    );
  }
  getTotalPrice(): Observable<number>{
    return this.cartSubject.asObservable().pipe(
      map(cartStates => 
        cartStates.reduce((total, cartState) => total + cartState.total, 0)
      )
    );
  }
  getState(): Observable<CartState[]> {
    return this.cartSubject.asObservable();
  }
  private saveUpdate(UpdateCartState: CartState[]): void{
    this.cartSubject.next(UpdateCartState);
    this.storageService.save(UpdateCartState);
  }
}
