import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  createUser(user: ICreateUser) {
    return this.http.post(`${API_URL}user`, user);
  }

  authUser(user: ILoginUser) {
    return this.http.post<ILoginResponse>(`${API_URL}auth`, user);
  }

  isAuth() {
    return !!this.cookieService.get('AUTH_USER');
  }
}
