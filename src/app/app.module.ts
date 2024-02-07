import 'tslib';
import { LOCALE_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RedirectAdminComponent } from './pages/redirect-admin/redirect-admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthInterceptorService, authProvider } from './core/interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RedirectAdminComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [authProvider, { provide: LOCALE_ID, useValue: 'es-MX' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
