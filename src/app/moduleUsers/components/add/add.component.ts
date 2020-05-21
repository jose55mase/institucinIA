import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { ModelCountries } from 'app/models/countries.model';
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModuleAsignature } from 'app/models/asignature.model';
import { AsignatureService } from 'app/services/asignature.service';

import {NgbModal, NgbModalConfig ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-asignature_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AsignatureService, NgbModalConfig, NgbModal],


})
export class AddComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;
  checkoutForm;
  moduleAsignature : ModuleAsignature;
  objet = new Object;
  closeResult = '';
  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;
  labelPosition = 'after'
  /**
   * @Lista 
   * @Descripcion Permite la visualizacion de listas.
   */
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private asignatureService : AsignatureService,
    config: NgbModalConfig, private modalService: NgbModal
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
