import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { signupDto } from 'src/app/Dto/signup.dto';
import { signupStart } from '../state/auth.actions';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    standalone: false
})

export class SignupComponent {

  type: string = "password";
  isText : boolean = false;
  signUpForm!:FormGroup;
  eyeIcon: IconName = 'eye-slash'; 
  
  constructor(private fb : FormBuilder, library:FaIconLibrary, private store:Store<AppState>){
    library.addIcons(faLock,faUser, faEyeSlash, faEye, faGoogle);
  }

  ngOnInit():void{
    this.signUpForm=this.fb.group({
      name:['',[Validators.required]],
      surname:['',[Validators.required]],
      email:['',[Validators.required]],
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      confirm:['',[Validators.required]]
    })
  }
  
  hideShowPass(){
    this.isText ? this.eyeIcon = "eye" : this.eyeIcon = 'eye-slash';
    this.isText ? this.type = "text" : this.type="password";
    this.isText = !this.isText;
  }

  onSignup(){
    if(this.signUpForm.valid){
      let signupDto:signupDto = this.signUpForm.value;

      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(signupStart({signupDto}))
    }else{
      this.validateAllFormsFields(this.signUpForm);
      alert("Form is incorrect");
    }
  }
  
  private validateAllFormsFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({
          onlySelf:true
        });
      }else if(control instanceof FormGroup){
        this.validateAllFormsFields(control);
      }
    })

  }
}
