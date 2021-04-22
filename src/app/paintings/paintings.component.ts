import { Component, OnInit } from '@angular/core';
import { PaintingsService } from '../services/paintings.service';
import { PaintingsByShopService } from './../services/paintings-by-shop.service';
import { Painting } from './../models/Painting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {

  public paintings$: Promise<Painting[]> | undefined;
  constructor(
    private paintingsService: PaintingsService,
    private paintingsByShopService: PaintingsByShopService
  ) { }

  ngOnInit(): void {
    this.paintings$ = this.paintingsService.getAllPaintings();
  }

  deletePainting = async(id: number) => {
    if(confirm('Are you sure you want to delete this painting?')){
      this.paintingsByShopService.deletePaintingById(id)
      .then(res =>{
        this.enviarAlertDeleted();
      }).catch(err =>{
        this.errorAlertDeleted();
      }).finally(()=> this.ngOnInit());
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
