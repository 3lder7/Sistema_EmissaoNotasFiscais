using Microsoft.AspNetCore.Mvc;
using Estoque.API.Models;
using Estoque.API.Services;

namespace Estoque.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private readonly ProdutoRepository _repository;

    public ProdutosController()
    {
        _repository = new ProdutoRepository();
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_repository.ObterTodos());
    }

    [HttpPost]
    public IActionResult Post(Produto produto)
    {
        _repository.Adicionar(produto);
        return CreatedAtAction(nameof(Get), new { id = produto.Id }, produto);
    }

    [HttpPut("{id}/atualizar-saldo")]
    public IActionResult AtualizarSaldo(int id, [FromBody] int quantidadeUtilizada)
    {
        try
        {
            _repository.AtualizarSaldo(id, quantidadeUtilizada);
            return Ok(new { message = "Saldo atualizado com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
}