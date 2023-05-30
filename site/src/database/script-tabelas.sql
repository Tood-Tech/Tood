-- -----------------------------------------------------
-- Schema ToodDatabase
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ToodDatabase` DEFAULT CHARACTER SET utf8 ;
USE `ToodDatabase` ;

-- -----------------------------------------------------
-- Table `ToodDatabase`.`Empresa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`Empresa` (
  `idEmpresa` INT NOT NULL AUTO_INCREMENT,
  `razaoSocial` VARCHAR(45) NULL,
  `nomeFantasia` VARCHAR(45) NULL,
  `cnpj` CHAR(14) NULL,
  `telefone` VARCHAR(13) NULL,
  `responsavel` VARCHAR(45) NULL,
  PRIMARY KEY (`idEmpresa`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `ToodDatabase`.`Estabelecimento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`Estabelecimento` (
  `idEstabelecimento` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  `cnpj` VARCHAR(45) NULL,
  `telefone` VARCHAR(45) NULL,
  `responsavel` VARCHAR(45) NULL,
  PRIMARY KEY (`idEstabelecimento`),
  INDEX `fk_Freezer_Empresa1_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Freezer_Empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `ToodDatabase`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`Totem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`Totem` (
  `idTotem` INT NOT NULL AUTO_INCREMENT,
  `fkEstabelecimento` INT NOT NULL,
  `numeroSerial` VARCHAR(45) NULL,
  `processador` INT NULL,
  `alertaProcessador` INT NULL,
  `ram` INT NULL,
  `alertaRam` INT NULL,
  `gpu` INT NULL,
  `alertaGpu` INT NULL,
  `disco` INT NULL,
  `alertaDisco` INT NULL,
  PRIMARY KEY (`idTotem`, `fkEstabelecimento`),
  INDEX `fk_Totem_Estabelecimento1_idx` (`fkEstabelecimento` ASC) VISIBLE,
  CONSTRAINT `fk_Totem_Estabelecimento1`
    FOREIGN KEY (`fkEstabelecimento`)
    REFERENCES `ToodDatabase`.`Estabelecimento` (`idEstabelecimento`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
  )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`DadoTotem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`DadoTotem` (
  `idDadosTotem` INT NOT NULL AUTO_INCREMENT,
  `fkTotem` INT NOT NULL,
  `dataHora` INT NULL,
  `qtdRam` INT NULL,
  `qtdGpu` INT NULL,
  `qtdDisco` INT NULL,
  `qtdProcessador` INT NULL,
  PRIMARY KEY (`idDadosTotem`, `fkTotem`),
  INDEX `fk_dados_sensores_idx` (`fkTotem` ASC) VISIBLE,
  CONSTRAINT `fk_dados_sensores`
    FOREIGN KEY (`fkTotem`)
    REFERENCES `ToodDatabase`.`Totem` (`idTotem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `fkEmpresa` INT NOT NULL,
  `nomeUsuario` VARCHAR(45) NULL,
  `email` VARCHAR(50) NULL,
  `senha` VARCHAR(16) NULL,
  `cargo` VARCHAR(20) NULL,
  `telefone` VARCHAR(45) NULL,
  `cpf` VARCHAR(45) NULL,
  PRIMARY KEY (`idUsuario`, `fkEmpresa`),
  INDEX `fk_Usuario_Empresa1_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `ToodDatabase`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`AlertaSensor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`AlertaSensor` (
  `idAlertaSensor` INT NOT NULL AUTO_INCREMENT,
  `fkDadoTotem` INT NOT NULL,
  `fkTotem` INT NOT NULL,
  `dtAlerta` DATETIME NULL,
  `tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`idAlertaSensor`, `fkDadoTotem`, `fkTotem`),
  INDEX `fk_AlertaSensor_DadoTotem1_idx` (`fkDadoTotem` ASC, `fkTotem` ASC) VISIBLE,
  CONSTRAINT `fk_AlertaSensor_DadoTotem1`
    FOREIGN KEY (`fkDadoTotem` , `fkTotem`)
    REFERENCES `ToodDatabase`.`DadoTotem` (`idDadosTotem` , `fkTotem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`Endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`Endereco` (
  `idEndereco` INT NOT NULL AUTO_INCREMENT,
  `fkEstabelecimento` INT NOT NULL,
  `logradouro` VARCHAR(45) NULL,
  `numero` INT NULL,
  `bairro` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `estado` CHAR(2) NULL,
  PRIMARY KEY (`idEndereco`),
  INDEX `fk_Endereco_Estabelecimento1_idx` (`fkEstabelecimento` ASC) VISIBLE,
  CONSTRAINT `fk_Endereco_Estabelecimento1`
    FOREIGN KEY (`fkEstabelecimento`)
    REFERENCES `ToodDatabase`.`Estabelecimento` (`idEstabelecimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


/*
comando para sql server - banco remoto - ambiente de produção
*/

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
	descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
);

create table aquario (
/* em nossa regra de negócio, um aquario tem apenas um sensor */
	id INT PRIMARY KEY IDENTITY(1,1),
	descricao VARCHAR(300)
);

/* esta tabela deve estar de acordo com o que está em INSERT de sua API do arduino - dat-acqu-ino */

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	dht11_umidade DECIMAL,
	dht11_temperatura DECIMAL,
	luminosidade DECIMAL,
	lm35_temperatura DECIMAL,
	chave TINYINT,
	momento DATETIME,
	fk_aquario INT FOREIGN KEY REFERENCES aquario(id)
);

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';




-------------------------------------------------------------------
CREATE TABLE [dbo].[Empresa] (
  [idEmpresa] INT NOT NULL IDENTITY(1,1),
  [razaoSocial] VARCHAR(45) NULL,
  [nomeFantasia] VARCHAR(45) NULL,
  [cnpj] CHAR(30) NULL,
  [telefone] VARCHAR(13) NULL,
  [responsavel] VARCHAR(45) NULL,
  CONSTRAINT [PK_Empresa] PRIMARY KEY ([idEmpresa])
);

CREATE TABLE [dbo].[Estabelecimento] (
  [idEstabelecimento] INT NOT NULL IDENTITY(1,1),
  [fkEmpresa] INT NOT NULL,
  [nome] VARCHAR(45) NULL,
  [cnpj] VARCHAR(45) NULL,
  [telefone] VARCHAR(45) NULL,
  [responsavel] VARCHAR(45) NULL,
  CONSTRAINT [PK_Estabelecimento] PRIMARY KEY CLUSTERED ([idEstabelecimento] ASC),
  CONSTRAINT [FK_Estabelecimento_Empresa] FOREIGN KEY ([fkEmpresa]) REFERENCES [dbo].[Empresa] ([idEmpresa])
);

CREATE TABLE [dbo].[Totem] (
idTotem INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
fkEstabelecimento INT NOT NULL,
numeroSerial VARCHAR(45) NULL,
processador VARCHAR(45) NULL,
alertaProcessador INT NULL,
ram VARCHAR(45) NULL,
alertaRam INT NULL,
gpu VARCHAR(45) NULL,
alertaGpu INT NULL,
disco VARCHAR(45) NULL,
alertaDisco INT NULL,
CONSTRAINT FK_Totem_Estabelecimento FOREIGN KEY (fkEstabelecimento)
REFERENCES [dbo].[Estabelecimento] ([idEstabelecimento])
ON DELETE CASCADE
ON UPDATE NO ACTION
)

CREATE TABLE [dbo].[DadoTotem] (
  idDadosTotem INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
  fkTotem INT NOT NULL,
  dataHora DATETIME NULL,
  qtdRam VARCHAR(45) NULL,
  qtdDisco VARCHAR(45) NULL,
  qtdProcessador VARCHAR(45) NULL,
  CONSTRAINT fk_dados_sensores
    FOREIGN KEY (fkTotem)
    REFERENCES [dbo].[Totem] ([idTotem])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE [dbo].[Usuario] (
  idUsuario INT NOT NULL IDENTITY(1,1),
  fkEmpresa INT NOT NULL,
  nomeUsuario VARCHAR(45) NULL,
  email VARCHAR(50) NULL,
  senha VARCHAR(16) NULL,
  cargo VARCHAR(20) NULL,
  telefone VARCHAR(45) NULL,
  cpf VARCHAR(45) NULL,
  PRIMARY KEY (idUsuario, fkEmpresa),
  CONSTRAINT fk_Usuario_Empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES [dbo].[Empresa] ([idEmpresa])
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);