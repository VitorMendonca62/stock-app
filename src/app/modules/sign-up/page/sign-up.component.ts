import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: '../../sign-in/page/sign-in.component.css',
})
export class SignUpComponent implements OnInit {
  constructor(private userService: UserService) {}

  formGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  message: string = 'Nada';
  messageVisible: boolean = false;
  isSucess: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('user')) location.href = '/dashboard';
  }
  // Colocar timeout
  onSubmit() {
    if (this.formGroup.valid) {
      this.userService
        .createUser(this.formGroup.value as ICreateUser)
        .subscribe({
          next: (response) => {
            this.message = 'Usuário cadastrado com sucesso';
            this.messageVisible = true;
            this.isSucess = true;

            setTimeout(() => location.href = "/login", 1500)
          },
          error: (error) => {
            this.message = error.error.error;
            this.messageVisible = true;
            this.isSucess = true;
          
            setTimeout(() => {
              this.messageVisible = false
            }, 2500);
          },
        });
    }
  }
}
