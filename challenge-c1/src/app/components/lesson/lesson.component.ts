import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessonInterface } from "../lesson/interfaces/lesson-interface";

@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent {

  @Input() lessonData: LessonInterface;
  @Output() continueButtonActive = new EventEmitter();

  private interactionFinished = false;
  private inputFieldFinished = false;

  public userInputValue: Number;

  constructor() {
  }

  ngOnInit() {
  }

  public get lessonId() {
    return this.lessonData.id;
  }

  public get lessonContent() {
    return this.lessonData.content;
  }

  public get lessonInput() {
    return this.lessonData.input;
  }

  public continueVisibilityChanged(value) {
    this.interactionFinished = value;
    if (this.lessonInput && !this.inputFieldFinished) {
      // don't send the event further. we need to wait for input
    } else {
      this.continueButtonActive.emit(value);
    }
  }

  public updateValue(event) {
    this.userInputValue = event.target.value;

    if (this.lessonData.input) {
      let min = this.lessonInput.startIndex;
      let max = this.lessonInput.endIndex;
      if ((min < this.userInputValue) && (this.userInputValue < max)) {
        this.inputFieldFinished = true;
      } else {
        this.inputFieldFinished = false;
      }
    }

    if (this.inputFieldFinished && this.interactionFinished) {
      this.continueButtonActive.emit(true);
    } else {
      this.continueButtonActive.emit(false);
    }
  }
}
