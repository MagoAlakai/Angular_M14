import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.urlEndPoint;

  constructor(
    private httpClient: HttpClient
  ) { }

  getToken = async(loginUser:User):Promise<Object> =>{
    return await this.httpClient.post(`${this.url}login`, loginUser ).toPromise();
  }
}
