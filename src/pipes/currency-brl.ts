import { Pipe, PipeTransform } from '@angular/core';

//CUSTOM PIPE

@Pipe({
  name: 'currencybrl',
})
export class CurrencyBRL implements PipeTransform {

  transform(value: string, ...args) {

    value = value.replace(/\./g,'*');   //temp *
    value = value.replace(/\,/g,'.');   //replace , -> .
    value = value.replace(/\*/g,'\,');  //replace . -> ,
    value = value.replace(/\$/,'$ ');    //space after currency
    return value;

  }
}
