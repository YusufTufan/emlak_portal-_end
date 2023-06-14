import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Uye } from 'src/app/models/Uye';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit: Uye;
  islem: string;
  frm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem = data.islem;

    if(this.islem=="ekle"){
      this.dialogBaslik= "Üye Ekle";
      this.yeniKayit= new Uye();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik= "Üye Düzenle"
      this.yeniKayit= data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      KullaniciAdi: (this.yeniKayit.KullaniciAdi)
    })
  }

}

