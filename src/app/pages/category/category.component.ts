import { Component, Input, OnInit } from '@angular/core';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { ComsumeService } from '../../services/comsume.service';
import { CartStateService } from '../../services/cart-state.service';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [CardProductComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  @Input('slug') slug : string = '';
  products: Product[] =[];
  constructor(private route: ActivatedRoute,private consumeService: ComsumeService){}

  ngOnInit(): void {
    console.log(this.slug);
    
    this.route.params.subscribe((params) => {
      this.slug = params['slug']; // Obtén el parámetro "slug"
      this.fetchProducts();
    });
  }
  fetchProducts():void{
    this.consumeService.getProductByCategory(this.slug).subscribe(
      (res) => {
        this.products = res.data;
      }
    );
  }

}
