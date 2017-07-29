import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {

  constructor() { 
    console.log("add note!");
  }

  ngOnInit() {
  }

}
