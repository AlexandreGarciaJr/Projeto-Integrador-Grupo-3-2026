/**
 * MAONAMASSA — main.js
 * Funções compartilhadas entre todas as páginas
 */

const BASE_URL = 'backend/';

const ICONES = {
  'Elétrica':   '⚡',
  'Hidráulica': '🔧',
  'Pintura':    '🖌️',
  'Manutenção': '🔨',
  'Montagem':   '🪛',
  'Limpeza':    '🧹'
};

/* ----------------------------------------
   Carrega serviços na home (apenas 4)
---------------------------------------- */
function carregarServicosHome() {
  const lista = document.getElementById('lista-servicos');
  if (!lista) return;

  fetch(BASE_URL + 'listar_servicos.php?limite=4')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      lista.innerHTML = '';
      if (!data.servicos || data.servicos.length === 0) {
        lista.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <p>Nenhum serviço disponível ainda.<br>Seja o primeiro a cadastrar!</p>
          </div>`;
        return;
      }
      data.servicos.forEach(function(s) {
        lista.appendChild(criarCardPro(s));
      });
    })
    .catch(function() {
      lista.innerHTML = '<div class="empty-state"><p>Não foi possível carregar os serviços.</p></div>';
    });
}



/* ----------------------------------------
   Carrega serviços na tela de listagem
---------------------------------------- */
function carregarServicos(categoria, busca) {
  const lista = document.getElementById('lista-servicos');
  if (!lista) return;

  lista.innerHTML = '<div class="loader">Carregando...</div>';

  let url = BASE_URL + 'listar_servicos.php?';
  if (categoria) url += 'categoria=' + encodeURIComponent(categoria) + '&';
  if (busca)     url += 'busca='     + encodeURIComponent(busca)     + '&';

  fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(data) {
      lista.innerHTML = '';
      if (!data.servicos || data.servicos.length === 0) {
        lista.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">😕</div>
            <p>Nenhum serviço encontrado.</p>
          </div>`;
        return;
      }
      data.servicos.forEach(function(s) {
        lista.appendChild(criarServiceCard(s));
      });
    })
    .catch(function() {
      lista.innerHTML = '<div class="empty-state"><p>Erro ao carregar serviços.</p></div>';
    });
}

/* ----------------------------------------
   Card compacto (estilo "pro card" — home)
---------------------------------------- */
function criarCardPro(s) {
  const cat    = s.categoria || 'Serviço';
  const icone  = ICONES[cat] || '⚒️';
  const valor  = parseFloat(s.valor).toFixed(2).replace('.', ',');

  const div = document.createElement('div');
  div.className = 'pro-card';
  div.onclick = function() {
    window.location.href = 'detalhes-servico.html?id=' + s.id;
  };

  div.innerHTML = `
    <div class="pro-avatar">${icone}</div>
    <div class="pro-info">
      <div class="pro-name">${escHtml(s.titulo)}</div>
      <div class="pro-role">${escHtml(s.prestador_nome || 'Prestador')} · ${escHtml(cat)}</div>
      <div class="pro-rating">⭐ ${s.tipo || ''}</div>
    </div>
    <div class="pro-price">R$ ${valor}</div>
  `;
  return div;
}

/* ----------------------------------------
   Card completo (tela de listagem)
---------------------------------------- */
function criarServiceCard(s) {
  const cat    = s.categoria || 'Serviço';
  const icone  = ICONES[cat] || '⚒️';
  const valor  = parseFloat(s.valor).toFixed(2).replace('.', ',');

  const div = document.createElement('div');
  div.className = 'service-card';
  div.onclick = function() {
    window.location.href = 'detalhes-servico.html?id=' + s.id;
  };

  div.innerHTML = `
    <div class="service-card-top">
      <div>
        <span class="service-badge">${icone} ${escHtml(cat)}</span>
      </div>
      <div class="service-card-info">
        <div class="service-card-name">${escHtml(s.titulo)}</div>
        <div class="service-card-desc">${escHtml(s.descricao || '')}</div>
      </div>
    </div>
    <div class="service-card-footer">
      <div class="service-card-price">R$ ${valor}</div>
      <div class="service-card-provider">por ${escHtml(s.prestador_nome || 'Prestador')}</div>
    </div>
  `;
  return div;
}

/* ----------------------------------------
   Escape HTML (segurança básica)
---------------------------------------- */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}


 carregarServicosHome();

  function filtrarCategoria(cat) {
    window.location.href = 'servicos.html?categoria=' + encodeURIComponent(cat);
  }

  function filtrarServicos() {
    const termo = document.getElementById('busca').value;
    window.location.href = 'servicos.html?busca=' + encodeURIComponent(termo);
  }

  document.getElementById('busca').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') filtrarServicos();
  });