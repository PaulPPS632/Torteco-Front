import { Component, OnInit } from '@angular/core';
import { ComsumeService } from '../../services/comsume.service';
import { Category } from '../../models/category';
import { CardProductComponent } from "../../components/card-product/card-product.component";

@Component({
  selector: 'app-home',
  imports: [CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  categories: Category[]=[];

  constructor(private consumeService: ComsumeService){}
  ngOnInit(): void {
    this.consumeService.relationGet('categories','products').subscribe(
      (res)=>{
        this.categories = res.data.filter((category: Category) => category.products && category.products.length > 0);
      }
    );
  }
}
