import { Component, OnInit } from '@angular/core';
import {ConnectionService} from '../../services/connection.service';
import {Observable} from 'rxjs';
import {User} from '../models/pageableResponse';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public connection: ConnectionService) { }

  users$: Observable<User[]>;

  ngOnInit() {
    this.users$ = this.connection.getUsers().pipe(map(value => value.content));
  }

  deleteUserById(id: number) {
    this.connection.deleteUserById(id.toString()).subscribe((user: User) => {
      console.log(user);
      const element = document.getElementById(id.toString());
      element.parentNode.removeChild(element);
    });
  }
}
