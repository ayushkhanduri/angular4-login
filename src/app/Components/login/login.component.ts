import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { StateService } from '@uirouter/angular';
import { LocalstorageService} from '../../shared/services/localstorage.service';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  post: any;
  username: string = "";
  password: string = "";
  titleAlert: string ="Empty/Not in the correct format";
  constructor(private fb: FormBuilder, private stateService: StateService,
  private localService: LocalstorageService,private snackBar: MdSnackBar) {
    this.rForm =fb.group({
      'username': [null,Validators.compose([Validators.email,Validators.required])],
      'password': [null,Validators.compose([Validators.required])]
    }) 
  }

  ngOnInit() {
  }

  loginUser(e,post){
    console.log(e);
    e.preventDefault();
    let userObject ={
      username: post.username,
      password: post.password
    };
    this.localService.checkUserAuthentication(userObject,(sessionCreated)=>{
      if(sessionCreated){
        this.snackBar.open(`User Authenticated! Welcome ${userObject.username}`,"Close",{
          duration: 2000
        });
        this.stateService.go('dashboard' ,{"id": JSON.parse(localStorage.getItem("SessionUser"))});
      }
      else{
        this.snackBar.open('Invalid Username password ! Try again',"Close",{
          duration: 2000
        })
      }
    })

    console.log(userObject);
  }

}
