import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopsService } from '../services/shops.service';
import { Router } from '@angular/router';
import { Shop } from './../models/Shop';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent implements OnInit {

  public shopForm: FormGroup;
  public shop: Promise<Shop> | undefined;
  public isEditing:boolean = true;
  private routeParamId: string| number | null = 0;

  constructor(
    private formBuilder:FormBuilder,
    private shopsService:ShopsService,
    private router:Router,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getShop();
  }

  onSubmit = (form:FormGroup) =>{
    console.log(form.valid);
    console.log(form.value);

    if(form.valid && this.isEditing == false){
      this.shopsService.createShop(form.value)
          .then(res =>{
            console.log(res);
            Swal.fire({
              title: 'Shop Created',
              text: 'This Shop will be added to the Shops List',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/shops');
          }).catch(err=>{
            Swal.fire({
              title: 'This Shop has not been created!',
              text: err,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          })
    } else if(form.valid && this.isEditing == true){
      this.shopsService.updateShop(form.value, this.routeParamId)
          .then(res =>{
            console.log(res);
            Swal.fire({
              title: 'Shop updated',
              text: 'This Shop will be updated at the Shops List',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/shops');
          }).catch(err=>{
            Swal.fire({
              title: 'This Shop has not been updated!',
              text: err,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          })
    }
  }

  getShop = async() =>{
    this.routeParamId = this.activatedRoute.snapshot!.paramMap.get('id');
    if(this.routeParamId){
      this.routeParamId = parseInt(this.routeParamId);
      if(this.routeParamId == 0){
        this.isEditing = false;
      }else{
        this.isEditing = true;
      }
      this.shopsService.getShopById(this.routeParamId)
      .then(res=>{
        this.shopForm.setValue({
          name: res.name,
          capacity: res.capacity,
        })
      }).catch(err=>{

      });
    }
  }

  enviarAlertDeleted(){
    Swal.fire(
          'Updated!',
          'This shop has been updated.',
          'success'
    );
  }

  errorAlertDeleted(){
    Swal.fire({
      title: 'This shop has not been updated',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  }

}
