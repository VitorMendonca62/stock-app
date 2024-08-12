import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate() {
    if (this.userService.isAuth()) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate() {
    if (this.userService.isAuth()) {
      this.router.navigate(['dashboard']);
      return false;
    }

    return true;
  }
}

