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

import {ActivatedRoute, Routes, Router, RouterModule,NavigationExtras } from '@angular/router'; // CLI imports router
import { ListComponent } from '../list/list.component';
import { param } from 'jquery';
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
  userRol = true
  btnCreateUser = false;
  
  
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
    private activatedRoute : ActivatedRoute,
    
  
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    this.activatedRoute.queryParams.subscribe((param)=>{
      this.btnCreateUser = param.btnCreateUser;
    })

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
        Validators.email,      
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
      Password1 :new FormControl('',Validators.compose([
                   
      ])),
      Password2 :new FormControl('',Validators.compose([
                    
      ])),
    })
    
    if(JSON.parse(sessionStorage.getItem("userNow")) != null && JSON.parse(sessionStorage.getItem("objectIIA")) == null && !this.btnCreateUser){
      
      this.userRol = JSON.parse(sessionStorage.getItem("userNow")).btn;
      this.btnUpDate = true;
      this.moduleAsignature = JSON.parse(sessionStorage.getItem("userNow"))
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
      this.checkoutForm2.controls['Password1'].setValue(this.moduleAsignature.Password)
    }else if(this.btnCreateUser){
      
    }else if(JSON.parse(sessionStorage.getItem("objectIIA")) != null && JSON.parse(sessionStorage.getItem("objectIIA")).btn == true){
     
      this.btnUpDate = true;
      this.userRol = true;
      
      console.log(JSON.parse(sessionStorage.getItem("objectIIA")))
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
      this.checkoutForm2.controls['Password1'].setValue(this.moduleAsignature.Password)
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
    console.log(this.checkoutForm2.value)
    var idesData = Date.now()
    this.objet = {
      id:idesData,
      Documento: this.checkoutForm1.value.Documento,
      Nombre:this.checkoutForm1.value.Nombre,
      Apellidos: this.checkoutForm1.value.Apellidos,
      Telefonos : this.checkoutForm1.value.Telefonos,
      Acudiente : this.checkoutForm1.value.Acudiente,
      Direccion: this.checkoutForm1.value.Direccion,
      Email: this.checkoutForm1.value.Email,
      Edad : 0,
      Grupo: this.checkoutForm2.value.Grupo ? "-----":"-----",
      Salon :this.checkoutForm2.value.Salon,
      Grado: this.checkoutForm2.value.Grado ? "-----":"-----",
      Rol:this.checkoutForm2.value.Rol,
      dateCreate:`${new Date().getMonth()+1}-${new Date().getDate()}-${new Date().getFullYear()}`,
      Password:this.checkoutForm1.value.Documento
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

    const observer = {
      next: x => console.log('Observer got a next value: ' + x),
      error: err => console.error('Observer got an error: ' + err),
    };
    observer.next((x)=>{console.log("=>",x)})

    this.objet = {
      id:this.moduleAsignature.id,
      Documento: this.checkoutForm1.value.Documento,
      Nombre:this.checkoutForm1.value.Nombre,
      Apellidos: this.checkoutForm1.value.Apellidos,
      Telefonos : this.checkoutForm1.value.Telefonos,
      Acudiente : this.checkoutForm1.value.Acudiente,
      Direccion: this.checkoutForm1.value.Direccion,
      Email: this.checkoutForm1.value.Email,
      Edad : 0,
      Grupo: this.checkoutForm2.value.Grupo,
      Salon :this.checkoutForm2.value.Salon,
      Grado: this.checkoutForm2.value.Grado,
      Rol:this.checkoutForm2.value.Rol,
      Password:this.checkoutForm2.value.Password1
    }
    if((this.checkoutForm2.value.Password2=="" && this.checkoutForm2.value.Password1 == this.moduleAsignature.Password) 
       || this.checkoutForm2.value.Password2 == this.moduleAsignature.Password){
      this.usersService.update(this.objet).subscribe(
        (response)=>{
          this.notificationService.alert('✔', "Registro actulizado correctamente", 'success');
        },
        (error)=>{
          this.notificationService.alert('❌', "Error al guardar", 'error');
        }
        )   
      
    }else if(this.checkoutForm2.value.Password2 != this.moduleAsignature.Password){
      this.notificationService.alert('👮', "Valide las credenciales", 'error');
    }    
  }
  
  //========================= Exit BTN
  close(){
    sessionStorage.removeItem("objectIIA")
    
  }
  //========================= End


}
