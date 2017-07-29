import {UIRouter} from "@uirouter/angular";
import {Injector, Injectable} from "@angular/core";
import {LocalstorageService} from './shared/services/localstorage.service'

export function uiRouterConfigFn(router: UIRouter,injector: Injector,){ 
    router.urlService.rules.otherwise({ state: 'login' });   
    let criteria = { to: 'dashboard.**' };
    router.transitionService.onBefore(criteria,(stateTrans)=>{
        const localService = injector.get(LocalstorageService);

        let UserId =JSON.parse(localStorage.getItem("SessionUser"));
        if(UserId)
            localService.setLoginUser();
        
        let stateTo = String(stateTrans.$to().name);
        console.log(stateTo);
        let isLoggedIn = localService.retUserState();
        console.log("is logged in : ",isLoggedIn);
        if(isLoggedIn){
            if(stateTo == "register" || stateTo == "login"){
                console.log("to dashboard");
                return stateTrans.router.stateService.target('dashboard',{id: UserId},{
                    source: 'unknown'
                });
            }
        }
        else if(!isLoggedIn){
            if(stateTo != "register" || stateTo != String("login")){
                console.log("redirect to login!");
                return stateTrans.router.stateService.target('login',null);
            }
        }
    });
}