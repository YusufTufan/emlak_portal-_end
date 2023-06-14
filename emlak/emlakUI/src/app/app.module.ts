import { KategoriComponent } from './components/kategori/kategori.component';
import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { AdminIlanComponent } from './components/admin/admin-ilan/admin-ilan.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { IlanDialogComponent } from './components/dialogs/ilan-dialog/ilan-dialog.component';
import { JoditAngularModule } from 'jodit-angular';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { AlertService } from './services/Myalert.service';
import { ApiService } from './services/api.service';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';
import { IlanComponent } from './components/ilan/ilan.component';
import { UyeilanComponent } from './components/uyeilan/uyeilan.component';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
@NgModule({
  declarations: [
        AppComponent,
        HomeComponent,
        MainNavComponent,
        LoginComponent,
        IlanComponent,
        KategoriComponent,
        UyeilanComponent,

        //Admin
        AdminComponent,
        AdminIlanComponent,
        AdminKategoriComponent,
        AdminUyeComponent,

        //dialoglar
        AlertDialogComponent,
        ConfirmDialogComponent,
        KategoriDialogComponent,
        IlanDialogComponent,
        UyeDialogComponent,
        
        //SafeHtml
        SafeHTMLPipe
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        JoditAngularModule,
    ],

    providers: [AlertService,ApiService,SafeHTMLPipe,AuthGuard,{
        provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
