

import { ServiceService } from 'app/services/service.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ModelProduct } from 'app/models/product.model';
import { UserService } from 'app/login/services/user.service';
import { ProductInterationService } from 'app/services/productInteration.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from'sweetalert2';
import { ModelService } from './../../../models/service.model';

//Nuevos imports
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Output,EventEmitter } from '@angular/core'; 


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

  constructor(   
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      description: '',      
    });
    console.log()
    if(JSON.parse(sessionStorage.getItem("service")) != null){
      this.modelService = JSON.parse(sessionStorage.getItem("service"))
      this.checkoutForm.controls['description'].setValue(this.modelService.descriptionService)
    }      
  }
  ngOnInit() {    
    
  }

  state: state[] = [
    {value: '0', viewValue: 'Desactivo'},
    {value: '1', viewValue: 'Activo'},    
  ];
 
  

  public savedata(){
    console.log(this.checkoutForm.value)
  }

}


