import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusClient',
  pure: false
})
export class EstatusClientPipe implements PipeTransform {

  transform(value: any): any {     
    switch(value){
      case 0: return "Desactivo";
      case 1: return "Activo";
    }    
  }
}
