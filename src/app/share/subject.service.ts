import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  quizsRel : AngularFireObject<any>;
  quiz:   Observable<any[]>;
  nameSubject=null;
  public quizs :any;
  constructor(private db : AngularFireDatabase) { }
  getSubject(){
  return  this.db.list('Subject').valueChanges();
  }
  getQuiz(){
      this.quizsRel= this.db.object('QUIZS/'+this.nameSubject);
      this.quiz =this.quizsRel.valueChanges();
      this.quizsRel.valueChanges().subscribe(data => {
          this.quizs=data; //tra ve danh sach cau hoi
      });
  }
}
