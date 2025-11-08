import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemNotaFiscal {
  produtoId: number;
  quantidade: number;
}

export interface NotaFiscal {
  id: number;
  numeracao: string;
  status: string;
  itens: ItemNotaFiscal[];
}

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {
  private apiUrl = 'http://localhost:5002/api/notasfiscais';

  constructor(private http: HttpClient) { }

  getNotasFiscais(): Observable<NotaFiscal[]> {
    return this.http.get<NotaFiscal[]>(this.apiUrl);
  }

  criarNotaFiscal(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.apiUrl, nota);
  }
}