import { Component, OnInit } from '@angular/core';
import {UsersService } from '../users.service';
import { map } from 'rxjs/operators';

 
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  user :any;
  constructor(private userService: UsersService) { 

  }
 
  ngOnInit() {
    this.getCustomersList();
    //this.userService.updateUser('-LqH7qCc4YhdqVT9Mb5c',{name:'Van Ty'});
  }
 
  getCustomersList() {
    //lay co key tu tao cua field
    this.user =this.userService.getUsersList().snapshotChanges()
    .pipe(map(items => {            // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, ...data};           // or {key, ...data} in case data is Obj
        
      });
    }));
  }
  deleteUsers() {
    this.userService.deleteAll().catch(err => console.log(err));
  }

}
