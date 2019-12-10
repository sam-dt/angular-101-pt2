import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  names: string[] = [];

  constructor() {}

  addName(name: string) {
    this.names.push(name);
  }
}
