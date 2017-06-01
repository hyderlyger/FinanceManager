import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DBProvider } from '../../../providers/db-provider';

@IonicPage()
@Component({
  selector: 'page-menu-profile',
  templateUrl: 'menu-profile.html',
})
export class MenuProfile {
  _username : string;
  _email : string;
  _actualpass : string;
  _newpass : string;
  _newpass2 : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private dbprovider : DBProvider,
              private alertCtrl : AlertController) {
    this._username = "";
    this._email = "";
    this._actualpass = "";
    this._newpass = "";
    this._newpass2 = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuProfile');

    this._username = this.dbprovider.user.name;
    this._email = this.dbprovider.user.email;
  }
  updateUser(){
    if(this._username && this._email && this._actualpass && this._newpass && this._newpass2){
      if(this._actualpass == this.dbprovider.user.password){
        if(this._newpass == this._newpass2){
          //Updating the user
          this.dbprovider.updateUser(this._username, this._email, this._newpass).then((state)=>{
            if(state){
              this._actualpass = "";
              this._newpass = "";
              this._newpass2 = "";
              this._username = this.dbprovider.user.name;
              this._email = this.dbprovider.user.email;
              //this.showAlert("Success","Your profile has been updated.","OK");
              this.showAlert("Sucesso","Seu perfil foi atualizado.","OK");
            }
          });
        }else{
          //this.showAlert("Error","New passwords fields must be identical.","OK");
          this.showAlert("Erro","Novos campos de senhas devem ser idênticos.","OK");
        }
      }else{
        //this.showAlert("Error","Incorrect actual password.","OK");
        this.showAlert("Erro","Senha real incorreta","OK");
      }
    }else{
      //this.showAlert("Error","All fields are required","OK");
      this.showAlert("Erro","Todos os campos são necessários","OK");
    }
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
