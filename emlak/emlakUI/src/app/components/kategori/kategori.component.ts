import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ilan } from 'src/app/models/Ilan';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  ilanlar: Ilan[];
  katId:  number;
  kat:Kategori;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['katId']){
        this.katId=p['katId'];
        this.KategoriById();
        this.IlanListeByKatId();
      }
    });
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      this.kat= d;
    });
  }
  IlanListeByKatId(){
    this.apiServis.IlanListeByKatId(this.katId).subscribe((d:Ilan[]) =>{
      this.ilanlar = d;
    });    
  }

}
