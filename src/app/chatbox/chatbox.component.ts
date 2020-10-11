import { Component, OnInit, ViewChild, Inject,Renderer2, ElementRef } from '@angular/core';
import { QuestionsService } from 'app/overview/services/questions.service';
import { MatSnackBar } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SocketChatService } from 'app/services/socketChat.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})

export class ChatboxComponent implements OnInit {
  
  
  /**
   * @deprecated
   */
  public information;
  public temp
  message = new FormControl('');

  @ViewChild('messagetext',{static: true}) messagetext : ElementRef;

  constructor(
    private renderer:Renderer2,
    private _socketChatService : SocketChatService,){}
  ngOnInit(){
    this._socketChatService.listen("evento").subscribe((data)=>{})
    this.sendUserSocketChat()
  }

  sendUserSocketChat(){
    var dataUser = JSON.parse(sessionStorage.getItem("userNow"))
    const username = `${dataUser.Nombre}--${dataUser.Rol}`;
    this._socketChatService.emit('username',username);
  }

  sendMessage(){
    this._socketChatService.emit("chat_message",this.message.value)
    this._socketChatService.listen("chat_message").subscribe(
      (data)=>{
       this.showMessage(data);
      }
    )
  }

  
  showMessage(data){
    if(data != this.temp){
      const p: HTMLParagraphElement = this.renderer.createElement('p');
      p.innerHTML = `
      <div style="border: 2px solid #dedede;
        background-color: #f1f1f1;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 0;"
      >
        <img src="https://previews.123rf.com/images/yupiramos/yupiramos1709/yupiramos170922656/86478886-estudiante-con-dise%C3%B1o-de-ilustraci%C3%B3n-de-vector-de-graduaci%C3%B3n-de-avatar-de-estudiante.jpg" alt="Avatar" style="width:6%;">
        ${data.name} 
        <p>${data.message}</p>
        <span style="
          border-color: #ccc;
          background-color: #ddd;
        ">${new Date().getHours()}:${new Date().getMinutes()}</span>
      </div>
    `;
      this.renderer.appendChild(this.messagetext.nativeElement, p)
      this.temp = data
      this.message.setValue("");
    }   
  }
}
