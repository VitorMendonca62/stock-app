import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './page/sign-up.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessageComponent } from '../../shared/message/message.component';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MessageComponent,
  ],
  bootstrap: [SignUpComponent],
})
export class SignUpModule {}
