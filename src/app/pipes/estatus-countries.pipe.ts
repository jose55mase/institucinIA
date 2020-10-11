import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusCountries',
  pure: false
})
export class EstatusCountriesPipe implements PipeTransform {

  transform(value: any): any {     
    switch(value){
      case 0: return "Desactivo";
      case 1: return "Activo";
    }    
  }
}
