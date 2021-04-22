import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaintingsByShopService } from './../services/paintings-by-shop.service';
import Swal from 'sweetalert2';

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
  public shopId: number;

  constructor(
    private paintingsByShopService: PaintingsByShopService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPaintings();
  }

  getPaintings = async() => {
    let routeParamId: string| number | null = this.activatedRoute.snapshot!.paramMap.get('id');
    if(routeParamId){
      routeParamId = parseInt(routeParamId);
      this.shopId = routeParamId;
      this.shop$ = this.paintingsByShopService.getShop(routeParamId);
      this.name = (await this.shop$).name;
      this.paintingsByShop$ = this.paintingsByShopService.getPaintingsByShop(routeParamId);
    }
  }

    deleteAllPaintings = async() => {
      this.paintingsByShop$ = this.paintingsByShopService.deletePaintings(this.shopId);
      this.enviarAlertAllDeleted();
    }

    enviarAlertAllDeleted(){
      Swal.fire({
        title: 'Paintings deleted',
        text: 'All paintings from this shop have been burned!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    }

    deletePainting = async(id: number) => {
      if(confirm('Are you sure you want to delete this painting?')){
        this.paintingsByShopService.deletePaintingById(id)
        .then(res =>{
          this.enviarAlertDeleted();
        }).catch(err =>{
          this.errorAlertDeleted();
        }).finally(()=> this.getPaintings())
      }
    }

    enviarAlertDeleted(){
      Swal.fire({
        title: 'Painting deleted',
        text: 'This painting from this shop has been burned!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    }

    errorAlertDeleted(){
      Swal.fire({
        title: 'This painting can not be deleted',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

}
