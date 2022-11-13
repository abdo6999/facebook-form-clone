import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(public dialog: MatDialog,
    private fb: FormBuilder,
    private auth : AngularFireAuth,
    private router : Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login() :void {
    const {email,password} = this.loginForm.value
    this.auth.signInWithEmailAndPassword(email,password).then(user =>{
      console.log(user)
      this.router.navigate([''])
    }
    )
  }
  openRegister() {
    this.dialog.open( RegisterComponent, {
        panelClass: 'my-custom-dialog-class',
        width: 'clamp(250px,432px,700px)',
      });
    }

}
