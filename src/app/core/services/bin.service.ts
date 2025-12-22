import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BinInfo {
  bin: string;
  scheme: string | null;
  type: string | null;
  brand: string | null;
  bankName: string | null;
  bankUrl: string | null;
  bankPhone: string | null;
  countryName: string | null;
  countryCode: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class BinService {
  //private apiUrl = 'http://localhost:3000';
  private apiUrl = 'https://zentrastorecol.lat';

  constructor(private http: HttpClient) {}

  lookup(bin: string): Observable<BinInfo> {
    return this.http.get<BinInfo>(`${this.apiUrl}/bin/${bin}`);
  }
}
