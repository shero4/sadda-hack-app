import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  email: string;

  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    ) {
      firebase.default.auth().onAuthStateChanged(async user => {
        this.email = user.email
        this.sendRequest().subscribe(data => {
          console.log(data)
        })
      })
    }

  sendRequest() {
    let options = {
      headers: {
        'email': this.email
      }
    }
    let postData = {
      'request': 'blablabla',
      'dsc': 'blablabla'
    }
    return this.http.post('https://medica-app.arhaanb.co/api/request', postData, options)
  }
}
