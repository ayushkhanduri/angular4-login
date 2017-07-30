import { Component, OnInit } from '@angular/core';
import { NotesSevice } from '../../shared/services/Notes.service';
import { LocalstorageService} from '../../shared/services/localstorage.service'
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private allNotes;

  constructor(private noteServ: NotesSevice,
  private localService: LocalstorageService,
  private router:Router,private activatedR:ActivatedRoute) { 
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(){
    this.allNotes = this.noteServ.getAllNotesByUser() || [];
    console.log(this.allNotes);
  }
  addItem(){
    let obj = {
      id: (this.allNotes)? this.allNotes.length +1 : 0,
      heading: '',
      content: ''
    };
    this.noteServ.setCurrentNote(obj);
    this.router.navigate(['addnote'],{relativeTo: this.activatedR});
  }

  deleteAll(){
    let del = confirm("Delete All items?");
    if(del)
      this.noteServ.deleteAll();
    this.getAll();
  }

  editItem(item){
    console.log(item);
    this.noteServ.setCurrentNote(item);
    this.router.navigate(['editnote',item.id],{relativeTo:this.activatedR});
  }

  deleteItem(item){
    let del = confirm("Delete the item?");
    if(del){
      this.noteServ.deleteNote(item);
    }
    this.getAll();
  }

  logout(){
    this.localService.logoutUser();
    this.router.navigate(['']);
  }
}
