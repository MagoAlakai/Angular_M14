import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaintingsByShopService } from './../services/paintings-by-shop.service';
import { Router } from '@angular/router';
import { Painting } from './../models/Painting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-painting-form',
  templateUrl: './painting-form.component.html',
  styleUrls: ['./painting-form.component.scss']
})
export class PaintingFormComponent implements OnInit {

  public paintingForm: FormGroup;
  public painting: Promise<Painting> | undefined;
  public isEditing:boolean = true;
  private routeParamId: string| number | null = 0;

  constructor(
    private paintingsByShopService: PaintingsByShopService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.paintingForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      arrival_date: ['', Validators.required],
      author_name: ['', Validators.required],
      tienda_id: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getPainting();
  }

  onSubmit = (form:FormGroup) =>{
    console.log(form.valid);
    console.log(form.value);
    if(form.valid && this.isEditing == false){
      this.paintingsByShopService.createPaintingInShop(form.value)
          .then(res =>{
            console.log(res);
            Swal.fire({
              title: 'Painting Created',
              text: 'This Painting will be added to this Painting List',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/paintings');
          }).catch(err=>{
            Swal.fire({
              title: 'This Painting has not been created!',
              text: err,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
    }else if(form.valid && this.isEditing == true){
      this.paintingsByShopService.updatePaintingInShop(form.value, this.routeParamId)
          .then(res =>{
            console.log(res);
            Swal.fire({
              title: 'Painting updated',
              text: 'This Shop will be updated at the Shops List',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/paintings');
          }).catch(err=>{
            Swal.fire({
              title: 'This painting has not been updated!',
              text: err,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          })
    }
  }

  getPainting = async() =>{
    this.routeParamId = this.activatedRoute.snapshot!.paramMap.get('id');
    if(this.routeParamId){
      this.routeParamId = parseInt(this.routeParamId);
      if(this.routeParamId == 0){
        this.isEditing = false;
      }else{
        this.isEditing = true;
      }
      this.paintingsByShopService.getPaintingById(this.routeParamId)
      .then(res=>{
        console.log(res);
        this.paintingForm.setValue({
          name: res.name,
          price: res.price,
          arrival_date: res.arrival_date,
          author_name: res.author_name,
          tienda_id: res.tienda_id,
        })
      }).catch(err=>{
        console.log(err);
      });
    }
  }

}
