import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { API_CONSTS } from '../constants/constants';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LessonDataService {

  constructor(
    private http:HttpClient
  ) {
  }

  public getLessonsAPIResponse() {
    return (
      this.http.get(API_CONSTS.LESSONS_API_URL, HTTP_OPTIONS)
    );
  }
}
