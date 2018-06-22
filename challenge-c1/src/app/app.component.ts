import { Component } from '@angular/core';
import { LessonDataService } from "./services/lesson-data.service";
import { throwError } from "rxjs/internal/observable/throwError";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Mimo coding challenge';
  constructor(
  ) {

  }
}
