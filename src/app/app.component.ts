import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'bwm-cli';
  componentTitle = "I am app component from components.ts";

  clickHandler(){
    alert("Clicked");
  }

}
