import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxSuperSelectService {
  private registeredSelectBoxIds: string[] = [];
  popupOpened$ = new Subject<string>();

  constructor() { }

  register(id: string) {
    if (this.registeredSelectBoxIds.findIndex(x => x === id) < 0) {
      this.registeredSelectBoxIds.push(id);
    }
  }

  onOpenedSelectPopup(id: string) {
    this.popupOpened$.next(id);
  }
}
