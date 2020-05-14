

import { ServiceService } from 'app/services/service.service';

import Swal from'sweetalert2';
import { ModelService } from './../../../models/service.model';

//Nuevos imports
import { FormBuilder,Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Output,EventEmitter } from '@angular/core'; 
import { NotificationService } from 'app/services/notification-service';


interface state {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.html',
  styleUrls: ['./service-create.scss']
})

export class ServiceCreateComponent implements OnInit {
  
  selectedValue: string;
  selectedCar: string;
  checkoutForm;
  modelService : ModelService;
  objet = new Object;

  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;

  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private serviceService : ServiceService
  ) {
    
    
    this.checkoutForm = this.formBuilder.group({
      
      description: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),     
    });
    
    if(JSON.parse(sessionStorage.getItem("service")) != null){
      this.btnUpDate = true;
      this.modelService = JSON.parse(sessionStorage.getItem("service"))
      this.checkoutForm.controls['description'].setValue(this.modelService.name)
    }else{ this.btnSaveDate = true; }
      
     
  }
  ngOnInit() {    
    
  }

  state: state[] = [
    {value: '0', viewValue: 'Desactivo'},
    {value: '1', viewValue: 'Activo'},    
  ];
 
  

  public savedata(){
    var idData = Date.now()
    console.log(idData)
    this.objet = {
      name : this.checkoutForm.value.description,
      id : idData,
      uid: idData,
      state:"1",
    }
    console.log(this.objet)
    this.serviceService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('', "Registro guardado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('', "Error al guardar", 'error');
      }
      )    
  }

  public update(data){    
    this.objet = {
      name : this.checkoutForm.value.description,
      id : this.modelService.uid,
      uid: this.modelService.uid,
      state:"1",
    }
    this.serviceService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('', "Error al guardar", 'error');
      }
      )    
  }

}


