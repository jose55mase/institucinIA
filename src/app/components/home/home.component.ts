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
      setInterval(()=>observer.next(Math.round(Math.random()*4)),5000)
    })
    var observer2= new Observable(observer=>{
      setInterval(()=>observer.next(Math.round(Math.random()*4)),4000)
    }) 
    this.IMAGES[0]   
    observer.subscribe((data)=>{
      var indice = parseInt(JSON.stringify(data))
      this.changeImages1 = this.IMAGES[indice] 
    })
    observer2.subscribe((data)=>{
      var indice = parseInt(JSON.stringify(data))
      this.changeImages2 = this.IMAGES[indice] 
    })
    observer.subscribe((data)=>{
      var indice = parseInt(JSON.stringify(data))
      this.changeImages3 = this.IMAGES[indice] 
    })
  }
  
  public IMAGES = [
    "./../../../assets/img/images1.jpeg"
    ,"./../../../assets/img/images2.jpeg"
    ,"./../../../assets/img/images3.png"
    ,"./../../../assets/img/images4.jpg"
    ,"./../../../assets/img/images5.jpg"
  ]  
  public changeImages1 = this.IMAGES[2];
  public changeImages2 = this.IMAGES[0];
  public changeImages3 = this.IMAGES[1];
}
