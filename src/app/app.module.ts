import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './shop/infrastructure/ng-components/items/items.component';
import { ItemComponent } from './shop/infrastructure/ng-components/item/item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddItemComponent } from './shop/infrastructure/ng-components/add-item/add-item.component';
import { UsersComponent } from './user/infrastructure/ng-components/users/users.component';
import { ItemDetailComponent } from './shop/infrastructure/ng-components/item-detail/item-detail.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppComponent,
        ItemsComponent,
        ItemComponent,
        AddItemComponent,
        UsersComponent,
        ItemDetailComponent
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())],
    bootstrap: [AppComponent]
})
export class AppModule { }
