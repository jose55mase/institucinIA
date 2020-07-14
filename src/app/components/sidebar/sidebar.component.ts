import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/login/services/user.service';
import { Router } from '@angular/router';
import { ProductInterationService } from 'app/services/productInteration.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  rol: boolean;
}
export const ROUTES: RouteInfo[] = [

  { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
  { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: false },
  { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: false },
  { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: false },
  { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: false },
  { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: false },// countries as Actividades
  { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: false },
  { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: false },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userLogin
  rol: { "Estudiante", "Maestro", "Secretaria", "Rector", "Administrador" }

  constructor(
    private userService: UserService,
    private router: Router,) {
    if (localStorage.getItem("currentUser")) {
      this.userLogin = {
        name: JSON.parse(localStorage.getItem("currentUser")).username,
        document: JSON.parse(localStorage.getItem("currentUser")).document,
        rol: JSON.parse(localStorage.getItem("currentUser")).rol
      }

    } else {
      this.logOut()
    }

  }
  //  rol : {"Estudiante","Maestro","Secretaria","Rector","Administrador"}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    switch (JSON.parse(localStorage.getItem("currentUser")).rol) {
      case "Master":
        this.menuItems = [
          { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
          { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: true },
          { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: true },
          { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: true },
          { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: true },
          { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: true },// countries as Actividades
          { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: true },
          { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: true },
          { path: '/logs', title: 'Logs', icon: 'alarm', class: '', rol: true },

        ]
        break;
      case "Administrador":
        this.menuItems = [
          { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
          { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: true },
          { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: true },
          { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: true },
          { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: true },
          { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: true },// countries as Actividades
          { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: true },
          { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: true },
          { path: '/logs', title: 'Logs', icon: 'alarm', class: '', rol: true },

        ]
        break;
      case "Maestro":
        this.menuItems = [
          { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
          { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: false },
          { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: true },
          { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: false },
          { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: false },
          { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: true },// countries as Actividades
          { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: false },
          { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: false },

        ]
        break;
      case "Secretaria":
        this.menuItems = [
          { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
          { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: true },
          { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: true },
          { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: true },
          { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: false },
          { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: true },// countries as Actividades
          { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: true },
          { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: true },
          { path: '/logs', title: 'Logs', icon: 'alarm', class: '', rol: false },

        ]
        break;
      case "Rector":
        this.menuItems = [
          { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
          { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: true },
          { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: false },
          { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: false },
          { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: false },
          { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: false },// countries as Actividades
          { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: false },
          { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: true },

        ]
        break;
      case "Estudiante":
        this.menuItems = [
          { path: '/overview', title: 'Resumen', icon: 'list', class: '', rol: true },
          { path: '/users', title: 'Usuarios', icon: 'people', class: '', rol: false },
          { path: '/subjects', title: 'Notas', icon: 'offline_pin', class: '', rol: true },
          { path: '/asignature', title: 'Materias', icon: 'library_books', class: '', rol: false },
          { path: '/client', title: 'Clientes', icon: 'people', class: '', rol: false },
          { path: '/activity', title: 'Actividades', icon: 'card_travel', class: '', rol: false },// countries as Actividades
          { path: '/events', title: 'Eventos', icon: 'photo_library', class: '', rol: false },
          { path: '/users', title: 'Permisos', icon: 'assignment_turned_in', class: '', rol: false },

        ]
        break;

      default:
        break;
    }


  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  logOut() {
    this.userService.deleteUserLoggedIn();
    this.router.navigateByUrl('/login');
  }

}
