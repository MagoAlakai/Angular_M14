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
    }).finally(()=> this.ngOnInit());
  }

  enviarAlertDeleted(){
    Swal.fire(
          'Deleted!',
          'Your painting has been deleted.',
          'success'
    );
  }

  errorAlertDeleted(){
    Swal.fire({
      title: 'This painting has not be deleted',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

}
