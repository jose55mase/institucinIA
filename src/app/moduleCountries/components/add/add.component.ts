import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { CountriesService } from 'app/services/countries.service';
import { ModelCountries } from 'app/models/countries.model';
import { NotificationService } from 'app/services/notification-service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';



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
  objet = new Object;

  public btnSaveDate : boolean = false;
  public btnUpDate : boolean = false;

  constructor(  
    private notificationService : NotificationService,
    private formBuilder: FormBuilder,
    private countriesService : CountriesService
  ) {
    
    
    this.checkoutForm = this.formBuilder.group({
      
      name: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)      
      ])),     
    });
    
    if(JSON.parse(sessionStorage.getItem("objectKonecta")) != null){
      this.btnUpDate = true;
      this.modelCountries = JSON.parse(sessionStorage.getItem("objectKonecta"))
      this.checkoutForm.controls['name'].setValue(this.modelCountries.name)
    }else{ this.btnSaveDate = true; }
      
     
  }
  ngOnInit() {    
    
  }

 /*
   ======= Body Objeto ====
  uid;
  id;
  name;
  state;
  */
  public savedata(){
    var idCountriesData = Date.now()
    this.objet = {
      name : this.checkoutForm.value.name,
      id : idCountriesData,
      uid: idCountriesData,
      state:"1",
    }
    this.countriesService.save(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('', "Registro guardado correctamente", 'success');
        this.checkoutForm.rest
      },
      (error)=>{
        this.notificationService.alert('', "Error al guardar", 'error');
      }
      )    
  }

  public update(data){    
    this.objet = {
      name : this.checkoutForm.value.name,
      id : this.modelCountries.id,
      uid: this.modelCountries.uid,
      state:"1",
    }
    this.countriesService.update(this.objet).subscribe(
      (response)=>{
        this.notificationService.alert('', "Registro actulizado correctamente", 'success');
      },
      (error)=>{
        this.notificationService.alert('', "Error al guardar", 'error');
      }
      )    
  }
}
