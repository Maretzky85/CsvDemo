import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageableResponse, User} from '../components/models/pageableResponse';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  address: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

  constructor(public http: HttpClient) {
    this.address = 'http://localhost:8080/';
  }

  getUsers(inputParams?): Observable<PageableResponse> {
    return this.http.get<PageableResponse>(this.address + 'users/',
      {headers: this.headers, params: inputParams ? inputParams : null});
  }

  search(search: string): Observable<User[]> {
    return this.http.get<User[]>(this.address + '/search/?search=' + search);
  }

  deleteUserById(userId: string): Observable<User> {
    return this.http.post<User>(this.address + 'delete/' + userId, {headers: this.headers});
  }

  deleteAllUsers() {
    return this.http.post(this.address + 'deleteAll', {headers: this.headers});
  }

  uploadFile(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post(this.address + 'upload/', formData, {headers});
  }
}
