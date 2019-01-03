import { Injectable} from '@angular/core';
import{ Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class AuthService{
  constructor(private http: HttpClient){

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

  private saveToken(token: string): string{
    localStorage.setItem('bwm_auth', token);
    return token;
  }
}
