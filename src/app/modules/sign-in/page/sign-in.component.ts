import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sign-in',

  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  constructor(private userService: UserService) {}

  formGroup = new FormGroup({
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
    if (localStorage.getItem("token")) {
      location.href = "/dashboard"
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.userService.authUser(this.formGroup.value as ILoginUser).subscribe({
        next: (response: ILoginResponse) => {
          this.message = 'Usuário logado com sucesso';
          this.messageVisible = true;
          this.isSucess = true;

          localStorage.setItem('token', response.token);
          // location.href = "/dashboard"
        },
        error: (error) => {
          this.message = error.error.error;
          this.messageVisible = true;
          this.isSucess = false;

          setTimeout(() => {
            this.messageVisible = false
          }, 2500);
        },
      });
    }
  }
}
