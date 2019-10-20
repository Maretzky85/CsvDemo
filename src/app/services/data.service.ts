import {Injectable} from '@angular/core';
import {ConnectionService} from './connection.service';
import {Observable} from 'rxjs';
import {PageableResponse, User} from '../components/models/pageableResponse';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  users$: Observable<User[]>;
  page: PageableResponse;
  oldestUser$: Observable<User>;

  constructor(private connection: ConnectionService) {
  }

  getCurrentInputParams() {
    return {
      page: this.page ? this.page.pageable.pageNumber : 0,
      size: this.page ? this.page.size : 5
    };
  }

  getUsers(inputParams?) {
    this.users$ = this.connection.getUsers(inputParams)
      .pipe(map(value => {
          this.page = value;
          return value.content;
        }
      ));
  }

  deleteUserById(id: number) {
    this.connection.deleteUserById(id.toString()).subscribe((user: User) => {
      console.log(user);
      const element = document.getElementById(id.toString());
      element.parentNode.removeChild(element);
    }, error => {
      alert('error deleting');
    });
  }

  deleteAllUsers() {
    this.connection.deleteAllUsers().subscribe(
      value => {
        this.getUsers();
      },
      error => alert('error deleting'));
  }

  search(search: string) {
    this.users$ = this.connection.search(search).pipe(value => {
      this.page = null;
      return value;
    });
  }


  uploadFile(formData: FormData) {
    return this.connection.uploadFile(formData);
  }

  prevPage() {
    const inputParams = {
      page: 0,
      size: 5
    };
    if (!this.page.first) {
      inputParams.page = this.page.pageable.pageNumber - 1;
      inputParams.size = this.page.size;
    }
    this.getUsers(inputParams);
  }

  nextPage() {
    const inputParams = {
      page: 0,
      size: 5
    };
    if (!this.page.last) {
      inputParams.page = this.page.pageable.pageNumber + 1;
      inputParams.size = this.page.size;
    }
    this.getUsers(inputParams);
  }

  setPageSize(pageSize: number) {
    const inputParams = {
      page: 0,
      size: pageSize
    };
    this.getUsers(inputParams);
  }

  getOldest() {
    this.oldestUser$ = this.connection.getOldestUser();
  }
}
