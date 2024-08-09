import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './page/sign-in.component';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './components/message/message.component';
// import { MessageComponent } from '../../shared/message/message.component';



@NgModule({
  declarations: [SignInComponent, MessageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  bootstrap: [SignInComponent, MessageComponent]
})
export class SignInModule { }
