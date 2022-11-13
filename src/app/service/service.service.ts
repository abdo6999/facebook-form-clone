import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
export interface User {
  id : string,
  fristName : string,
  lastName : string,
  email : string,
  password : number,
  date : ArrayBuffer,
  gender : string
}

@Injectable({providedIn: 'root'})

export class ServiceService {
  user !: Observable<User>
  constructor(
    private http : HttpClient,
    private afAuth: AngularFireAuth,

  ) { }

  postUser(data : any) {
    return this.http.post<User>("https://clone-a49fa-default-rtdb.firebaseio.com/post/user.json",data)
  }

}
