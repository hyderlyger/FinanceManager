import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MainMenu } from '../pages/sidemenu/main-menu/main-menu';

import { LoginPage } from '../pages/login/login-page/login-page';
import { Timeline } from '../pages/timeline/timeline/timeline';

import { AuthProvider } from '../providers/auth-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;
  menuPage:any = MainMenu;
  
  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public auth: AuthProvider ) { //
     platform.ready().then(() => {
       // Okay, so the platform is ready and our plugins are available.
       // Here you can do any higher level native things you might need.
       statusBar.styleDefault();
       splashScreen.hide();

       this.auth.authenticate().then((isauthenticated)=> {
         if(isauthenticated)
           this.rootPage = Timeline;
         else
           this.rootPage = LoginPage;
       });

     });
  }
}
