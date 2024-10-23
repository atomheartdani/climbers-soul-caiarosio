import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, RouteReusableStrategy, SharedModule } from '@shared';
import { AuthExpiredInterceptor } from './@shared/http/auth-expired.interceptor';
import { AuthHeaderInterceptor } from './@shared/http/auth-header.interceptor';
import { CacheInterceptor } from './@shared/http/cache.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule, CredentialsService } from './auth';
import { HomeModule } from './home/home.module';
import { RulesModule } from './rules/rules.module';
import { SelfRegistrationModule } from './self-registration/self-registration.module';
import { ShellModule } from './shell/shell.module';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    SchedulerModule,
    RulesModule,
    SelfRegistrationModule,
    UsersModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
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
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
