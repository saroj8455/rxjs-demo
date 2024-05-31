import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigModule } from './config/config.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialConfigModule } from './material-config/material-config.module';
import { CartService } from './services/cart.service';
import { TopnavComponent } from './topnav/topnav.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ConfigModule,
    MaterialConfigModule,
    NavbarComponent,
    TopnavComponent,
    DatatableComponent,
    DashboardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-demo';

  hidden = false;

  message = '';

  private cartService = inject(CartService);

  constructor() {}
  ngOnInit(): void {
    this.cartService.getCentralMsg().subscribe((msg) => {
      this.message = msg;
    });
    this.pushCartItem();
  }

  pushCartItem() {
    const intervalPeriod = 2000;
    const intervalId = setInterval(() => {
      this.cartService.setCartCount();
      setTimeout(() => {
        clearInterval(intervalId);
      }, 10000);
    }, intervalPeriod);
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  ngOnDestroy(): void {}
}
