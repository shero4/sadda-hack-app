import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  email:string;

  constructor(
    private http: HttpClient,
    public afauth: AngularFireAuth,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
