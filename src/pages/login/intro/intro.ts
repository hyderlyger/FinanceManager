import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';
import { LoginPage } from '../login-page/login-page';
import { RegisterationInfoPage } from '../registeration-info-page/registeration-info-page';
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  goToSignUp(){
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(RegisterationInfoPage);
  }
  goToNextSlide(){
    this.slides.slideNext();
  }
  
}
