import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModuleAsignature } from 'app/models/asignature.model';

import { ClientService } from 'app/services/client.service';



@Component({
  selector: 'app-client_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [ClientService],


})
export class AddComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;
  checkoutForm;
  moduleRoles : ModuleAsignature;
  objet = new Object;

  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;

  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private clientService : ClientService
  ) {
    
    
    this.checkoutForm = this.formBuilder.group({
      
      client: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),     
    });
    
    if(JSON.parse(sessionStorage.getItem("objectKonecta")) != null){
      this.btnUpDate = true;
      this.moduleRoles = JSON.parse(sessionStorage.getItem("objectKonecta"))
     // this.checkoutForm.controls['client'].setValue(this.ModuleAsignature.name)
    }else{ this.btnSaveDate = true; }
      
     
  }
  ngOnInit() {    
    
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
      name : this.checkoutForm.value.client,
      id : idesData,

      state:"1",
    }    
    this.clientService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro guardado correctamente", 'success');
        this.checkoutForm.rest
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
    )    
  }

  public update(data:ModuleAsignature){
    console.log(data) 
    this.objet = {
      name : this.checkoutForm.value.client,
      id : this.moduleRoles.id,

      state:1,
    }
    console.log(this.objet)
    this.clientService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )    
  }
}
