import { Component } from '@angular/core';
import{UsersService} from '../../src/app/users/users.service';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebsiteThiTracNghiem';
  constructor(private userService :UsersService){}
  top(){
      var body = $("html, body");
      body.stop().animate({scrollTop:0}, 500, 'swing', function() { });              
  }
}
