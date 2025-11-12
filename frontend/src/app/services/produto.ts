import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//tratamento de erros
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

//produto
export interface Produto {
  id: number;
  codigo: string;
  descricao: string;
  saldo: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:5001/api/produtos';

  constructor(private http: HttpClient) { }

  //pegar todos os produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      //tratamento de erros
      catchError(error => {
        console.error('Erro ao carregar produtos:', error);
        return throwError(() => new Error('Serviço de produtos indisponível. Tente novamente.'));
      })
    );
  }

  // criar novo produto
  criarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

}
