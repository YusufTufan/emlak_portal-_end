import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Uye } from 'src/app/models/Uye';
import { AlertService } from 'src/app/services/Myalert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { UyeDialogComponent } from '../../dialogs/uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  uyeler: Uye[];
  dataSource: any;
  displayedColumns = ['KullaniciAdi', 'UyeAdmin', 'detay'];
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  dialogRef:MatDialogRef<UyeDialogComponent>;
  dialogaRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog : MatDialog,
    public alert : AlertService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }
  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:Uye[])=>{
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle(){
    var yeniKayit:  Uye= new Uye();
    this.dialogRef= this.matDialog.open(UyeDialogComponent,{
      width: '400px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      this.apiServis.UyeEkle(d).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UyeListele();
        }
      });
    }
    });
  }

  Duzenle(kayit:Uye){
    this.dialogRef= this.matDialog.open(UyeDialogComponent,{
      width: '400px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
   });
   this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      kayit.KullaniciAdi =d.KullaniciAdi;
      this.apiServis.UyeDuzenle(kayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UyeListele();
        }
      });
    }
   });
  }

  Sil(kayit:Uye){
    this.dialogaRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width: '400px',
    });
    this.dialogaRefConfirm.componentInstance.dialogMesaj=kayit.KullaniciAdi + "üye Silinecektir Onaylıyor Musunuz?";
    this.dialogaRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.UyeSil(kayit.UyeId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }
}
