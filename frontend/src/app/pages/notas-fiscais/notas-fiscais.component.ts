import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotaFiscalService, NotaFiscal, ItemNotaFiscal } from '../../services/nota-fiscal';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto';

@Component({
  selector: 'app-notas-fiscais',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './notas-fiscais.component.html',
  styleUrl: './notas-fiscais.component.css'
})
export class NotasFiscaisComponent implements OnInit {
  notasFiscais: NotaFiscal[] = [];
  mostrarFormulario = false;
  carregandoImpressao: number | null = null;
  novaNotaFiscal: NotaFiscal = {
    id: 0,
    numeracao: '',
    status: 'Aberta',//status inicial
    itens: []
  };
  erroCarregamento = '';//mensagem de erro
  produtosDisponiveis: Produto[] = []; // lista de produtos
  produtoSelecionadoId: number = 0;
  quantidadeSelecionada: number = 0;

  constructor(
    private notaFiscalService: NotaFiscalService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.carregarNotasFiscais();
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.produtosDisponiveis = produtos;
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  carregarNotasFiscais() {
    this.erroCarregamento = '';
    this.notaFiscalService.getNotasFiscais().subscribe({
      next: (notasFiscais) => {
        this.notasFiscais = notasFiscais;
        console.log('Notas Fiscais carregadas:', notasFiscais);
      },
      error: (erro) => {
        this.erroCarregamento = erro.message;
        console.error('Erro ao carregar Notas Fiscais:', erro);
      }
    });
  }

  criarNotaFiscal() {
    const novoItem: ItemNotaFiscal = {
      produtoId: this.produtoSelecionadoId,
      quantidade: this.quantidadeSelecionada
    };
    this.novaNotaFiscal.itens = [novoItem]; // add o item selecionado a nova nota fiscal

    this.notaFiscalService.criarNotaFiscal(this.novaNotaFiscal).subscribe({
      next: (notaCriada: NotaFiscal) => {
        this.notasFiscais.push(notaCriada);
        this.cancelar();
        console.log('Nota fiscal criada:', notaCriada);
      },
      error: (erro: any) => {
        console.error('Erro ao criar nota fiscal:', erro);
      }
    });
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.novaNotaFiscal = {
      id: 0,
      numeracao: '',
      status: 'Aberta',
      itens: []
    };
    this.produtoSelecionadoId = 0; // reset
    this.quantidadeSelecionada = 0; // reset
  }

  imprimirNota(nota: NotaFiscal) {
    if (nota.status !== 'Aberta') {
      alert('Apenas notas com status "Aberta" podem ser impressas');
      return;
    }

    this.carregandoImpressao = nota.id;

    // impressao 2 segundos
    setTimeout(() => {
      this.finalizarImpressao(nota);
    }, 2000);
  }

  finalizarImpressao(nota: NotaFiscal) {
    nota.status = 'Fechada';
    this.carregandoImpressao = null;

    console.log(`Nota ${nota.numeracao} impressa e fechada`);
    // logica api backend
  }

}