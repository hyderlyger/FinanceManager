import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

//Note: INDEXES ARE OUR KEYS HERE

@Injectable()
export class ImagesProvider {

  private readonly AccountImages : Array<string>;
  private readonly CategoryRevenueImages : Array<string>;
  private readonly CategoryExpenseImages : Array<string>;

  constructor() {
    console.log('Hello ImagesProvider Provider');

    var root = "assets/Images/";
        
    //Accounts
    var accountdir = "Account/icons/";
    this.AccountImages.push( root + accountdir + "01.png");    //index 0
    this.AccountImages.push( root + accountdir + "02.png");    
    this.AccountImages.push( root + accountdir + "03.png");    
    this.AccountImages.push( root + accountdir + "04.png");    
    this.AccountImages.push( root + accountdir + "05.png");    
    this.AccountImages.push( root + accountdir + "06.png");    
    this.AccountImages.push( root + accountdir + "07.png");    
    this.AccountImages.push( root + accountdir + "08.png");    
    this.AccountImages.push( root + accountdir + "09.png");    
    this.AccountImages.push( root + accountdir + "10.png");

    //Category - Revenue
    var categorydirRev = "Category/Icons/Rendimento/";
    this.CategoryRevenueImages.push(root + categorydirRev + "Aluguel.png"); //index 0;
    this.CategoryRevenueImages.push(root + categorydirRev + "Poupança.png");
    this.CategoryRevenueImages.push(root + categorydirRev + "Salário.png");

    //Category - Expense
    var categorydirExp = "Category/Icons/Despesas/";
    this.CategoryExpenseImages.push(root + categorydirExp + "01.png"); //index 0;
    this.CategoryExpenseImages.push(root + categorydirExp + "02.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "03.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "04.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "05.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "06.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "07.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "08.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "09.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "10.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "11.png");
    this.CategoryExpenseImages.push(root + categorydirExp + "12.png");  //index 11;

    var categorydirExpExtras = "Category/Icons/Despesas/Extras/"; //Extras
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra01.png");   //index 12
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra02.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra03.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra04.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra05.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra06.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra07.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra08.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra09.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra10.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra12.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra13.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra14.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra15.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra16.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra17.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra18.png");
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra19.png");

  }
  getAccountImagebyID(_id : number){
    if(_id>=0 && _id< this.AccountImages.length)
      return this.AccountImages[_id];
  }
  getAllAccountsImages() {
    return this.AccountImages;  //check if private makes a problem
  }

  getCategoryRevenueImagebyID(_id : number){
    if(_id>=0 && _id< this.CategoryRevenueImages.length)
      return this.CategoryRevenueImages[_id];
  }
  getAllCategoryRevenueImages() {
    return this.CategoryRevenueImages;  //check if private makes a problem
  }
  
  getCategoryExpenseImagebyID(_id : number){
    if(_id>=0 && _id< this.CategoryExpenseImages.length)
      return this.CategoryExpenseImages[_id];
  }
  getAllCategoryExpenseImages() {
    return this.CategoryExpenseImages;  //check if private makes a problem
  }
}
