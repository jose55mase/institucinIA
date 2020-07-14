import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import { Observable } from 'rxjs';

if (environment.production) {
  enableProdMode();
}


var observable = new Observable(observer=>{
  setInterval(()=>{observer.next()},800)
})
observable.subscribe(()=>{
  if("http://localhost:4200/#/createUser"!=document.location.href){
    sessionStorage.removeItem("objectIIA")
  } 
})

platformBrowserDynamic().bootstrapModule(AppModule);
