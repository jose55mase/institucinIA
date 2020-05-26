import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeUse',
  pure: false
})
export class TypeUserPipe implements PipeTransform {

  transform(value: any): any {     
    switch(value){
      case "Estudiante" : return `E 🎓`
      case "Maestro" : return `M 📒`
      case "Secretaria" : return `S 📒`
      case "Rector" : return `R 📒`
      case "Administrador" : return `A 🌏`
    }    
  }
}
