DROP DATABASE institucionIIA;
CREATE DATABASE institucionIIA;

CREATE TABLE USERS(
    id int,
    nameUser varchar(50),
    indentification varchar(50),
    rol varchar(50),
    correo varchar(50),
    direccion varchar(50),
    telefono varchar(50),
    acudiente varchar(50),
);

INSERT INTO USERS(id, nameUser, indentification, rol, correo, direccion, telefono, acudiente)
        VALUE(1,"RUTH ELSY", "4234242", "1", "RUT@ELSI.COM", "KR 34 # 75", "343-434-34", "MARTA")

CREATE TABLE ROL(
    id int,
    rol varchar(50),    
);
INSERT INTO ROL(id,rol)
       VALUE(1,"ADMINISTRADOR")     


CREATE TABLE ASIGNATURE(
    id asignature int,
    nameAsignature varchar(50),
    descripcion varchar(50),
);

CREATE TABLE NOTE(
    id note int,
    nameAsignature varchar(50),
    descripcion varchar(50),
);

CREATE TABLE EVENTOS(
    id evento int,
    nameEvento varchar(50),
    descripcion varchar(50),
);