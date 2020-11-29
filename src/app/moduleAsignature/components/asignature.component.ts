import { Component, OnInit, Inject, Input, Output, 
  EventEmitter, ViewChild,Pipe, PipeTransform } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { DomSanitizer } from "@angular/platform-browser";
import { SafeResourceUrl } from '@angular/platform-browser';




@Component({
  selector: 'app-asignature',
  templateUrl: './asignature.component.html',
  styleUrls: ['./asignature.component.css'],
  providers: [],
  
  
})
export class AsignatureComponent implements OnInit {

  //url: string = "http://192.168.1.6:8000/materias/";
  //urlSafe: SafeResourceUrl;

  //constructor(public sanitizer: DomSanitizer){}

  ngOnInit() {
    //this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
}
