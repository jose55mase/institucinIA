import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { CountriesService } from 'app/services/countries.service';
import { ModelCountries } from 'app/models/countries.model';
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModuleRoles } from 'app/models/roles.model';
import { RolesService } from 'app/services/roles.service';



@Component({
  selector: 'app-countries_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [CountriesService],


})
export class AddComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;
  checkoutForm;
  moduleRoles : ModuleRoles;
  objet = new Object;

  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;

  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private rolesService : RolesService
  ) {
    
    
    this.checkoutForm = this.formBuilder.group({
      
      rol: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),     
    });
    
    if(JSON.parse(sessionStorage.getItem("objectKonecta")) != null){
      this.btnUpDate = true;
      this.moduleRoles = JSON.parse(sessionStorage.getItem("objectKonecta"))
      this.checkoutForm.controls['rol'].setValue(this.moduleRoles.descriptionRol)
    }else{ this.btnSaveDate = true; }
      
     
  }
  ngOnInit() {    
    
  }

 /*
   ======= Body Objeto ====
  pkRol: number;
  idRol: number;
  descriptionRol:string;
  stateRol: number;
  */
  public savedata(){
    var idRolesData = Date.now()
    this.objet = {
      descriptionRol : this.checkoutForm.value.rol,
      idRol : idRolesData,
      pkRol: idRolesData,
      stateRol:"1",
    }    
    this.rolesService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro guardado correctamente", 'success');
        this.checkoutForm.rest
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )    
  }

  public update(data:ModuleRoles){    
    this.objet = {
      descriptionRol : this.checkoutForm.value.rol,
      idRol : this.moduleRoles.idRol,
      pkRol: this.moduleRoles.pkRol,
      stateRol:1,
    }
    console.log(this.objet)
    this.rolesService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )    
  }
}
