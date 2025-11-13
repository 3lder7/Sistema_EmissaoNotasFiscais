import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//tratamento de erros
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    return this.http.get<NotaFiscal[]>(this.apiUrl).pipe(
      //tratamento de erros
      catchError(error => {
        console.error('Erro ao carregar notas fiscais:', error);
        return throwError(() => new Error('Serviço de notas fiscais indisponível. Tente novamente.'));
      })
    );
  }

  criarNotaFiscal(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.post<NotaFiscal>(this.apiUrl, nota);
  }

  atualizarNotaFiscal(nota: NotaFiscal): Observable<NotaFiscal> {
    return this.http.put<NotaFiscal>(`${this.apiUrl}/${nota.id}`, nota);
  }
}