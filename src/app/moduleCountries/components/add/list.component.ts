import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { CountriesService } from 'app/services/countries.service';


@Component({
  selector: 'app-countries_list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CountriesService],


})
export class ListComponent implements OnInit {

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
  showCRUDlist: boolean = true;
  showCRUDcreate: boolean = false;
  //showCRUDlist : boolean = false;
  //showCRUDlist : boolean = false;
  // Variables
  public data: any;
  // Model

 
  displayedColumns: string[] = ['Codigo', 'Nombre', 'Estado', 'Accion'];
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
        break;
      case 1: // Listar
        this.showCRUDlist = true;
        this.showCRUDcreate = false;
        sessionStorage.removeItem("service")
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

  
  // Constructor y Ng Init
  constructor(
    private countriesService : CountriesService,
    
     
  ) {
   
    
  }

  ngOnInit() {
    this.getProductList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;    
  }

  public getProductList() {
    this.countriesService.getAllService().subscribe(
      (response) => {
        console.log("HOla jose", response)

        this.data = new MatTableDataSource(response)
        this.data.paginator = this.paginator = this.paginator
        this.data.applyFilter = this.applyFilter;
        this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
        this.paginator._intl.firstPageLabel = 'Primera pagina';
        this.paginator._intl.lastPageLabel = 'Ultima pagina';
        this.paginator._intl.nextPageLabel = 'Pagina adelante';
        this.paginator._intl.previousPageLabel = 'Pagina atras';

      },
      (error) => { console.log('No hay datos') }
    )
  }
}
