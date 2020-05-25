import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activityProduct',
  pure: false
})
export class EstatusActivityPipe implements PipeTransform {

  transform(value: number): any {     
    switch(value){
      case 1  :return "Primero";
      case 2  :return "Segundo";
      case 3  :return "Tercero";
      case 4  :return "Cuarto";
      case 5  :return "Quinto";
      case 6  :return "Sexto";
      case 7  :return "Septimo";
      case 8  :return"Octavo";
      case 9  :return "Noveno";
      case 10 :return "Decimo";
      case 11 :return"Once";
      case 12 :return "Doce";
    }    
  }
}






/*

public grupo:Grupo[]=[
    {code:1 ,name:"A1"},
    {code:2 ,name:"A2"},
    {code:3 ,name:"A3"},
    {code:4 ,name:"B1"},
    {code:5 ,name:"B2"},
    {code:6 ,name:"C3"},
    {code:7 ,name:"C1"},
    {code:8 ,name:"C2"},
    {code:9 ,name:"C3"}
  ]

  // LISTAS GRADOS
  /**
   * @Lista_grados
   * @Descripcion Creara un lista para los grados.
   */
  /*
  public grado:Grado[]=[
    {code:1 ,name:"Primero"},
    {code:2 ,name:"Segundo"},
    {code:3 ,name:"Tercero"},
    {code:4 ,name:"Cuarto"},
    {code:5 ,name:"Quinto"},
    {code:6 ,name:"Sexto"},
    {code:7 ,name:"Septimo"},
    {code:8 ,name:"Octavo"},
    {code:9 ,name:"Noveno"},
    {code:10 ,name:"Decimo"},
    {code:11 ,name:"Once"},
    {code:12 ,name:"Doce"}
  ]

*/