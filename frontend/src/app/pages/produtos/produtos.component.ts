import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService, Produto } from '../../services/produto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  mostrarFormulario = false;
    novoProduto: Produto = {
    id: 0,
    codigo: '',
    descricao: '',
    saldo: 0
  };

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

  criarProduto() {
    this.produtoService.criarProduto(this.novoProduto).subscribe({
      next: (produtoCriado) => {
        this.produtos.push(produtoCriado);
        this.cancelar();
        console.log('Produto criado:', produtoCriado);
      },
      error: (erro) => {
        console.error('Erro ao criar produto:', erro);
      }
    });
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.novoProduto = { id: 0, codigo: '', descricao: '', saldo: 0 };
  }
}