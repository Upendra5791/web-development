import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit{

  editorText = '';
  titleText = 'New Note';
  sidebarExpanded = true;
  selectedNote: any;
  notesList = [];
  filteredNotes = [];

  @ViewChild('notesList', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('editorInput') editorInput: ElementRef;

  constructor(
    private notesService: NotesService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {

    if (window.innerWidth < 426) {
      this.sidebarExpanded = false;
    }

    /* fetch the notes list from browser local storage during application start */
    (async () => {
      this.notesList = this.localStorageService.fetchNotesList();
      if (this.notesList && this.notesList.length > 0) {
        this.resetFocus();
        this.selectedNote = this.notesList[0];
        this.filteredNotes = this.notesList;
      } else {
        this.notesList = [];
        this.notesService.createNote.next(true);
      }
    })();

    this.notesService.createNote.subscribe(note => {
      if (note) {
        const noteObj = {
          time: Date.now(),
          id: Date.now(),
          isSelected: true,
          viewType: 'sidebar',
          titleText: 'New Note',
          textValue: ''
        };

        this.resetFocus();
        this.notesList.splice(0, 0, noteObj);
        this.selectedNote = noteObj;
        this.filteredNotes = this.notesList;
        this.updateLocalStorage();
        if (this.editorInput) {
          this.editorInput.nativeElement.focus();
        }
      }
    });

    this.notesService.deleteNote.subscribe(note => {
      if (note && this.filteredNotes.length > 1) {
        const id = this.selectedNote.id;
        const noteToBeRemoved = this.notesList.filter(n => n.id === id);
        const tbr = this.notesList.indexOf(noteToBeRemoved[0]);
        this.notesList.splice(this.notesList.indexOf(noteToBeRemoved[0]), 1);
        this.entry.remove(tbr);
        this.selectedNote = this.notesList[tbr] ? this.notesList[tbr] : this.notesList[tbr - 1];
        this.selectedNote.isSelected = true;
      }
      this.updateLocalStorage();
    });

    this.notesService.sideNavbarToggle.subscribe(isExpanded => {
      if (isExpanded !== null) {
        this.sidebarExpanded = isExpanded;
      }
    });

    this.notesService.searchTerm.subscribe(term => {
      if (term) {
        this.filteredNotes = this.notesList.filter(n => n.textValue.indexOf(term) > -1);
        this.resetFocus();
        if (this.filteredNotes.length > 0) {
          this.filteredNotes[0].isSelected = true;
          this.selectedNote = this.filteredNotes[0];
        }
      } else {
        this.filteredNotes = this.notesList;
        this.resetFocus();
        this.selectedNote = this.filteredNotes[0];
        this.selectedNote.isSelected = true;
      }
    });

  }

  ngAfterViewInit() {
    if (this.editorInput) {
      this.editorInput.nativeElement.focus();
    }
  }

  inputEdit = () => {
    this.selectedNote.titleText = this.selectedNote.textValue.substr(0, 40);
    this.selectedNote.time = Date.now();
    this.updateLocalStorage();
  }

  selectNote = (noteId) => {
    this.filteredNotes.forEach((n) => {
      if (n.id === noteId) {
        this.selectedNote = n;
        n.isSelected = true;
      } else {
        n.isSelected = false;
      }
    });
    this.editorInput.nativeElement.focus();
  }

  resetFocus = () => {
    this.filteredNotes.forEach((n) => {
      n.isSelected = false;
    });
  }

  updateLocalStorage = () => {
    this.localStorageService.updateLocalStorage(this.notesList);
  }
}
