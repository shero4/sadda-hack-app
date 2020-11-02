import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  currentCapacity: Number;
  maxCapacity: Number;
  masks: Number;
  gloves: Number;
  suits: Number;
  sanitizer: Number;
  ventilators: Number;
  oxygenCylinder: Number;
  beds: Number;
  drugs: Number;
  pulseOximeters: Number;
  bloodPressureMonitors: Number;
  heartRateMonitors: Number;
  email:string;

  constructor(
    private platform: Platform,
    private http: HttpClient,
    public afauth: AngularFireAuth,
  ) {
    firebase.default.auth().onAuthStateChanged(user => {
      this.email = user.email
      this.getHospitalData().subscribe(data => {
        this.currentCapacity = data[0].capacity.current
        this.maxCapacity = data[0].capacity.total
        this.beds = data[0].items.beds
        this.bloodPressureMonitors = data[0].items.bloodPressureMonitors
        this.drugs = data[0].items.drugs
        this.gloves = data[0].items.gloves
        this.masks = data[0].items.masks
        this.oxygenCylinder = data[0].items.oxygenCylinder
        this.pulseOximeters = data[0].items.pulseOximeters
        this.suits = data[0].items.suits
        this.ventilators = data[0].items.ventilators
        this.heartRateMonitors = data[0].items.heartRateMonitors || 0
        this.sanitizer = data[0].items.sanitizer || 0
      })
    })
  }
  
  ngOnInit() {
    this.platform.backButton.observers.pop();
  }

  updateHospitalData() {
    let options = {
      headers: {
        'email': this.email, 
      }
    }
    let postData = {
      currentCapacity: this.currentCapacity,
      maxCapacity: this.maxCapacity,
      beds: this.beds,
      bloodPressureMonitors: this.bloodPressureMonitors,
      drugs: this.drugs,
      gloves: this.gloves,
      masks: this.masks,
      oxygenCylinder: this.oxygenCylinder,
      pulseOximeters: this.pulseOximeters,
      suits: this.suits,
      ventilators: this.ventilators,
      heartRateMonitors: this.heartRateMonitors,
      sanitizer: this.sanitizer
    }
    return this.http.post('https://medica-app.arhaanb.co/api/request', postData, {...options,responseType: 'text'})
  }

  getHospitalData() {
    let options = {
      headers: {
        'email': this.email
      }
    }
    return this.http.get(`https://medica-app.arhaanb.co/api/user`, options);
  }
}
