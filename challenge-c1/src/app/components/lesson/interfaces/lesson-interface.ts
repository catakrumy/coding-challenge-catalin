import {ContentInterface} from "./content-interface";
import {InputInterface} from "./input-interface";

export interface LessonInterface {
  id: number,
  content: Array<ContentInterface>,
  input: InputInterface,
  finished: boolean
}
