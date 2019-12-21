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

  selectedNote: NotesComponent = new NotesComponent();
  notesList = [];

  @ViewChild('notesList', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('editorInput') editorInput: ElementRef;

  constructor(
    private notesService: NotesService,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {

    this.notesService.createNote.subscribe(note => {
      const template = NotesComponent;
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(template);
      const componentRef = this.entry.createComponent(factory);

      componentRef.instance.time = this.time = this.getTime();
      componentRef.instance.id = new Date().getTime();

      this.selectedNote = componentRef.instance;
      if (this.editorInput) {
        this.editorInput.nativeElement.focus();
      }
      this.notesList.push(componentRef.instance);
      console.log(this.notesList);

      componentRef.instance.selectNoteDOM.subscribe((noteId) => {
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
      });

    });

    this.notesService.deleteNote.subscribe(note => {
      if (note && this.notesList.length > 1) {
        const id = this.selectedNote.id;
        const noteToBeRemoved = this.notesList.filter(note => note.id === id);
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

}
