import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopsService } from '../services/shops.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent implements OnInit {

  public shopForm: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private shopsService:ShopsService,
    private router:Router

  ) {
    this.shopForm = this.formBuilder.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  onSubmit = (form:FormGroup) =>{
    console.log(form.valid);
    console.log(form.value);
    if(form.valid){
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
    }
  }

}
