import { Component, OnInit, inject } from '@angular/core';
import { MaterialConfigModule } from '../../material-config/material-config.module';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialConfigModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private cartService = inject(CartService);

  count = 0;

  ngOnInit(): void {
    this.initCentralMsg();
    this.cartService.getCartCount().subscribe((count) => {
      this.count = count;
    });
  }

  initCentralMsg() {
    setTimeout(() => {
      this.cartService.setCentralMsg('Hello World App');
    }, 2000);
  }
}
