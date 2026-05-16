const params = new URLSearchParams(window.location.search);
  const servicoId = params.get('id');

  const icones = {
    'Elétrica':   '⚡',
    'Hidráulica': '🔧',
    'Pintura':    '🖌️',
    'Manutenção': '🔨',
    'Montagem':   '🪛',
    'Limpeza':    '🧹'
  };

  if (!servicoId) {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('error-state').style.display = 'block';
  } else {
    carregarDetalhe(servicoId);
  }

  function carregarDetalhe(id) {
    fetch('backend/detalhe_servico.php?id=' + id)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        document.getElementById('loading-state').style.display = 'none';

        if (!data.sucesso) {
          document.getElementById('error-state').style.display = 'block';
          return;
        }

        const s = data.servico;
        const cat = s.categoria || 'Serviço';

        document.getElementById('detalhe-titulo').textContent    = s.titulo;
        document.getElementById('detalhe-categoria').textContent = cat;
        document.getElementById('detalhe-icone').textContent     = icones[cat] || '⚒️';
        document.getElementById('detalhe-tipo').textContent      = s.tipo;
        document.getElementById('detalhe-descricao').textContent = s.descricao;
        document.getElementById('detalhe-valor').textContent     = 'R$ ' + parseFloat(s.valor).toFixed(2).replace('.', ',');
        document.getElementById('detalhe-prestador-nome').textContent  = s.prestador_nome || 'Prestador';
        document.getElementById('detalhe-prestador-espec').textContent = s.especialidade  || 'Profissional';

        document.title = 'Maonamassa – ' + s.titulo;
        document.getElementById('detail-body').style.display = 'block';
      })
      .catch(function() {
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('error-state').style.display = 'block';
      });
  }

  function contratar() {
    const modal = document.getElementById('modal-contratar');
    modal.style.display = 'flex';
  }

  function fecharModal() {
    document.getElementById('modal-contratar').style.display = 'none';
  }