  // Tipos de serviço por categoria
  const tiposServico = {
    'Elétrica': [
      'Instalação de tomadas',
      'Troca de disjuntor',
      'Instalação de lustres / luminárias',
      'Passagem de fiação',
      'Instalação de ar-condicionado',
      'Revisão da rede elétrica'
    ],
    'Hidráulica': [
      'Conserto de vazamento',
      'Instalação de torneira',
      'Desentupimento',
      'Instalação de chuveiro',
      'Instalação de caixa d\'água',
      'Reparo em encanamento'
    ]
  };

  // Pegar ID do prestador da URL
  const params = new URLSearchParams(window.location.search);
  const prestadorId = params.get('prestador_id') || '';
  const nomePrestador = params.get('nome') || 'Prestador';

  document.getElementById('subtitulo-prestador').textContent =
    'Olá, ' + nomePrestador + '! Ofereça seu serviço.';

  function selecionarCategoria(cat) {
    document.getElementById('chip-eletrica').classList.remove('selected');
    document.getElementById('chip-hidraulica').classList.remove('selected');

    if (cat === 'Elétrica')   document.getElementById('chip-eletrica').classList.add('selected');
    if (cat === 'Hidráulica') document.getElementById('chip-hidraulica').classList.add('selected');

    document.getElementById('categoria-selecionada').value = cat;

    // Preenche select de tipos
    const sel = document.getElementById('tipo-servico');
    sel.innerHTML = '<option value="">Selecione o tipo...</option>';
    tiposServico[cat].forEach(function(t) {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      sel.appendChild(opt);
    });
  }

  // Submit
  document.getElementById('form-servico').addEventListener('submit', function(e) {
    e.preventDefault();
    cadastrarServico();
  });

  function cadastrarServico() {
    const categoria = document.getElementById('categoria-selecionada').value;
    const tipo      = document.getElementById('tipo-servico').value;
    const titulo    = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const valor     = document.getElementById('valor').value;

    if (!categoria) { mostrarAlerta('error', 'Selecione a área do serviço (Elétrica ou Hidráulica).'); return; }
    if (!tipo)      { mostrarAlerta('error', 'Selecione o tipo de serviço.'); return; }
    if (!titulo)    { mostrarAlerta('error', 'Digite o título do serviço.'); return; }
    if (!descricao) { mostrarAlerta('error', 'Digite uma descrição.'); return; }
    if (!valor || parseFloat(valor) <= 0) { mostrarAlerta('error', 'Digite um valor válido.'); return; }
    if (!prestadorId) { mostrarAlerta('error', 'ID do prestador não encontrado. Refaça o cadastro.'); return; }

    const btn = document.getElementById('btn-submit');
    btn.textContent = 'Publicando...';
    btn.disabled = true;

    fetch('backend/cadastrar_servico.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prestador_id: prestadorId, categoria, tipo, titulo, descricao, valor: parseFloat(valor) })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.sucesso) {
        mostrarAlerta('success', 'Serviço publicado com sucesso! Redirecionando...');
        setTimeout(function() {
          window.location.href = 'servicos.html';
        }, 1500);
      } else {
        mostrarAlerta('error', data.mensagem || 'Erro ao publicar serviço.');
        btn.textContent = 'Publicar Serviço';
        btn.disabled = false;
      }
    })
    .catch(function() {
      mostrarAlerta('error', 'Erro de conexão com o servidor.');
      btn.textContent = 'Publicar Serviço';
      btn.disabled = false;
    });
  }

  function mostrarAlerta(tipo, msg) {
    const s = document.getElementById('alert-success');
    const e = document.getElementById('alert-error');
    s.classList.remove('show');
    e.classList.remove('show');
    if (tipo === 'success') { s.textContent = msg; s.classList.add('show'); }
    else                    { e.textContent = msg; e.classList.add('show'); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }