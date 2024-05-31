import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigModule } from './config/config.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialConfigModule } from './material-config/material-config.module';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfigModule, MaterialConfigModule, NavbarComponent],
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
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  ngOnDestroy(): void {}
}
