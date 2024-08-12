import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',

  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent  {
  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}

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


  onSubmit() {
    if (this.formGroup.valid) {
      this.userService.authUser(this.formGroup.value as ILoginUser).subscribe({
        next: (response: ILoginResponse) => {
          this.message = 'Usuário logado com sucesso';
          this.messageVisible = true;
          this.isSucess = true;

          this.cookieService.set('AUTH_USER', response.token, { expires: 30 });
          setTimeout(() => {
            location.href = '/dashboard';
          }, 1500);
        },
        error: (error) => {
          this.message = error.error.error;
          this.messageVisible = true;
          this.isSucess = false;

          setTimeout(() => {
            this.messageVisible = false;
          }, 2500);
        },
      });
    }
  }
}
