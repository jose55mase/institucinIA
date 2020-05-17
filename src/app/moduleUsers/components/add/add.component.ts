import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { ModelCountries } from 'app/models/countries.model';
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModuleAsignature } from 'app/models/asignature.model';
import { AsignatureService } from 'app/services/asignature.service';



@Component({
  selector: 'app-asignature_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AsignatureService],


})
export class AddComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;
  checkoutForm;
  moduleAsignature : ModuleAsignature;
  objet = new Object;

  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;

  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private asignatureService : AsignatureService
  ) {
    
    
    this.checkoutForm = this.formBuilder.group({
      
      Materia: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),     
    });
    
    if(JSON.parse(sessionStorage.getItem("objectKonecta")) != null){
      this.btnUpDate = true;
      this.moduleAsignature = JSON.parse(sessionStorage.getItem("objectKonecta"))
      this.checkoutForm.controls['Materia'].setValue(this.moduleAsignature.name)
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
      name : this.checkoutForm.value.Materia,
      id : idesData,
      uid: idesData,
      state:"1",
    }    
    this.asignatureService.save(this.objet).subscribe(
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
    this.objet = {
      name : this.checkoutForm.value.Materia,
      id : this.moduleAsignature.id,
    
      state:1,
    }
    console.log(this.objet)
    this.asignatureService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('✔', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('❌', "Error al guardar", 'error');
      }
      )    
  }
}
