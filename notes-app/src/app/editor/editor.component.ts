import { Component, OnInit, ComponentFactory, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { NotesService } from '../notes.service';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  editorText = '';
  titleText = 'New Note';
  time = {
    day: '',
    hour: 0,
    minutes: 0,
    AMPM: 'AM'
  };
  sidebarExpanded = true;

  selectedNote: any;
  notesList = [];
  filteredNotes = [];

  @ViewChild('notesList', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('editorInput') editorInput: ElementRef;

  constructor(
    private notesService: NotesService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {

    this.notesService.createNote.subscribe(note => {
     /*  const template = NotesComponent;
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(template);
        const componentRef = factory.create(this.entry.parentInjector);
      // const componentRef = this.entry.createComponent(factory);
      // this.entry.insert(componentRef.hostView); */

      const noteObj = {
        time: this.getTime(),
        id: new Date().getTime(),
        isSelected: true,
        viewType: 'sidebar',
        titleText: 'New Note',
        textValue: ''
      };

      this.resetFocus();

      this.notesList.push(noteObj);
      this.selectedNote = noteObj;
      this.filteredNotes = this.notesList;

      /* componentRef.instance.selectNoteDOM.subscribe((noteId) => {
        // this.selectedNote = this.notesList.filter((note) => return note.id === noteId);
        this.notesList.forEach((n) => {
          if (n.id === noteId) {
            this.selectedNote = n;
            n.isSelected = true;
          } else {
            n.isSelected = false;
          }
        });
        this.editorInput.nativeElement.focus();
        console.log(this.notesList);
      }); */

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
    });

    this.notesService.sideNavbarToggle.subscribe(isExpanded => {
      console.log(isExpanded);
      this.sidebarExpanded = isExpanded;
    });

    this.notesService.searchTerm.subscribe(term => {
      if (term) {
        this.filteredNotes = this.notesList.filter(n => n.textValue.indexOf(term) > -1);
        this.resetFocus();
        if (this.filteredNotes.length > 0) {
          this.filteredNotes[0].isSelected = true;
          this.selectedNote = this.filteredNotes[0];
        } else {
          this.selectedNote.textValue = '';
        }
      } else {
        this.filteredNotes = this.notesList;
      }
    });

  }

  inputEdit = () => {
    this.selectedNote.titleText = this.selectedNote.textValue;
    this.selectedNote.time = this.getTime();

  }

  getTime = () => {
    const currentTime = new Date();
    const time = {
        hour: currentTime.getHours(),
        day: currentTime.toDateString(),
        minutes: currentTime.getMinutes(),
        AMPM: (currentTime.getHours() > 12) ? 'PM' : 'AM'
      };
    return time;
  }

  selectNote = (noteId) => {
    console.log(noteId);
    this.filteredNotes.forEach((n) => {
      if (n.id === noteId) {
        this.selectedNote = n;
        n.isSelected = true;
      } else {
        n.isSelected = false;
      }
    });
    this.editorInput.nativeElement.focus();
    console.log(this.notesList);
  }

  resetFocus = () => {
    this.filteredNotes.forEach((n) => {
      n.isSelected = false;
    });
  }

}
