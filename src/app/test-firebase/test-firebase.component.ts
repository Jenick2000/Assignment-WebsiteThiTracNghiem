import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.component.html',
  styleUrls: ['./test-firebase.component.css']
})
export class TestFirebaseComponent implements OnInit {
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('QUIZS/ADAV').valueChanges();
  //  db.list('items').push({name:'Jenick',age: 22});
    console.log(this.items);
  }

  ngOnInit() {
    
  }

}
