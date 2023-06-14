import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ilan } from 'src/app/models/Ilan';
import { AlertService } from 'src/app/services/Myalert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { IlanDialogComponent } from '../../dialogs/ilan-dialog/ilan-dialog.component';
import { Kategori } from 'src/app/models/Kategori';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-ilan',
  templateUrl: './admin-ilan.component.html',
  styleUrls: ['./admin-ilan.component.css']
})
export class AdminIlanComponent implements OnInit {
  ilanlar: Ilan[];
  kategoriler: Kategori[];
  secKat: Kategori;
  katId: number;
  UyeId: number;
  dataSource: any;
  displayedColumns = ['Baslik', 'Tarih','UyeKadi','Okunma','detay'];
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  dialogRef:MatDialogRef<IlanDialogComponent>;
  dialogaRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog : MatDialog,
    public alert : AlertService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.UyeId=parseInt(localStorage.getItem("uid"));
    this.route.params.subscribe(p=>{
      if(p['katId']){
      this.katId = p['katId'];
      this.KategoriById();
      }
    });
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori) =>{
      this.secKat = d;
      this.IlanListele();
    });
  }

  IlanListele(){
    this.apiServis.IlanListeByKatId(this.katId).subscribe(d=>{
      this.ilanlar = d;
      this.dataSource = new MatTableDataSource(this.ilanlar);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe(d=>{
      this.kategoriler = d;
    });
  }
  KategoriSec(katId:number){
   
    this.katId = katId;
    this.IlanListele();
  }

  Ekle(){
    var yeniKayit: Ilan = new Ilan();
    this.dialogRef= this.matDialog.open(IlanDialogComponent,{
      width: '800px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      yeniKayit= d;
      yeniKayit.Foto = "foto.jpg";
      yeniKayit.Tarih = new Date();
      yeniKayit.Okunma= 0;
      yeniKayit.UyeId=this.UyeId;
      this.apiServis.IlanEkle(yeniKayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.IlanListele();
        }
      });
    }
    });
  }

  Duzenle(kayit:Ilan){
    this.dialogRef= this.matDialog.open(IlanDialogComponent,{
      width: '800px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
   });
   this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      kayit.KategoriAdi =d.KategoriAdi;
      this.apiServis.IlanDuzenle(kayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.IlanListele();
        }
      });
    }
   });
  }

  Detay(kayit:Ilan){
    this.dialogRef= this.matDialog.open(IlanDialogComponent,{
      width: '800px',
      data:{
        kayit:kayit,
        islem: 'detay'
      }
   });
  }

  Sil(kayit:Ilan){
    this.dialogaRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width: '400px',
    });
    this.dialogaRefConfirm.componentInstance.dialogMesaj=kayit.Baslik + " Başlıklı ilan silinecektir onaylıyor musunuz?";
    this.dialogaRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.IlanSil(kayit.IlanId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.IlanListele();
          }
        });
      }
    });
  }
}

