import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { EditorComponent } from './editor/editor.component';
import { NotesComponent } from './notes/notes.component';
import { FormsModule } from '@angular/forms';
import { NoteTitlePipe } from './note-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EditorComponent,
    NotesComponent,
    NoteTitlePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NotesComponent]
})
export class AppModule { }
