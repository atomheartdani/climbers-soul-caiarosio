import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthModule, CredentialsService } from '@app/auth';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, RouteReusableStrategy, SharedModule } from '@shared';
import { AuthExpiredInterceptor } from './@shared/http/auth-expired.interceptor';
import { AuthHeaderInterceptor } from './@shared/http/auth-header.interceptor';
import { CacheInterceptor } from './@shared/http/cache.interceptor';
import { MatPaginatorIntlIta } from './@shared/mat-paginator-intl-ita';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { MaterialModule } from './material.module';
import { RulesModule } from './rules/rules.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ShellModule } from './shell/shell.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    SchedulerModule,
    RulesModule,
    UsersModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
      deps: [CredentialsService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlIta,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        panelClass: 'mat-dialog-responsive',
      } as MatDialogConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
