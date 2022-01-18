import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { HomeComponent } from './home/home.component';
import { TouitComponent } from './touit/touit.component';
import { CommentComponent } from './comment/comment.component';
import { UserComponent } from './user/user.component';
import { WriteComponent } from './write/write.component';
import { TouitListComponent } from './touit/touit-list.component';
import { TouitService } from './touit/touit.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApplicationPipesModule } from './shared/application-pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { ModalComponent } from './common/modal.component';
import { ModalTriggerCloseDirective, ModalTriggerDirective } from './common/modal-trigger.directive';
import { TrendService } from './common/trend.service';
import { StateService } from './common/state.service';
import { InfiniteScrollDirective } from './common/infinite-scroll.directive';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { TrendyTouitComponent } from './trendy/trendy-touit/trendy-touit.component';
import { TouitCommentsComponent } from './touit/touit-comments/touit-comments.component';
import { InfluencersComponent } from './trendy/influencers/influencers.component';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';
import { EncryptDecryptService } from './comment/encrypt-decrypt.service';
import { MusicComponent } from './music/music/music.component';
import { CheckMusicPipe } from './common/check-music.pipe';
import { PlayMusicDirective } from './common/play-music.directive';

@NgModule({
  declarations: [
    HomeComponent,
    TouitComponent,
    CommentComponent,
    UserComponent,
    WriteComponent,
    TouitListComponent,
    ModalComponent,
    ModalTriggerDirective,
    ModalTriggerCloseDirective,
    InfiniteScrollDirective,
    CheckMusicPipe,
    SearchBarComponent,
    TrendyTouitComponent,
    TouitCommentsComponent,
    InfluencersComponent,
    UserDialogComponent,
    MusicComponent,
    PlayMusicDirective
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ApplicationPipesModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [StateService,TouitService, UserService, TrendService,EncryptDecryptService],
  bootstrap: [HomeComponent]
})
export class AppModule { }
