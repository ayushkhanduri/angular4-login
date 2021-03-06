import {Injectable} from '@angular/core';
import {UserData} from '../models/UserModel';
import {NotesSevice} from "./Notes.service";
@Injectable()
export class LocalstorageService{
    
    private isUserLoggedIn: boolean = false;

    constructor(private notes:NotesSevice){
    
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
                        id: this.notes.guidGenerator(),
                        heading: `Welcome Note`,
                        content: `Welcome ${obj.username}`,
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
                        id: this.notes.guidGenerator(),
                        heading: "Welcome Note",
                        content: `Welcome ${obj.username}`,
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

    uniqueNess(inputs){
        let isUserUnique = true;
        let allData = this.getAllUser();
        if(allData){
            for(let i = 0; i< allData.length;i++){
                if(allData[i].username == inputs.username){
                    isUserUnique = false;
                    break;
                }
            }
        }
        
        return isUserUnique;
    }
    checkUserAuthentication(obj,id,callback){
        let allUsers: UserData;
        allUsers = this.getAllUser();
        if(allUsers){
            if(obj){
                for(let i=0 ;i<allUsers.length;i++){
                    if(allUsers[i].username == obj.username && allUsers[i].password == obj.password){
                        this.isUserLoggedIn = true;
                        this.createSession(allUsers[i]);
                        break;   
                    }
                }

            }
            else if(id){
                for(let i=0 ;i<allUsers.length;i++){
                    if(allUsers[i].id == id){
                        this.isUserLoggedIn = true;
                        break;   
                    }
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