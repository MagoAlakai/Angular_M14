import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Shop } from './../models/Shop';
import { Painting } from './../models/Painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingsByShopService {

  private url = environment.urlEndPoint;

  constructor(
    private httpClient: HttpClient
  ) {}

  getShop = async(id:number):Promise<Shop>=>{
    return await this.httpClient.get(`${this.url}shops/${id}`).toPromise() as Promise<Shop>;
  }

  getPaintingsByShop = async(id:number):Promise<Painting[]>=>{
    return await this.httpClient.get(`${this.url}shops/${id}/paintings`).toPromise() as Promise<Painting[]>;
  }
}
