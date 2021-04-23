import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../models/Shop';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  private url = environment.urlEndPoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllShops = async():Promise<Shop[]>=>{
    return await this.httpClient.get(`${this.url}shops`).toPromise() as Promise<Shop[]>;
  }

  createShop = async(shop:Shop):Promise<Object> =>{
    return await this.httpClient.post(`${this.url}shops`, shop).toPromise();
  }
}
