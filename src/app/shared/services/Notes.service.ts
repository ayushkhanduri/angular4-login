import {Injectable} from '@angular/core';
import {UserData} from '../models/UserModel';
import {Notes} from '../models/NotesModel';


@Injectable()
export class NotesSevice{
    private currentNote: Notes = {
        id: this.guidGenerator(),
        heading: "",
        content: "",
    };
    private allUserNotes:any =[];
    

    constructor(){
    }

    deleteAll(){
        this.allUserNotes=[];
        this.pushToUser();
    }

    addNewNote(obj){
        obj.id=this.guidGenerator();
        if(this.allUserNotes)
            this.allUserNotes.push(
                obj
            );
        else
            this.allUserNotes = obj;
        this.pushToUser();
    }

    guidGenerator() {
        var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    setCurrentNote(obj){
        this.currentNote = obj;
    }

    returnCurrentNote(){
        return this.currentNote;
    }

    getAllNotesByUser(){
        if(this.allUserNotes.length ==0){ 
            let allUsers = this.getAllUser();
            let id = JSON.parse(localStorage.getItem("SessionUser"));
            if(allUsers){
                for(let i=0 ;i<allUsers.length;i++){
                    if(allUsers[i].id == id){
                        this.allUserNotes = allUsers[i].notes;
                        break;
                    }
                }
            }
        }
        return this.allUserNotes;
    }

    pushToUser(){
        let allUsers:UserData = this.getAllUser();
        let id = JSON.parse(localStorage.getItem("SessionUser"));
        for(let i = 0 ; i< allUsers.length;i++){
            if(allUsers[i].id == id){
                allUsers[i].notes = this.allUserNotes;
                break;
            }
        }
        localStorage.setItem("allUsers",JSON.stringify(allUsers));
    }

    updateNote(note){
        let index = this.getIndex(note);
        this.allUserNotes[index] = note;
    }

    getIndex(obj){
        let index;
        if(obj){
            for(let i=0;i<this.allUserNotes.length;i++){
                if(this.allUserNotes[i].id == obj.id){
                    index= i;
                    break;
                }
            }
        }
        return index;
    }

    deleteNote(note){
        let index = this.getIndex(note);
        this.allUserNotes.splice(index,1);
        this.pushToUser();
    }
    getAllUser(): UserData{
        return JSON.parse(localStorage.getItem("allUsers"));
    }
}