import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(
    private platform:Platform,
    private http: HttpClient,
    public afauth: AngularFireAuth,
  ) {
    // let data = this.http.get('https://medica-app.arhaanb.co/api/user', {'email': 'whatever@gmail.com'});
    // let jsonData = JSON.stringify(data)
    // console.log(jsonData)
  }
  ngOnInit() {
    this.platform.backButton.observers.pop();
  }
}
