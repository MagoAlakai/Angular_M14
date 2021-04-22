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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.paintingsByShopService.deletePaintingById(id);
          this.enviarAlertDeleted();
        }
      }).finally(()=> this.getPaintings());
    }

    enviarAlertDeleted(){
      Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
      );
    }

    errorAlertDeleted(){
      Swal.fire({
        title: 'This painting can not be deleted',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

}
