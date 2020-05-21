import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
  
  
})
export class HomeComponent implements OnInit {
  ngOnInit(){
    var observer= new Observable(observer=>{
      setInterval(()=>observer.next(Math.round(Math.random()*2)),5000)
    }) 
    this.IMAGES[0]   
    observer.subscribe((data)=>{
      var indice = parseInt(JSON.stringify(data))
      this.changeImages = this.IMAGES[indice] 
    })
  }
  
  public IMAGES = [
    "./../../../assets/img/images1.jpeg"
    ,"./../../../assets/img/images2.jpeg"
    ,"./../../../assets/img/images3.png"
  ]  
  public changeImages = this.IMAGES[2];
}
