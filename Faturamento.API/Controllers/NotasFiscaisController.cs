using Microsoft.AspNetCore.Mvc;
using Faturamento.API.Models;

namespace Faturamento.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotasFiscaisController : ControllerBase
{
    private static List<NotaFiscal> _notas = new List<NotaFiscal>();

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_notas);
    }

    [HttpPost]
    public IActionResult Post(NotaFiscal nota)//gera automaticamente uma numeração sequencial
    {
        nota.Id = _notas.Count + 1;
        nota.Numeracao = $"NF{nota.Id:0000}";
        _notas.Add(nota);
        return CreatedAtAction(nameof(Get), new { id = nota.Id }, nota);
    }
}