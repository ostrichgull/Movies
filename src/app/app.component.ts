import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Movies';
  description = `A basic Angular ${VERSION.full} CRUD demo using a Web Api back-end. Project setup provided by Angular CLI and styling by Bootstrap.`;

}
