import { Component, OnInit } from '@angular/core';
import * as data from '../../assets/subject.json';
import { AngularFireDatabase } from '@angular/fire/database';
import{ Observable} from 'rxjs';
import { SubjectService} from '../share/subject.service'
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  subject :Observable<any[]>;
  constructor(private subjectService : SubjectService ,private db: AngularFireDatabase,) { 
    this.subject= this.subjectService.getSubject();
    this.subject.subscribe(items =>{
      this.data = items;
    })
  }
  data=[];
  limit=8;
  xemthem:boolean=true;
  p: number = 1;
  Page:any;
  PageArray=[];
  ngOnInit() {
    // phan trang
    setTimeout(()=>{
      this.Page=Math.ceil(this.data.length/6);
      for(let i=0;i<this.Page;i++){
         this.PageArray[i]=i+1;
      }
    },3000)
 
  }
  
  xemthemDS(){
      this.limit+=5;
      if(this.limit>= this.data.length)
        this.xemthem=false;
  }
  next(){
      if(this.p < this.data.length/6){
        this.p++;
      }
  }
  setCurrent(page){
    this.p=page;
  }
  previous(){
    if(this.p >1)this.p--;
  }
  isFirstPage(){
    if(this.p==1)return true;
  }
  isLastPage(){
    if(this.p===this.Page) return true;
  }
}
