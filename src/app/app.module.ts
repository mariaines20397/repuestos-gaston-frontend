import 'tslib';
import { LOCALE_ID, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RedirectAdminComponent } from './pages/redirect-admin/redirect-admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthInterceptorService, authProvider } from './core/interceptors/auth-interceptor.service';
import { metaReducers, reducers } from './pages/login/store/app.state';

@NgModule({ declarations: [
        AppComponent,
        RedirectAdminComponent,
        NotFoundComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgbModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false,
            },
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument()], providers: [authProvider, { provide: LOCALE_ID, useValue: 'es-MX' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
