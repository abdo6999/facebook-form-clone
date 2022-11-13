import { Router } from '@angular/router';
import { ServiceService } from './../../service/service.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; 
import { FormBuilder, FormGroup, Validators,  FormArray } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements  OnInit {
  constructor(
      private formBuilder: FormBuilder,
      private api : ServiceService,
      private dialogRef : MatDialogRef<RegisterComponent>,
      private auth : AngularFireAuth,
      private router : Router
      ) { }
  formGroup !: FormGroup ;
  ngOnInit(): void {
    this.formGroup= this.formBuilder.group({
      fristName : ['',Validators.required],
      lastName : ['',Validators.required],
      email : ['',[Validators.required,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password :['',[Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      gender : ['',Validators.required],
      date  : this.formBuilder.group({
          day :  ['',[Validators.required,Validators.pattern('[0-9]*')]],
          month :  ['',[Validators.required,Validators.pattern(/[A-Z]/)]],
          year : ['',[Validators.required,Validators.pattern('[0-9]*'),Validators.max(2010)]],
        }
      )
  })
}
SetUserData() {
  const {email,password} = this.formGroup.value;
  this.auth.createUserWithEmailAndPassword(email,password).then(user =>{
    this.router.navigate(['']);
    this.dialogRef.close();
  }
  )
  this.api.postUser(this.formGroup.value).subscribe({
    next:() =>{

    },
    error:()=>{

    }
    
  })
 
}
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
get fristName() {
  return this.formGroup.get('fristName') as unknown as FormArray
}
get lastName() {
  return this.formGroup.get('lastName') as unknown as FormArray
}
get email() {
  return this.formGroup.get('email') as unknown as FormArray
}
get password() {
  return this.formGroup.get('password') as unknown as FormArray
}
get day() {
  return (this.formGroup.get('date') as FormGroup).get('day') as unknown as FormArray
}
get month() {
  return (this.formGroup.get('date') as FormGroup).get('month') as unknown as FormArray
}
get year() {
  return (this.formGroup.get('date') as FormGroup).get('year') as unknown as FormArray
}
get gender() {
  return this.formGroup.get('gender') as unknown as FormArray
}
Days (days : number[] = []) {
  for (let i = 0; i < 31; i++) {
    days[i] = i + 1;
  }
  return days
}
Years (years : number[] = []) {
  let  year = 1904;
  for (let i = 0; i < 118; i++) {
    year += 1
    years[i] = year;
  }
  return years.reverse()
}
}