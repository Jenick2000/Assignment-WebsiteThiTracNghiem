import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
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
  }

}
