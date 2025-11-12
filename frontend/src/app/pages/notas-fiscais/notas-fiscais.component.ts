import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotaFiscalService, NotaFiscal} from '../../services/nota-fiscal';
import { FormsModule } from '@angular/forms';

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

  constructor(private notaFiscalService: NotaFiscalService) {}

  ngOnInit() {
    this.carregarNotasFiscais();
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