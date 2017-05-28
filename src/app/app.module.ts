//System
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

//Pages
//--Menus
import { MainMenu } from '../pages/sidemenu/main-menu/main-menu';
import { MenuProfile } from '../pages/sidemenu/menu-profile/menu-profile'
import { MenuPanel } from '../pages/sidemenu/menu-panel/menu-panel'
import { MenuCategories } from '../pages/sidemenu/menu-categories/menu-categories'
import { MenuAccounts } from '../pages/sidemenu/menu-accounts/menu-accounts'
import { MenuSettings } from '../pages/sidemenu/menu-settings/menu-settings'
//--MenuExtra
import { AddEditAccount } from '../pages/sidemenuextra/add-edit-account/add-edit-account';
import { AddEditCategory } from '../pages/sidemenuextra/add-edit-category/add-edit-category';
//--Timeine
import { LoginPage } from '../pages/login/login-page/login-page'
import { RegisterationInfoPage } from '../pages/login/registeration-info-page/registeration-info-page';
import { RegisterationCredentialsPage } from '../pages/login/registeration-credentials-page/registeration-credentials-page';
import { Timeline } from '../pages/timeline/timeline/timeline';
import { AddAmountEntry } from '../pages/timeline/add-amount-entry/add-amount-entry';
import { SelectCategory } from '../pages/timeline/select-category/select-category';
import { Transfer } from '../pages/timeline/transfer/transfer';
import { ModalRecurrence } from '../pages/timeline/modal-recurrence/modal-recurrence';

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
import { InAppBrowser } from '@ionic-native/in-app-browser';

//Components
import { PopoverAccountSelect } from '../components/popover-account-select/popover-account-select';
import { PopoverRecurrenceType } from '../components/popover-recurrence-type/popover-recurrence-type';

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
    //MenuExtrasPages
    AddEditAccount,
    AddEditCategory,
    //LoginPages
    LoginPage,
    RegisterationInfoPage,
    RegisterationCredentialsPage,
    //TimelinePages
    Timeline,
    AddAmountEntry,
    SelectCategory,
    Transfer,
    ModalRecurrence,
    //Pipes
    CurrencyBRL,
    //Components
    PopoverAccountSelect,
    PopoverRecurrenceType
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
    //MenuExtrasPages
    AddEditAccount,
    AddEditCategory,
    //LoginPages
    LoginPage,
    RegisterationInfoPage,
    RegisterationCredentialsPage,
    //TimelinePages
    Timeline,
    AddAmountEntry,
    SelectCategory,
    Transfer,
    ModalRecurrence,
    //Components
    PopoverAccountSelect,
    PopoverRecurrenceType
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DBProvider,
    ImagesProvider,
    DropboxProvider,
    InAppBrowser  //for dropbox auth
  ]
})
export class AppModule {}
