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
      if(this.validateEmail(this._email)){
        if(this._actualpass == this.dbprovider.user.password){
          if(this._newpass == this._newpass2){
            this.comfirmUpdate();
          }else
            this.showAlert("Erro","Novos campos de senhas devem ser idênticos.","OK");//this.showAlert("Error","New passwords fields must be identical.","OK");
        }else
          this.showAlert("Erro","Senha real incorreta","OK");//this.showAlert("Error","Incorrect actual password.","OK");}else
      }else
          this.showAlert("Erro","E-mail inválido.","OK");//this.showAlert("Error","Invalid Email.","OK");
    }else
      this.showAlert("Erro","Todos os campos são necessários","OK");//this.showAlert("Error","All fields are required","OK");
  }
  comfirmUpdate(){
    let confirm = this.alertCtrl.create({
      title: 'Atualizar perfil?',//'Update Profile?',
      message: 'Você concorda em atualizar seu perfil?',
      buttons: [
        {
          text: 'Discordar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Aceita',
          handler: () => {
            this.ConfirmedUpdateUser();
          }
        }
      ]
    });
    confirm.present();
  }
  ConfirmedUpdateUser(){
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
  }
  showAlert(title: string, subTitle: string, buttonText : string){
    var alert = this.alertCtrl.create({
        title: title,
        subTitle: subTitle,
        buttons: [buttonText]
      });
    alert.present();
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
