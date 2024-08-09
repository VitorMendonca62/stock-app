import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() message!: string;
  @Input() messageVisible!: boolean;
  @Input() isSucess!: boolean;

  constructor() {}
  faX = faX;

  disableMessage() {
    this.messageVisible = false;
  }
}
