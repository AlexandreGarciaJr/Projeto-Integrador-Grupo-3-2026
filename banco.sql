-- =====================================================
--  MAONAMASSA — banco.sql
--  Execute este script no phpMyAdmin para criar
--  o banco de dados e as tabelas.
--
--  Instruções:
--  1. Abra o phpMyAdmin (http://localhost/phpmyadmin)
--  2. Clique em "SQL" no menu superior
--  3. Cole todo este conteúdo e clique em "Executar"
-- =====================================================

-- Cria o banco
CREATE DATABASE IF NOT EXISTS maonamassa
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE maonamassa;

-- -----------------------------------------------
-- Tabela usuarios: Armazena clientes e prestadores de serviço
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id            INT          AUTO_INCREMENT PRIMARY KEY,
    tipo          ENUM('usuario', 'prestador') NOT NULL DEFAULT 'usuario',
    nome          VARCHAR(120) NOT NULL,
    email         VARCHAR(180) NOT NULL UNIQUE,
    cpf           CHAR(11)     NOT NULL UNIQUE,
    telefone      VARCHAR(20)  NOT NULL,
    senha         VARCHAR(255) NOT NULL,           -- hash bcrypt
    especialidade VARCHAR(80)  DEFAULT NULL,       -- apenas para prestadores
    criado_em     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------------
-- Tabela servicos: Cada serviço pertence a um prestador
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS servicos (
    id            INT           AUTO_INCREMENT PRIMARY KEY,
    prestador_id  INT           NOT NULL,
    categoria     VARCHAR(60)   NOT NULL,  -- Ex: Elétrica, Hidráulica
    tipo          VARCHAR(100)  NOT NULL,  -- Ex: Instalação de tomadas
    titulo        VARCHAR(150)  NOT NULL,
    descricao     TEXT          NOT NULL,
    valor         DECIMAL(10,2) NOT NULL,
    criado_em     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (prestador_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


