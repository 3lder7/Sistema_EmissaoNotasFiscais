using System.Text.Json;
using Faturamento.API.Models;

namespace Faturamento.API.Services;

public class NotaFiscalRepository
{
    private readonly string _arquivoDados = "notasfiscais.json";
    private List<NotaFiscal> _notas;

    public NotaFiscalRepository()
    {
        _notas = CarregarDados();
    }

    public List<NotaFiscal> ObterTodos()
    {
        return _notas;
    }

    public void Adicionar(NotaFiscal nota)
    {
        nota.Id = _notas.Count + 1;
        nota.Numeracao = $"NF{nota.Id:0000}";
        _notas.Add(nota);
        SalvarDados();
    }

    public void Atualizar(NotaFiscal notaAtualizada)
    {
        var notaExistente = _notas.FirstOrDefault(n => n.Id == notaAtualizada.Id);
        if (notaExistente != null)
        {
            notaExistente.Status = notaAtualizada.Status;
            notaExistente.Itens = notaAtualizada.Itens;
            SalvarDados();
        }
    }

    private List<NotaFiscal> CarregarDados()
    {
        if (File.Exists(_arquivoDados))
        {
            var json = File.ReadAllText(_arquivoDados);
            return JsonSerializer.Deserialize<List<NotaFiscal>>(json) ?? new List<NotaFiscal>();
        }
        return new List<NotaFiscal>();
    }

    private void SalvarDados()
    {
        var json = JsonSerializer.Serialize(_notas, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_arquivoDados, json);
    }
}