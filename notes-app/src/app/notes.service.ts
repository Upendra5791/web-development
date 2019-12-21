import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  public sideNavbarToggle = new BehaviorSubject<any>(true);
  public createNote = new BehaviorSubject<any>(false);
  public deleteNote = new BehaviorSubject<any>(false);
  public searchTerm = new BehaviorSubject<any>(null);

  constructor() { }
}
