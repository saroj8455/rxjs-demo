import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatSlideToggleModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class MaterialConfigModule {}
