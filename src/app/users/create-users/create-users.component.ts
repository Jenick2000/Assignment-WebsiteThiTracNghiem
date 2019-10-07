import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

import{User} from '../user'; 
import{UsersService} from '../users.service';
import{MustMatch} from '../_helper/must-match.validator';
declare var $:any;
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
    user={
        FullName:null,
        Email:null,
        Password:null,
        Mark:0
    };
    registerForm: FormGroup;
    submitted = false;
  constructor(private userService :UsersService,private formBuilder:FormBuilder, private router: Router,) {
    
    function toggleResetPswd(e){
      e.preventDefault();
      $('#logreg-forms .form-signin').toggle() // display:block or none
      $('#logreg-forms .form-reset').toggle() // display:block or none
  }
  
  function toggleSignUp(e){
      e.preventDefault();
      $('#logreg-forms .form-signin').toggle(); // display:block or none
      $('#logreg-forms .form-signup').toggle(); // display:block or none
  }
  
  $(()=>{
      // Login Register Form
      $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
      $('#logreg-forms #cancel_reset').click(toggleResetPswd);
      $('#logreg-forms #btn-signup').click(toggleSignUp);
      $('#logreg-forms #cancel_signup').click(toggleSignUp);
  })
   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mark:[0],
      confirmPassword: ['', Validators.required]     
  }, {
    validator: MustMatch('password', 'confirmPassword') 
  });
  if(this.userService.user){
    console.log(this.userService.user.email +" email");
    }else{
      console.log("no ok")
    }
  }
  
  get f() { return this.registerForm.controls; }
  
  resetForm(){
    this.registerForm.reset();
  }
  newUser(): void {
    this.submitted = false;
    this.resetForm()
  }
 
  save() {
    this.userService.createUser(Object.assign(this.user));
    this.resetForm()
    this.router.navigate(['/']);
  }
 
  onSubmit() {
    this.user={
      FullName:this.registerForm.get('fullname').value,
        Email:this.registerForm.get('email').value,
        Password:this.registerForm.get('password').value,
        Mark:this.registerForm.get('mark').value
    }
    if (this.registerForm.valid) {
      this.submitted = true;
      this.save();
  }else alert('Đăng ký thất bại. Hãy nhập đầy đủ thông tin!');
    
  }
 
   
    
}
