import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { AsignatureService } from 'app/services/asignature.service';
import { ModuleAsignature } from 'app/models/asignature.model';
import Swal from 'sweetalert2';
import { NotificationService } from 'app/services/notification-service';


@Component({
  selector: 'app-asignature_list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [AsignatureService],


})
export class ListComponent implements OnInit {

  /**
 * 
 * @param serviceService 
 * @param users  ruth
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

 
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Estado', 'Accion'];
  public usersList_Id: any;
  public estatus_data: string = '';
  public product_estatus: boolean = false;

  public whatchProduct: boolean = false;
  @Output() _updateProduct = new EventEmitter;
  @Output() _deleteProduct = new EventEmitter;
  @Output() _lisProduct = new EventEmitter;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator; 
  closeResult: string;



  public CRUD(crud: number, id?) {
    console.log(crud)
    switch (crud) {
      case 2: // Crear
        this.showCRUDlist = false;
        this.showCRUDcreate = true;
        sessionStorage.removeItem("objectKonecta")
        break;
      case 1: // Listar
        this.showCRUDlist = true;
        this.showCRUDcreate = false;
        sessionStorage.removeItem("objectKonecta")
        this.getProductList();
        break;
      default:
        break;
    }
  }

  public editData(data: any) {
    sessionStorage.setItem("objectKonecta", JSON.stringify(data))
    this.showCRUDlist = false;
    this.showCRUDcreate = true;
  }

  public delete(data: ModuleAsignature) {
    if (data.state==0) {      
      Swal.fire( "👮" ,  "Este registro ya esta desactivo" ,  "warning" )
      this.notificationService.alert('', "Ya Desactivo", 'warning');
    }else{      
      this.objet = {
        name : data.name,
        id : data.id,
        state:"0",
      }
      this.rolesService.delete(this.objet).subscribe(
        (response)=>{
          this.getProductList();
          this.notificationService.alert('', "Registro Desactivo", 'success');
        },
        (error)=>{
          this.notificationService.alert('', "Error al Desactivar registro", 'error');
        }
      )
    }

  }

  
  // Constructor y Ng Init
  constructor(
    private rolesService : AsignatureService,
    private notificationService: NotificationService,
     
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
    this.rolesService.getAllService().subscribe(
      (response) => {        
        this.data = new MatTableDataSource<ModuleAsignature>(response)
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
