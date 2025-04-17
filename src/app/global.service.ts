import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  headerScrolled: boolean = true;
  constructor() {}
  checkScroll(flag: boolean) {
    this.headerScrolled = flag;
    console.log(this.headerScrolled);
  }
}
