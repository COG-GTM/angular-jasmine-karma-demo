import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './shop/infrastructure/ng-components/items/items.component';
import { ItemComponent } from './shop/infrastructure/ng-components/item/item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AddItemComponent } from './shop/infrastructure/ng-components/add-item/add-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UsersComponent } from './users/infrastructure/ng-components/users/users.component';
import { ItemDetailComponent } from './shop/infrastructure/ng-components/item-detail/item-detail.component';

@NgModule({ declarations: [
        AppComponent,
        ItemsComponent,
        ItemComponent,
        AddItemComponent,
        UsersComponent,
        ItemDetailComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
