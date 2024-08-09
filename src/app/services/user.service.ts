import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: ICreateUser) {
    return this.http.post('http://localhost:3333/user', user);
  }

  authUser(user: ILoginUser) {
    return this.http.post<ILoginResponse>('http://localhost:3333/auth', user);
  }
}
