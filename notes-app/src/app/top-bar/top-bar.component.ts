import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  isExpanded = true;
  searchTerm = '';

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {

  }

  toggleSideBar = () => {
    this.isExpanded = !this.isExpanded;
    this.notesService.sideNavbarToggle.next(this.isExpanded);
  }

  deleteNote = () => {
    this.notesService.deleteNote.next(true);
  }

  createNote = () => {
    this.notesService.createNote.next(true);
  }

  search() {
    this.notesService.searchTerm.next(this.searchTerm);
  }

}
