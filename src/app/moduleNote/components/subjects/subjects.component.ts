import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductInterationService } from 'app/services/productInteration.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-subjet',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  providers: [ProductInterationService]
  
  
})
export class SubjectsComponent implements OnInit {
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
