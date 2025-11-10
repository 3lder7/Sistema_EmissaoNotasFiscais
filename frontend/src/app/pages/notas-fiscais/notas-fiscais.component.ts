import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotaFiscalService, NotaFiscal} from '../../services/nota-fiscal';

@Component({
  selector: 'app-notas-fiscais',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notas-fiscais.component.html',
  styleUrl: './notas-fiscais.component.css'
})
export class NotasFiscaisComponent implements OnInit {
  notasFiscais: NotaFiscal[] = [];

  constructor(private notaService: NotaFiscalService) {}

  ngOnInit() {
    this.carregarNotasFiscais();
  }

  carregarNotasFiscais() {
    this.notaService.getNotasFiscais().subscribe({
      next: (notasFiscais) => {
        this.notasFiscais = notasFiscais;
        console.log('Notas Fiscais carregadas:', notasFiscais);
      },
      error: (erro) => {
        console.error('Erro ao carregar Notas Fiscais:', erro);
      }
    });
  }
}