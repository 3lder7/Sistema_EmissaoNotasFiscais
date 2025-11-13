using Microsoft.AspNetCore.Mvc;
using Faturamento.API.Models;
using Faturamento.API.Services;

namespace Faturamento.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotasFiscaisController : ControllerBase
{
    private readonly NotaFiscalRepository _repository;

    public NotasFiscaisController()
    {
        _repository = new NotaFiscalRepository();
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_repository.ObterTodos());
    }

    [HttpPost]
    public IActionResult Post(NotaFiscal nota)
    {
        _repository.Adicionar(nota);
        return CreatedAtAction(nameof(Get), new { id = nota.Id }, nota);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, NotaFiscal nota)
    {
        if (id != nota.Id)
            return BadRequest();

        _repository.Atualizar(nota);
        return NoContent();
    }
}