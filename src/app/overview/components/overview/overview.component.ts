import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionComponent } from '../questions/question.component';
import { QuestionsService } from 'app/overview/services/questions.service';
import { ProductInterationService } from 'app/services/productInteration.service';
import { UsersService } from 'app/services/usuario.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers:[UsersService]
})
export class OverviewComponent implements OnInit {
  public panelOpenState = false;
  public countQuestions = 2;
  public dataQuestions: any[];
  
  // points
  public valueBar = 0;

  // Notification
  public countUserList:number=0;
  public active:number = 0;
  _active:boolean = false
  public stop:number = 0;
  _stop:boolean = false;
  public finished:number=0;
  _finished:boolean = false;


  constructor(
    private questionService: QuestionsService,
    public dialog: MatDialog,
    private _productInterationService: ProductInterationService,
    private _usersService : UsersService
    ){ }

  ngOnInit() {
    this.publicationSummary()   
      this.questionService.getAllQuestions().subscribe(
        res => {
          this.dataQuestions = res;
          if (Array.isArray(res.result.message)) {
            this.countQuestions = res.result.message.length;
          } else {
            console.log('Dont is array');
          }
        },
        err => console.log(err)
      )
      this._usersService.getAllService().subscribe(
        (response)=>{
          this.countUserList = response.length;
          this.valueBar = response.length
         }
        )
  }

  openDialogQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      res => {
        if (Array.isArray(res.result.message)) {
          const dialogRef = this.dialog.open(QuestionComponent, {
            width: '1350px',
            height: '700px',
           // data: { res }
          });
        } else {
          console.log('Dont is array');
        }
      },
      err => console.log(err)
    )
  }

  logs(): void {
    const dialogRef = this.dialog.open(QuestionComponent, {
      width: '100%',
      height: '100%',
      //position:  { right: `10px`}
     // data: { res }
    });
  }

  publicationSummary(){   
    if(JSON.parse(sessionStorage.getItem('summary'))){
      if(JSON.parse(sessionStorage.getItem('summary'))[0].active.length > 0){    
        this.active = JSON.parse(sessionStorage.getItem('summary'))[0].active.length
        this._active = true
      }else{
        this.active = 0
        this._active = false
      }
      if(JSON.parse(sessionStorage.getItem('summary'))[0].stop.length > 0){
        this.stop = JSON.parse(sessionStorage.getItem('summary'))[0].stop.length
        this._stop = true
      }else{
        this.stop = 0
        this._stop = false
      }
      if(JSON.parse(sessionStorage.getItem('summary'))[0].finished.length > 0){
        this.finished = JSON.parse(sessionStorage.getItem('summary'))[0].finished.length
        this._finished = true
      }else{
        this.finished = 0
        this._finished = false
      }
    }
  }
}