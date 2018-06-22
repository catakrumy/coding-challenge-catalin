import { Component } from '@angular/core';
import { LessonDataService } from "../../services/lesson-data.service";
import { throwError } from "rxjs/internal/observable/throwError";
import { LessonInterface } from "../lesson/interfaces/lesson-interface";
import { ContentInterface } from "../lesson/interfaces/content-interface";
import { InputInterface } from "../lesson/interfaces/input-interface";

@Component({
  selector: 'lesson-manager',
  templateUrl: './lesson-manager.component.html',
  styleUrls: ['./lesson-manager.component.css']
})

export class LessonManagerComponent {

  public visibleLesson: Boolean;
  public showFinishText: Boolean;
  public showContinueButton: Boolean;

  public currentLesson: LessonInterface;
  public lessonsProgress: Number = 0;

  private lessonDataService;
  private lessonsArray: Array<LessonInterface>;

  constructor(
    private lessonService: LessonDataService
  ) {
    this.lessonDataService = lessonService;
  }

  ngOnInit() {
    this.getAPIData();
  }

  getAPIData() {

    this.lessonDataService.getLessonsAPIResponse().subscribe(
      data => {

        // saving lesson data using interfaces (for easier autocomplete)
        this.lessonsArray = new Array<LessonInterface>();

        // parse all lessons
        data["lessons"].map( (item) => {

          // lesson content
          let contentArr = new Array<ContentInterface>();
          item.content.map( (content, index) => {
            let ci: ContentInterface = {
              color: content.color,
              text: content.text,
              defaultOrderId: index,
              orderId: index
            };
            contentArr.push(ci);
          });

          // lesson input
          let input: InputInterface = item.input ? {
            startIndex: item.input.startIndex,
            endIndex: item.input.endIndex
          } : null;

          // full lesson info
          let lesson: LessonInterface = {
            id: item.id,
            content: contentArr,
            input: input,
            finished: false
          };

          this.lessonsArray.push(lesson);
        });

        // start lessons
        this.init();

        return true;
      },
      error => {
        console.error("[ERROR] There is a problem getting lessons from API");
        return throwError(error);
      }
    )
  }

  private init() {
    // put the first lesson default:
    this.currentLesson = this.lessonsArray[0];
    this.visibleLesson = true;
  }

  public clickContinue() {
    this.currentLesson.finished = true;
    this.showContinueButton = false;

    // get next lesson
    let newLesson: LessonInterface = this.lessonsArray.find(lesson => !lesson.finished);

    if (newLesson) {
      this.currentLesson = newLesson;
    } else {
      this.showFinishText = true;
    }
    this.updateProgress();
  }

  public continueButtonStateUpdate(value) {
    this.showContinueButton = value;
  }

  private updateProgress() {
    let finishedLessons = 0;
    this.lessonsArray.map((lesson) => {
      if (lesson.finished) {
        finishedLessons++
      }
    });
    this.lessonsProgress = Math.round(finishedLessons / this.lessonsArray.length * 100);
  }
}
