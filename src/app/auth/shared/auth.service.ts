import { Injectable} from '@angular/core';
import{ Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import 'rxjs/Rx';

const jwt = new JwtHelperService();

class DecodedToken{
  exp :number = 0;
  username: string = "";
}

@Injectable()
export class AuthService{

  private decodedToken;

  constructor(private http: HttpClient){
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }
  public register(registerData: any): Observable<any>{
    return this.http.post('/api/v1/users/register', registerData);
  }

  public login(userData: any): Observable<any>{
    return this.http.post('/api/v1/users/auth', userData).map(
      (token: string) => {
        return this.saveToken(token);
      }
    );
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');

    this.decodedToken = new DecodedToken();
  }

  private getExpiration(){
    return moment.unix(this.decodedToken.exp);
  }

  public isAuthenticated():boolean{
    return moment().isBefore(this.getExpiration());
  }

  private saveToken(token: string): string{
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public getUsername(): string{
    return this.decodedToken.username;
  }

  public getAuthToken(): string{
    return localStorage.getItem('bwm_auth');
  }
}
