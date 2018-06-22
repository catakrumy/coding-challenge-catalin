import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LessonDataService } from "./services/lesson-data.service";
import { HttpClientModule } from '@angular/common/http';
import { LessonManagerComponent } from "./components/lesson-manager/lesson-manager.component";
import { LessonComponent } from "./components/lesson/lesson.component";
import { TapInteractionComponent } from "./components/interactions/tap-interaction/tap-interaction.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LessonComponent,
    LessonManagerComponent,
    TapInteractionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LessonDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
