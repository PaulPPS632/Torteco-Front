import { Injectable } from '@angular/core';
import { CartState } from '../models/cart-state';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'cartstate';
  constructor() { 
    
  }
  save(cartState: CartState[]):void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartState));
  }
  get(): CartState[]{
    const state = localStorage.getItem(this.STORAGE_KEY);
    return state ? JSON.parse(state) : [];
  }
}
