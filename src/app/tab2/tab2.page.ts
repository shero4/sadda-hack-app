import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';
import { NotificationsPage } from '../notifications/notifications.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  email: string;
  description: string;
  problem: string;

  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    public modalController: ModalController,
    ) {
      
    }
  ngOnInit(){
    firebase.default.auth().onAuthStateChanged(async user => {
        this.email = user.email
        console.log(this.email)
        this.sendRequest().subscribe(data => {
          console.log(data)
        })
      })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NotificationsPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
  
  sendRequest() {
    let options = {
      headers: {
        'email': this.email, 
      } 
    }
    let postData = {
      request: this.problem,
      dsc: this.description
    }
    return this.http.post('https://medica-app.arhaanb.co/api/request', postData, {...options,responseType: 'text'})
  }
}
