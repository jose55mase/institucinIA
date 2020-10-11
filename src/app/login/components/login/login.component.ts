import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/login/services/login.service';
import { Router } from '@angular/router';
import { UserService } from 'app/login/services/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from './user/user.model';
import { ProductInterationService } from 'app/services/productInteration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public year = new Date().getFullYear();
  public loginUser = "";

  /* yxowaho-5673@yopmail.com
  contrasena : 123456 */

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private _productInterationService: ProductInterationService) { }

  ngOnInit() {
    const user = this.userService.getUserLoggedIn() == null ? {} : this.userService.getUserLoggedIn();
    if (user.tkn) {
      this.navigate()

    }
  }

  logIn(username: string, password: string, event: Event) {
    event.preventDefault(); // Avoid default action for the submit button of the login form
    // Calls service to login user to the api rest
   /* this.loginService.login(username, password).subscribe(
      res => {
        if (res.message) {
          this._snackBar.open(res.message, '😭', {
            verticalPosition: 'top',
            duration: 5000

          })
        } else {
          const u: User = { username: username, tkn: res.result.access_token};
          this.userService.setUserLoggedIn(u),
          this.navigate()
        }
      },
      error => {
        console.error(error);
      },
    );
    */
    this.loginService.login().subscribe(
      res => {
        var login = res.find(
          (login)=>{
            return login.Documento == username
          }
        )
        
        if(login != undefined){
          if(login.Password == password) {
            this._snackBar.open("INSTITUCION INTERACTIVA AMBIENTAL", '✅', {
              verticalPosition: 'top',
              duration: 4000
            })
            setTimeout(()=>{
              login = {...login,btn:false}
              sessionStorage.setItem("userNow",JSON.stringify(login))
              const u: User = { username: login.Nombre, document:login.Documento, rol:login.Rol ,tkn: "ERE4-656-454kjfisf445"};
              this.userService.setUserLoggedIn(u),
              this.navigate()
            },2000)
          }else{
            this._snackBar.open("Credenciales son incorrectas  ", '😭', {
              verticalPosition: 'top',
              duration: 5000
            })
          }
        }else{
          this._snackBar.open("Credenciales son incorrectas  ", '😭', {
            verticalPosition: 'top',
            duration: 5000
          })
        }
      },
      error => {
        this._snackBar.open("504 Error Servidor ", '😭', {
          verticalPosition: 'top',
          duration: 5000
        })
      },
    );
   // console.log(this.loginUser)
  }
  navigate() {
    this.router.navigateByUrl('/overview');
  }

}
