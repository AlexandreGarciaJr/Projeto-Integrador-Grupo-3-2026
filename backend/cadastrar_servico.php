<?php
/**
 * MAONAMASSA — cadastrar_servico.php
 * Endpoint: POST /backend/cadastrar_servico.php
 * 
 * Recebe JSON com: prestador_id, categoria, tipo, titulo, descricao, valor
 * Retorna JSON com: sucesso, id, mensagem
 */

require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

$body  = file_get_contents('php://input');
$dados = json_decode($body, true);

if (!$dados) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos.']);
    exit;
}

$prestadorId = (int) ($dados['prestador_id'] ?? 0);
$categoria   = trim($dados['categoria']       ?? '');
$tipo        = trim($dados['tipo']            ?? '');
$titulo      = trim($dados['titulo']          ?? '');
$descricao   = trim($dados['descricao']       ?? '');
$valor       = (float) ($dados['valor']       ?? 0);

// Validações
if ($prestadorId <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Prestador inválido.']);
    exit;
}
if (empty($categoria) || empty($tipo) || empty($titulo) || empty($descricao)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha todos os campos.']);
    exit;
}
if ($valor <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Valor inválido.']);
    exit;
}

$categoriasValidas = ['Elétrica', 'Hidráulica', 'Pintura', 'Manutenção', 'Montagem', 'Limpeza'];
if (!in_array($categoria, $categoriasValidas)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Categoria inválida.']);
    exit;
}

$pdo = conectar();

// Verifica se o prestador existe e é do tipo "prestador"
$stmt = $pdo->prepare('SELECT id FROM usuarios WHERE id = ? AND tipo = "prestador"');
$stmt->execute([$prestadorId]);
if (!$stmt->fetch()) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Prestador não encontrado.']);
    exit;
}

// Insere o serviço
$stmt = $pdo->prepare('
    INSERT INTO servicos (prestador_id, categoria, tipo, titulo, descricao, valor, criado_em)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
');

$stmt->execute([$prestadorId, $categoria, $tipo, $titulo, $descricao, $valor]);
$novoId = $pdo->lastInsertId();

echo json_encode([
    'sucesso'  => true,
    'id'       => (int) $novoId,
    'mensagem' => 'Serviço cadastrado com sucesso!'
]);
