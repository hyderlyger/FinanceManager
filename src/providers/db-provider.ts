import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
//Models
import { User } from '../models/user';
import { Account } from '../models/account';
import { Category } from '../models/category';
import { CategoryType } from '../models/category';
import { AmountEntry } from '../models/amountEntry';
import { AmountEntryType } from '../models/amountEntry';
//Providers
import { ImagesProvider } from '../providers/images-provider'

@Injectable()
export class DBProvider {
  
  //Database Constants
  private db_data = "AppData";  //temperary
  private dbConstants = {
        db_user : "DBUser",
        db_accounts : "DBAccounts",
        db_categories : "DBCategories",
        db_ammountenteries : "DBAmmountEnteries"
  };
  
  //public Variables
  public user: User;
  public accounts: Array<Account> = [];
  public categories: Array<Category> = [];
  public amountEntries: Array<AmountEntry> = [];

  public balance : number = 0;
  public selectedAccount : Account;

  //CONSTRUCTOR
  constructor(private storage : Storage) {
    console.log('Hello DBProvider Provider');

    //let uuid = UUID.UUID();
    //TODO - Eliminate Storage ready checks 
    this.getLatestUSERfromDB();
  }

  //User
  registerUser( _user : User){

    this.user = _user;  //UI User    
    return new Promise((resolve) => {

      if(_user){
        this.storage.ready().then(() => {
          
          //Adding User Data
          this.storage.set(this.dbConstants.db_user, JSON.stringify(this.user));

          //Adding Initial Application Data
          this.createDefaultApplicationData();
          this.storage.set(this.dbConstants.db_accounts, JSON.stringify(this.accounts));
          this.storage.set(this.dbConstants.db_categories, JSON.stringify(this.categories));
          //Need to load from database since we are doing many things in those functions for thr UI to work
          this.LoadAllDatabaseData().then(()=>{
            resolve("Accepted");  //Success Case
          });

        }).catch(() => {
          resolve("Error");
        });

      }else
        resolve("User is NULL");
    });

  }

  ValidateUser(userid : string, userpass : string){
    return new Promise((resolve)=> {

      if(userid && userpass)
      {
        if(this.user != null){
            if(this.user.userid == userid && this.user.password == userpass){
              this.LoadAllDatabaseData().then(()=>{
                resolve("Accepted");  //Success Case
              });
            }else
              resolve("Invalid UserID or Password");
          }else
            resolve("No User Found. Please Register");
      }else
        resolve("UserID & Password fields are required");

    });
  }

  //add
  addEntry(financeitem : AmountEntry)  //it is prefered to return all elements seperated
  {
    return new Promise((resolve)=> {
      if(financeitem != null && this.amountEntries != null) {  //Do Validations Here
            this.amountEntries.push(financeitem);

            this.storage.ready().then(() => {
              this.storage.set(this.db_data, JSON.stringify(this.amountEntries));
              this.calculateBalance();
              resolve(true);
            });
        }
    });
  }

  //delete
  deleteEntry(index: number) {
    return new Promise((resolve)=> {
      if(this.amountEntries != null)
      {
        this.amountEntries.splice(index, 1);
        this.storage.ready().then(() => {
            this.storage.set(this.db_data, JSON.stringify(this.amountEntries));
            this.calculateBalance();
            resolve(true);
          });
      }
    });
  }

  //retrieve
  getLatestAMOUNTENTRIESfromDB()
  {
      return new Promise ((resolve)=>{
          this.storage.ready().then(() => {
            this.storage.get(this.dbConstants.db_ammountenteries).then( (val) => {
                this.amountEntries = JSON.parse(val);
                if(this.amountEntries == null) {
                  this.amountEntries = [];
                }else{
                  this.calculateBalance()
                }
                resolve();
            });
          });
      });
      
  }
  getLatestACCOUNTSfromDB()
  {
    return new Promise ((resolve)=>{
      this.storage.ready().then(() => {
        this.storage.get(this.dbConstants.db_accounts).then( (val) => {
            this.accounts = JSON.parse(val);
            if(this.accounts == null) {
              this.accounts = [];
            }else{
              this.UpdateSelectedAccount(0); //default selectedAccount selection.
            }
            resolve();
        });
      });
    });
  }
  getLatestCATEGORIESfromDB()
  {
    return new Promise ((resolve)=>{
      this.storage.ready().then(() => {
        this.storage.get(this.dbConstants.db_categories).then( (val) => {
            this.categories = JSON.parse(val);
            if(this.categories == null) {
              this.categories = [];
            }else{
              // Nothing
            }
            resolve();
        })
      });
    });
  }
  getLatestUSERfromDB(){
    return new Promise ((resolve)=>{
      this.storage.ready().then(() => {
          this.storage.get(this.dbConstants.db_user).then( (val) => {
              this.user = JSON.parse(val);
              if(this.user == null) {
                this.user = null;
              }else{
                // Nothing
              }
              resolve();
          });
        });
    });
  }

  //Helping Functions
  private LoadAllDatabaseData(){
    return new Promise((resolve)=> {
        Promise.all([ this.getLatestAMOUNTENTRIESfromDB(),
                      this.getLatestACCOUNTSfromDB(),
                      this.getLatestCATEGORIESfromDB() ]).then(()=>{
                        resolve();
        });
      });
  }
  public UpdateSelectedAccount(index : number){
    if(this.accounts.length>0 && index< this.accounts.length)
      this.selectedAccount = this.accounts[index];  
  }
  private calculateBalance() {
    if(this.amountEntries != null)
    {
      this.balance = 0;
        this.amountEntries.forEach(item => {
          if(item.type == AmountEntryType.Revenue)
            this.balance += parseFloat(item.price.toString());
          else
            this.balance -= parseFloat(item.price.toString());
        });
    }
  }
  private createDefaultApplicationData(){
    let dateToday = new Date();
    let issystem = true;
    //Accounts
    this.accounts = []; //Clearing
    this.accounts.push( new Account( UUID.UUID(), "Cartão de Crédito", 9, dateToday, issystem, 0));  //CreditCard
    this.accounts.push( new Account( UUID.UUID(), "Dinheiro", 1, dateToday, issystem, 0));           //Cash
    
    this.categories = []; //Clearing
    //Categories - Expense
    this.categories.push( new Category( UUID.UUID(), "Entretenimento", 2, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Higiene", 3, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Comida", 4, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Esportes", 5, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Transporte", 6, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Telefone", 7, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Café", 8, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Roupas", 9, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Saúde", 10, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Animais", 0, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Carro", 1, CategoryType.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Casa", 11, CategoryType.Expense, issystem));

    //Categories - Revenue
    this.categories.push( new Category( UUID.UUID(), "Salário", 2, CategoryType.Revenue, issystem));
    this.categories.push( new Category( UUID.UUID(), "Aluguel", 0, CategoryType.Revenue, issystem));
    this.categories.push( new Category( UUID.UUID(), "Poupança", 1, CategoryType.Revenue, issystem));

  }
}