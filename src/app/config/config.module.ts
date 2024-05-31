import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    AsyncPipe,
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ConfigModule {}
