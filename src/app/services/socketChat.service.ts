import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ModelSubjets } from 'app/models/subjets.model';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketChatService {
  private socket: SocketIOClient.Socket;
  //socket: any;
  readonly url : String = "http://localhost:3000"
  URI: string;
  constructor(private http: HttpClient) { 
    this.socket = io('http://localhost:3000');
    this.URI = `${environment.apiUrl}`
  }

  listen(eventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(eventName, (data)=>{          
        subscriber.next(data);
      })
    })
  }
  emit(eventName:String,data:any){
    this.socket.emit(eventName.toString(), data)
  }

  
  
}
