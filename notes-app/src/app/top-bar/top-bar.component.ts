import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {

    this.notesService.sideNavbarToggle.subscribe(bar => {

    });

  }

  toggleSideBar = () => {
    this.notesService.sideNavbarToggle.next(true);
  }

  deleteNote = () => {
    this.notesService.deleteNote.next(true);
  }

  createNote = () => {
    this.notesService.createNote.next(true)
    
  }

}
