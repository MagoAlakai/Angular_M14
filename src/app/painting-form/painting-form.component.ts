// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PaintingsByShopService } from './../services/paintings-by-shop.service';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-painting-form',
//   templateUrl: './painting-form.component.html',
//   styleUrls: ['./painting-form.component.scss']
// })
// export class PaintingFormComponent implements OnInit {

//   public paintingForm: FormGroup;

//   constructor(
//     private paintingsByShopService: PaintingsByShopService,
//     private formBuilder:FormBuilder,
//     private router:Router
//   ) {
//     this.paintingForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       price: ['', Validators.required],
//       arrival_date: ['', Validators.required],
//       author_name: ['', Validators.required],
//       tienda_id: ['', Validators.required],
//     })
//    }

//   ngOnInit(): void {
//   }

//   onSubmit = (form:FormGroup) =>{
//     console.log(form.valid);
//     console.log(form.value);
//     if(form.valid){
//       this.paintingsByShopService.createPaintingInShop(form.value)
//           .then(res =>{
//             console.log(res);
//             Swal.fire({
//               title: 'Painting Created',
//               text: 'This Painting will be added to this Painting List',
//               icon: 'success',
//               confirmButtonText: 'Ok',
//             });
//             this.router.navigateByUrl('/shops');
//           }).catch(err=>{
//             Swal.fire({
//               title: 'This Painting has not been created!',
//               text: err,
//               icon: 'error',
//               confirmButtonText: 'Ok',
//             });
//           })
//     }
//   }

// }
