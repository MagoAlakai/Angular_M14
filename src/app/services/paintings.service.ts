import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Painting } from './../models/Painting';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {

  private url = environment.urlEndPoint;
  constructor(
    private httpClient: HttpClient
  ) { }

  getAllPaintings = async():Promise<Painting[]>=>{
    return await this.httpClient.get(`${this.url}paintings`).toPromise() as Promise<Painting[]>;
  }
}
