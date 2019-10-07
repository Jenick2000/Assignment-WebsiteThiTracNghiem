import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
 
  constructor(private userService: UsersService) { }
 
  ngOnInit() {
  }
 
  updateActive(isActive: boolean) {
    this.userService
      .updateUser(this.user.Id, { active: isActive })
      .catch(err => console.log(err));
  }
 
  deleteCustomer() {
    this.userService
      .deleteUser(this.user.Id)
      .catch(err => console.log(err));
  }


}
