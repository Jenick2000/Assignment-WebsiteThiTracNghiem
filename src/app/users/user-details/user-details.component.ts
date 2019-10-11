import { Component, OnInit, Input } from '@angular/core';
import {  AngularFireDatabase, AngularFireList}from '@angular/fire/database';
import {  map}from 'rxjs/operators';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  inforUser :any; 
  User :any;
  loading:boolean=true;
  private dbPath = '/Users';
  UsersRef: AngularFireList < User > = null;
  constructor(private userService: UsersService, private db :AngularFireDatabase) {
    this.inforUser =this.userService.currentUserValue;
    
   this.UsersRef = db.list(this.dbPath);
   this.UsersRef.snapshotChanges()
    .pipe(map(items => { // <== new way of chaining
        return items.map(a => {
            const data = a.payload.val();
            const key = a.payload.key;
            return {
                key, ...data
            }; // or {key, ...data} in case data is Obj   
        });
    })).subscribe(user => { // kiem tra user co trong database hay ko ?
        this.User = user.find(u => u.key === this.inforUser.key)       
    });
    if(this.inforUser==null){
      this.loading=false;
    }
   }
 
  ngOnInit() {
    
  }


}
