import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UUID } from 'angular2-uuid';
//Models
import { User } from '../models/user';
import { Account } from '../models/account';
import { Category } from '../models/category';
import { AmountEntry } from '../models/amountEntry';
import { Type } from '../models/enums';
//Providers
import { ImagesProvider } from '../providers/images-provider';

@Injectable()
export class DBProvider {
  
  //Database Constants
  public dbConstants = {
        db_user : "DBUser",
        db_accounts : "DBAccounts",
        db_categories : "DBCategories",
        db_ammountenteries : "DBAmmountEnteries"
  };

  //Event Constants
  public event_MenuEvent : string = "mymenuevent";

  //public Variables
  public user: User;
  public accounts: Array<Account> = [];
  public categories: Array<Category> = [];
  public amountEntries: Array<AmountEntry> = [];
  public amountEntriesGroupsAndSubgroups = [];
  public balance : number = 0;
  public selectedAccount : Account;

  //UserAccessLevel
  public isUserAccessLevelPreminum : Boolean = false;

  //CONSTRUCTOR
  constructor(private storage : Storage , private imagesprovider : ImagesProvider) {
    console.log('Hello DBProvider Provider');

    //let uuid = UUID.UUID();
    //this.LoadLatestUSERfromDB();  //now doing in authprovider
  }

  //DATABASE INTERACTIONS - USER
  public registerUser( _user : User){

    this.user = _user;  //UI User    
    return new Promise((resolve) => {

      if(_user){
        this.storage.ready().then(() => {
          
          //Adding User Data
          this.storage.set(this.dbConstants.db_user, JSON.stringify(this.user));

          //Ensuring Empty Database
          this.deleteAllCustomData().then((result)=>{
            //if(result)
              resolve("Accepted");  //Success Case
          });

        }).catch(() => {
          resolve("Error");
        });

      }else
        resolve("User is NULL");
    });

  }
  public ValidateUser(userid : string, userpass : string){
    return new Promise((resolve)=> {

      if(userid && userpass)
      {
        if(this.user != null){
            if(this.user.userid == userid && this.user.password == userpass){
              this.LoadAllDatabaseData().then(()=>{
                resolve("Accepted");  //Success Case
              });
            }else
              resolve("ID de usuário ou senha inválidos");//resolve("Invalid UserID or Password");
          }else
            resolve("Nenhum usuário encontrado, registre-se");//resolve("No User Found, please Register");
      }else
        resolve("Os campos ID do usuário e senha são obrigatórios");//resolve("UserID & Password fields are required");

    });
  }
  public GetUserID(){
    return new Promise (resolve =>{
      this.LoadLatestUSERfromDB().then( ()=>{
        let userID = this.user.id;
        resolve(userID);
      });
    });
  }
  public updateUser(username : string, email :string, newpassword : string) { //it is prefered to return all elements seperated
    return new Promise((resolve)=> {
      if(this.user != null) {  //Do Validations Here
            this.user.name = username;
            this.user.email = email;
            this.user.password = newpassword;

            this.storage.ready().then(() => {
              this.storage.set(this.dbConstants.db_user, JSON.stringify(this.user));
              this.LoadLatestUSERfromDB().then(()=>{
                resolve(true);
              });
            });
        }
    });
  }

  //DATABASE INTERACTIONS - AMOUNTENTRY
  public addEntry(amountEntry : AmountEntry)  { //it is prefered to return all elements seperated
    return new Promise((resolve)=> {
      if(amountEntry != null && this.amountEntries) {  //Do Validations Here
            this.amountEntries.push(amountEntry);
            this.storage.ready().then(() => {
              this.storage.set(this.dbConstants.db_ammountenteries, JSON.stringify(this.amountEntries));
              this.LoadLatestAMOUNTENTRIESfromDB().then(()=>{
                resolve(true);
              });
            });
        }
    });
  }
  public deleteEntry(id: string) {
    return new Promise((resolve)=> {

      if(this.amountEntries && this.amountEntries.find(item=> item.id == id))
      {
        var index = this.amountEntries.findIndex(item=> item.id == id); //getting the index
        this.amountEntries.splice(index, 1);  //removing item
        this.storage.ready().then(() => {
            this.storage.set(this.dbConstants.db_ammountenteries, JSON.stringify(this.amountEntries));
            this.LoadLatestAMOUNTENTRIESfromDB().then(()=>{
              resolve(true);
            });
          });
      }else
        resolve(false);

    });
  }
  public deleteAllCustomData(){
    return new Promise((resolve)=>{
      //Adding Initial Application Data
      this.createDefaultApplicationData();
      this.storage.set(this.dbConstants.db_accounts, JSON.stringify(this.accounts));
      this.storage.set(this.dbConstants.db_categories, JSON.stringify(this.categories));
      this.storage.set(this.dbConstants.db_ammountenteries, JSON.stringify(this.amountEntries));
      //Need to load from database since we are doing many things in those functions for the UI to work
      this.LoadAllDatabaseData().then(()=>{
        resolve(true);  //Success Case
      });
    });
  }
  public addOrUpdateAccount(_account : Account) {
    return new Promise((resolve)=> {

      if(_account != null && ((_account.id && this.accounts.find(item=> item.id == _account.id)) || !_account.id) )
      {
        if(_account.id){
          var index = this.accounts.findIndex(item=> item.id == _account.id); //getting the index
          this.accounts[index] = _account;  //update
        }else{
          _account.id = UUID.UUID();
          this.accounts.push(_account); //add
        }

        this.storage.ready().then(() => {
            this.storage.set(this.dbConstants.db_accounts, JSON.stringify(this.accounts));
            this.LoadLatestACCOUNTSfromDB().then(()=>{
              resolve(true);
            });
          });
      }else
        resolve(false);

    });
  }
  public addOrUpdateCategory(_category : Category) {
    return new Promise((resolve)=> {

      if(_category != null && ((_category.id && this.categories.find(item=> item.id == _category.id)) || !_category.id) )
      {
        if(_category.id){
          var index = this.categories.findIndex(item=> item.id == _category.id); //getting the index
          this.categories[index] = _category;  //update
        }else{
          _category.id = UUID.UUID();
          this.categories.push(_category); //add
        }

        this.storage.ready().then(() => {
            this.storage.set(this.dbConstants.db_categories, JSON.stringify(this.categories));
            this.LoadLatestCATEGORIESfromDB().then(()=>{
              resolve(true);
            });
          });
      }else
        resolve(false);

    });
  }

  //DATABASE - Load/Reload Latest Data
  public LoadAllDatabaseData(){
    return new Promise((resolve)=> {
        Promise.all([ this.LoadLatestAMOUNTENTRIESfromDB(),
                      this.LoadLatestACCOUNTSfromDB(),
                      this.LoadLatestCATEGORIESfromDB() ]).then(()=>{
                        resolve();
        });
      });
  }
  private LoadLatestAMOUNTENTRIESfromDB(){
      return new Promise ((resolve)=>{
          this.storage.ready().then(() => {
            this.storage.get(this.dbConstants.db_ammountenteries).then( (val) => {
                this.amountEntries = JSON.parse(val);
                if(this.amountEntries == null) {
                  this.amountEntries = [];
                }else{
                  this.calculateBalanceofSelectedAccount();
                  this.updateAmountEntriesGroupsAndSubgroups();
                }
                resolve();
            });
          });
      });
      
  }
  private LoadLatestACCOUNTSfromDB(){
    return new Promise ((resolve)=>{
      this.storage.ready().then(() => {
        this.storage.get(this.dbConstants.db_accounts).then( (val) => {
            this.accounts = JSON.parse(val);
            if(this.accounts == null) {
              this.accounts = [];
            }else{
              this.UpdateSelectedAccount(this.accounts[0].id); //default selectedAccount selection.
            }
            resolve();
        });
      });
    });
  }
  private LoadLatestCATEGORIESfromDB(){
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
  private LoadLatestUSERfromDB(){
    return new Promise ((resolve)=>{
      this.storage.ready().then(() => {
          this.storage.get(this.dbConstants.db_user).then( (val) => {
              this.user = JSON.parse(val);
              resolve();
          });
        });
    });
  }

  //DATABASE - Restore Database
  public RestoreTable(dbTablekey : string, newjsonDatatoOvewrite : string){
    return new Promise(resolve=>{
      switch(dbTablekey)
      {
        case this.dbConstants.db_ammountenteries:
              this.storage.ready().then(() => {
                this.storage.set(this.dbConstants.db_ammountenteries, newjsonDatatoOvewrite);
                resolve();
              });
              break;
        case this.dbConstants.db_accounts:
              this.storage.ready().then(() => {
                this.storage.set(this.dbConstants.db_accounts, newjsonDatatoOvewrite);
                resolve();
              });
              break;
        case this.dbConstants.db_categories:
              this.storage.ready().then(() => {
                this.storage.set(this.dbConstants.db_categories, newjsonDatatoOvewrite);
                resolve();
              });
              break;
        default:
              resolve();
              break;
      }
    })
    
  }

  //Public Functionality
  public calculateBalanceOnAccountID(id :string){
    var balance = 0;
    if(this.amountEntries != null && this.accounts.find(item=> item.id == id) != null)
    {
      var currentAccount = this.accounts.find(item=> item.id == id);
      balance = parseFloat(currentAccount.startingbalance.toString());
        this.amountEntries.forEach(item => {
          if(item.accountID == currentAccount.id)
          {
            if(item.type == Type.Revenue)
              balance += parseFloat(item.price.toString());
            else
              balance -= parseFloat(item.price.toString());
          }
        });
    }
    return balance;
  }
  public UpdateSelectedAccount(accountid : string){   //UPdates the UI Active Account i.e. on the selection
    if(this.accounts.length>0 && this.accounts.find(item=> item.id == accountid))
    {
      //if issue occurs use -> this.LoadLatestAMOUNTENTRIESfromDB().then(()=>{
      this.selectedAccount = this.accounts.find(item=> item.id == accountid);
      this.calculateBalanceofSelectedAccount();
      this.updateAmountEntriesGroupsAndSubgroups();
    }  
  }
  public getCategorySubjectbyCategoryID(id:string){
    if(this.categories.find(item=> item.id == id))
      return this.categories.find(item=> item.id == id).subject;
    else
      return "Unknown Category";
  }
  public getCategoryImagebyCategoryID(id:string){
    if(this.categories.find( item => item.id == id))
    {
      var categoryobject = this.categories.find( item => item.id == id);
      if (categoryobject.type == Type.Revenue)
        return this.imagesprovider.getCategoryRevenueImagebyID(categoryobject.imageindex);
      else
        return this.imagesprovider.getCategoryExpenseImagebyID(categoryobject.imageindex);
    }else{
      return "";
    }
    
  }
  public getCategoryIDforTransfer(_type : Type){
    var index = this.imagesprovider.getTransferImageIndex(_type);  //index of relative type
    return this.categories.find((item)=> item.imageindex == index && item.type == _type).id;
  }
  public getAccountbyID(id:string){
    return this.accounts.find((item)=> item.id == id);
  }
  public getDistinctAccountOtherthantheMentionedID(id:string){
    return this.accounts.find((item)=> item.id != id);
  }
  public transform(value: Array<AmountEntry>, accountID : string) {    //Transformation for Group : previously done in pipe "group amount entries by date"
    this.amountEntriesGroupsAndSubgroups = [];
    var filteredEntries = this.filterEntriesbyAccountID(value, accountID);
    this.groupContactsUsingArray(filteredEntries);
  }
  public toggleSubGroupItemVisibility(gid :string , subgid : string){
    var group = this.amountEntriesGroupsAndSubgroups.find( item=> item.groupid == gid);
    var subgroup = group.CategoryGroups.find(item=> item.subgroupid == subgid);
    subgroup.isvisible = !subgroup.isvisible;
  }


  //Private Helper Functions
  private calculateBalanceofSelectedAccount() {
    if(this.amountEntries != null && this.selectedAccount != null)
    {
      this.balance = 0;
      this.balance = this.calculateBalanceOnAccountID(this.selectedAccount.id);
    }
  }
  private updateAmountEntriesGroupsAndSubgroups(){

    if(!this.amountEntries) {
      this.amountEntriesGroupsAndSubgroups = [];
    }else{
      if(this.selectedAccount)
        this.transform(this.amountEntries,this.selectedAccount.id); //this would update the group object
    }

  }
  private createDefaultApplicationData(){
    //clearing
    this.amountEntries = [];
    this.amountEntriesGroupsAndSubgroups = [];
    this.balance = 0;

    let dateToday = new Date();
    let issystem = false;
    //Accounts
    this.accounts = []; //Clearing
    this.accounts.push( new Account( UUID.UUID(), "Cartão de Crédito", 7, dateToday, issystem, 0));  //CreditCard
    this.accounts.push( new Account( UUID.UUID(), "Dinheiro", 1, dateToday, issystem, 0));           //Cash
    
    this.categories = []; //Clearing
    //Categories - Expense
    this.categories.push( new Category( UUID.UUID(), "Entretenimento", 2, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Higiene", 3, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Comida", 4, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Esportes", 5, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Transporte", 6, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Telefone", 7, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Café", 8, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Roupas", 9, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Saúde", 10, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Animais", 0, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Carro", 1, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Casa", 11, Type.Expense, issystem));
    this.categories.push( new Category( UUID.UUID(), "Transferir", this.imagesprovider.getTransferImageIndex(Type.Expense), Type.Expense, true));
    //Categories - Revenue
    this.categories.push( new Category( UUID.UUID(), "Salário", 2, Type.Revenue, issystem));
    this.categories.push( new Category( UUID.UUID(), "Aluguel", 0, Type.Revenue, issystem));
    this.categories.push( new Category( UUID.UUID(), "Poupança", 1, Type.Revenue, issystem));
    this.categories.push( new Category( UUID.UUID(), "Transferir", this.imagesprovider.getTransferImageIndex(Type.Revenue), Type.Revenue, true));

  }
  private filterEntriesbyAccountID(entries : Array<AmountEntry>, id : string){
    return entries.filter(item=> item.accountID == id);
  }
  private groupContactsUsingArray( entries : Array<AmountEntry> ){
    //Sorting Array by latest Date
    var datesorted = entries.sort(function(a,b){
      var aa = new Date(a.timestamp); //.toLocaleDateString();
      var bb = new Date(b.timestamp); //.toLocaleDateString();

      var cc = a.categoryID;
      var dd = b.categoryID;

      if (aa > bb) return -1;
      else if (aa < bb) return 1;
      else if (cc > dd) return -1;
      else if (cc < dd) return 1;
    });

    let currentDate : Date = new Date(1990); //random old date
    let currentCatID : string = "00"; //random false id
    let currentGroup = [];
    let currentSubGroup = [];
    let currentSubGroupTotal = {value : 0};

    datesorted.forEach((value, index) => {

        var itemDate : Date = new Date(value.timestamp);  //converting string date to Date object

        //Grouping on date
        if( itemDate.getDate() != currentDate.getDate() || itemDate.getMonth() != currentDate.getMonth() ||
            itemDate.getFullYear() != currentDate.getFullYear()){

            currentDate = itemDate;
            currentCatID = "00";  //resetting the categoryid aswell

            let newGroup = {
                groupid : UUID.UUID(),
                date: currentDate,
                CategoryGroups: []
            };
            
            currentGroup = newGroup.CategoryGroups; //pointer to the group
            this.amountEntriesGroupsAndSubgroups.push(newGroup);
        }

        //Grouping on Category within a Date
        if(currentCatID != value.categoryID){

          currentCatID = value.categoryID;

          let newsubgroup = {
            subgroupid : UUID.UUID(),
            subgroupCategoryID : currentCatID,
            subgroupTotal : {value : 0},
            subgrouptype : value.type,
            isvisible : false,  //responsible for opening and closing this group
            CategoryEntries : []
          }
          currentSubGroup = newsubgroup.CategoryEntries;  //pointer to the subgroup
          currentSubGroupTotal = newsubgroup.subgroupTotal; //pointer to the subgroup total
          currentGroup.push(newsubgroup);
        }

        //Updating subgroup Total
        currentSubGroupTotal.value += value.price;

        //Inserting the actual entry
        currentSubGroup.push(value);
    });
  }

}