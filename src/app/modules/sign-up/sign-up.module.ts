import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './page/sign-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [SignUpComponent, MessageComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  bootstrap: [SignUpComponent, MessageComponent],
})
export class SignUpModule {}
