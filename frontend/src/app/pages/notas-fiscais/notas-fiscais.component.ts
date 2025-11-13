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
  produtosDisponiveis: Produto[] = []; // lista de produtos para operações
  produtosParaExibicao: Produto[] = [];// produtos exibidos no formulario (cópia original)
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
        this.produtosParaExibicao = [...produtos];
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

  obterNomeProduto(produtoId: number): string {
    if (!produtoId) return 'Nenhum produto';
    const produto = this.produtosDisponiveis.find(p => p.id === produtoId);
    return produto ? produto.descricao : 'Produto não encontrado';
  }

  obterSaldoAnterior(nota: NotaFiscal): number {
    const item = nota.itens[0];
    if (!item) return 0;

    const produtoOriginal = this.produtosParaExibicao.find(p => p.id === item.produtoId);
    return produtoOriginal ? produtoOriginal.saldo : 0;
  }

  obterSaldoAtual(nota: NotaFiscal): number {
    const item = nota.itens[0];
    if (!item) return 0;

    const produtoAtual = this.produtosDisponiveis.find(p => p.id === item.produtoId);
    return produtoAtual ? produtoAtual.saldo : 0;
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
    this.atualizarSaldosProdutos(nota);

    nota.status = 'Fechada';

    this.notaFiscalService.atualizarNotaFiscal(nota).subscribe({
      next: () => {
        this.carregandoImpressao = null;
        console.log(`Nota ${nota.numeracao} atualizada para status: Fechada`);
      },
      error: (erro) => {
        console.error('Erro ao atualizar nota fiscal:', erro);
        this.carregandoImpressao = null;
      }
    });
  }

  atualizarSaldosProdutos(nota: NotaFiscal) {
    nota.itens.forEach(item => {
      const produto = this.produtosDisponiveis.find(p => p.id === item.produtoId);
      if (produto) {
        const saldoAnterior = produto.saldo;

        this.produtoService.atualizarSaldo(item.produtoId, item.quantidade).subscribe({
          next: () => {
            produto.saldo -= item.quantidade;
            
          },
          error: (erro) => {
            console.error(`Erro ao atualizar saldo do produto ${produto.descricao}:`, erro);
          }
        });
      } else {
        console.error(`Produto com ID ${item.produtoId} não encontrado`);
      }
    });
  }
}