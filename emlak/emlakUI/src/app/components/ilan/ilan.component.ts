import { Yorum } from './../../models/Yorum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ilan } from 'src/app/models/Ilan';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ilan',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.css']
})
export class IlanComponent implements OnInit {
  IlanId:number;
  ilan: Ilan;
  yorumlar: Yorum[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['IlanId']){
        this.IlanId=p['IlanId'];
        this.IlanById();
        this.IlanYorumListe();
      }
    });
  }
  IlanById(){
    this.apiServis.IlanById(this.IlanId).subscribe((d:Ilan)=>{
      this.ilan = d;
      this.IlanOkunduYap();
    });
  }
  IlanOkunduYap(){
    this.ilan.Okunma += 1;
    this.apiServis.IlanDuzenle(this.ilan).subscribe();
  }
  IlanYorumListe(){
    this.apiServis.YorumListeByilanId(this.IlanId).subscribe((d:Yorum[])=>{
      this.yorumlar= d;
  });
  }
  YorumEkle(yorumMetni:string){
    var yorum:Yorum= new Yorum();
    var uyeId: number= parseInt(localStorage.getItem('uid'));
    yorum.IlanId= this.IlanId;
    yorum.UyeId=uyeId;
    yorum.YorumIcerik=yorumMetni;
    yorum.Tarih= new Date();
    this.apiServis.YorumEkle(yorum).subscribe((d:Sonuc)=>{
      if(d.islem){
        this.IlanYorumListe();
      }
    });
  }
}
