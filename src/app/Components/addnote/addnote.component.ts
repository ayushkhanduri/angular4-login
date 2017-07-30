import { Component, OnInit } from '@angular/core';
import {NotesSevice} from '../../shared/services/Notes.service';
import {FormBuilder,FormGroup,Validators } from '@angular/forms';
import {Notes} from '../../shared/models/NotesModel';
import {Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {
  itemId: number;
  selectedNote :any;
  rForm: FormGroup;
  post: any;
  heading: string = "";
  content: string = "";
  titleAlert: string ="Can not be Empty";
  constructor(private fb: FormBuilder,
  private noteServ:NotesSevice,
  private router:Router,private activate:ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedNote = this.noteServ.returnCurrentNote();
    console.log(this.selectedNote);
    this.rForm =this.fb.group({
      'heading': [this.selectedNote.heading,Validators.compose([Validators.required])],
      'content': [this.selectedNote.content,Validators.compose([Validators.required])]
    })
    this.activate.params.subscribe((params: Params) => {
        this.itemId = params['itemid'];
      }); 
  }

  submitNote(e,post){
    e.preventDefault();
    let obj ={
      id: this.selectedNote.id,
      heading: post.heading,
      content: post.content
    }
    if(!this.itemId){
      this.noteServ.addNewNote(obj);
    }else {
      this.noteServ.updateNote(obj);
    }
    this.router.navigate(['dashboard/',JSON.parse(localStorage.getItem("SessionUser"))]);
  }

}
