import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, of, Observable } from "rxjs";
import {
  catchError,
  tap,
  map,
  switchMap,
  mergeMap,
  concatMap,
  toArray,
  filter,
  first
} from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  todoUrl = "https://jsonplaceholder.typicode.com/todos";
  userUrl = "https://jsonplaceholder.typicode.com/users";

  index=-1;

  // Simple map doesn't work
  todosForUsers0$ = of(1, 2, 3, 4)
  .pipe(
    map(id => this.http.get<ToDo[]>(`${this.todoUrl}?userId=${id}`)),
    tap(item => console.log('After map', JSON.stringify(item)))
  );

  // Higher-order operators
  // To really see the affect of these ... use the Network tab and set to Slow 3G

  // concatMap processes items serially (one at a time)
  todosForUsers1$ = of(1, 2, 3, 4)
  .pipe(
    concatMap(id => this.http.get<ToDo[]>(`${this.todoUrl}?userId=${id}`)),
    tap(item => console.log('After concatMap', JSON.stringify(item) ))
  );

  // mergeMap processes items concurrently
  todosForUsers2$ = of(1, 2, 3, 4)
  .pipe(
    mergeMap(id => this.http.get<ToDo[]>(`${this.todoUrl}?userId=${id}`)),
    tap(item => console.log('After mergeMap', JSON.stringify(item) ))
  );

  // switchMap switches to the newest Observable
  todosForUsers3$ = of(1, 2, 3, 4)
  .pipe(
    switchMap(id => this.http.get<ToDo[]>(`${this.todoUrl}?userId=${id}`)),
    tap(item => console.log('After switchMap', JSON.stringify(item) ))
  );

  constructor(private http: HttpClient) { }

  setIndex(index: number): void {
    this.index = index;
  }
}

export interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}
