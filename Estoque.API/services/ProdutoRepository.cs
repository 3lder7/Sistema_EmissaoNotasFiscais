using System.Text.Json;
using Estoque.API.Models;

namespace Estoque.API.Services;

public class ProdutoRepository
{
    private readonly string _arquivoDados = "produtos.json";
    private List<Produto> _produtos;

    public ProdutoRepository()
    {
        _produtos = CarregarDados();
    }

    public List<Produto> ObterTodos()
    {
        return _produtos;
    }

    public void Adicionar(Produto produto)
    {
        produto.Id = _produtos.Count + 1;
        _produtos.Add(produto);
        SalvarDados();
    }
    public void AtualizarSaldo(int produtoId, int quantidadeUtilizada)
    {
        var produto = _produtos.FirstOrDefault(p => p.Id == produtoId);
        if (produto != null)
        {
            produto.Saldo -= quantidadeUtilizada;
            SalvarDados();
        }
    }

    private List<Produto> CarregarDados()
    {
        if (File.Exists(_arquivoDados))
        {
            var json = File.ReadAllText(_arquivoDados);
            return JsonSerializer.Deserialize<List<Produto>>(json) ?? new List<Produto>();
        }
        return new List<Produto>();
    }

    private void SalvarDados()
    {
        var json = JsonSerializer.Serialize(_produtos, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_arquivoDados, json);
    }
}