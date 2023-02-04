import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@app/auth';
import { I18nModule } from '@app/i18n';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './header/header.component';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [CommonModule, TranslateModule, FlexLayoutModule, MaterialModule, AuthModule, I18nModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent],
})
export class ShellModule {}
