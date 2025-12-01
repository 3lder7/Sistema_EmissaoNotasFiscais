# Sistema de Emissão de Notas Fiscais 📃

🎯 Um sistema completo (backend + frontend) para emissão de notas fiscais, desenvolvido em C#, .NET (APIs) e cliente web com TypeScript/JavaScript.

## 🧰 Tecnologias Utilizadas
- C# / .NET — APIs de backend  
- TypeScript / JavaScript — frontend  
- HTML / CSS — interface web  
- (Outras dependências e frameworks conforme necessário — ex: Entity Framework, bibliotecas de UI etc.)

### Principais Módulos
- **Estoque.API** — módulo que gerencia estoque de produtos/serviços.  
- **Faturamento.API** — módulo responsável pela lógica de faturamento e emissão de notas fiscais.  
- **frontend** — aplicação web cliente para interação com o sistema (cadastro, emissão, visualização, etc.).
  
## ✅ Funcionalidades
- Cadastro de itens/produtos/serviços no estoque.  
- Emissão de notas fiscais a partir dos itens cadastrados.  
- Organização em módulos (backend separado do frontend).  
- Base para extensão: facilmente adaptável para geração de PDF, integração com banco de dados real, autenticação, etc.  
  
## 🔧 Como Rodar/Instalar Localmente
1. Clone o repositório:  
   ```bash
   git clone https://github.com/3lder7/Sistema_EmissaoNotasFiscais.git
   ```
   Abra a solução Korp.NotasFiscais.sln no Visual Studio/VS Code (dependendo do seu setup).

2. Restaure pacotes/nuggets se necessário.
3. Compile e execute os projetos de API (Estoque.API, Faturamento.API).
4. Abra a pasta frontend e execute a aplicação web (dependendo de como está configurado — por exemplo, via npm install + npm start, ou conforme seu setup).
5. Acesse via navegador para usar o sistema (endpoints + interface frontend).

 ## 📁 Estrutura de pastas
```
/ (root)
│  Korp.NotasFiscais.sln       # solução principal
│
├─ Estoque.API/                # backend — estoque
├─ Faturamento.API/            # backend — faturamento / emissão NF
└─ frontend/                   # frontend web (TypeScript / JS / HTML / CSS)

```
 ## 🤝 Contribuições
 Sinta-se à vontade para contribuir! Basta fazer um fork do repositório, criar uma nova branch com sua funcionalidade ou correção e abrir um pull request. 
