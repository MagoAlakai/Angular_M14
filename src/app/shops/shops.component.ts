import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../services/shops.service';
import { Shop } from './../models/Shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  public shops$: Promise<Shop[]> | undefined;

  constructor(
    private shopsService: ShopsService
  ) { }

  ngOnInit(): void {
    this.shops$ = this.shopsService.getAllShops();
    console.log(this.shops$);
  }

}
