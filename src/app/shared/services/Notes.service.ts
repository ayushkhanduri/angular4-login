import {Injectable} from '@angular/core';
import {UserData} from '../models/UserModel';
import {Notes} from '../models/NotesModel';


@Injectable()
export class NotesSevice{
    private allUserNotes: Notes;
    private currentNote;

    constructor(){
    }

    setCurrentNote(obj){
        this.currentNote = obj;
    }

    returnCurrentNote(){
        return this.currentNote;
    }

    getAllNotesByUser(allNotes){
        if(!this.allUserNotes){
            if(allNotes) {
                this.allUserNotes = allNotes;
            }else{
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
        }
        return this.allUserNotes;
    }

    pushANote(obj){

    }

    getAllUser(): UserData{
        return JSON.parse(localStorage.getItem("allUsers"));
    }
}