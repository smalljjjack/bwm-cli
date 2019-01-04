import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
    selector:"bwm-header",
    templateUrl:"./head.component.html",
    styleUrls:["./head.component.scss",]
})

export class HeaderComponent {
  constructor(private auth: AuthService, private router: Router){

  }

  private logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
