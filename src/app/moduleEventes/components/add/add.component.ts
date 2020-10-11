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
import { EventService } from 'app/services/event.service';
export interface Grupo{
  code:number;
  name:String;
}
export interface Grado{
  code:number;
  name:String;
}

@Component({
  selector: 'app-events_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AsignatureService, NgbModalConfig, NgbModal, EventService],


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
  moduleAsignature : any;
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
    private eventService : EventService,
  
    config: NgbModalConfig, private modalService: NgbModal
  ) {
    this.checkoutForm1 = this.formBuilder.group({
      Descripcion:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)      
      ])),
      Nombre:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      Imagen:new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
           
      ])),
      
      
    });
    this.checkoutForm2 = this.formBuilder.group({
      Inicio:new FormControl('',Validators.compose([
        Validators.required,
      ])),
      Final:new FormControl('',Validators.compose([
         Validators.required
      ])),
      
    })
    
    if(JSON.parse(sessionStorage.getItem("objectIIA")) != null){
      this.btnUpDate = true;
      this.moduleAsignature = JSON.parse(sessionStorage.getItem("objectIIA"))
      var dateBegin = this.moduleAsignature.dateStart
      var dateEnd = this.moduleAsignature.dataEnd
      dateBegin = dateBegin.replace(/(\-)/g,"/")
      dateEnd = dateEnd.replace(/(\-)/g,"/")

      console.log(dateEnd)

      this.checkoutForm1.controls['Nombre'].setValue(this.moduleAsignature.name)
      this.checkoutForm1.controls['Descripcion'].setValue(this.moduleAsignature.description)
      this.checkoutForm1.controls['Imagen'].setValue(this.moduleAsignature.img)
    
      this.checkoutForm2.controls['Inicio'].setValue(new Date(dateBegin))
      this.checkoutForm2.controls['Final'].setValue(new Date(dateEnd))
      
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
      description: this.checkoutForm1.value.Descripcion,
      name:this.checkoutForm1.value.Nombre,
      img: this.checkoutForm1.value.Imagen,
      dataEnd : `${new Date(this.checkoutForm2.value.Final).getMonth()+1}-${new Date(this.checkoutForm2.value.Final).getDate()}-${new Date(this.checkoutForm2.value.Final).getFullYear()}`,
      dateStart : `${new Date(this.checkoutForm2.value.Inicio).getMonth()+1}-${new Date(this.checkoutForm2.value.Inicio).getDate()}-${new Date(this.checkoutForm2.value.Inicio).getFullYear()}`,      
    }
    
    this.eventService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro guardado correctamente", 'success');       
        this.ROUTER.navigate(['/events'])
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )
  }

  public update(data:ModuleAsignature){    
    this.objet = {
      id:this.moduleAsignature.id,
      description: this.checkoutForm1.value.Descripcion,
      name:this.checkoutForm1.value.Nombre,
      img: this.checkoutForm1.value.Imagen,
      dataEnd : `${new Date(this.checkoutForm2.value.Final).getMonth()+1}-${new Date(this.checkoutForm2.value.Final).getDate()}-${new Date(this.checkoutForm2.value.Final).getFullYear()}`,
      dateStart : `${new Date(this.checkoutForm2.value.Inicio).getMonth()+1}-${new Date(this.checkoutForm2.value.Inicio).getDate()}-${new Date(this.checkoutForm2.value.Inicio).getFullYear()}`
    }
    this.eventService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro actulizado correctamente", 'success');
        this.ROUTER.navigate(['/events'])
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

/*
"id": 1590543645513,
      "name": "Disfraz",
      "description": "Es un dia donde pueden venir disfrazados",
      "dateStart": "19-06-2020",
      "dataEnd": "19-06-2020",
      "img": "https://i.ytimg.com/vi/BPT90x5UzN8/maxresdefault.jpg"
      */