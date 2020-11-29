import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { ModuleAsignature } from 'app/models/asignature.model';
import Swal from 'sweetalert2';
import { NotificationService } from 'app/services/notification-service';
import { UsersService } from 'app/services/usuario.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { Routes, Router, NavigationExtras } from '@angular/router'; // CLI imports router


@Component({
  selector: 'app-users_list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UsersService],


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
  loading;
   BTNCREATEUSERSTATE = false;
  // Model

  public btnUser(){
    return this.BTNCREATEUSERSTATE
  }

  displayedColumns: string[] = ['Tipo', 'Codigo', 'Nombre', 'Grado', 'Grupo', 'Accion'];
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
        sessionStorage.removeItem("objectIIA")
        break;
      case 1: // Listar
        this.showCRUDlist = true;
        this.showCRUDcreate = false;
        sessionStorage.removeItem("objectIIA")
        this.getProductList();
        break;
      default:
        break;
    }
  }

  public editData(data: any) {
    data = {...data,btn:true}
    sessionStorage.setItem("objectIIA", JSON.stringify(data))
    // this.showCRUDlist = false;
    // this.showCRUDcreate = true;

  }

  public delete(data: ModuleAsignature) {
    console.log(data)

    this.objet = {
      id : data.id,
      
    }
    this.usersService.delete(this.objet).subscribe(
      (response)=>{
        this.getProductList();
        this.notificationService.alert('', "Registro Desactivo", 'success');
      },
      (error)=>{
        this.notificationService.alert('', "Error al Desactivar registro", 'error');
      }
    )
      /*
    if (data.state==0) {      
      Swal.fire( "👮" ,  "Este registro ya esta desactivo" ,  "warning" )
      this.notificationService.alert('', "Ya Desactivo", 'warning');
    }else{      
      
    }
*/
  }
  
  
  // Constructor y Ng Init
  constructor(
    private usersService : UsersService,
    private notificationService: NotificationService,
    private ROUTER : Router,

     
  ) {}
  public time  
  ngOnInit() {    
    this.getProductList();     
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;    
  }

  
  public getProductList() {
    this.loading = true
    this.usersService.getAllService().subscribe(
      (response) => {
        var dataUsers = new Observable(observer => {
          setInterval(()=>observer.next(JSON.parse(sessionStorage.getItem("usuarios"))),3000)
        })
        dataUsers.subscribe(x=>{
          if(x==null){
            response = response;            
          }else{                 
            response = response
              .concat(JSON.parse(sessionStorage.getItem("usuarios")))
            sessionStorage.removeItem("usuarios")
          }
          this.data = new MatTableDataSource<ModuleAsignature>(response)
          this.data.paginator = this.paginator = this.paginator
          this.data.applyFilter = this.applyFilter;
          this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
          this.paginator._intl.firstPageLabel = 'Primera pagina';
          this.paginator._intl.lastPageLabel = 'Ultima pagina';
          this.paginator._intl.nextPageLabel = 'Pagina adelante';
          this.paginator._intl.previousPageLabel = 'Pagina atras';
          this.loading = false;
        })
                
      },
      (error) => { Swal.fire( "502 " ,  "Valida con el administrador" ,  "error" ) }
    )
  }

  
  //========================= Exit BTN
  btnAdd(){
    sessionStorage.removeItem("objectIIA");
    let dataNavigate : NavigationExtras = {
      queryParams:{
        "btnCreateUser" : true
      }
    }
    this.ROUTER.navigate(["/createUser"],dataNavigate)
  }
  //========================= End

}
