import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ilan } from 'src/app/models/Ilan';
import { Kategori } from 'src/app/models/Kategori';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uyeilan',
  templateUrl: './uyeilan.component.html',
  styleUrls: ['./uyeilan.component.css']
})
export class UyeilanComponent implements OnInit {
  ilanlar: Ilan[];
  UyeId:  number;
  uye: Uye;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['UyeId']){
        this.UyeId=p['UyeId'];
        this.UyeById();
        this.IlanListeByUyeId();
      }
    });
  }
  UyeById(){
    this.apiServis.UyeById(this.UyeId).subscribe((d:Uye)=>{
      this.uye= d;
    });
  }
  IlanListeByUyeId(){
    this.apiServis.IlanListeByUyeId(this.UyeId).subscribe((d:Ilan[]) =>{
      this.ilanlar = d;
    });    
  }

}

