import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BaseNavigationComponent } from './base-navigation/base-navigation.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

// import { newEventReducer } from './ngrx/reducers/event.reducer';
// import { reducers } from './ngrx/reducers/index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EventEffects } from "../app/ngrx/effects/event.effect";
import { addEventReducer } from './ngrx/reducers/event.reducer';

@NgModule({
  declarations: [
    AppComponent,
    BaseNavigationComponent,
    IndexComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    DeleteAccountDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule, // must import after BrowserModule
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatExpansionModule,
    LayoutModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreModule.forRoot({
      perferences: addEventReducer
    }),
    EffectsModule.forRoot([EventEffects]), // // this is necessary for `EventService` to have access to the HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
