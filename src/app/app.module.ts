import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TenderdashboardComponent } from './tenderdashboard/tenderdashboard.component';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyindicatorComponent } from './busyindicator/busyindicator.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { TenderoverallComponent } from './tenderoverall/tenderoverall.component';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { TypedialogComponent } from './typedialog/typedialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import {MatCardModule} from '@angular/material/card';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ItemdialogComponent } from './itemdialog/itemdialog.component';
import {MatSelectModule} from '@angular/material/select';
import { ExpendituretypeComponent } from './expendituretype/expendituretype.component';
import { IntlModule } from '@progress/kendo-angular-intl';

import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ExpendituredialogComponent } from './expendituredialog/expendituredialog.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import {MatSortModule} from '@angular/material/sort';
import { ChartsComponent } from './charts/charts.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { SparklineModule } from '@progress/kendo-angular-charts';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [	
    AppComponent,
      TenderdashboardComponent,
      BusyindicatorComponent,
      TenderoverallComponent,
      TypedialogComponent,
      ConfirmdialogComponent,
      ItemdialogComponent,
      ExpendituretypeComponent,
      ExpendituredialogComponent,
      ProfitlossComponent,
      BreadcrumbComponent,
      ChartsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    MatFormFieldModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatInputModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    LayoutModule,
    MatSelectModule,
    ButtonsModule,
    IntlModule,
    ExcelModule,
    PDFModule,
    InputsModule,
    MatSortModule,
    ChartsModule,
    SparklineModule
  ],
  entryComponents: [
    TypedialogComponent,
    ConfirmdialogComponent,
    ItemdialogComponent,
    ExpendituredialogComponent
    ],
  providers: [CurrencyPipe, {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
