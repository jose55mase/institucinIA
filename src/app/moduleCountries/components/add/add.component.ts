import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModuleActivity } from 'app/models/activity.model';
import { ActivityService } from 'app/services/activity.service';
import { tap } from 'rxjs/operators';

import { FileService } from 'app/services/file.service';
import {saveAs} from 'file-saver';
//import { FileSelectDirective, FileUploader} from 'ng2-file-upload';

import { FileUploader } from 'ng2-file-upload';
import { AsignatureService } from 'app/services/asignature.service';
import { ModuleAsignature } from 'app/models/asignature.model';


const uri = 'http://localhost:5000/file/upload';

export interface Grupo{
  code:number;
  name:String;
}
export interface Grado{
  code:number;
  name:String;
}

@Component({
  selector: 'app-countries_add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [FileService,AsignatureService],


})
export class AddComponent implements OnInit {
  uploader:FileUploader = new FileUploader({url:uri});
  attachmentList:any = [];
  selectedValue: string;
  selectedCar: string;
  checkoutForm;


  ListaByActivity : ModuleActivity[] = [];
  modelActivity : ModuleActivity;
  objet = new Object;
  img = new Object;
  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;
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
  // LISTAS MATERIAS
  /**
   * @Lista_materias
   * @Descripcion Crear una lista de materias.
   */
  
  asignature : ModuleAsignature[] = [
    
  ]
  
  public callAsignature(){
    this.asignatureService.getAllService().subscribe(
      (response)=>{        
        response.map((data:ModuleAsignature)=>{
          this.asignature.push(data) 
        })
      },
      (erro)=>{this.notificationService.alert('🎓', "Error al consultar Materias", 'error')}
      )
  }
  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private activityService : ActivityService,
    private http : HttpClient,
    private _fileService:FileService,
    private asignatureService : AsignatureService,
  ) {
    this.callAsignature();
    
    this.checkoutForm = this.formBuilder.group({
      
      activity: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)      
      ])),
      grupo: new FormControl('',Validators.compose([
        Validators.required,
             
      ])),
      grado: new FormControl('',Validators.compose([
        Validators.required,
      ])),
      asignature : new FormControl('',Validators.compose([
        Validators.required,
      ])) 
    });
    
    if(JSON.parse(sessionStorage.getItem("objectSchool")) != null){
      this.btnUpDate = true;
      this.modelActivity = JSON.parse(sessionStorage.getItem("objectSchool"))
      this.checkoutForm.controls['activity'].setValue(this.modelActivity.activity)
      this.checkoutForm.controls['grado'].setValue(this.modelActivity.grado)
      this.checkoutForm.controls['grupo'].setValue(this.modelActivity.grupo)
      this.checkoutForm.controls['asignature'].setValue(this.modelActivity.asignature)
      if(this.modelActivity.dataUplad.originalname != undefined)
        {this.attachmentList.push(this.modelActivity.dataUplad)}
    }else{ this.btnSaveDate = true; }
   
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));      
      this.img= JSON.parse(response)      
      this.notificationService.alert('🎓', "Archivo guardado correctamente", 'success');
    };
  }

  // =======================================
  //  Call Asignature
  // =======================================
  
  


  ngOnInit() {  
    
  }

  download(index){
    var filename = this.attachmentList[index].uploadname;
    this._fileService.downloadFile(filename)
    .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
    );
  }

  deletefile(index){
    var filename = this.attachmentList[index].uploadname;
    this._fileService.deleteFile(filename)

    .subscribe(
        data => {          
          this.img= {} 
          this.objet = {
            activity : this.checkoutForm.value.activity,
            grupo : this.checkoutForm.value.grupo,
            grado: this.checkoutForm.value.grado,
            id:this.modelActivity.id,
            asignature:this.checkoutForm.value.asignature,
            dataUplad : this.img
          }
          this.activityService.update(this.objet).subscribe(
            (response)=>{
              this.attachmentList.find((data)=>{

              })
              this.notificationService.alert('🎓', "Archivo eliminada correctamente", 'info');
            },
            (error)=>{
              this.notificationService.alert('', "Error al guardar", 'error');
            }
            )
        },
        error => console.error(error)
    );
  }


 /*
   ======= Body Objeto ====
  id,
  activity,
  grupo,
  grado,
  */
  public savedata(){
    
    var idActivityData = Date.now()
    this.objet = {
      activity : this.checkoutForm.value.activity,
      grupo : this.checkoutForm.value.grupo,
      grado: this.checkoutForm.value.grado,
      id:idActivityData,
      dataUplad : this.img,
      asignature:this.checkoutForm.value.asignature
    }
    
    this.activityService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('', "Registro guardado correctamente", 'success');
        this.checkoutForm.rest
      },
      (error)=>{
        this.notificationService.alert('', "Error al guardar", 'error');
      }
      )  
      
  }

  public update(data:ModuleActivity){        
    this.objet = {
      activity : this.checkoutForm.value.activity,
      grupo : this.checkoutForm.value.grupo,
      grado: this.checkoutForm.value.grado,
      id:this.modelActivity.id,
      asignature:this.checkoutForm.value.asignature,
      dataUplad : this.img
    }
    this.activityService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('', "Error al guardar", 'error');
      }
      )    
  }

  
}
