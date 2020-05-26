import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';

import { ServiceService } from 'app/services/service.service';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModelProduct } from 'app/models/product.model';
import { UserService } from 'app/login/services/user.service';
import { ProductInterationService } from 'app/services/productInteration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { User } from 'app/login/components/login/user/user.model';
import { ModelService } from 'app/models/service.model';
import { NotificationService } from 'app/services/notification-service';
import { AsignatureService } from 'app/services/asignature.service';
import { UsersService } from 'app/services/usuario.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivityService } from 'app/services/activity.service';
import { SubjectsService } from 'app/services/subjets.service';
import { ModelSubjets } from 'app/models/subjets.model';
import { FormArray } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



interface state {
  value: string;
  viewValue: string;
}

export interface Grupo{
  code:number;
  name:String;
}
export interface Grado{
  code:number;
  name:String;
}





@Component({
  selector: 'app-subjects-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
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
  modelService: ModelService;
  objet = new Object;
  loading = false;
  
  showCRUDlist: boolean = true;
  showCRUDcreate: boolean = false;
  //showCRUDlist : boolean = false;
  //showCRUDlist : boolean = false;
  checkoutForm;

  // LISTAS GRUPOS
  /**
   * @Lista_grupos
   * @Descripcion Creara un lista para los grupos
   */
  public grupo:Grupo[]=[
    {code:1 ,name:"A1"},
    {code:2 ,name:"A2"},
    {code:3 ,name:"A3"},
    {code:4 ,name:"B1"},
    {code:5 ,name:"B2"},
    {code:6 ,name:"C3"},
    {code:7 ,name:"C1"},
    {code:8 ,name:"C2"},
    {code:9 ,name:"C3"}
  ]

  // LISTAS GRADOS
  /**
   * @Lista_grados
   * @Descripcion Creara un lista para los grados.
   */
  public grado:Grado[]=[
    {code:1 ,name:"Primero"},
    {code:2 ,name:"Segundo"},
    {code:3 ,name:"Tercero"},
    {code:4 ,name:"Cuarto"},
    {code:5 ,name:"Quinto"},
    {code:6 ,name:"Sexto"},
    {code:7 ,name:"Septimo"},
    {code:8 ,name:"Octavo"},
    {code:9 ,name:"Noveno"},
    {code:10 ,name:"Decimo"},
    {code:11 ,name:"Once"},
    {code:12 ,name:"Doce"}
  ]

  search = {
    grupo:0,
    grado:0
  }



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
    if (data.state=="0") {      
      Swal.fire( "Listo" ,  "Este registro ya esta desactivo" ,  "warning" )
      this.notificationService.alert('', "Ya Desactivo", 'warning');
    }else{
      this.objet = {
        name : data.name,
        id : data.id,
        uid: data.uid,
        state:"0",
      }
      this.serviceService.delete(this.objet).subscribe(
        (response)=>{
         
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
    private asignatureService : AsignatureService,
    private usersService : UsersService,
    private formBuilder: FormBuilder,
    

  ) {
    this.productObject = new ModelProduct;
    this.checkoutForm = this.formBuilder.group({
            
    });
  }
// Tabla filtros y paginacion

  filteUsers(){
    if(this.search.grado == 0 ){
      Swal.fire( "👀" ,  "Valida el filtro Grado" ,  "warning" )
    }else if(this.search.grupo == 0 ){
      Swal.fire( "👀" ,  "Valida el filtro Grupo" ,  "warning" )
    }else{
      this.getAllUsuarios(this.search);
    }
    
  }
  

  // Variables
  public data: any;
  // Model
  public products: ModelProduct[]
  public modelUser: User

  public productObject: ModelProduct;

  
  displayedColumns: any[] = ['TI', 'Nombres', 'Apellidos', 'Calificar'];
  
  // uzdbpcmb
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //elemento = new MatTableDataSource<ModelProduct>(this.products);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.data.filter = filterValue;
  }
  
  public getAllUsuarios(json){
    this.loading = true
    this.usersService.getAllService().subscribe(
      (response)=>
        {
          response = response.filter((data)=>{return  data.Grado == json.grado})
          response = response.filter((data)=>{return  data.Grupo == json.grupo})
          if(response.length == 0){
            Swal.fire( "📪" ,  "No hay Estudiantes en este grupo" ,  "warning" )
            this.loading = false;
          }else{
            this.data = new MatTableDataSource(response)
            this.data.paginator = this.paginator = this.paginator
            this.data.applyFilter = this.applyFilter;
            this.paginator._intl.itemsPerPageLabel = 'Registros por pagina';
            this.paginator._intl.firstPageLabel = 'Primera pagina';
            this.paginator._intl.lastPageLabel = 'Ultima pagina';
            this.paginator._intl.nextPageLabel = 'Pagina adelante';
            this.paginator._intl.previousPageLabel = 'Pagina atras';
            this.loading = false;
          }
        }
      )
  }
  ngOnInit() {
    
  }
  openDialog(estudent): void {
    const dialogRef = this.dialog.open(ShowNotasModalComponent, {
      width: '50%',
      data: estudent
    });
/*
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  */
  }





}


@Component({
  selector: 'showNotas-Modal',
  templateUrl: './modal/show/showNotas.Modal.Component.html',
  styleUrls: ['./modal/show/showNotas.Modal.Component.css']
})
export class ShowNotasModalComponent implements OnInit{
  // Bindign conexion con los checks
  radioCheckStudents ={
    asignature:0
  }

  // Marias lista
  public dataListAsignature : any[]= []
  // Actividades lista
  public dataListActividades : any[] = []
  public dataListActividadesName : any[] = []
  // Notas lista
  public dataListSubjets : any[]= []
  checkoutForm;
  student: any = {};
  objet = new Object;
  modelSubjets : ModelSubjets;
  btnSaveUpdate = true;
  subjetEach;


  

  constructor(
    private asignatureService : AsignatureService,
    private activityService : ActivityService,
    public dialogRef: MatDialogRef<ShowNotasModalComponent>,
    private subjectsService : SubjectsService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data) {

      

      

      
    }

  
  ngOnInit(){
    this.student = this.data; 
    this.activityService.getAllService().subscribe(
      (response)=>{this.dataListActividades = response},
    )
    this.asignatureService.getAllService().subscribe(
      (response)=>{this.dataListAsignature = response}
    )
    this.subjectsService.getAllService().subscribe(
      (response)=>{this.dataListSubjets = response},     
    )
    
  }

  get aliases() {
    return this.checkoutForm.get('aliases') as FormArray;
  }
  
  
  public getAllActivity(){
    if(this.dataListActividades.length > 0){
      this.dataListActividades.map((activiti)=>{      
        this.dataListAsignature.forEach((asignature)=>{
          if(activiti.asignature == asignature.id){
            activiti["asignature"] = asignature.name
            activiti.status = true;
            this.dataListActividadesName.push(activiti)          
          }else{
            Swal.fire( "📪" ,  "No hay actividades" ,  "warning" )
          }     
        })
      })
    }else{
      Swal.fire( "📪" ,  "No hay actividades" ,  "warning" )
    }    
    var filter = this.dataListSubjets.filter((data)=>{return data.idStuedent == this.student.id})
    if(filter.length > 0){
      filter.map((subjet,indexS)=>{
        this.dataListActividadesName.map((data,index)=>{
          if(subjet.idActivity == data.id){
            this.dataListActividadesName[index].subjet = subjet.subjet
            this.dataListActividadesName[index].subjetId = subjet.id
            this.dataListActividadesName[index].status = false
            this.dataListActividadesName[index].subjetControl = new FormControl(subjet.subjet)
          }else{
            this.dataListActividadesName[index].status = true;
            this.dataListActividadesName[index].subjet = 0
            this.dataListActividadesName[index].subjetControl = new FormControl(0)
          }
        })
        
      })
      //this.checkoutForm.controls['asignature'].setValue(this.modelActivity.asignature)
    }    
  } 

  onClickSave(activity){
    var idSubjet = Date.now()
    this.objet={
      id : idSubjet,
      idStuedent :this.student.id,
      nameStudent:`${this.student.Nombre} ${this.student.Apellidos}`,
      asignature : activity.asignature,
      activityDescription : activity.activity,
      idActivity: activity.id,
      subjet: activity.subjetControl.value
    }
    var filte = this.dataListActividadesName.find((data)=>{ return data.id == activity.id})
    filte.status = false    
    this.subjectsService.save(this.objet).subscribe(
      (response)=>{this.notificationService.alert('📝', "Calificion creada", 'success');},
      (error)=>{this.notificationService.alert('💤', "Error", 'error');}
    )
    
  }

  onClickUpdate(activity){
    this.objet={
      id : activity.subjetId,
      idStuedent :this.student.id,
      nameStudent:`${this.student.Nombre} ${this.student.Apellidos}`,
      asignature : activity.asignature,
      activityDescription : activity.activity,
      idActivity: activity.id,
      subjet: activity.subjetControl.value
    }
    this.subjectsService.update(this.objet).subscribe(
      (response)=>{this.notificationService.alert('📝', "Calificacion editada", 'success');},
      (error)=>{this.notificationService.alert('💤', "Error", 'error');}
    )
    
  }

  
  //==================== EXIT ==================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //==================== END MODAL ==================

  
}
