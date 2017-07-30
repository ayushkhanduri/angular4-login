import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

import { LocalstorageService} from '../../shared/services/localstorage.service';
import {MdSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  username: string = "";
  password: string = "";
  titleAlert: string ="Empty/Not in the correct format";
  
  constructor(private fb: FormBuilder,private localService: LocalstorageService ,
  private snackBar: MdSnackBar,private router:Router) {
    this.rForm =fb.group({
      'username': [null,Validators.compose([Validators.email,Validators.required])],
      'password': [null,Validators.compose([Validators.required,Validators.minLength(8)])],
      'confirmPassword': [null,Validators.compose([Validators.required,Validators.minLength(8)])]
    }) 
  }
  ngOnInit() {
  }

  registerUser(e,post){
    e.preventDefault();
    console.log("balle!");
    if(post.password === post.confirmPassword){
      let userData = {
        username: post.username,
        password: post.password
      }
      this.localService.registerUser(userData,(data)=>{
        if(data){
          this.snackBar.open("User created ! Please Login again! ", "Close",{ 
            duration:2000
          });
          this.router.navigateByUrl('');
        }
      });
    }
    else{
      this.snackBar.open("Passwords do not match", "Close",{ 
          duration:2000
      });

    }
    
  }

}
