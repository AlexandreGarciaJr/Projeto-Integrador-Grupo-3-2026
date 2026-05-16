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
-- Tabela: usuarios: Armazena clientes e prestadores de serviço
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
-- Tabela: servicos: Cada serviço pertence a um prestador
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

-- -----------------------------------------------
-- Dados de exemplo para demonstração
-- Senha de todos: "123456"
-- -----------------------------------------------

-- "Linhas de inserir usuarios abaixo, deixei comentado, depois decidimos se mantemos ou nao para a entrega final. Se for deixar é so descomentar"

-- INSERT INTO usuarios (tipo, nome, email, cpf, telefone, senha, especialidade) VALUES
-- (
--     'prestador',
--     'Adeilson da Silva',
--     'adeilson@email.com',
--     '12345678901',
--     '11987654321',
--     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- senha: password
--     'Elétrica'
-- ),
-- (
--     'prestador',
--     'Joana Pereira',
--     'joana@email.com',
--     '98765432100',
--     '11976543210',
--     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
--     'Hidráulica'
-- ),
-- (
--     'usuario',
--     'Maria Cliente',
--     'maria@email.com',
--     '11122233344',
--     '11965432109',
--     '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
--     NULL
-- );

-- INSERT INTO servicos (prestador_id, categoria, tipo, titulo, descricao, valor) VALUES
-- (
--     1,
--     'Elétrica',
--     'Instalação de tomadas',
--     'Instalação de tomadas e interruptores',
--     'Serviço completo de instalação de tomadas e interruptores com materiais de qualidade. Atendo residências e pequenos comércios. Mais de 5 anos de experiência.',
--     180.00
-- ),
-- (
--     1,
--     'Elétrica',
--     'Troca de disjuntor',
--     'Revisão e troca de disjuntores',
--     'Revisão completa do quadro elétrico com diagnóstico e troca de disjuntores defeituosos. Emissão de laudo.',
--     250.00
-- ),
-- (
--     2,
--     'Hidráulica',
--     'Conserto de vazamento',
--     'Conserto de vazamentos em geral',
--     'Localizo e conserto vazamentos em canos, pias, torneiras e chuveiros. Atendimento rápido e garantia de 30 dias no serviço.',
--     150.00
-- ),
-- (
--     2,
--     'Hidráulica',
--     'Desentupimento',
--     'Desentupimento de pias e ralos',
--     'Desentupimento de pias, ralos, vasos sanitários e canos. Sem sujeira, com equipamentos modernos.',
--     120.00
-- );
