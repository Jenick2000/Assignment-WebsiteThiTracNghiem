import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {  User}from '../user';
import {  FormBuilder, Validators, FormGroup}from "@angular/forms";
import {  MustMatch}from '../_helper/must-match.validator';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    inforUser :any;
    updateForm: FormGroup;
  constructor( private userService :UsersService ,private formBuilder: FormBuilder) {
    this.inforUser =this.userService.currentUserValue;   
   }
    
  ngOnInit() {
    if(this.inforUser){
    this.updateForm = this.formBuilder.group({
      fullname: [this.inforUser.FullName, Validators.required],
      email: [this.inforUser.Email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mark: [0],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  }

  get f() {
    return this.updateForm.controls;
  }

  onSubmit(){
    if(this.updateForm.invalid){
      alert("Error. vui lòng nhập đầy đủ thông tin!")
    }else{
      let fullname = this.updateForm.get('fullname').value;
      let email = this.updateForm.get('email').value;
      let password = this.updateForm.get('password').value;
      this.userService.updateUser(this.inforUser.key,{FullName:fullname ,Email: email ,Password : password})
      alert('update suucecc...')
    }
  }
}
