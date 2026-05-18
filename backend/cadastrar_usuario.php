<?php
/**
 * MAONAMASSA — cadastrar_usuario.php
 * Endpoint: POST /backend/cadastrar_usuario.php
 * 
 * Recebe JSON com: tipo, nome, email, cpf, telefone, senha, especialidade
 * Retorna JSON com: sucesso, id, mensagem
 */

require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

// Lê o body JSON
$body = file_get_contents('php://input');
$dados = json_decode($body, true);

if (!$dados) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

// Sanitiza e valida
$tipo         = trim($dados['tipo']         ?? '');
$nome         = trim($dados['nome']         ?? '');
$email        = trim($dados['email']        ?? '');
$cpf          = preg_replace('/\D/', '', $dados['cpf'] ?? '');
$telefone     = preg_replace('/\D/', '', $dados['telefone'] ?? '');
$senha        = $dados['senha']             ?? '';
$especialidade = trim($dados['especialidade'] ?? '');

// Validações
if (!in_array($tipo, ['usuario', 'prestador'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Tipo inválido.']);
    exit;
}
if (empty($nome) || empty($email) || empty($cpf) || empty($telefone) || empty($senha)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha todos os campos obrigatórios.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail inválido.']);
    exit;
}
if (strlen($cpf) !== 11) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'CPF inválido.']);
    exit;
}
if (strlen($senha) < 6) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Senha muito curta (mínimo 6 caracteres).']);
    exit;
}

$pdo = conectar();

// Verifica se e-mail já existe
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Este e-mail já está cadastrado.']);
    exit;
}

// Verifica se CPF já existe
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE cpf = ?');
$stmt->execute([$cpf]);
if ($stmt->fetch()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Este CPF já está cadastrado.']);
    exit;
}

// Hash da senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Insere no banco
$stmt = $pdo->prepare('
    INSERT INTO usuarios (tipo, nome, email, cpf, telefone, senha, especialidade, criado_em)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
');

$stmt->execute([$tipo, $nome, $email, $cpf, $telefone, $senhaHash, $especialidade]);
$novoId = $pdo->lastInsertId();

echo json_encode([
    'sucesso'  => true,
    'id'       => (int) $novoId,
    'mensagem' => 'Usuário cadastrado com sucesso!'
]);
