import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { CountriesService } from 'app/services/countries.service';
import { ModelCountries } from 'app/models/countries.model';
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModuleActivity } from 'app/models/activity.model';
import { ActivityService } from 'app/services/activity.service';

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
  providers: [CountriesService],


})
export class AddComponent implements OnInit {

  selectedValue: string;
  selectedCar: string;
  checkoutForm;
  modelCountries : ModelCountries;
  modelActivity : ModuleActivity;
  objet = new Object;

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
  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private countriesService : CountriesService,
    private activityService : ActivityService,
  ) {
    
    
    this.checkoutForm = this.formBuilder.group({
      
      activity: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),
      grupo: new FormControl('',Validators.compose([
        Validators.required,
             
      ])),
      grado: new FormControl('',Validators.compose([
        Validators.required,
          
      ])),    
    });
    
    if(JSON.parse(sessionStorage.getItem("objectSchool")) != null){
      this.btnUpDate = true;
      this.modelActivity = JSON.parse(sessionStorage.getItem("objectSchool"))
      this.checkoutForm.controls['activity'].setValue(this.modelActivity.activity)
      this.checkoutForm.controls['grado'].setValue(this.modelActivity.grado)
      this.checkoutForm.controls['grupo'].setValue(this.modelActivity.grupo)
      
    }else{ this.btnSaveDate = true; }
      
     
  }
  ngOnInit() {    
    
  }

 /*
   ======= Body Objeto ====
  id,
  activity,
  grupo,
  grado
  */
  public savedata(){
    console.log(this.checkoutForm.value)
    var idActivityData = Date.now()
    this.objet = {
      activity : this.checkoutForm.value.activity,
      grupo : this.checkoutForm.value.grupo,
      grado: this.checkoutForm.value.grado,
      id:idActivityData,
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
