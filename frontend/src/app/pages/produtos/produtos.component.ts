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
  erroCarregamento = '';//mensagem de erro
  salvandoProduto = false;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.erroCarregamento = '';
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        console.log('Produtos carregados:', produtos);
      },
      error: (erro) => {
        this.erroCarregamento = erro.message;
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  criarProduto() {
    //validações básicas
    if (!this.novoProduto.codigo || !this.novoProduto.descricao || this.novoProduto.saldo < 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }
    const codigoExistente = this.produtos.find(p => p.codigo === this.novoProduto.codigo);
    if (codigoExistente) {
      alert('Já existe um produto com este código!');
      return;
    }
    if (this.salvandoProduto) {
      return; // impede multiplos cliques
    }

    this.salvandoProduto = true;

    this.produtoService.criarProduto(this.novoProduto).subscribe({
      next: (produtoCriado) => {
        this.produtos.push(produtoCriado);
        this.cancelar();
        this.salvandoProduto = false;//libera o botao
        console.log('Produto criado:', produtoCriado);
      },
      error: (erro) => {
        console.error('Erro ao criar produto:', erro);
        this.salvandoProduto = false;//libera o botao
      }
    });
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.novoProduto = { id: 0, codigo: '', descricao: '', saldo: 0 };
  }
}