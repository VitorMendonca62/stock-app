import { Component, Input } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
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
