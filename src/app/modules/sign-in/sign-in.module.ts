import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './page/sign-in.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from '../../shared/message/message.component';
// import { MessageComponent } from '../../shared/message/message.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MessageComponent,
  ],
  bootstrap: [SignInComponent],
})
export class SignInModule {}
