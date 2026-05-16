<?php
/**
 * MAONAMASSA — detalhe_servico.php
 * Endpoint: GET /backend/detalhe_servico.php?id=X
 * 
 * Retorna JSON com: sucesso, servico{}
 */

require_once 'conexao.php';

$id = (int) ($_GET['id'] ?? 0);

if ($id <= 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'ID inválido.']);
    exit;
}

$pdo  = conectar();
$stmt = $pdo->prepare('
    SELECT 
        s.id,
        s.categoria,
        s.tipo,
        s.titulo,
        s.descricao,
        s.valor,
        s.criado_em,
        u.nome        AS prestador_nome,
        u.telefone    AS prestador_telefone,
        u.especialidade
    FROM servicos s
    JOIN usuarios u ON u.id = s.prestador_id
    WHERE s.id = ?
');

$stmt->execute([$id]);
$servico = $stmt->fetch();

if (!$servico) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Serviço não encontrado.']);
    exit;
}

$servico['valor'] = (float) $servico['valor'];

echo json_encode([
    'sucesso' => true,
    'servico' => $servico
]);
