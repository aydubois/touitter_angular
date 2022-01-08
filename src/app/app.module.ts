import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { TouitComponent } from './touit/touit.component';
import { CommentComponent } from './comment/comment.component';
import { UserComponent } from './user/user.component';
import { WriteComponent } from './write/write.component';
import { TouitListComponent } from './touit/touit-list.component';
import { TouitService } from './touit/touit.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    TouitComponent,
    CommentComponent,
    UserComponent,
    WriteComponent,
    TouitListComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule
  ],
  providers: [TouitService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
