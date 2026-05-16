<?php
/**
 * MAONAMASSA — listar_servicos.php
 * Endpoint: GET /backend/listar_servicos.php
 * 
 * Parâmetros opcionais:
 *   ?categoria=Elétrica   → filtra por categoria
 *   ?busca=encanador      → busca por título/descrição
 *   ?limite=4             → limita o número de resultados
 * 
 * Retorna JSON com: sucesso, servicos[]
 */

require_once 'conexao.php';

$categoria = trim($_GET['categoria'] ?? '');
$busca     = trim($_GET['busca']     ?? '');
$limite    = (int) ($_GET['limite']  ?? 50);

if ($limite <= 0 || $limite > 100) $limite = 50;

$pdo = conectar();

// Monta a query dinamicamente
$sql    = '
    SELECT 
        s.id,
        s.categoria,
        s.tipo,
        s.titulo,
        s.descricao,
        s.valor,
        s.criado_em,
        u.nome  AS prestador_nome,
        u.especialidade
    FROM servicos s
    JOIN usuarios u ON u.id = s.prestador_id
    WHERE 1 = 1
';
$params = [];

if ($categoria !== '') {
    $sql .= ' AND s.categoria = ?';
    $params[] = $categoria;
}

if ($busca !== '') {
    $sql .= ' AND (s.titulo LIKE ? OR s.descricao LIKE ? OR u.nome LIKE ?)';
    $termo    = '%' . $busca . '%';
    $params[] = $termo;
    $params[] = $termo;
    $params[] = $termo;
}

$sql .= ' ORDER BY s.criado_em DESC LIMIT ' . $limite;

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$servicos = $stmt->fetchAll();

// Formata valores
foreach ($servicos as &$s) {
    $s['valor'] = (float) $s['valor'];
}
unset($s);

echo json_encode([
    'sucesso'  => true,
    'total'    => count($servicos),
    'servicos' => $servicos
]);
