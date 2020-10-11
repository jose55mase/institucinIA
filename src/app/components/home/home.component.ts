import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { EventService } from 'app/services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EventService],


})
export class HomeComponent implements OnInit {

  public year = new Date().getFullYear();
  eventList = [
    {"name":"Somos la institucion"
     ,"description":"Pensando en mejorar a nuestros futuros."
     ,"img":"https://telemedellin.tv/wp-content/uploads/2020/06/una-profesora-da-clases-a-alumnos-de-primaria-en-un-colegio-de-cordoba.jpeg"
    }
  ]
  public changeImages1;

  constructor(
    private eventService : EventService
  ){

  }

  ngOnInit(){
    this.changeImages1 = this.eventList[0]
    this.eventService.getAllService().subscribe(
      (response)=>{
        console.log(response);

        this.eventList = response

      }
      )

    var observer= new Observable(observer=>{
      setInterval(()=>observer.next(Math.round(Math.random()*this.eventList.length)),5000)
    })


    observer.subscribe((data)=>{
      var indice = parseInt(JSON.stringify(data))
      if(this.eventList.length == 1){
        this.changeImages1 = this.eventList[0]
      }else{
        this.changeImages1 = this.eventList[indice]
      }
    })
  }
  /*
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
  */


}
