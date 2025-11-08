using Microsoft.AspNetCore.Mvc;
using Estoque.API.Models;

namespace Estoque.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
    private static List<Produto> _produtos = new List<Produto>();

    [HttpGet]//retorna produto
    public IActionResult Get()
    {
        return Ok(_produtos);
    }

    [HttpPost]//add produto
    public IActionResult Post(Produto produto)
    {
        produto.Id = _produtos.Count + 1;
        _produtos.Add(produto);
        return CreatedAtAction(nameof(Get), new { id = produto.Id }, produto);
    }
}