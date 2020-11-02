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
  email:string
  password:string;
  CPassword:string;
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
    if(this.password == this.CPassword)
    {
     await this.afauth.createUserWithEmailAndPassword(
          this.email,
          this.password
        ).then(async (data)=>{
          let uid = data.user.uid;
          data.user.updateProfile({
      
            displayName: this.username,
          })
          this.afstore.collection('userdata').doc(uid).set({
            uid: uid,
            email: this.email,
            hospitalName:this.hospitalName,
            number:this.number,
            username:this.username,
            address:this.address
          })
          .catch ((err) => {
            if (err.code == "auth/network-request-failed") {
              this.presentToast("Poor network")
            }
            if(err.code == "invalid-argument")
            {
              this.presentToast("Enter all details")
            }
          })
          this.presentToast("Logged in successfully") 
          this.router.navigateByUrl('/info', { replaceUrl: true })
        }).catch((err)=>{
          console.log(err)
          if (err.code == "auth/email-already-in-use") {
            this.presentToast("User exists")
          }
          if (err.code == "auth/invalid-email") {
            this.presentToast("Invalid Email")
          }
          if (err.code == "auth/network-request-failed") {
            this.presentToast("Poor network")
          }
        });
   await this.presentToast('values submitted.')
   await this.router.navigateByUrl('/tabs',{ replaceUrl: true })
  }
  else
  {
    this.presentToast('Password dont match.')
  }
  }
  
}
