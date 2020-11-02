import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  allHospData;

  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    ) {
      this.getAllHospitalData().subscribe(data => {
        this.allHospData = data
        console.log(this.allHospData)
      })
    }

  getAllHospitalData() {
    let options = {
      headers: {
        // 'email': this.email, 
      }
    }
    return this.http.get(`https://medica-app.arhaanb.co/api/hospitals`, options);
  }
}
