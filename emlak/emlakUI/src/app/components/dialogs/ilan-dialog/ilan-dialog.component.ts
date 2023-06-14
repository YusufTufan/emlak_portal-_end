import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ilan } from 'src/app/models/Ilan';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ilan-dialog',
  templateUrl: './ilan-dialog.component.html',
  styleUrls: ['./ilan-dialog.component.css']
})
export class IlanDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit: Ilan;
  islem: string;
  frm: UntypedFormGroup;
  kategoriler: Kategori[];
  jconfig: {};

  constructor(
    public dialogRef: MatDialogRef<IlanDialogComponent>,
    public frmBuild: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) { 
    this.islem = data.islem;

    if(this.islem=="ekle"){
      this.dialogBaslik= "İlan Ekle";
      this.yeniKayit= new Ilan();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik= "İlan Düzenle"
      this.yeniKayit= data.kayit;
    }
    if(this.islem=="detay"){
      this.dialogBaslik= "İlan Detay"
      this.yeniKayit= data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      Baslik: (this.yeniKayit.Baslik),
      Icerik: (this.yeniKayit.Icerik),
      KategoriId: (this.yeniKayit.KategoriId)
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe(d=>{
      this.kategoriler = d;
    });
  }
}
