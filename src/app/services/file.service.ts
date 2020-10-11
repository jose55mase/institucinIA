import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs';


@Injectable()

export class FileService {

    constructor(private _http:HttpClient){}

    downloadFile(file:String){
        var body = {filename:file};

        return this._http.post('http://192.168.1.1:5000/file/download',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }

    deleteFile(file:String){
        var body = {filename:file};

        return this._http.post('http://192.168.1.4:5000/file/delete',body,{
            responseType : 'blob',
            headers:new HttpHeaders().append('Content-Type','application/json')
        });
    }
}