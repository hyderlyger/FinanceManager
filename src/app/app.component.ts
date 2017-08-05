import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainMenu } from '../pages/sidemenu/main-menu/main-menu';
import { LoginPage } from '../pages/login/login-page/login-page';
import { IntroPage } from '../pages/login/intro/intro';
import { AuthProvider } from '../providers/auth-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  menuPage:any = MainMenu;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private alertCtrl : AlertController, private authProvider : AuthProvider) { //
     platform.ready().then(() => {
       // Okay, so the platform is ready and our plugins are available.
       // Here you can do any higher level native things you might need.
       statusBar.styleDefault();
       splashScreen.hide();

       //this.auth.authenticate().then((isauthenticated)=> {
         //if(isauthenticated)
           //this.rootPage = Timeline;
         //else
           //this.rootPage = LoginPage;
       //});

       this.authProvider.getUserNameifAny().then( (id : string) => {
          if(id)  //Account Exists
            this.rootPage = LoginPage; 
          else    //No Account - Possible first app launch
            this.rootPage = IntroPage; 
        }); 
       
     });

     platform.ready().then(() => {
        platform.registerBackButtonAction(() => {
          this.ConfirmExit();  
        });
    });
  }
  ConfirmExit(){
    let confirm = this.alertCtrl.create({
      title: 'Sair do aplicativo?', //'Exit Application?',
      message: 'Tem certeza que quer sair do aplicativo?', //'Sure you want to exit application?',
      buttons: [
        {
          text: 'Discordar', //'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceita', //'Agree',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    confirm.present();
  }
}
