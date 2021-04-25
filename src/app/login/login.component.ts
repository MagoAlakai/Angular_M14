import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { User } from './../models/User';
import Swal from 'sweetalert2';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public token: any;

  constructor(
    private loginService: LoginService,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

   }

  ngOnInit(): void {
  }

  onSubmit = (form:FormGroup) =>{
    console.log(form.valid);
    console.log(form.value);
    if(form.valid){
      this.loginService.getToken(form.value)
          .then(res =>{
            this.token = res;
            console.log(res);
            Swal.fire({
              title: 'Correct credentials',
              text: 'You will be redirect to your account',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.router.navigateByUrl('/shops');
          }).catch(err=>{
            Swal.fire({
              title: 'This credentials are not correct!',
              text: err,
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          });
    }
  }

}
