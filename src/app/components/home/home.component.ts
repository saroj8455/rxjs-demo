import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MaterialConfigModule } from '../../material-config/material-config.module';
import { FormControl, Validators } from '@angular/forms';
import { ConfigModule } from '../../config/config.module';
import { HttpClient } from '@angular/common/http';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
export interface User {
  address: Address;
  id: number;
  email: string;
  username: string;
  password: string;
  name: Name;
  phone: string;
  __v: number;
}

export interface Address {
  geolocation: Geolocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialConfigModule, ConfigModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  textControl = new FormControl('');

  userList: User[] = [];
  private http = inject(HttpClient);
  private obs!: Subscription;

  users$ = this.http.get('https://fakestoreapi.com/users').pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    map((value) => {
      return value as User[];
    }),
    map((users) => {
      return users.filter((u) => {
        return u.name.firstname.toLowerCase().includes('j');
        // u.name.firstname === 'john'
      });
    })
  );

  ngOnInit(): void {
    this.obs = this.textControl.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((val) => this.getSearchResults(val))
      )
      .subscribe((v) => {
        // debugger;
        console.log(v);
        this.userList = v;
      });
  }
  getSearchResults(searchTerm: string | null) {
    const input = searchTerm as string;
    return this.http.get('https://fakestoreapi.com/users').pipe(
      map((response) => {
        return response as User[];
      }),
      map((users) => {
        // debugger;
        return users.filter((user) => {
          return user.name.firstname.toLowerCase().includes(input);
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe();
  }

  onKeyUp() {}

  loadUsersData() {
    this.http.get('https://fakestoreapi.com/users').subscribe((resp) => {
      // convert any object resp to an array
      this.userList = resp as User[];
    });
  }
}
