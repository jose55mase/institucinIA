import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityProductGrupo',
  pure: false
})
export class EstatusActivityGrupoPipe implements PipeTransform {

  transform(value: number): any {     
    switch(value){
      case 1: return "A1";
      case 2: return "A2";
      case 3 : return"A3";
      case 4 : return "B1";
      case 5 : return "B2";
      case 6 : return "C3";
      case 7 : return "C1";
      case 8 : return "C2";
      case 9 : return "C3";
    }    
  }
}
