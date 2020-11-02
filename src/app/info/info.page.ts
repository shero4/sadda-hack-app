import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController, AlertController ,MenuController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  address:string;
  number:string;
  hospitalName:string;
  username:string;
  uid:string;
  constructor(
    public afauth: AngularFireAuth,
    public afstore: AngularFirestore,
    public router: Router,
    private platform:Platform,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    public menu: MenuController
    
  ) { }

  ngOnInit() {
    this.platform.backButton.observers.pop();
  }
  async presentToast(message1: string) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async submit(){
   this.uid= (await this.afauth.currentUser).uid 
   await  this.afstore.collection('userdata').doc(this.uid).update({
     hospitalName:this.hospitalName,
     number:this.number,
     username:this.username,
     address:this.address
   })
   .catch((err) => {
     console.log(err.code)
    if (err.code == "auth/network-request-failed") {
      this.presentToast("Poor network")
    }
    if(err.code == "invalid-argument")
    {
      this.presentToast("Enter all details")
    }
   })
   await (await this.afauth.currentUser).updateProfile({
     displayName:this.username,
   })
   await this.presentToast('values submitted.')
   await this.router.navigateByUrl('/tabs',{ replaceUrl: true })
  }
}
