import { Component, OnInit, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product, Todo, User } from '../common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class DashboardComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private API = 'https://fakestoreapi.com/products';
  private http = inject(HttpClient);
  obs = interval(1000);
  private userApi = 'https://jsonplaceholder.typicode.com/users';
  // private todoApi="https://jsonplaceholder.typicode.com/todos?userId=1"
  private todoApi = 'https://jsonplaceholder.typicode.com/todos?userId=';

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.products().subscribe((products) => {
      // log rating and category only
      // console.log(products);
    });

    // load todos
    this.http
      .get<User>(`${this.userApi}/1`)
      .pipe(
        tap((user) => user),
        switchMap((user) => {
          return this.http
            .get<Todo[]>(`${this.todoApi}${user.id}`)
            .pipe(tap((todos) => todos));
        })
      )
      .subscribe((todos) => {
        console.log(todos);
      });
  }
}
