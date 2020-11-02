import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
       currentCapacity:Number
       maxCapacity:Number
       masks: Number
       gloves: Number
       suits: Number
       sanitizer: Number
       ventilators: Number
       oxygenCylinder: Number
       beds: Number
       drugs: Number
       pulseOximeters: Number
       bloodPressureMonitors: Number
       heartRateMonitors: Number
  constructor(
    private platform:Platform,
    private http: HttpClient,
    public afauth: AngularFireAuth,
  ) {
    // let data = this.http.get('https://medica-app.arhaanb.co/api/user', {'email': 'whatever@gmail.com'});
    // let jsonData = JSON.stringify(data)
    // console.log(jsonData)
    this.getHospital().subscribe(data => {
      console.log(data[0])
    })
  }
  ngOnInit() {
    this.platform.backButton.observers.pop();
    
  }
  getHospital() {
    let options = {
      headers: {
        'email': 'arhaanb@gmail.com'
      }
    }
    return this.http.get(`https://medica-app.arhaanb.co/api/user`, options);
  }
}
