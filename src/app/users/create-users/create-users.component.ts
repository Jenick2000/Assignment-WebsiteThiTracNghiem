import {  Component, OnInit}from '@angular/core';
import {  FormBuilder, Validators, FormGroup}from "@angular/forms";
import {  Router}from '@angular/router';
import {  UsersService}from '../users.service';
import {  MustMatch}from '../_helper/must-match.validator';
declare var $: any;
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {
  user = {
      FullName: null,
      Email: null,
      Password: null,
      Mark: 0
  };
  registerForm: FormGroup;
  loginForm: FormGroup;
  resetPasswordForm :FormGroup;
  submitted = false;
  loadingLogin = false;
  loadingReset :boolean = false;
  isAlert :boolean = false;
  constructor(public userService: UsersService, private formBuilder: FormBuilder, private router: Router, ) {
   
      function toggleResetPswd(e) {
          e.preventDefault();
          $('#logreg-forms .form-signin').toggle() // display:block or none
          $('#logreg-forms .form-reset').toggle() // display:block or none
      }

      function toggleSignUp(e) {
          e.preventDefault();
          $('#logreg-forms .form-signin').toggle(); // display:block or none
          $('#logreg-forms .form-signup').toggle(); // display:block or none
      }

      $(() => {
          // Login Register Form
          $('#logreg-forms #forgot_pswd').click(toggleResetPswd);
          $('#logreg-forms #cancel_reset').click(toggleResetPswd);
          $('#logreg-forms #btn-signup').click(toggleSignUp);
          $('#logreg-forms #cancel_signup').click(toggleSignUp);
      })
  }

  ngOnInit() {
    
       // kiem loi form bang formGroup
      this.registerForm = this.formBuilder.group({
          fullname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          mark: [0],
          confirmPassword: ['', Validators.required]
      }, {
          validator: MustMatch('password', 'confirmPassword')
      });
      this.loginForm = this.formBuilder.group({
          emailLogin: [null, [Validators.required, Validators.email]],
          passwordLogin: [null, [Validators.required, Validators.minLength(6)]]
      })
      this.resetPasswordForm = this.formBuilder.group({
          email : [null , [Validators.required, Validators.email]]
      })
  }

  get f() {
      return this.registerForm.controls;
  }
  get loginF() {
      return this.loginForm.controls;
  }
  get resetF(){
      return this.resetPasswordForm.controls;
  }
  resetForm() {
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
  onLogin() {
     
      if (this.loginForm.invalid) {
          alert('Login thất bại. Hãy nhập đầy đủ thông tin!')
          
      } else {
          $('#btn_login').attr("disabled", true);
          this.loadingLogin = true;
          let email = this.loginForm.get('emailLogin').value;
          let password = this.loginForm.get('passwordLogin').value
          this.userService.authentication(email, password);  
                  
        //   setTimeout(()=>{     
        //     if(this.userService.userLogin){
        //         this.isAlert =true;
        //         $('#isAlert').text("login fail !"); 
        //     }          
        //   },4500)
        //   setTimeout(()=>{
        //     this.isAlert =false;
        //   },6000)   
      }
      setTimeout(() => {
          $('#btn_login').attr("disabled", false);
          this.loadingLogin = false; 
      }, 4500) 
  }
  onSubmit() {
      this.user = {
          FullName: this.registerForm.get('fullname').value,
          Email: this.registerForm.get('email').value,
          Password: this.registerForm.get('password').value,
          Mark: this.registerForm.get('mark').value
      }
      if (this.registerForm.valid) {
          this.submitted = true;
          this.save();
      } else alert('Đăng ký thất bại. Hãy nhập đầy đủ thông tin!');

  }
  onResetPassword(){
      if(this.resetPasswordForm.invalid){
          alert("Error , try again ! ")
      }else{
          this.loadingReset=true
          let email = this.resetPasswordForm.get('email').value;
          this.userService.resetPasswor(email);
          setTimeout(()=>{this.loadingReset=false},3000)
      }
  }
}