import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableResponse} from '../components/models/pageableResponse';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  address: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(public http: HttpClient) {
    this.address = 'http://localhost:8080/';
  }

  getUsers(): Observable<PageableResponse> {
    return this.http.get<PageableResponse>(this.address + 'users/', {headers: this.headers});
  }
}
