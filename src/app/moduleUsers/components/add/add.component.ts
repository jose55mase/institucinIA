import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ModuleAsignature } from 'app/models/asignature.model';
import { AsignatureService } from 'app/services/asignature.service';

import {NgbModal, NgbModalConfig ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModuleUsers } from 'app/models/users.model';
import { UsersService } from 'app/services/usuario.service';
import { ModelClient } from 'app/models/client.model';

import { Routes, Router, RouterModule } from '@angular/router'; // CLI imports router
export interface Grupo{
  code:number;
  name:String;
}
export interface Grado{
  code:number;
  name:String;
}

@Component({
  selector: 'app-asignature_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AsignatureService, NgbModalConfig, NgbModal],


})
export class AddComponent implements OnInit {

  /**
   * @Variables 
   * @Descripcion Permite la asignacion de tareas.
   */

  selectedValue: string;
  selectedCar: string;
  checkoutForm1;
  checkoutForm2;
  moduleAsignature : ModuleUsers;
  moduleUsers : ModuleUsers;
  objet = new Object;
  closeResult = '';
  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;
  labelPosition = 'after'
  isLinear = false;
 
  
    // LISTAS GRUPOS
  /**
   * @Lista_grupos
   * @Descripcion Creara un lista para los grupos
   */
  public grupo:Grupo[]=[
    {code:0 ,name:"-----"},
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
  public grado:Grado[]=[
    {code:0 ,name:"-----"},
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
  
  constructor(  
    private notificationService : NotificationService,
    private usersService : UsersService,
    private formBuilder: FormBuilder,
    private _formBuilder: FormBuilder,
    private ROUTER : Router,
  
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    this.checkoutForm1 = this.formBuilder.group({
      Documento:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Nombre:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Apellidos:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Telefonos:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Acudiente:new FormControl('',Validators.compose([
            
      ])),
      Direccion:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Email:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Edad:new FormControl('',Validators.compose([
          
      ])),
      
    });
    this.checkoutForm2 = this.formBuilder.group({
      Grupo:new FormControl('',Validators.compose([
         
      ])),
      Salon:new FormControl('',Validators.compose([
       
      ])),
      Grado:new FormControl('',Validators.compose([
           
      ])),
      Rol:new FormControl('',Validators.compose([
        Validators.required,            
      ])),
    })
    
    if(JSON.parse(sessionStorage.getItem("objectIIA")) != null){
      this.btnUpDate = true;
      this.moduleAsignature = JSON.parse(sessionStorage.getItem("objectIIA"))
      this.checkoutForm1.controls['Nombre'].setValue(this.moduleAsignature.Nombre)
      this.checkoutForm1.controls['Apellidos'].setValue(this.moduleAsignature.Apellidos)
      this.checkoutForm1.controls['Acudiente'].setValue(this.moduleAsignature.Acudiente)
      this.checkoutForm1.controls['Direccion'].setValue(this.moduleAsignature.Direccion)
      this.checkoutForm1.controls['Documento'].setValue(this.moduleAsignature.Documento)
      this.checkoutForm1.controls['Edad'].setValue(this.moduleAsignature.Edad)
      this.checkoutForm1.controls['Email'].setValue(this.moduleAsignature.Email)      
      let filter =this.grado.find((data)=>{return data.name == this.moduleAsignature.Grado})
      this.checkoutForm2.controls['Grado'].setValue(filter.name)
      filter =this.grupo.find((data)=>{return data.name == this.moduleAsignature.Grupo})
      this.checkoutForm2.controls['Grupo'].setValue(filter.name)
      this.checkoutForm1.controls['Telefonos'].setValue(this.moduleAsignature.Telefonos)
      this.checkoutForm2.controls['Rol'].setValue(this.moduleAsignature.Rol)
      this.checkoutForm2.controls['Salon'].setValue(this.moduleAsignature.Salon)
      
    }else{ this.btnSaveDate = true; }
      
    config.backdrop = 'static';
    config.keyboard = false;
    
  }
  ngOnInit() {    
    
  }

  open(content) {
    this.modalService.open(content);
  }

 /*
   ======= Body Objeto ====
  uid: number;
  id: number;
  name:string;
  state: number;
  */
  public savedata(){
    
    var idesData = Date.now()
    this.objet = {
      id:idesData,
      Documento: this.checkoutForm1.value.Documento,
      Nombre:this.checkoutForm1.value.Nombre,
      Apellidos: this.checkoutForm1.value.Apellidos,
      Telefonos : this.checkoutForm1.value.Telefonos,
      Acudiente : this.checkoutForm1.value.Acudientem,
      Direccion: this.checkoutForm1.value.Direccon,
      Email: this.checkoutForm1.value.Email,
      Edad : 0,
      Grupo: this.checkoutForm2.value.Grupo ? "":"-----",
      Salon :this.checkoutForm2.value.Salon,
      Grado: this.checkoutForm2.value.Grado ? "":"-----",
      Rol:this.checkoutForm2.value.Rol
    }
    
    this.usersService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro guardado correctamente", 'success');       
        this.ROUTER.navigate(['/users'])
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )    
      
  }

  public update(data:ModuleAsignature){    
    this.objet = {
      id:this.moduleAsignature.id,
      Documento: this.checkoutForm1.value.Documento,
      Nombre:this.checkoutForm1.value.Nombre,
      Apellidos: this.checkoutForm1.value.Apellidos,
      Telefonos : this.checkoutForm1.value.Telefonos,
      Acudiente : this.checkoutForm1.value.Acudientem,
      Direccion: this.checkoutForm1.value.Direccon,
      Email: this.checkoutForm1.value.Email,
      Edad : 0,
      Grupo: this.checkoutForm2.value.Grupo,
      Salon :this.checkoutForm2.value.Salon,
      Grado: this.checkoutForm2.value.Grado,
      Rol:this.checkoutForm2.value.Rol
    }
    //console.log(this.objet)
    
    this.usersService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )   
       
  }

  //========================= Exit BTN
  close(){
    sessionStorage.removeItem("objectIIA")
  }
  //========================= End


}
