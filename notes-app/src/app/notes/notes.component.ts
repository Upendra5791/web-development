import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() id = 0;
  @Input() viewType = 'sidebar';
  @Input() textValue = '';
  @Input() titleText = 'New Note';
  @Input() time = {
    hour: 0,
    minutes: 0,
    AMPM: 'AM'
  };
  @Input() isSelected = false;
  @Output() selectNoteDOM = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  selectNote() {
    this.selectNoteDOM.emit(this.id);
  }

}
