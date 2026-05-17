#  Maonamassa — Aplicativo de Serviços

Projeto acadêmico desenvolvido pelo Grupo 03 — Senac ADS.

Plataforma para conectar clientes a prestadores de serviços como eletricistas, encanadores, diaristas e mais.

---

##  Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript puro
- **Backend:** PHP 8+
- **Banco de dados:** MySQL (via XAMPP)
- **Servidor local:** Apache (via XAMPP)

---

##  Como rodar localmente

### 1. Instalar o XAMPP
Baixe em: https://www.apachefriends.org/pt_br/index.html  
Instale normalmente e abra o XAMPP Control Panel.

### 2. Iniciar os serviços
No XAMPP Control Panel, clique em **Start** para:
-  **Apache**
-  **MySQL**

### 3. Colocar o projeto na pasta correta
Copie a pasta `maonamassa` inteira para dentro de:
```
C:\xampp\htdocs\     (Windows)
/Applications/XAMPP/htdocs/   (Mac)
```

Resultado esperado:
```
C:\xampp\htdocs\maonamassa\
```

### 4. Criar o banco de dados
1. Abra o navegador e acesse: http://localhost/phpmyadmin
2. Clique em **SQL** no menu superior
3. Cole o conteúdo do arquivo `banco.sql`
4. Clique em **Executar**

Você verá o banco `maonamassa` criado com as tabelas `usuarios` e `servicos`.

### 5. Abrir o projeto
Acesse no navegador:
```
http://localhost/maonamassa/
```

---

##  Páginas do projeto

| Arquivo                | Descrição                                  |
|------------------------|--------------------------------------------|
| `index.html`           | Tela inicial com categorias e serviços     |
| `cadastro.html`        | Cadastro de cliente ou prestador           |
| `cadastrar-servico.html` | Prestador cadastra um novo serviço       |
| `servicos.html`        | Listagem e filtro de serviços              |
| `detalhes-servico.html`| Detalhes + botão "Contratar" (demo)        |

---

##  Estrutura de pastas

```
maonamassa/
├── index.html
├── cadastro.html
├── cadastrar-servico.html
├── servicos.html
├── detalhes-servico.html
├── banco.sql
├── css/
│   └── style.css
├── js/
│   └── main.js
└── backend/
    ├── conexao.php
    ├── cadastrar_usuario.php
    ├── cadastrar_servico.php
    ├── listar_servicos.php
    └── detalhe_servico.php
```

---

##  Endpoints da API

| Método | Endpoint                          | Descrição                    |
|--------|-----------------------------------|------------------------------|
| POST   | `backend/cadastrar_usuario.php`   | Cadastra usuário/prestador   |
| POST   | `backend/cadastrar_servico.php`   | Cadastra serviço             |
| GET    | `backend/listar_servicos.php`     | Lista serviços (com filtros) |
| GET    | `backend/detalhe_servico.php?id=` | Detalhe de um serviço        |

### Parâmetros `listar_servicos.php`
- `?categoria=Elétrica` — filtra por categoria
- `?busca=torneira` — busca por título ou descrição
- `?limite=4` — limita quantidade de resultados

---

##  Dados de exemplo

O arquivo `banco.sql` já insere alguns dados de demonstração:
- **Prestadores:** Adeilson (Elétrica) e Joana (Hidráulica)
- **Serviços:** 4 serviços cadastrados

---

##  Equipe — Grupo 03

- Alexandre Garcia de Oliveira Junior
- Anderson Jose Alves
- Maycon Leite Ribeiro
- Gabriel Mororo dos Santos
- Ryan Rodrigues Ryan
- Gustavo Willian Batista de Oliveira
- Jorge Daniel Delgado Jara
- Verônica Garcia

---

**Senac — Análise e Desenvolvimento de Sistemas**
