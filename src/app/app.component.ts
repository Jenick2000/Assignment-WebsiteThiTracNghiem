import { Component } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebsiteThiTracNghiem';

  top(){
      var body = $("html, body");
      body.stop().animate({scrollTop:0}, 500, 'swing', function() { });              
  }
}
