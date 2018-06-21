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
    private lessonDataService: LessonDataService
  ) {
    lessonDataService.getLessonsAPIResponse().subscribe(
      data => {
        console.log("====> API RECEIVED: ", data);
        return true;
      },
      error => {
        console.error("[ERROR] There is a problem getting lessons from API");
        return throwError(error);
      }
    )
  }
}
