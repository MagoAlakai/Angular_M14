import { Component, OnInit } from '@angular/core';
import { ShopsService } from '../services/shops.service';
import { Shop } from './../models/Shop';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  public shops$: Promise<Shop[]> | undefined;

  constructor(
    private shopsService: ShopsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getShops();
  }

  getShops = async() =>{
    return this.shops$ = this.shopsService.getAllShops();
  }

  deleteShop = async(id: number) => {

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
        this.shopsService.deleteShop(id);
        this.enviarAlertDeleted();
      }
    }).finally(()=> this.getShops());
  }

  enviarAlertDeleted(){
    Swal.fire(
          'Deleted!',
          'Your shop has been deleted.',
          'success'
    );
  }

}
