import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { ComsumeService } from '../../services/comsume.service';
import { CartStateService } from '../../services/cart-state.service';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  @Input('slug') slug :string ='';
  product: Product | null =null;
  zoomStyle = {
    backgroundImage: '',
    backgroundPosition: '0% 0%',
    backgroundSize: '0%',
  };
  isZoomActive = false;
  imagenprincipal: string =''
  imagenes: string[] =[];
  apiUrl: string = environment.API_URL;
  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  constructor(private consumeService: ComsumeService, private StateService: CartStateService){}


  ngOnInit(): void {
    this.consumeService.getProducBySlug(this.slug).subscribe((res) => {
      this.product = res.data[0];
      console.log(this.product);
      this.imagenes = this.product!.images.map((imagen) => {
        // Asegúrate de que cada imagen tenga una URL completa
        return `${this.apiUrl}${imagen.url}`;
      });
    })
  }
  addToCart() {
    if(this.product){
      this.StateService.save(this.product);
    }
  }
  mostrarimg(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    this.imagenprincipal = imgElement.src;
  }
  zoomImage(event: MouseEvent) {
    this.isZoomActive = true;

    const rect = this.imageRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left; // Posición X del mouse dentro de la imagen
    const y = event.clientY - rect.top; // Posición Y del mouse dentro de la imagen

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    this.zoomStyle = {
      backgroundImage: `url(${this.imagenprincipal})`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: '200%', // Tamaño de zoom
    };
  }

  resetZoom() {
    this.isZoomActive = false;
  }
}
