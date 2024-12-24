import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ComsumeService {
  apiUrl: string = environment.API_URL+ '/api';
  token: string = environment.TOKEN;
  constructor(
    private http: HttpClient
  ) { }
  getHeaders(): HttpHeaders{
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }
  defaultGet(ruta:string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${ruta}`, {headers: this.getHeaders()});
  }
  relationGet(collection:string, relation:string){
    return this.http.get<any>(`${this.apiUrl}/${collection}?populate[${relation}][populate][0]=images`, {headers: this.getHeaders()});
  }
  pagination(category: string | null, datos: {page:number|null,pageSize:number|null,sort:boolean|null,search: string| null} | null){
    let ruta = `${this.apiUrl}/products?populate=images`
    if(category){
      ruta = `${this.apiUrl}/products?populate=images&filters[category][slug][$contains]=${category}`
    }
    
    if(datos){
      if(datos.search) ruta += `&filters[name][$contains]=${datos.search}`;
      if(datos.page) ruta += `&pagination[page]=${datos.page}`;
      if(datos.pageSize) ruta += `&pagination[pageSize]=${datos.pageSize}`;
      if(datos.sort) {
        ruta += `&sort=price:desc`
      }else{
        ruta += `&sort=price:asc`;
      }
    }

    return this.http.get<any>(ruta, {headers: this.getHeaders()});
  
  }
  getProducBySlug(slug: string): Observable<any>{
    const ruta = `${this.apiUrl}/products?filters[slug][$eq]=${slug}&populate=images`
    return this.http.get<any>(ruta, {headers: this.getHeaders()});
  }
  getProductByCategory(CategorySlug: string): Observable<any>{
    const ruta = `${this.apiUrl}/products?filters[category][slug][$contains]=${CategorySlug}&populate=images`
    return this.http.get<any>(ruta, {headers: this.getHeaders()});
  }
}
