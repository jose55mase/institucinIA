import { Component, OnInit, ViewChild, Input, Output,EventEmitter } from '@angular/core';

import { ServiceService } from 'app/services/service.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ModelProduct } from 'app/models/product.model';
import { UserService } from 'app/login/services/user.service';
import { ProductInterationService } from 'app/services/productInteration.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from'sweetalert2';
import { User } from 'app/login/components/login/user/user.model';


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

  state: state[] = [
    {value: '0', viewValue: 'Desactivo'},
    {value: '1', viewValue: 'Activo'},
    
  ];
 

  ngOnInit() {
    
  }

}


