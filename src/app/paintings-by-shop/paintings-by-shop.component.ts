import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaintingsByShopService } from './../services/paintings-by-shop.service';
import { Painting } from './../models/Painting';
import { Shop } from './../models/Shop';

@Component({
  selector: 'app-paintings-by-shop',
  templateUrl: './paintings-by-shop.component.html',
  styleUrls: ['./paintings-by-shop.component.scss']
})
export class PaintingsByShopComponent implements OnInit {

  public paintingsByShop$: Promise<Painting[]> | undefined;
  public shop$: Promise<Shop> | undefined;
  public name: string;

  constructor(
    private paintingsByShopService: PaintingsByShopService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPaintings();
  }

  getPaintings = async() => {
    let routeParamId: string| number | null = this.activatedRoute.snapshot!.paramMap.get('id');
    console.log(routeParamId);
    if(routeParamId){
      routeParamId = parseInt(routeParamId);
      this.shop$ = this.paintingsByShopService.getShop(routeParamId);
      this.name = (await this.shop$).name;
      console.log(this.name);
      this.paintingsByShop$ = this.paintingsByShopService.getPaintingsByShop(routeParamId);
      console.log(this.paintingsByShop$);
    }
  }

}
