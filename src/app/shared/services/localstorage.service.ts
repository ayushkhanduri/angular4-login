import {Injectable} from '@angular/core';
import {UserData} from '../models/UserModel';

@Injectable()
export class LocalstorageService{
    
    private isUserLoggedIn: boolean = false;

    constructor(){
    
    }
    
    registerUser(obj,callback){
        let allUsers: UserData;
        allUsers = this.getAllUser();
        if(allUsers){
            allUsers.push({
                id: allUsers.length+1,
                username:obj.username,
                password: obj.password,
                notes: [
                    {
                        id: 0,
                        heading: "",
                        content: "",
                    }
                ]
            })
        }else{
            allUsers =[{
                id: 1,
                username: obj.username,
                password: obj.password,
                notes: [
                    {
                        id: 0,
                        heading: "",
                        content: "",
                    }
                ]
            }];
        }
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
        callback(true);
    }

    getAllUser(): UserData{
        return JSON.parse(localStorage.getItem("allUsers"));
    }

    createSession(all){
        localStorage.setItem("SessionUser",all.id);
    }

    checkUserAuthentication(obj,callback){
        let allUsers: UserData;
        allUsers = this.getAllUser();
        if(allUsers){
            for(let i=0 ;i<allUsers.length;i++){
                if(allUsers[i].username === obj.username && allUsers[i].password === obj.password){
                    this.isUserLoggedIn = true;
                    this.createSession(allUsers[i]);

                }
            }
        }
        callback(this.isUserLoggedIn);
    }

    retUserState(){
        return this.isUserLoggedIn;
    }

    setLoginUser(){
        this.isUserLoggedIn = true;
    }

    logoutUser(){
        localStorage.removeItem("SessionUser");
        this.isUserLoggedIn = false;
    }
}