import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environments';
import { CartStateService } from '../../services/cart-state.service';
import { CartState } from '../../models/cart-state';
import Swal from 'sweetalert2'
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-card-product',
  imports: [RouterLink],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() product: Product | null = null;
  apiUrl: string = environment.API_URL;
  imagenes: string[]=[];
  constructor(private StateService: CartStateService){}
  Agregar(){
    if(this.product){
      this.StateService.save(this.product);
      Swal.fire({
        title: "Registrado",
        text: "se agrego correctamente",
        icon: "success"
      });
    }
  }
}
