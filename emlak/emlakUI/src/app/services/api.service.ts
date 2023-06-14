import { Observable } from 'rxjs';
import { Ilan } from './../models/Ilan';
import { Yorum } from './../models/Yorum';
import { Uye } from './../models/Uye';
import { Kategori } from './../models/Kategori';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:30038/api/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe(): Observable<Kategori[]> {
    return this.http.get<Kategori[]>(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number): Observable<Kategori> {
    return this.http.get<Kategori>(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Kategori): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/kategorisil/" + katId);
  }

  IlanListe(): Observable<Ilan[]> {
    return this.http.get<Ilan[]>(this.apiUrl + "/ilanliste");
  }
  IlanListeSonEklenenler(s: number): Observable<Ilan[]> {
    return this.http.get<Ilan[]>(this.apiUrl + "/ilanlistesoneklenenler/" + s);
  }
  IlanListeByKatId(katId: number): Observable<Ilan[]> {
    return this.http.get<Ilan[]>(this.apiUrl + "/ilanlistebykatid/" + katId);
  }
  IlanListeByUyeId(uyeId: number): Observable<Ilan[]> {
    return this.http.get<Ilan[]>(this.apiUrl + "/ilanlistebyuyeid/" + uyeId);
  }
  IlanById(IlanId: number): Observable<Ilan> {
    return this.http.get<Ilan>(this.apiUrl + "/ilanbyid/" + IlanId);
  }
  IlanEkle(ilan: Ilan): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/ilanekle", ilan);
  }
  IlanDuzenle(ilan: Ilan): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/ilanduzenle", ilan);
  }
  IlanSil(IlanId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/ilansil/" + IlanId);
  }


  UyeListe(): Observable<Uye[]> {
    return this.http.get<Uye[]>(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number): Observable<Uye> {
    return this.http.get<Uye>(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/uyesil/" + uyeId);
  }

  YorumListe(): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumliste");
  }
  YorumListeByUyeId(uyeId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumlistebyuyeid/" + uyeId);
  }
  YorumListeByilanId(IlanId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumlistesoneklenenler/" + IlanId);
  }
  YorumListeSonEklenenler(s: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumliste/" + s);
  }
  YorumById(yorumId: number): Observable<Yorum> {
    return this.http.get<Yorum>(this.apiUrl + "/yorumbyid/" + yorumId);
  }
  YorumEkle(yorum: Yorum): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/yorumekle", yorum);
  }
  YorumDuzenle(yorum: Yorum): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/yorumduzenle", yorum);
  }
  YorumSil(yorumId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/yorumsil/" + yorumId);
  }
}
