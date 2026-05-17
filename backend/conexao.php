<?php
/**
 * MAONAMASSA — conexao.php
 * Configurações de conexão com o banco de dados MySQL (XAMPP)
 * 
 * ⚠️  Altere as configurações abaixo se necessário.
 *     No XAMPP padrão, usuário é "root" e senha é "" (vazia).
 */

define('DB_HOST',   'localhost');
define('DB_USUARIO', 'root');
define('DB_SENHA',   '');           // XAMPP padrão: sem senha
define('DB_BANCO',  'maonamassa');
define('DB_CHARSET', 'utf8mb4');

function conectar() {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_BANCO . ';charset=' . DB_CHARSET;

    $opcoes = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        return new PDO($dsn, DB_USUARIO, DB_SENHA, $opcoes);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'sucesso'  => false,
            'mensagem' => 'Erro de conexão com o banco: ' . $e->getMessage()
        ]);
        exit;
    }
}

// Cabeçalhos padrão para todas as respostas da API
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responder preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
