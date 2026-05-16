  // Mostrar/ocultar campo de especialidade
  document.querySelectorAll('input[name="tipo"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      const extra = document.getElementById('campo-especialidade');
      extra.style.display = this.value === 'prestador' ? 'block' : 'none';
    });
  });

  // Máscara CPF
  document.getElementById('cpf').addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.value = v;
  });

  // Máscara Telefone
  document.getElementById('telefone').addEventListener('input', function() {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length <= 10) {
      v = v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    this.value = v;
  });

  // Submit
  document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    cadastrarUsuario();
  });

  function cadastrarUsuario() {
    const tipo  = document.querySelector('input[name="tipo"]:checked').value;
    const nome  = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf   = document.getElementById('cpf').value.trim();
    const tel   = document.getElementById('telefone').value.trim();
    const senha = document.getElementById('senha').value;
    const conf  = document.getElementById('confirmar-senha').value;
    const espec = document.getElementById('especialidade').value;

    // Validações básicas
    if (!nome || !email || !cpf || !tel || !senha) {
      mostrarAlerta('error', 'Preencha todos os campos obrigatórios.');
      return;
    }
    if (senha !== conf) {
      mostrarAlerta('error', 'As senhas não coincidem.');
      return;
    }
    if (senha.length < 6) {
      mostrarAlerta('error', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (tipo === 'prestador' && !espec) {
      mostrarAlerta('error', 'Selecione sua especialidade.');
      return;
    }

    const btn = document.getElementById('btn-submit');
    btn.textContent = 'Cadastrando...';
    btn.disabled = true;

    fetch('backend/cadastrar_usuario.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo, nome, email, cpf, telefone: tel, senha, especialidade: espec })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      if (data.sucesso) {
        mostrarAlerta('success', 'Cadastro realizado com sucesso!');
        // Se for prestador, redireciona para cadastrar serviço
        if (tipo === 'prestador' && data.id) {
          setTimeout(function() {
            window.location.href = 'cadastrar-servico.html?prestador_id=' + data.id + '&nome=' + encodeURIComponent(nome);
          }, 1200);
        } else {
          setTimeout(function() {
            window.location.href = 'index.html';
          }, 1500);
        }
      } else {
        mostrarAlerta('error', data.mensagem || 'Erro ao cadastrar.');
        btn.textContent = 'Criar Conta';
        btn.disabled = false;
      }
    })
    .catch(function() {
      mostrarAlerta('error', 'Erro de conexão com o servidor.');
      btn.textContent = 'Criar Conta';
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