import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService, Produto } from '../../services/produto';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        console.log('Produtos carregados:', produtos);
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }
}