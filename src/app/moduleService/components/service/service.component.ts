import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';


import { ProductInterationService } from 'app/services/productInteration.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  providers: [ProductInterationService]
  
  
})
export class ServiceComponent implements OnInit {
  public sales: any[];
  public posts: any[];

  public newProduct:boolean = false;
  public fullList:boolean = false;

  public updateProductChild = false
  public createNewProduct = false
  public updateProductObjet;

  @Output() evento = new EventEmitter;
  constructor( 
    private _productInteractionService: ProductInterationService,
    private http: HttpClient) { }

  
  ngOnInit() {    
   
  }
  
 

}
