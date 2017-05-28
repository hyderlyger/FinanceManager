import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DropboxProvider } from '../../../providers/dropbox-provider';
import { DBProvider } from '../../../providers/db-provider';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';

import { DeveloperPage } from '../../sidemenuextra/developer-page/developer-page';

@IonicPage()
@Component({
  selector: 'page-menu-settings',
  templateUrl: 'menu-settings.html',
})
export class MenuSettings {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private dropboxprovider : DropboxProvider,
              private loadingCtrl: LoadingController, private dbprovider : DBProvider, private alertCtrl : AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuSettings');
  }
  CreateBackup(){
    alert('Create Backup');
  }
  RestoreBackup(){
    alert('Restore Backup');
  }
  ExportExcel(){
    alert('ExportExcel');
  }
  DeleteAllData(){

    let confirm = this.alertCtrl.create({
      title: 'Delete your Data?',
      message: 'Do you agree to delete all your data and restore this app to initial state?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.DeleteAllDataConfirmed();
          }
        }
      ]
    });
    confirm.present();
  }
  DeleteAllDataConfirmed(){
    let loading = this.loadingCtrl.create({
        content: 'Clearing custom data...'
      });
 
    loading.present();
    this.dbprovider.deleteAllCustomData().then((res)=>{
      loading.dismiss();
      this.showAlert("Apagar dados","Data deleted!","Close");
    });
  }
  
  BackupDropbox(){
    

    this.dropboxprovider.login().then((success) => {
      
      let loading = this.loadingCtrl.create({
        content: 'Backing up to Dropbox...'
      });
      loading.present();

      this.dropboxprovider.saveDatabase().then(result => {

        loading.dismiss();
        this.showAlert("Sincronizar Dropbox","Synced!","Done");

      }).catch((err) => {

        loading.dismiss();
        console.log(err);

      });

    }, (err) => {
      console.log(err);
    });
  }

  RestoreDropbox(){
    this.dropboxprovider.login().then((success) => {

      let loading = this.loadingCtrl.create({
        content: 'Restoring from Dropbox...'
      });
      loading.present();

      this.dropboxprovider.restoreDatabase().then((result : string) => {

        loading.dismiss();
        if(result == "true")
          this.showAlert("Restore Dropbox","Restored!","Done");
        else
          this.showAlert("Restore Dropbox",result,"Done");

      }).catch((err) => {

        loading.dismiss();

      });
      
    }, (err) => {
      this.showAlert("Restore Dropbox",err,"Close");
    });
  }
  openDeveloperPage(){
    this.navCtrl.push(DeveloperPage);
  }
  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
}

