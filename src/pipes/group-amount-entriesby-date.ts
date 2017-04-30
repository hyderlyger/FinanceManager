import { Pipe, PipeTransform } from '@angular/core';
import { AmountEntry } from '../models/amountEntry';
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

  filterEntriesbyAccountID(entries : Array<AmountEntry>, id : string)
  {
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
    let currentContacts = [];

    datesorted.forEach((value, index) => {
        var itemDate : Date = new Date(value.timestamp);
        if( itemDate.getDay() != currentDate.getDay() || itemDate.getMonth() != currentDate.getMonth() ||
            itemDate.getFullYear() != currentDate.getFullYear()){

            currentDate = itemDate;

            let newGroup = {
                date: currentDate,
                AccountEntries: []
            };

            currentContacts = newGroup.AccountEntries;
            this.groupedEntries.push(newGroup);

        } 

        currentContacts.push(value);

    });
  }
}
