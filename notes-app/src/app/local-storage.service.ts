import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
const STORAGE_KEY = 'notes-list';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) { }

  fetchNotesList() {
    return this.storage.get(STORAGE_KEY);
  }

  updateLocalStorage(notesList) {
    console.log(notesList);
    this.storage.set(STORAGE_KEY, notesList);
  }
}
