import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminIlanComponent } from './components/admin/admin-ilan/admin-ilan.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminComponent } from './components/admin/admin/admin.component';
import { IlanComponent } from './components/ilan/ilan.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UyeilanComponent } from './components/uyeilan/uyeilan.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ilan/:IlanId',
    component: IlanComponent
  },
  {
    path: 'kategori/:katId',
    component: KategoriComponent
  },
  {
    path: 'uyeilan/:UyeId',
    component: UyeilanComponent
    
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/kategori',
    component: AdminKategoriComponent,
    canActivate: [AuthGuard],
    data:{
      yetkiler:['Admin'],
      gerigit: '/login'
    }
  },
  {
    path: 'admin/uye',
    component: AdminUyeComponent
  },
  {
    path: 'admin/ilan',
    component: AdminIlanComponent
  },
    {
    path: 'admin/ilan/:katId',
    component: AdminIlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
