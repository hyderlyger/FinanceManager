import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Type } from '../models/enums'; 
import { Color } from '../models/enums'; 

//Note: INDEXES ARE OUR KEYS HERE

@Injectable()
export class ImagesProvider {

  private readonly AccountImages : Array<string> = [];
  private readonly CategoryRevenueImages : Array<string> = [];
  private readonly CategoryExpenseImages : Array<string> = [];

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
    this.AccountImages.push( root + accountdir + "10.png");    //index 9

    //Category - Revenue
    var categorydirRev = "Category/Icons/Rendimento/";
    this.CategoryRevenueImages.push(root + categorydirRev + "Aluguel.png"); //index 0;
    this.CategoryRevenueImages.push(root + categorydirRev + "Poupança.png");
    this.CategoryRevenueImages.push(root + categorydirRev + "Salário.png");
    this.CategoryRevenueImages.push(root + categorydirRev + "00.png");    //index 3 //Tranfer Img

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
    this.CategoryExpenseImages.push(root + categorydirExp + "12.png");  
    this.CategoryExpenseImages.push(root + categorydirExp + "00.png");  //index 12  //Tranfer Img

    var categorydirExpExtras = "Category/Icons/Despesas/Extras/"; //Extras
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra01.png");   //index 13
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
    this.CategoryExpenseImages.push(root + categorydirExpExtras + "extra19.png");    //index 30

  }
  
  getAccountImagebyID(_id : number){
    if(_id>=0 && _id< this.AccountImages.length)
      return this.AccountImages[_id];
    else
      "";
  }
  // getAllAccountsImages() {
  //   return this.AccountImages;  //check if private makes a problem
  // }

  getCategoryRevenueImagebyID(_id : number){
    if(_id>=0 && _id< this.CategoryRevenueImages.length)
      return this.CategoryRevenueImages[_id];
  }
  // getAllCategoryRevenueImages() {
  //   return this.CategoryRevenueImages;  //check if private makes a problem
  // }
  
  getCategoryExpenseImagebyID(_id : number){
    if(_id>=0 && _id< this.CategoryExpenseImages.length)
      return this.CategoryExpenseImages[_id];
  }
  // getAllCategoryExpenseImages() {
  //   return this.CategoryExpenseImages;  //check if private makes a problem
  // }
  
  getTransferImageIndex(type : Type){ //hemper function to provide transfer img index
    if(type == Type.Revenue)
      return 3;
    else if (type == Type.Expense)
      return 12;
  }

  getColorbyExpenseCategoryImageIndex(index : number, Opacity : number){
    var _color = null;
    switch(index){
        case 0:
            _color = new Color("rgba(106, 74, 60, "+Opacity+")","#6A4A3C"); //Brown
            break;
        case 1:
            _color = new Color("rgba(204, 51, 63, "+Opacity+")","#CC333F"); //Red
            break;
        case 2:
            _color = new Color("rgba(254, 67, 101, "+Opacity+")","#FE4365"); //Pink
            break;
        case 3:
            _color = new Color("rgba(130, 174, 154, "+Opacity+")","#82AE9A"); //Blue
            break;
        case 4:
            _color = new Color("rgba(125, 182, 0, "+Opacity+")","#7DB600"); //Green
            break;
        case 5:
            _color = new Color("rgba(85, 98, 112, "+Opacity+")","#556270"); //Grey
            break;
        case 6:
            _color = new Color("rgba(13, 103, 89, "+Opacity+")","#0D6759"); //Greenish
            break;
        case 7:
            _color = new Color("rgba(136, 88, 162, "+Opacity+")","#8858A2"); //Purple
            break;
        case 8:
            _color = new Color("rgba(233, 127, 2, "+Opacity+")","#E97F02"); //Yellow
            break;
        case 9:
            _color = new Color("rgba(149, 121, 0, "+Opacity+")","#957900"); //Mehndi xD
            break;
        case 10:
            _color = new Color("rgba(232, 29, 39, "+Opacity+")","#E81D27"); //Red toot
            break;
        case 11:
            _color = new Color("rgba(0, 160, 176, "+Opacity+")","#00A0B0"); //Bluish
            break;
        default:
            break;
    }
    return _color;
  }
  
}
