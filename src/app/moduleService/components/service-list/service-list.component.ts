import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { ServiceService } from 'app/services/service.service';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ModelProduct } from 'app/models/product.model';
import { UserService } from 'app/login/services/user.service';
import { ProductInterationService } from 'app/services/productInteration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { User } from 'app/login/components/login/user/user.model';
import { ModelService } from 'app/models/service.model';
import { NotificationService } from 'app/services/notification-service';


interface state {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})

export class ServiceListComponent implements OnInit {


  /**
   * 
   * @param serviceService 
   * @param users  Konecta
   * @param dialog 
   * @param _productInterationService 
   * @param modalService 
   */

  /** 
   * @Variables 
  */
  modelService: ModelService;
  objet = new Object;
  showCRUDlist: boolean = true;
  showCRUDcreate: boolean = false;
  //showCRUDlist : boolean = false;
  //showCRUDlist : boolean = false;
  public CRUD(crud: number, id?) {
    switch (crud) {
      case 2: // Crear
        this.showCRUDlist = false;
        this.showCRUDcreate = true;
        break;
      case 1: // Listar
        this.showCRUDlist = true;
        this.showCRUDcreate = false;
        sessionStorage.removeItem("service")
        this.getProductList()
        break;
      default:
        break;
    }
  }

  public editData(data: any) {
    sessionStorage.setItem("service", JSON.stringify(data))
    this.showCRUDlist = false;
    this.showCRUDcreate = true;
  }

  public delete(data: ModelService) {
    if (data.stateService=="0") {      
      Swal.fire( "Listo" ,  "Este registro ya esta desactivo" ,  "warning" )
      this.notificationService.alert('', "Ya Desactivo", 'warning');
    }else{
      this.objet = {
        descriptionService : data.descriptionService,
        idService : data.idService,
        pkService: data.pkService,
        stateService:"0",
      }
      this.serviceService.delete(this.objet).subscribe(
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
    private serviceService: ServiceService,
    private users: UserService,
    public dialog: MatDialog,
    private _productInterationService: ProductInterationService,
    private modalService: NgbModal,
    private notificationService: NotificationService,

  ) {
    this.productObject = new ModelProduct;

  }

  ngOnInit() {

    this.getProductList();

  }


















  // Variables
  public data: any;
  // Model
  public products: ModelProduct[]
  public modelUser: User

  public productObject: ModelProduct;
  displayedColumns: string[] = ['Codigo', 'Descripcion', 'Estado', 'Accion'];
  public usersList_Id: any;
  public estatus_data: string = '';
  public product_estatus: boolean = false;

  public whatchProduct: boolean = false;
  @Output() _updateProduct = new EventEmitter;
  @Output() _deleteProduct = new EventEmitter;
  @Output() _lisProduct = new EventEmitter;
  closeResult: string;
























  // Tabla filtros y paginacion

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  elemento = new MatTableDataSource<ModelProduct>(this.products);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;
  }

  public getProductList() {
    this.serviceService.getAllService().subscribe(
      (response) => {       
        this.data = new MatTableDataSource(response)
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

  public whatProduct(product) {
    this.whatchProduct = true;
    this.productObject = product;
  }
  public listProductClose() {
    this.whatchProduct = false;
    this.getProductList()
  }

  public updateProduct(product) {
    this._updateProduct.emit()
    localStorage.setItem("action", "upDate")
    sessionStorage.setItem("updateProduct", JSON.stringify(product));
  }


  /**
  * Pausar despaudar producto
  */
  /*
   public stopProduct(product) {
     product.Estado = 0;    
     this.productsService.stopProduct(product).subscribe(
       (response)=>{
         Swal.fire("Listo","Producto pausado", "success")
         this.getProductList();
       }
     )
     this.product_estatus=true
     this.getProductList();
   }
   public activeProduct(product){
     product.Estado = 2;
     this.productsService.stopProduct(product).subscribe(
       (Response)=>{
         Swal.fire( "Listo" ,  "Producto Activo" ,  "success" )
         this.getProductList();       
       }
     )
     this.product_estatus=false    
   }
   /**
   * Eliminar producto
   
   public deleteProduct(product){
     product.Estado = 1;
     this.productsService.stopProduct(product).subscribe(
       (Response)=>{           
         Swal.fire( "Listo" ,  "Producto Eliminado" ,  "success" )
         this.getProductList();
     }
     )    
   } 
  */
}


