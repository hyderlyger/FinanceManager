import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DBProvider } from '../../../providers/db-provider';
import { ImagesProvider } from '../../../providers/images-provider';
import { Category } from '../../../models/category';
import { Type } from '../../../models/enums';
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

  //Graph Date
  monthlyCategoryList : Array<myCategory> = []; //each row contains {categories : this.dbprovider.categories[i], Total : 0}
  TotalRevenue : number;
  TotalExpense : number;

  constructor(  public navCtrl: NavController, public navParams: NavParams, private dbprovider : DBProvider,
                private imagesprovider : ImagesProvider, private popoverCtrl: PopoverController ) {
      this.date = new Date().toISOString();
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
        var newCat = new myCategory(this.dbprovider.categories[i],0);
        this.monthlyCategoryList.push(newCat);
    }

    //Generating Data for the Month
    this.dbprovider.amountEntries.forEach(element => {
        if(element.accountID == this.dbprovider.selectedAccount.id) // For selected Account
        {
            var currentdate = new Date(this.date);
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
  }
  updateGraphsData()
  {
    this.generatedoughnutData();
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    
                type: 'doughnut',
                data: {
                    labels: ["Revenue", "Expense"],
                    datasets: [{
                        label: 'Finances',
                        data: [ this.TotalRevenue, this.TotalExpense ],//[50000, 40000],
                        backgroundColor: [
                            'rgba(79, 179, 124, 0.8)',
                            'rgba(177, 22, 35, 0.8)',
                        ],
                        hoverBackgroundColor: [
                            "#4fb37c",
                            "#b11623",
                        ]
                    }]
                },
              options: {
                    animation:{
                        animateScale:true
                        }
                }
    
            });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [10, 59, 80, 81, 56, 55, 200],
                        spanGaps: false,
                    },
                    {
                        label: "My Second dataset",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,100,100,100)",
                        borderColor: "rgba(255,0,0,0)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,0,0,0)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,100,100,100)",
                        pointHoverBorderColor: "rgba(255,0,0,0)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [1, 20, 30, 40, 50, 60, 90],
                        spanGaps: false,
                    }
                ],
                // options: {
                //     responsive: true,
                //     maintainAspectRatio: false,
                // }
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

export class myCategory {
    public constructor( public category : Category, 
                        public Total : number )
                        {
                            

    }
}
