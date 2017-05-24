import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DropboxProvider } from '../../../providers/dropbox-provider';
import { DBProvider } from '../../../providers/db-provider';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-menu-settings',
  templateUrl: 'menu-settings.html',
})
export class MenuSettings {

  folders: any;

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
  
  SyncDropbox(){

    this.dropboxprovider.setAccessToken("eaPCGJGRTGYAAAAAAAAAtKM0DU-eYaotNT6W13L4bKu8PWjCCqkaY4xKfY9tqms5");
      this.folders = [];
 
      let loading = this.loadingCtrl.create({
        content: 'Syncing from Dropbox...'
      });
 
      loading.present();
 
      this.dropboxprovider.getFolders().subscribe(data => {
        this.folders = data.entries;
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });

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
