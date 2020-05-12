import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estatusRoles',
  pure: false
})
export class EstatusRolesPipe implements PipeTransform {

  transform(value: any): any {     
    switch(value){
      case "0": return "Desactivo";
      case "1": return "Activo";
    }    
  }
}
