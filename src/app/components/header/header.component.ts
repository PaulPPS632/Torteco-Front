import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ComsumeService } from '../../services/comsume.service';
import { Category } from '../../models/category';
import { CartStateService } from '../../services/cart-state.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  isMenuOpen= false;
  categories: Category[] =[];
  quantityProducts: number = 0;
  constructor(private consumeService: ComsumeService, private StateService: CartStateService,private router: Router){}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  ngOnInit(): void {
    this.consumeService.defaultGet('categories').subscribe(
      (res) => {
        this.categories = res.data;
      }
    );
    this.StateService.getTotalQuantity().subscribe((res)=> this.quantityProducts = res);
  }
  search(event: Event){
    const inputElement = event.target as HTMLInputElement;
    const currentSearch = inputElement.value === '' ? null: inputElement.value;  
    const queryParams = {
      page: 1,
      search: currentSearch
    };
    this.router.navigate(['catalog'], {
      //relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge' // O 'preserve' si quieres mantener los parámetros existentes
    });
  }
}
