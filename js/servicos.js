  let categoriaAtual = '';
  let termoBusca    = '';

  // Verificar parâmetros da URL
  const params = new URLSearchParams(window.location.search);
  if (params.get('categoria')) {
    categoriaAtual = params.get('categoria');
    // Marcar botão ativo
    document.querySelectorAll('.filtro-btn').forEach(function(btn) {
      btn.classList.toggle('active', btn.dataset.cat === categoriaAtual);
    });
  }
  if (params.get('busca')) {
    termoBusca = params.get('busca');
    document.getElementById('busca').value = termoBusca;
  }

  carregarServicos(categoriaAtual, termoBusca);

  function aplicarFiltro(el, cat) {
    document.querySelectorAll('.filtro-btn').forEach(function(b) { b.classList.remove('active'); });
    el.classList.add('active');
    categoriaAtual = cat;
    carregarServicos(cat, termoBusca);
  }

  function buscar() {
    termoBusca = document.getElementById('busca').value;
    carregarServicos(categoriaAtual, termoBusca);
  }

  document.getElementById('busca').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') buscar();
  });