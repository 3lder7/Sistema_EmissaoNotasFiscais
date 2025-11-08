namespace Faturamento.API.Models;

public class NotaFiscal
{
    public int Id { get; set; }
    public string Numeracao { get; set; } = string.Empty;
    public string Status { get; set; } = "Aberta";
    public List<ItemNotaFiscal> Itens { get; set; } = new List<ItemNotaFiscal>();//garante começar vazio
}