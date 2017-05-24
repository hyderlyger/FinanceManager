import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//Menus
import { MainMenu } from '../pages/sidemenu/main-menu/main-menu';
import { MenuProfile } from '../pages/sidemenu/menu-profile/menu-profile'
import { MenuPanel } from '../pages/sidemenu/menu-panel/menu-panel'
import { MenuCategories } from '../pages/sidemenu/menu-categories/menu-categories'
import { MenuAccounts } from '../pages/sidemenu/menu-accounts/menu-accounts'
import { MenuSettings } from '../pages/sidemenu/menu-settings/menu-settings'

//Pages
import { LoginPage } from '../pages/login/login-page/login-page'
import { RegisterationInfoPage } from '../pages/login/registeration-info-page/registeration-info-page';
import { RegisterationCredentialsPage } from '../pages/login/registeration-credentials-page/registeration-credentials-page';
import { Timeline } from '../pages/timeline/timeline/timeline';
import { AddAmountEntry } from '../pages/timeline/add-amount-entry/add-amount-entry';
import { SelectCategory } from '../pages/timeline/select-category/select-category';
import { Transfer } from '../pages/timeline/transfer/transfer';

//Pipes
import { CurrencyBRL } from '../pipes/currency-brl';

//Plugins
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

//Providers
import { AuthProvider } from '../providers/auth-provider';
import { DBProvider } from '../providers/db-provider';
import { ImagesProvider } from '../providers/images-provider';
import { DropboxProvider } from '../providers/dropbox-provider';

//Components
import { PopoverAccountSelect } from '../components/popover-account-select/popover-account-select';

@NgModule({
  declarations: [
    MyApp,
    //MenuPages
    MainMenu,
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,
    //Pages
    LoginPage,
    RegisterationInfoPage,
    RegisterationCredentialsPage,
    Timeline,
    AddAmountEntry,
    SelectCategory,
    Transfer,
    //Pipes
    CurrencyBRL,
    //Components
    PopoverAccountSelect
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //MenuPages
    MainMenu,
    MenuProfile,
    MenuPanel,
    MenuCategories,
    MenuAccounts,
    MenuSettings,
    //Pages
    LoginPage,
    RegisterationInfoPage,
    RegisterationCredentialsPage,
    Timeline,
    AddAmountEntry,
    SelectCategory,
    Transfer,
    //Components
    PopoverAccountSelect
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DBProvider,
    ImagesProvider,
    DropboxProvider
  ]
})
export class AppModule {}
