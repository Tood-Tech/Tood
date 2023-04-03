-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ToodDatabase
-- -----------------------------------------------------

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
  `identificacao` VARCHAR(45) NULL,
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
  `processador` VARCHAR(45) NULL,
  `ram` VARCHAR(45) NULL,
  `gpu` VARCHAR(45) NULL,
  `disco` VARCHAR(45) NULL,
  PRIMARY KEY (`idTotem`, `fkEstabelecimento`),
  INDEX `fk_Totem_Estabelecimento1_idx` (`fkEstabelecimento` ASC) VISIBLE,
  CONSTRAINT `fk_Totem_Estabelecimento1`
    FOREIGN KEY (`fkEstabelecimento`)
    REFERENCES `ToodDatabase`.`Estabelecimento` (`idEstabelecimento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`DadoTotem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`DadoTotem` (
  `idDadosTotem` INT NOT NULL AUTO_INCREMENT,
  `fkTotem` INT NOT NULL,
  `dataHora` DATETIME NULL,
  `statusRam` VARCHAR(45) NULL,
  `statusGpu` VARCHAR(45) NULL,
  `statusDisco` VARCHAR(45) NULL,
  PRIMARY KEY (`idDadosTotem`, `fkTotem`),
  INDEX `fk_dados_sensores_idx` (`fkTotem` ASC) VISIBLE,
  CONSTRAINT `fk_dados_sensores`
    FOREIGN KEY (`fkTotem`)
    REFERENCES `ToodDatabase`.`Totem` (`idTotem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  PRIMARY KEY (`idUsuario`, `fkEmpresa`),
  INDEX `fk_Usuario_Empresa1_idx` (`fkEmpresa` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Empresa1`
    FOREIGN KEY (`fkEmpresa`)
    REFERENCES `ToodDatabase`.`Empresa` (`idEmpresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ToodDatabase`.`AlertaSensor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ToodDatabase`.`AlertaSensor` (
  `idAlertaSensor` INT NOT NULL AUTO_INCREMENT,
  `fkSensor` INT NOT NULL,
  `dtAlerta` DATETIME NULL,
  `tipo` VARCHAR(45) NULL,
  PRIMARY KEY (`idAlertaSensor`, `fkSensor`),
  INDEX `fk_Alerta_has_Sensores_Sensores1_idx` (`fkSensor` ASC) VISIBLE,
  CONSTRAINT `fk_Alerta_has_Sensores_Sensores1`
    FOREIGN KEY (`fkSensor`)
    REFERENCES `ToodDatabase`.`Totem` (`idTotem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
