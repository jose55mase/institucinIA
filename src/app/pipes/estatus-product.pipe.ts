import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusProduct',
  pure: false
})
export class EstatusProductPipe implements PipeTransform {

  transform(value: any): any {     
    switch(value){
      case "0": return "Desactivo";
      case "1": return "Activo";
    }    
  }
}
