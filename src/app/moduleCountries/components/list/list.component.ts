import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'


import { ModuleActivity } from 'app/models/activity.model';
import { ModelCountries } from 'app/models/countries.model';
import Swal from 'sweetalert2';
import { NotificationService } from 'app/services/notification-service';
import { ActivityService } from 'app/services/activity.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-countries_list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ActivityService],


})
export class ListComponent implements OnInit {

  /**
 * 
 * @param serviceService 
 * @param users  Ruth Elsy
 * @param dialog 
 * @param _productInterationService 
 * @param modalService 
 */

  /** 
   * @Variables 
  */
  showCRUDlist: boolean = true;
  showCRUDcreate: boolean = false;
  //showCRUDlist : boolean = false;
  //showCRUDlist : boolean = false;
  // Variables
  public data: any;
  objet = new Object;
  // Model
  
 
  displayedColumns: string[] = ['Codigo', 'Actividad', 'Grupo', 'Grado', 'Accion'];
  public usersList_Id: any;
  public estatus_data: string = '';
  public product_estatus: boolean = false;

  public whatchProduct: boolean = false;
  @Output() _updateProduct = new EventEmitter;
  @Output() _deleteProduct = new EventEmitter;
  @Output() _lisProduct = new EventEmitter;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator; 
  closeResult: string;

  open(content) {
    this.modalService.open(content);
  }

  public CRUD(crud: number, id?) {
    switch (crud) {
      case 2: // Crear
        this.showCRUDlist = false;
        this.showCRUDcreate = true;
        sessionStorage.removeItem("objectSchool")
        break;
      case 1: // Listar
        this.showCRUDlist = true;
        this.showCRUDcreate = false;
        sessionStorage.removeItem("objectSchool")
        this.getProductList();
        break;
      default:
        break;
    }
  }

  /*
   ======= Body Objeto ====
  id,
  activity,
  grupo,
  grado
  */
 

  public editData(data: any) {
    sessionStorage.setItem("objectSchool", JSON.stringify(data))
    this.showCRUDlist = false;
    this.showCRUDcreate = true;
  }
  public delete(data: ModuleActivity) {
    this.objet = {
      activity : data.activity,
      grupo : data.grupo,
      grado: data.grado,
      id:data.id,
    }
    this.activityService.delete(this.objet).subscribe(
      (response)=>{
        this.getProductList();
        this.notificationService.alert('', "Registro Desactivo", 'success');
      },
      (error)=>{
        this.notificationService.alert('', "Error al Desactivar registro", 'error');
      }
    )
    
  }


  
  // Constructor y Ng Init
  constructor(
    private activityService : ActivityService,
    private notificationService: NotificationService,
    config: NgbModalConfig, private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;    
  }

  public getProductList() {
    this.activityService.getAllService().subscribe(
      (response) => {
        this.data = new MatTableDataSource<ModuleActivity>(response)
        this.data.paginator = this.paginator = this.paginator
        this.data.applyFilter = this.applyFilter;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
        this.paginator._intl.firstPageLabel = 'Primera pagina';
        this.paginator._intl.lastPageLabel = 'Ultima pagina';
        this.paginator._intl.nextPageLabel = 'Pagina adelante';
        this.paginator._intl.previousPageLabel = 'Pagina atras';

      },
      (error) => { Swal.fire( "502 " ,  "Valida con el administrador" ,  "error" ) }
    )
  }
}
