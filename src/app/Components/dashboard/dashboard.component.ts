import { Component, OnInit } from '@angular/core';
import { NotesSevice } from '../../shared/services/Notes.service';
import { LocalstorageService} from '../../shared/services/localstorage.service'
import { StateService} from '@uirouter/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private allNotes;

  constructor(private noteServ: NotesSevice,private stateService:StateService,private localService: LocalstorageService) { 
  }

  ngOnInit() {
    this.allNotes = this.noteServ.getAllNotesByUser(undefined) || [];
  }

  addItem(){
    console.log("asasasd");
    let obj = {
      heading: '',
      content: ''
    };
    this.noteServ.setCurrentNote(obj);
    this.stateService.go('dashboard.add',{id: this.allNotes.length||1});
  }

  changeState(){
    this.localService.logoutUser();
    this.stateService.go('login');
  }
}
