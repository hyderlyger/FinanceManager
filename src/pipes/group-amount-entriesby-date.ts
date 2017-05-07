import { Pipe, PipeTransform } from '@angular/core';
import { AmountEntry } from '../models/amountEntry';
import { Type } from '../models/enums';
@Pipe({
  name: 'groupamountentriesbydate',
})
export class GroupAmountEntriesbyDate implements PipeTransform {
  groupedEntries = [];

  transform(value: Array<AmountEntry>, ...args) {
    this.groupedEntries = [];
    var filteredEntries = this.filterEntriesbyAccountID(value,args[0]);
    this.groupContactsUsingArray(filteredEntries);
    return this.groupedEntries;
  }

  filterEntriesbyAccountID(entries : Array<AmountEntry>, id : string){
    return entries.filter(item=> item.accountID == id);
  }

  groupContactsUsingArray( entries : Array<AmountEntry> )
  {
    //Sorting Array by latest Date
    var datesorted = entries.sort(function(a,b){
      var aa = a.timestamp;
      var bb = b.timestamp;
      return aa>bb ? -1 : aa<bb ? 1 : 0;
    });

    let currentDate : Date = new Date(1990); //random old date
    let currentCatID : string = "00"; //random false id
    let currentGroup = [];
    let currentSubGroup = [];
    let currentSubGroupTotal = 0;

    datesorted.forEach((value, index) => {

        var itemDate : Date = new Date(value.timestamp);  //converting string date to Date object

        //Grouping on date
        if( itemDate.getDay() != currentDate.getDay() || itemDate.getMonth() != currentDate.getMonth() ||
            itemDate.getFullYear() != currentDate.getFullYear()){

            currentDate = itemDate;
            currentCatID = "00";  //resetting the categoryid aswell

            let newGroup = {
                date: currentDate,
                CategoryGroups: []
            };

            currentGroup = newGroup.CategoryGroups; //pointer to the group
            this.groupedEntries.push(newGroup);
        }

        //Grouping on Category within a Date
        if(currentCatID != value.categoryID){

          currentCatID = value.categoryID;

          let newsubgroup = {
            subgroupCategoryID : currentCatID,
            subgroupTotal : 0,
            isvisible : false,  //responsible for opening and closing this group
            CategoryEntries : []
          }
          currentSubGroup = newsubgroup.CategoryEntries;  //pointer to the subgroup
          currentSubGroupTotal = newsubgroup.subgroupTotal; //pointer to the subgroup total
          currentGroup.push(newsubgroup);
        }

        //Updating subgroup Total
        if(value.type == Type.Revenue)
          currentSubGroupTotal += value.price;
        else
          currentSubGroupTotal -= value.price;

        //Inserting the actual entry
        currentSubGroup.push(value);
    });
  }
}
