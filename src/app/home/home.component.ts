import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/subject.json';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  data=[];
  limit=8;
  xemthem:boolean=true;
  ngOnInit() {
    this.data= data.subject;
    console.log("danh sach mon hoc");
    console.log(this.data);
    $('.my_list li').click(function(){
      $(this).text("lolo");
    })
  }
  xemthemDS(){
      this.limit+=5;
      if(this.limit>= this.data.length)
        this.xemthem=false;
  }

}
