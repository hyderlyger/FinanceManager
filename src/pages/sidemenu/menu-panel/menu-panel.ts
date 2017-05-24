import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';
import { Category } from '../../../models/category';
import { Type } from '../../../models/enums';
import { Color } from '../../../models/enums';
import { PopoverAccountSelect } from '../../../components/popover-account-select/popover-account-select';

@IonicPage()
@Component({
  selector: 'page-menu-panel',
  templateUrl: 'menu-panel.html',
})
export class MenuPanel {
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;

  date : string;
  doughnutChart: any;
  lineChart :  any;

  //Donut Graph Data
  monthlyCategoryList : Array<monthlyCategoryTotal> = []; //each row contains {categories : this.dbprovider.categories[i], Total : 0}
  TotalRevenue : number;
  TotalExpense : number;
  //Line Graph Data
  LineGraphLabels : Array<string>;
  RevenueDailyTotals : Array<number>;
  ExpenseDailyTotals : Array<number>;

  constructor(  public navCtrl: NavController, public navParams: NavParams, private dbprovider : DBProvider,
                private imagesprovider : ImagesProvider, private popoverCtrl: PopoverController ) {
      this.date = new Date().toISOString();

  }

  generatelineData(){
    //reset
    this.LineGraphLabels = [];
    this.RevenueDailyTotals = [];
    this.ExpenseDailyTotals = [];

    //readying data array
    var dailyTotalsList : Array<dailyTotals> = [];

    var currentdate = new Date(this.date);
    var currentmonth= currentdate.getMonth();
    var currentyear = currentdate.getFullYear();

    //initializing data Array i.e push for each day in current month
    var iteratingDateObject = new Date(this.date);
    iteratingDateObject.setDate(1); //setting to 1st
    var startingmonth = iteratingDateObject.getMonth();
    while(iteratingDateObject.getMonth() == startingmonth){
        let currentDate: Date = new Date(iteratingDateObject);
        dailyTotalsList.push(new dailyTotals(currentDate,0,0));
        iteratingDateObject.setDate(iteratingDateObject.getDate() + 1);
    }

    //Getting meaningfull data from dbprovider
    var CurrentMonthGroupList = this.dbprovider.amountEntriesGroupsAndSubgroups.filter( item=> 
                            currentmonth == new Date(item.date).getMonth() && 
                            currentyear == new Date(item.date).getFullYear() );

    //Making meaningfull data calculations
    if(CurrentMonthGroupList){

        //Putting Group Totals in graph array
        CurrentMonthGroupList.forEach(group => {
            let matchedDayTotal = dailyTotalsList.find(item=> item.Date.getMonth() == new Date(group.date).getMonth()
                                     && item.Date.getFullYear() == new Date(group.date).getFullYear()
                                     && item.Date.getDate() == new Date(group.date).getDate() );
            if(matchedDayTotal){
                group.CategoryGroups.forEach(subgroup => {
                    if(subgroup.subgrouptype ==  Type.Revenue){
                        matchedDayTotal.TotalRevenue += subgroup.subgroupTotal.value;
                    }else if(subgroup.subgrouptype ==  Type.Expense){
                        matchedDayTotal.TotalExpense += subgroup.subgroupTotal.value;
                    }
                });
            }
        });
    }

    if(dailyTotalsList){
        let i = 3;
        dailyTotalsList.forEach( day => {
            //Gaps in the labels
            if(i % 3 == 0)
                this.LineGraphLabels.push(day.Date.getDate().toString());
            else
                this.LineGraphLabels.push("");

            this.RevenueDailyTotals.push(day.TotalRevenue);
            this.ExpenseDailyTotals.push(day.TotalExpense);
            i++;
        });
    }

  }

  generatedoughnutData(){
    //reset
    this.TotalRevenue = 0;
    this.TotalExpense = 0;
    this.monthlyCategoryList = [];

    //initializing date
    var currentdate = new Date(this.date);
    var currentmonth= currentdate.getMonth();
    var currentyear = currentdate.getFullYear();

    //Collecting the Categories to show
    for(var i=0; i<12; i++){
        var newCat = new monthlyCategoryTotal(this.dbprovider.categories[i], this.imagesprovider.getColorbyExpenseCategoryImageIndex(this.dbprovider.categories[i].imageindex,0.7),0);  //0.7 Opasity
        this.monthlyCategoryList.push(newCat);
    }

    //Generating Data for the Month
    this.dbprovider.amountEntries.forEach(element => {
        if(element.accountID == this.dbprovider.selectedAccount.id) // For selected Account
        {
            var elementdate = new Date(element.timestamp);
            if( currentmonth == elementdate.getMonth() && currentyear == elementdate.getFullYear()){
                if(element.type == Type.Expense){
                    var myCat =  this.monthlyCategoryList.find((item)=>item.category.id == element.categoryID);
                    if(myCat){  //exists
                        myCat.Total += element.price;
                    }
                    this.TotalExpense += element.price;
                }else if(element.type == Type.Revenue){
                    this.TotalRevenue += element.price;
                }
            }
        }
    });
    this.monthlyCategoryList.sort(function(a, b){return b.Total-a.Total});  //sorting highest to lowest
  }
  updateGraphsData()
  {
    this.generatedoughnutData();
    var DonutLabels : Array<string> = [];
    var DonutPrices : Array<number> = [];
    var DonutBackgroundColors : Array<string> = [];
    var DonutHoverColors : Array<string> = [];

    this.monthlyCategoryList.forEach((cat)=>{
        DonutLabels.push(cat.category.subject);
        DonutPrices.push(cat.Total);
        DonutBackgroundColors.push(cat.color.rgb);
        DonutHoverColors.push(cat.color.hex);
    });


    //previous chart flash back issue
    if(this.doughnutChart!=null){
        this.doughnutChart.destroy();
    }
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    
                type: 'doughnut',
                data: {
                    labels: DonutLabels,//["Revenue", "Expense"],
                    datasets: [{
                        label: 'Finances',
                        data: DonutPrices,//[ this.TotalRevenue, this.TotalExpense ],
                        backgroundColor: DonutBackgroundColors,/*[
                            'rgba(79, 179, 124, 0.7)',
                            'rgba(177, 22, 35, 0.7)',
                        ],*/
                        hoverBackgroundColor: DonutHoverColors /*[
                            "#4fb37c",
                            "#b11623",
                        ]*/
                    }]
                },
              options: {
                    animation:{
                        animateScale:true
                    },
                    legend: {
                        display: false
                    }
                }
    
            });


    this.generatelineData();
    //previous chart flash back issue
    if(this.lineChart!=null){
        this.lineChart.destroy();
    }
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: this.LineGraphLabels,//["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Revenue",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(79, 179, 124, 0.8)',
                        borderColor: 'rgba(79, 179, 124, 0.8)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(79, 179, 124, 0.8)',
                        pointBackgroundColor: "#4fb37c",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "'rgba(79, 179, 124, 0.8)'",
                        pointHoverBorderColor: "'rgba(79, 179, 124, 0.8)'",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.RevenueDailyTotals,//[10, 59, 80, 81, 56, 55, 200],
                        spanGaps: false,
                    },
                    {
                        label: "Expense",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(177, 22, 35, 0.8)',
                        borderColor: 'rgba(177, 22, 35, 0.8)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(177, 22, 35, 0.8)',
                        pointBackgroundColor: "#b11623",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(177, 22, 35, 0.8)',
                        pointHoverBorderColor: 'rgba(177, 22, 35, 0.8)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.ExpenseDailyTotals,//[1, 20, 30, 40, 50, 60, 90],
                        spanGaps: false,
                    }
                ]
            },
            options: {
                    animation:{
                        animateScale:true
                    },
                    scales: {
                        xAxes: [{
                                gridLines: {
                                    display:false
                                }
                            }],
                        yAxes: [{
                                gridLines: {
                                    display:false
                                }   
                            }]
                    }
                }
 
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPanel');
    this.updateGraphsData();
  }

  //PopOver
  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverAccountSelect);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss((accountid : string) => {
      if(accountid){
        this.dbprovider.UpdateSelectedAccount(accountid);
        this.updateGraphsData();
      }
    });
  }

  NextMonth(){
      var currentdate= new Date(this.date);
      currentdate.setMonth(currentdate.getMonth()+1);
      this.date = currentdate.toISOString();
      this.updateGraphsData();
  }
  PreviousMonth(){
      var currentdate= new Date(this.date);
      currentdate.setMonth(currentdate.getMonth()-1);
      this.date = currentdate.toISOString();
      this.updateGraphsData();
  }
  onTimeChange(newval){
      this.date = newval;
      this.updateGraphsData();
  }

}

export class monthlyCategoryTotal {
    public constructor( public category : Category,
                        public color : Color, 
                        public Total : number )
                        {
    }
}
export class dailyTotals {
    public constructor( public Date : Date,
                        public TotalExpense : number,
                        public TotalRevenue : number )
                        {
    }
}
