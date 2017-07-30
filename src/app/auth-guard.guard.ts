import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LocalstorageService} from './shared/services/localstorage.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private loginService:LocalstorageService,private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let id =localStorage.getItem("SessionUser");
    let goToState: boolean = false;
    this.loginService.checkUserAuthentication(undefined,id,(val)=>{
      console.log(state.url);
      if(!val){
        console.log(state.url != String("/"));
        if(state.url != String("/") && state.url != String("/register")){
          this.router.navigateByUrl('');
          goToState = false;
        }else{
          goToState = true;
        }
      }else{ 
        if(state.url == "/" || state.url == "/register" ){
          console.log(String(JSON.parse(localStorage.getItem("SessionUser"))));
          this.router.navigate(['/dashboard/',id]);
          //this.router.navigate(['dashboard/'],{queryParams: {id: id}});
          goToState = false;
        }else{
          console.log(state.url);
          let x = state.url;
          let urlId =x.substring(x.indexOf("/dashboard/")+"/dashboard/".length,"/dashboard/".length+1);
          if (id != urlId ){
            goToState= false;
            this.router.navigate(['/dashboard/',id]);
          }else{
            goToState = true;
          }
          
        }
      }
    })
    console.log(goToState);
    return goToState;
  }
}
