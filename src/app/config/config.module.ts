import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgFor,
  NgIf,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    AsyncPipe,
    NgIf,
    NgFor,
    JsonPipe,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class ConfigModule {}
