import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ContentInterface} from "../../lesson/interfaces/content-interface";
import {MESSAGES} from "../../../constants/constants"

@Component({
  selector: 'tap-interaction',
  templateUrl: './tap-interaction.component.html',
  styleUrls: ['./tap-interaction.component.css']
})

export class TapInteractionComponent {

  @Input() lessonContent: Array<ContentInterface>;

  // this updates the upper parent to show continue button
  @Output() continueButtonVisibility = new EventEmitter();

  private htmlPlaceHolders: Array<HTMLElement>;
  private htmlContentItems: Array<HTMLElement>;

  private occupiedList: Array<HTMLElement> = [];

  private lastStoredLessonContent: Array<ContentInterface>;
  public instructionMessage: String;

  constructor() {
  }

  ngOnInit() {
    this.showMessage(MESSAGES.INSTRUCTION_MESSAGE_MATCH);
  }

  ngAfterViewChecked() {
    this.loadHtmlElements();
  }

  private loadHtmlElements() {
    this.htmlPlaceHolders = new Array<HTMLElement>();
    this.htmlContentItems = new Array<HTMLElement>();


    if (!this.lastStoredLessonContent) {
      this.lastStoredLessonContent = this.lessonContent;
    }
    if (this.lastStoredLessonContent !== this.lessonContent) {
      this.lastStoredLessonContent = this.lessonContent;
      this.occupiedList = [];
    }

    // populate array with created div holders
    for (let i=0; i<this.lessonContent.length; i++) {

      // holders (drop position item)
      let placeHolder:HTMLElement = document.body.querySelector("#placeholder" + i);
      this.htmlPlaceHolders.push(placeHolder);

      // text items (clickable ones)
      let contentItem:HTMLElement = document.body.querySelector("#content" + i);
      this.htmlContentItems.push(contentItem);
    }
  }

  public clickedOnItem(id) {
    let clickedItem:HTMLElement = this.htmlContentItems.find(item => item.dataset.id == id );

    if (clickedItem.dataset.isUsed === "true") {

      // move it back to initial position if was placed
      clickedItem.style.top = clickedItem.dataset.initialTop + "px";
      clickedItem.style.left = clickedItem.dataset.initialLeft + "px";
      clickedItem.dataset.isUsed = "false";
      // free the placeholder
      let holder = this.htmlPlaceHolders.find((item) => item.dataset.id == clickedItem.dataset.placeholderFilled);
      holder.dataset.isFilled = "false";
      clickedItem.dataset.placeholderFilled = "-1";


      // remove it from the occupied list
      this.occupiedList = this.occupiedList.filter(e => e.dataset.id !== clickedItem.dataset.id);
      this.updateContinueButtonChanges();

    } else {
      // store initial x y
      if (!clickedItem.dataset.initialTop || !clickedItem.dataset.initialLeft) {
        clickedItem.dataset.initialTop = clickedItem.offsetTop.toString();
        clickedItem.dataset.initialLeft = clickedItem.offsetLeft.toString();
      }

      // move item over the next empty placeholder
      let placeholderToMoveTo: HTMLElement = this.htmlPlaceHolders.find((item) => item.dataset.isFilled !=="true");
      placeholderToMoveTo.dataset.isFilled = "true";
      clickedItem.style.top = placeholderToMoveTo.offsetTop + "px";
      clickedItem.style.left = placeholderToMoveTo.offsetLeft + "px";
      clickedItem.style.position = "absolute";
      clickedItem.dataset.isUsed = "true";
      clickedItem.dataset.placeholderFilled = placeholderToMoveTo.dataset.id;

      // add it to the occupied list
      this.occupiedList.push(clickedItem);
      this.updateContinueButtonChanges();
    }
  }

  ngOnChanges() {
    this.showMessage(MESSAGES.INSTRUCTION_MESSAGE_MATCH);
  }

  private updateContinueButtonChanges() {
    if (this.occupiedList.length < this.htmlContentItems.length) {
      this.continueButtonVisibility.emit(false);
      this.showMessage(MESSAGES.INSTRUCTION_MESSAGE_MATCH);
    } else {

      let listIsCorrectlyCompleted: Boolean = true;

      for (let i=0; i<this.occupiedList.length; i++) {
        let item = this.occupiedList[i];
        if (item.dataset.defaultId !== item.dataset.placeholderFilled ) {
          listIsCorrectlyCompleted = false;
          break;
        }
      }

      if (listIsCorrectlyCompleted) {
        this.continueButtonVisibility.emit(true);
        this.showMessage(MESSAGES.INSTRUCTION_MESSAGE_GREAT_JOB);
      } else {
        this.continueButtonVisibility.emit(false);
        this.showMessage(MESSAGES.INSTRUCTION_MESSAGE_TRY_AGAIN);
      }
    }
  }

  private showMessage(value) {
    this.instructionMessage = value;
  }
}
