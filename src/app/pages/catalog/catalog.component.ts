import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComsumeService } from '../../services/comsume.service';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CardProductComponent } from "../../components/card-product/card-product.component";

@Component({
  selector: 'app-catalog',
  imports: [CardProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private consumeService: ComsumeService
  ) {}
  categories: Category[] =[];
  products: Product[] = [];
  page: number = 0;
  sort: boolean = false;
  selectedCategory: string | null = null;
  ngOnInit() {
    this.consumeService.defaultGet('categories').subscribe(
      (res) => {
        this.categories = res.data;
      }
    );
    this.updateProducts();
  }
  updateProducts(){
    this.route.queryParams.subscribe((params) => {
      const page = Number(params['page']) || 1;
      const search = params['search'] || null;
      const pageSize = params['pageSize'] || 20;
      const category = params['category'] || this.selectedCategory;
      console.log({
        page,
        search,
        pageSize,
        category
      })
      this.consumeService.pagination(category, {
        page,
        pageSize,
        sort: this.sort,
        search: search
      }).subscribe((res)=>{
        this.products = res.data
      })
    });
  }
  onCategorySelect(category: string): void {
    this.selectedCategory = category;
    this.updateProducts();
  }
  ChangeSort(){
    this.sort = !this.sort;
    this.updateProducts();
  }
}
