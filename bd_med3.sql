-- Borrado de datos
DROP TABLE rol CASCADE CONSTRAINTS;
DROP TABLE personal CASCADE CONSTRAINTS;
DROP TABLE solicitud CASCADE CONSTRAINTS;
DROP TABLE paciente CASCADE CONSTRAINTS;
DROP TABLE agenda CASCADE CONSTRAINTS;
DROP TABLE sucursal CASCADE CONSTRAINTS;
DROP TABLE comuna CASCADE CONSTRAINTS;
DROP TABLE especialidad CASCADE CONSTRAINTS;
DROP TABLE medico CASCADE CONSTRAINTS;
DROP TABLE atencion CASCADE CONSTRAINTS;
DROP TABLE pago CASCADE CONSTRAINTS;
DROP TABLE boleta CASCADE CONSTRAINTS;
DROP TABLE comision CASCADE CONSTRAINTS;
DROP TABLE tipo_pago CASCADE CONSTRAINTS;

DROP SEQUENCE sq_com;
DROP SEQUENCE sq_suc;
DROP SEQUENCE sq_med;
DROP SEQUENCE sq_age;
DROP SEQUENCE sq_ate;
DROP SEQUENCE sq_pag;
DROP SEQUENCE sq_bol;
DROP SEQUENCE sq_comi;
DROP SEQUENCE sq_esp;
DROP SEQUENCE sq_rol;
DROP SEQUENCE sq_per;
DROP SEQUENCE sq_tipoPago;
DROP SEQUENCE sq_mail;
DROP SEQUENCE sq_soli;

-- Creaci?n de secuencias
CREATE SEQUENCE sq_com START WITH 100; -- comuna
CREATE SEQUENCE sq_suc START WITH 50; -- sucursal
CREATE SEQUENCE sq_med START WITH 1; -- medico
CREATE SEQUENCE sq_age START WITH 2000; -- agenda
CREATE SEQUENCE sq_ate; -- atencion
CREATE SEQUENCE sq_pag; -- pago
CREATE SEQUENCE sq_bol; -- boleta
CREATE SEQUENCE sq_comi; -- comision
CREATE SEQUENCE sq_esp START WITH 200; -- especialidad
CREATE SEQUENCE sq_rol; -- rol
CREATE SEQUENCE sq_per; -- personal
CREATE SEQUENCE sq_mail; -- mail
CREATE SEQUENCE sq_tipoPago; -- tipo_pago
CREATE SEQUENCE sq_soli; -- solicitud

-- Creaci?n de tablas
CREATE TABLE comuna (
    id_comuna NUMBER NOT NULL CONSTRAINT pk_comuna PRIMARY KEY,
    nombre_comuna VARCHAR2(50) NOT NULL
);

CREATE TABLE sucursal (
    id_sucursal NUMBER NOT NULL CONSTRAINT pk_sucursal PRIMARY KEY,
    nombre_sucursal VARCHAR2(100) NOT NULL,
    direccion_sucursal VARCHAR2(100) NOT NULL,
    horariomin_sucursal varchar2(5) not null,
    horariomax_sucursal varchar2(5) not null,
    id_comuna number not null,
    CONSTRAINT fk_sucursal_comuna FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna)
);


CREATE TABLE rol (
    id_rol NUMBER NOT NULL CONSTRAINT pk_rol PRIMARY KEY,
    nombre_rol VARCHAR2(50) NOT NULL
);

CREATE TABLE personal (
    id_personal NUMBER NOT NULL CONSTRAINT pk_personal PRIMARY KEY,
    aPaterno_personal VARCHAR2(50) NOT NULL,
    aMaterno_personal VARCHAR2(50) NOT NULL,
    pNombre_personal VARCHAR2(50) NOT NULL,
    sNombre_personal VARCHAR2(50) NOT NULL,
    correo_personal VARCHAR2(50) NOT NULL,
    password_personal VARCHAR2(50) NOT NULL,
    id_rol NUMBER NOT NULL,
    id_sucursal NUMBER NOT NULL,
    CONSTRAINT fk_personal_rol FOREIGN KEY(id_rol) REFERENCES rol(id_rol),
    constraint fk_personal_sucursal FOREIGN key(id_sucursal) references sucursal(id_sucursal)
);

CREATE TABLE especialidad (
    id_especialidad NUMBER NOT NULL CONSTRAINT pk_especialidad PRIMARY KEY,
    nombre_especialidad VARCHAR2(50) NOT NULL,
    valor_especialidad number not null
);

CREATE TABLE medico (
    id_medico NUMBER NOT NULL CONSTRAINT pk_medico PRIMARY KEY,
    rut_medico NUMBER NOT NULL,
    dv_medico VARCHAR2(1) NOT NULL,
    aPaterno_medico VARCHAR2(50) NOT NULL,
    aMaterno_medico VARCHAR2(50) NOT NULL,
    pNombre_medico VARCHAR2(50) NOT NULL,
    sNombre_medico VARCHAR2(50) NOT NULL,
    correo_medico VARCHAR2(50) NOT NULL,
    password_medico VARCHAR2(50) NOT NULL,
    id_especialidad number not null,
    id_rol NUMBER NOT NULL,
    id_sucursal NUMBER NOT NULL, 
    constraint fk_medico_especialidad foreign key (id_especialidad) references especialidad(id_especialidad),
    constraint fk_medico_rol foreign key(id_rol) references rol(id_rol),
    constraint fk_medico_sucursal foreign key(id_sucursal) references sucursal(id_sucursal)
);

CREATE TABLE paciente (
    rut_paciente NUMBER NOT NULL CONSTRAINT pk_paciente PRIMARY KEY,
    dv_paciente char NOT NULL,
    genero_paciente char NOT NULL,
    aPaterno_paciente VARCHAR2(50) NOT NULL,
    aMaterno_paciente VARCHAR2(50) NOT NULL,
    pNombre_paciente VARCHAR2(50) NOT NULL,
    sNombre_paciente VARCHAR2(50) NOT NULL,
    num_paciente number not null unique,
    fecnac_paciente varchar2(10) NOT NULL, 
    correo_paciente VARCHAR2(50) NOT NULL unique,
    password_paciente VARCHAR2(50) NOT NULL
);

CREATE TABLE solicitud (
    id_solicitud NUMBER NOT NULL CONSTRAINT pk_solicitud PRIMARY KEY,
    tipo_solicitud VARCHAR2(50) NOT NULL,
    mensaje_solicitud VARCHAR2(255) NOT NULL,
    disponibilidad_solicitud char not null,
    estado_solicitud varchar2(20) null,
    fecha_solicitud varchar2(10) not null,
    fecha_cambio varchar2(10) null,
    id_personal NUMBER NULL,
    rut_paciente NUMBER NULL,
    CONSTRAINT fk_solicitud_personal FOREIGN KEY (id_personal) REFERENCES personal(id_personal),
    CONSTRAINT fk_solicitud_paciente FOREIGN KEY (rut_paciente) REFERENCES paciente(rut_paciente)
);

CREATE TABLE agenda (
    id_agenda NUMBER NOT NULL CONSTRAINT pk_agenda PRIMARY KEY,
    fecha_agenda varchar2(10) NOT NULL,
    hora_agenda varchar2(6) NOT NULL,
    disponibilidad_agenda char NOT NULL,
    id_solicitud number null,
    id_medico number not null,
    rut_paciente number null,
    id_sucursal number not null,
    constraint fk_agenda_solicitud foreign key (id_solicitud) references solicitud(id_solicitud),
    constraint fk_agenda_medico foreign key (id_medico) references medico(id_medico),
    constraint fk_agenda_paciente foreign key (rut_paciente) references paciente(rut_paciente),
    constraint fk_agenda_sucursal foreign key (id_sucursal) references sucursal(id_sucursal)
);

CREATE TABLE pago (
    id_pago NUMBER NOT NULL CONSTRAINT pk_pago PRIMARY KEY,
    valor_pago NUMBER NOT NULL,
    impuesto_pago NUMBER NOT NULL,
    estado_pago varchar2(20) null,
    id_agenda number not null,
    constraint fk_pago_agenda foreign key (id_agenda) references agenda(id_agenda)
);

CREATE TABLE atencion (
    id_atencion NUMBER NOT NULL CONSTRAINT pk_atencion PRIMARY KEY,
    atencion_paciente varchar2(25) NOT NULL,
    id_pago number not null,
    id_medico number not null,
    constraint fk_atencion_pago foreign key (id_pago) references pago(id_pago),
    constraint fk_atencion_medico foreign key (id_medico) references medico(id_medico)
);


CREATE TABLE tipo_pago (
    id_tipoPago number not null constraint pk_tipoPago primary key,
    tipo_pago varchar2(150) not null
);

CREATE TABLE boleta (
    num_boleta NUMBER NOT NULL CONSTRAINT pk_boleta PRIMARY KEY,
    valor_boleta NUMBER NOT NULL,
    id_pago number not null,
    id_tipoPago number not null,
    constraint fk_boleta_pago foreign key (id_pago) references pago(id_pago),
    constraint fk_boleta_tipoPago foreign key (id_tipoPago) references tipo_pago(id_tipoPago)
);

CREATE TABLE comision (
    id_comision NUMBER NOT NULL CONSTRAINT pk_comision PRIMARY KEY,
    fecha_comision DATE NOT NULL,
    valor_comision NUMBER NOT NULL,
    id_medico number not null,
    id_atencion number not null,
    constraint fk_comision_medico foreign key (id_medico) references medico(id_medico),
    constraint fk_comision_atencion foreign key (id_atencion) references atencion(id_atencion)
);

-- Inserci?n de datos

INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Las Condes'); -- 100
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Providencia');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Santiago');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'?u?oa');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Vitacura');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'La Reina');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'La Florida');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Maip?');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Lo Barnechea');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Macul');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'San Miguel');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Pe?alol?n');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Puente Alto');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Recoleta');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Estaci?n Central');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'San Bernardo');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Independencia');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'La Cisterna');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Quilicura');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Quinta Normal');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Conchal?');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'San Joaqu?n');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Huechuraba');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'El Bosque');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Cerrillos');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Cerro Navia');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'La Granja');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'La Pintana');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Lo Espejo');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Lo Prado');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Pedro Aguirre Cerda');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Pudahuel');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Renca');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'San Ram?n');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Melipilla');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'San Pedro');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Alhu?');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Mar?a Pinto');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Curacav?');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Talagante');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'El Monte');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Buin');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Paine');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Pe?aflor');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Isla de Maipo');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Colina');
INSERT INTO comuna VALUES (sq_com.NEXTVAL,'Pirque'); -- 146

INSERT INTO sucursal VALUES (sq_suc.NEXTVAL, 'Chanchito Feliz', 'Av. Manuel Montt 1169', '06:00', '21:30',103);
INSERT INTO sucursal VALUES (sq_suc.NEXTVAL, 'Chanchito triste', 'Av. No tengo idea 123', '06:00', '21:30',104);
INSERT INTO sucursal VALUES (sq_suc.NEXTVAL, 'Chanchito molesto', 'Las ciegas 777', '06:00', '21:30',103);
INSERT INTO sucursal VALUES (sq_suc.NEXTVAL, 'Patito feo', 'Texas 6969', '06:00', '21:30',105);

INSERT INTO rol VALUES (sq_rol.NEXTVAL, 'Cajero');
INSERT INTO rol VALUES (sq_rol.NEXTVAL, 'Secretaria');
INSERT INTO rol VALUES (sq_rol.NEXTVAL, 'Medico');

INSERT INTO tipo_pago VALUES(sq_tipopago.NEXTVAL, 'Fonasa');
INSERT INTO tipo_pago VALUES(sq_tipopago.NEXTVAL, 'Isapre');
INSERT INTO tipo_pago VALUES(sq_tipopago.NEXTVAL, 'Efectivo');
INSERT INTO tipo_pago VALUES(sq_tipopago.NEXTVAL, 'Credito');
INSERT INTO tipo_pago VALUES(sq_tipopago.NEXTVAL, 'Debito');
INSERT INTO tipo_pago VALUES(sq_tipopago.NEXTVAL, 'Cheque');

INSERT INTO personal VALUES (sq_per.NEXTVAL, 'APONTE', 'BRAVO', 'VICTOR', 'MAURICIO', lower(substr('VICTOR', 1, 2)||'.'||'APONTE'||'@'||'personal.centrogalenos.cl'), 'zeronotsukaima1', 2, 50);

INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Medicina General', 15000);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Alergolog?a', 59993);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Anestesiolog?a', 23628);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Angiolog?a', 36017);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Cardiolog?a', 25359);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Endocrinolog?a', 32064);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Estomatolog?a', 53326);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Gastroenterolog?a', 16881);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Gen?tica', 34941);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Geriatr?a', 51741);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Hematolog?a', 55875);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Hepatolog?a', 19918);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Infectolog?a', 26831);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Nefrolog?a', 48505);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Neumolog?a', 45446);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Neurolog?a', 28966);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Nutriolog?a', 44999);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Oncolog?a m?dica', 9215);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Oncolog?a radioter?pica', 23374);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Pediatr?a', 44643);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Psiquiatr?a', 37460);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Reumatolog?a', 23523);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Toxicolog?a', 21857);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Dermatolog?a', 34016);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Ginecolog?a', 41560);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Obstetricia', 35896);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Tocolog?a', 28288);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Oftalmolog?a', 40470);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Otorrinolaringolog?a', 59247);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Traumatolog?a', 5642);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Urolog?a', 43279);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Neurocirug?a', 39338);
INSERT INTO especialidad VALUES (sq_esp.NEXTVAL, 'Inmunolog?a', 20906);

INSERT INTO medico VALUES (sq_med.NEXTVAL, 11649964,'0','MARTA','CLOVIS','GALVEZ','CASTRO', lower(substr('MARTA', 1, 2)||'.'||'GALVEZ'||substr('CASTRO', 1,1)||'@'||'centrogalenos.cl'), substr('MARTA', 1,2)||substr('CLOVIS', 1,2)||substr('GALVEZ', 1,2)||substr('CASTRO', 1,2)||to_char(sysdate, 'ddmmyyyy'), 203, 3, 53); -- 1
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12113369,'4','NANCY','RAMON','ROMERO','DIAZ', lower(substr('NANCY', 1, 2)||'.'||'ROMERO'||substr('DIAZ', 1,1)||'@'||'centrogalenos.cl'), substr('NANCY', 1,2)||substr('RAMON', 1,2)||substr('ROMERO', 1,2)||substr('DIAZ', 1,2)||to_char(sysdate, 'ddmmyyyy'), 209, 3, 53); -- 2
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12456905,'1','CANALES','BASTIAS','JORGE','CONCHA', lower(substr('CANALES', 1, 2)||'.'||'JORGE'||substr('CONCHA', 1,1)||'@'||'centrogalenos.cl'), substr('CANALES', 1,2)||substr('BASTIAS', 1,2)||substr('JORGE', 1,2)||substr('CONCHA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 205, 3, 53); -- 3
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12466553,'2','VIDAL','PEREZ','TERESA','CAMARGO', lower(substr('VIDAL', 1, 2)||'.'||'TERESA'||substr('CAMARGO', 1,1)||'@'||'centrogalenos.cl'), substr('VIDAL', 1,2)||substr('PEREZ', 1,2)||substr('TERESA', 1,2)||substr('CAMARGO', 1,2)||to_char(sysdate, 'ddmmyyyy'), 200, 3, 53); -- 4
INSERT INTO medico VALUES (sq_med.NEXTVAL, 11745244,'3','VENEGAS','SOTO','KARINA','ARICA', lower(substr('VENEGAS', 1, 2)||'.'||'KARINA'||substr('ARICA', 1,1)||'@'||'centrogalenos.cl'), substr('VENEGAS', 1,2)||substr('SOTO', 1,2)||substr('KARINA', 1,2)||substr('ARICA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 227, 3, 53); -- 5 
INSERT INTO medico VALUES (sq_med.NEXTVAL, 11999100,'4','CONTRERAS','CASTILLO','CLAUDIO','ISABEL', lower(substr('CONTRERAS', 1, 2)||'.'||'CLAUDIO'||substr('ISABEL', 1,1)||'@'||'centrogalenos.cl'), substr('CONTRERAS', 1,2)||substr('CASTILLO', 1,2)||substr('CLAUDIO', 1,2)||substr('ISABEL', 1,2)||to_char(sysdate, 'ddmmyyyy'), 228, 3, 53); -- 6
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12888868,'5','PAEZ','MACMILLAN','JOSE','CONCHA', lower(substr('PAEZ', 1, 2)||'.'||'JOSE'||substr('CONCHA', 1,1)||'@'||'centrogalenos.cl'), substr('PAEZ', 1,2)||substr('MACMILLAN', 1,2)||substr('JOSE', 1,2)||substr('CONCHA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 213, 3, 53); -- 7
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12811094,'6','MOLINA','GONZALEZ','PAULA','TIMBAL', lower(substr('MOLINA', 1, 2)||'.'||'PAULA'||substr('TIMBAL', 1,1)||'@'||'centrogalenos.cl'), substr('MOLINA', 1,2)||substr('GONZALEZ', 1,2)||substr('PAULA', 1,2)||substr('TIMBAL', 1,2)||to_char(sysdate, 'ddmmyyyy'), 215, 3, 53); -- 8
INSERT INTO medico VALUES (sq_med.NEXTVAL, 14255602,'7','MU?OZ','ROJAS','CARLOTA','TERCEIRA', lower(substr('OZ', 1, 2)||'.'||'CARLOTA'||substr('TERCEIRA', 1,1)||'@'||'centrogalenos.cl'), substr('MU?OZ', 1,2)||substr('ROJAS', 1,2)||substr('CARLOTA', 1,2)||substr('TERCEIRA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 207, 3, 53); -- 9
INSERT INTO medico VALUES (sq_med.NEXTVAL, 11630572,'8','ARAVENA','HERBAGE','GUSTAVO','ARAGON', lower(substr('ARAVENA', 1, 2)||'.'||'GUSTAVO'||substr('ARAGON', 1,1)||'@'||'centrogalenos.cl'), substr('ARAVENA', 1,2)||substr('HERBAGE', 1,2)||substr('GUSTAVO', 1,2)||substr('ARAGON', 1,2)||to_char(sysdate, 'ddmmyyyy'), 203, 3, 53); -- 10
INSERT INTO medico VALUES (sq_med.NEXTVAL, 11636534,'9','ADASME','ZU?IGA','LUIS','LITTLE', lower(substr('ADASME', 1, 2)||'.'||'LUIS'||substr('LITTLE', 1,1)||'@'||'centrogalenos.cl'), substr('ADASME', 1,2)||substr('ZU?IGA', 1,2)||substr('LUIS', 1,2)||substr('LITTLE', 1,2)||to_char(sysdate, 'ddmmyyyy'), 201, 3, 53); -- 11
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12272880,'K','LAPAZ','SEPULVEDA','MARCO','MARINA', lower(substr('LAPAZ', 1, 2)||'.'||'MARCO'||substr('MARINA', 1,1)||'@'||'centrogalenos.cl'), substr('LAPAZ', 1,2)||substr('SEPULVEDA', 1,2)||substr('MARCO', 1,2)||substr('MARINA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 225, 3, 53); -- 12
INSERT INTO medico VALUES (sq_med.NEXTVAL, 11846972,'5','OGAZ','VARAS','MARCO','OVALLE', lower(substr('OGAZ', 1, 2)||'.'||'MARCO'||substr('OVALLE', 1,1)||'@'||'centrogalenos.cl'), substr('OGAZ', 1,2)||substr('VARAS', 1,2)||substr('MARCO', 1,2)||substr('OVALLE', 1,2)||to_char(sysdate, 'ddmmyyyy'), 223, 3, 51); -- 13
INSERT INTO medico VALUES (sq_med.NEXTVAL, 14283083,'6','MONDACA','COLLAO','AUGUSTO','COLON', lower(substr('MONDACA', 1, 2)||'.'||'AUGUSTO'||substr('COLON', 1,1)||'@'||'centrogalenos.cl'), substr('MONDACA', 1,2)||substr('COLLAO', 1,2)||substr('AUGUSTO', 1,2)||substr('COLON', 1,2)||to_char(sysdate, 'ddmmyyyy'), 210, 3, 51); -- 14
INSERT INTO medico VALUES (sq_med.NEXTVAL, 14541837,'7','ALVAREZ','RIVERA','MARCO','HONDURAS', lower(substr('ALVAREZ', 1, 2)||'.'||'MARCO'||substr('HONDURAS', 1,1)||'@'||'centrogalenos.cl'), substr('ALVAREZ', 1,2)||substr('RIVERA', 1,2)||substr('MARCO', 1,2)||substr('HONDURAS', 1,2)||to_char(sysdate, 'ddmmyyyy'), 229, 3, 51); -- 15 
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12482036,'8','OLAVE','CASTILLO','ADRIAN','ELISA', lower(substr('OLAVE', 1, 2)||'.'||'ADRIAN'||substr('ELISA', 1,1)||'@'||'centrogalenos.cl'), substr('OLAVE', 1,2)||substr('CASTILLO', 1,2)||substr('ADRIAN', 1,2)||substr('ELISA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 222, 3, 51); -- 16
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12468081,'9','SANCHEZ','GONZALEZ','PAOLA','OSSA', lower(substr('SANCHEZ', 1, 2)||'.'||'PAOLA'||substr('OSSA', 1,1)||'@'||'centrogalenos.cl'), substr('SANCHEZ', 1,2)||substr('GONZALEZ', 1,2)||substr('PAOLA', 1,2)||substr('OSSA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 212, 3, 51); -- 17
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12260812,'0','RIOS','ZU?IGA','RAFAEL','CASTA?OS', lower(substr('RIOS', 1, 2)||'.'||'RAFAEL'||substr('CASTA?OS', 1,1)||'@'||'centrogalenos.cl'), substr('RIOS', 1,2)||substr('ZU?IGA', 1,2)||substr('RAFAEL', 1,2)||substr('CASTA?OS', 1,2)||to_char(sysdate, 'ddmmyyyy'), 200, 3, 51); -- 18
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12899759,'1','CACERES','JIMENEZ','ERIKA','NAVARINO', lower(substr('CACERES', 1, 2)||'.'||'ERIKA'||substr('NAVARINO', 1,1)||'@'||'centrogalenos.cl'), substr('CACERES', 1,2)||substr('JIMENEZ', 1,2)||substr('ERIKA', 1,2)||substr('NAVARINO', 1,2)||to_char(sysdate, 'ddmmyyyy'), 202, 3, 50); -- 19
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12868553,'2','CHACON','AMAYA','PATRICIA','ERRAZURIZ', lower(substr('CHACON', 1, 2)||'.'||'PATRICIA'||substr('ERRAZURIZ', 1,1)||'@'||'centrogalenos.cl'), substr('CHACON', 1,2)||substr('AMAYA', 1,2)||substr('PATRICIA', 1,2)||substr('ERRAZURIZ', 1,2)||to_char(sysdate, 'ddmmyyyy'), 202, 3, 50); -- 20
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12648200,'3','NARVAEZ','MU?OZ','LUIS','AMBRIOSO', lower(substr('NARVAEZ', 1, 2)||'.'||'LUIS'||substr('AMBRIOSO', 1,1)||'@'||'centrogalenos.cl'), substr('NARVAEZ', 1,2)||substr('MU?OZ', 1,2)||substr('LUIS', 1,2)||substr('AMBRIOSO', 1,2)||to_char(sysdate, 'ddmmyyyy'), 219, 3, 50); -- 21
INSERT INTO medico VALUES (sq_med.NEXTVAL, 11670042,'5','GONGORA','DEVIA','VALESKA','PASAJE', lower(substr('GONGORA', 1, 2)||'.'||'VALESKA'||substr('PASAJE', 1,1)||'@'||'centrogalenos.cl'), substr('GONGORA', 1,2)||substr('DEVIA', 1,2)||substr('VALESKA', 1,2)||substr('PASAJE', 1,2)||to_char(sysdate, 'ddmmyyyy'), 220, 3, 50); -- 22
INSERT INTO medico VALUES (sq_med.NEXTVAL, 12642309,'K','NAVARRO','SANTIBA?EZ','JUAN','SANTA', lower(substr('NAVARRO', 1, 2)||'.'||'JUAN'||substr('SANTA', 1,1)||'@'||'centrogalenos.cl'), substr('NAVARRO', 1,2)||substr('SANTIBA?EZ', 1,2)||substr('JUAN', 1,2)||substr('SANTA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 221, 3, 50); -- 23
INSERT INTO medico VALUES (sq_med.NEXTVAL, 18560875,'5','BARRERA','ONETO','MARIA','CARRERA', lower(substr('BARRERA', 1, 2)||'.'||'MARIA'||substr('CARRERA', 1,1)||'@'||'centrogalenos.cl'), substr('BARRERA', 1,2)||substr('ONETO', 1,2)||substr('MARIA', 1,2)||substr('CARRERA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 207, 3, 50); -- 24
INSERT INTO medico VALUES (sq_med.NEXTVAL, 17963421,'K','RIVAS','MORENO','JUAN','SANTA', lower(substr('RIVAS', 1, 2)||'.'||'JUAN'||substr('SANTA', 1,1)||'@'||'centrogalenos.cl'), substr('RIVAS', 1,2)||substr('MORENO', 1,2)||substr('JUAN', 1,2)||substr('SANTA', 1,2)||to_char(sysdate, 'ddmmyyyy'), 209, 3, 50); -- 25

INSERT INTO paciente VALUES (10639521,'0', 'M', 'UVAL','RIQUELME','MIGUEL','SAN PABLO', '982718405', '20/07/1972','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13074837,'1', 'M', 'AMENGUAL','SALDIAS','CESAR','CODORNICES', '966987936', '13/03/1961','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12251882,'2', 'M', 'MORICE','DONOSO','CLAUDIO','CHACALLUTA', '972615780', '13/03/1961','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (10238830,'3', 'M', 'SOTO','ARMAZAN','JUAN','MORELOS', '918169731', '17/05/1974','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12777063,'4', 'M', 'VILLENA','CAVERO','PABLO','NAVIDAD', '937531297', '12/10/1963','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12467572,'5', 'M', 'RIQUELME','BRIGNARDELLO','MIGUEL','AMERICO', '938516563', '26/07/1985','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12866487,'6', 'F', 'STOLLER','VARGAS','LORENA','BABURIZZA', '993166305', '20/09/1992','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13463138,'7', 'M', 'BRAVO','HENRIQUEZ','PABLO','FLACO', '986406283', '05/12/1992','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (11657132,'8', 'M', 'ACU?A','BARRERA','RONNY','ASTRONOMICO', '983849127', '20/05/1990','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12487147,'9', 'M', 'MARIN','ARAVENA','JUAN','PALMAS', '968799322', '25/02/1981','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12817700,'K', 'F', 'VARGAS','GARAY','CLAUDIA','BELEN', '967329625', '25/05/1986','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (9499044,'5', 'M', 'ROJAS','ACHA','CLAUDIO','LUIS', '917697325', '11/08/1996','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (11996940,'6', 'M', 'ORELLANA','SAAVEDRA','JUAN','MARTA', '997033681', '25/05/1979','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (14558221,'7', 'M', 'PASTEN','JORQUERA','ALAN','BALMACEDA', '967829417', '26/01/1957','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12459100,'8', 'M', 'POBLETE','FUENTES','SERGIO','TINGUIRIRICA', '942274800', '30/10/1965','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (8716085,'9', 'M', 'HORMAZABAL','SAGREDO','HUGO','DORSAL', '972141375', '15/02/1969','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12503185,'0', 'M', 'SILVA','GONZALEZ','PAUL','HOLANDA', '916258931', '17/12/1991','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (10586995,'1', 'M', 'MU?OZ','FERNANDEZ','JOSE','TORRES', '975855824', '23/05/2002','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (11949670,'2', 'M', 'CONTRERAS','MIRANDA','CLAUDIO','VISTA HERMOSA', '9848224457', '28/06/2004','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (9771046,'3', 'M', 'ZAMORANO','ELIZONDO','LUIS','ALAMEDA', '920951435', '24/11/1999','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12095272,'4', 'M', 'ROJAS','RODRIGUEZ','DAMASO','URMENETA', '941710643', '28/02/1982','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (14632410,'5', 'F', 'VILLANUEVA','YEPES','MONICA','GASPAR', '994545106', '24/07/1964','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (15353262,'K', 'M', 'BARRIOS','HIDALGO','LUIS','BALMACEDA', '905133944', '17/02/1995','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (4604866,'0', 'M', 'AGUIRRE','MU?OZ','LUIS','VICHUQUEN', '980751826', '01/02/1979','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (14148957,'1', 'M', 'MARTIN','DONOSO','JUAN','FLORENTINOS', '941705215', '20/09/1975','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12831482,'2', 'M', 'ORELLANA','GARRIDO','PATRICIO','GUAITECAS', '900923228', '14/08/1975','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12186256,'3', 'M', 'FUENTES','MORENO','MANUEL','HANOI', '945920102', '23/08/1985','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (11976208,'4', 'F', 'OPAZO','AGUILERA','MARIA','TILOS', '961331962', '04/12/1974','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12998853,'5', 'M', 'TRINKE','TRINKE','CRISTIAN','MANCO', '965657989', '26/01/1994','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12947165,'6', 'F', 'HISI','DIAZ','ROSA','INES', '982075185', '22/04/1971','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13043565,'7', 'M', 'AGUILERA','ROMAN','WILLIBALDO','ANDES', '989304731', '09/08/1985','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13072743,'8', 'M', 'ORELLANA','SERQUEIRA','JAIME','ABRIL', '942479230', '19/06/1997','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (16960649,'9', 'F', 'RIQUELME','CHAVEZ','ROCIO','BALMACEDA', '998917707', '15/06/2003','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12468646,'K', 'M', 'ALVAREZ','MU?OZ','MANUEL','EDUARDO', '933573047', '07/07/1974','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12656375,'5', 'M', 'SALDIAS','ROJAS','DAVID','TURISTAS', '996334257', '01/05/1968','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (11635470,'6', 'M', 'RAMIREZ','GUTIERREZ','JOEL','BELLA', '982874654', '19/10/1961','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (14415848,'7', 'M', 'MACHUCA','ADONIS','MIGUEL','JAZMINES', '918365770', '09/04/1993','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12241168,'8', 'M', 'RAMIREZ','GUTIERREZ','RODRIGO','RENNI', '913647073', '07/09/2002','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (9798044,'9', 'M', 'MALTRAIN','CORTES','JUAN','PINZA', '936223799', '15/12/1982','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12832359,'0', 'M', 'SALAS','TORO','CARLOS','LLEUQUE', '992139716', '05/11/1979','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12302426,'1', 'M', 'ALVARADO','ARAUNA','ALEX','CHONCHI', '930170600', '02/11/1958','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12859931,'2', 'M', 'CESPEDES','LANDEROS','CRISTIAN','BAUTISTA', '927886744', '12/09/1981','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12467533,'3', 'M', 'HERNANDEZ','DIAZ','JUAN','SALCEDO', '999832826', '22/03/1982','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12470801,'4', 'F', 'SANCHEZ','RIVERA','JACQUELINE','CERDA', '964671642', '14/06/1970','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13035746,'5', 'M', 'LARA','LECAROS','DANIEL','FRANCISCO', '910699363', '04/03/1980','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12866998,'K', 'M', 'AVILA','RETAMALES','CRISTIAN','TURMALINA', '927111404', '31/07/1958','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (11872936,'0', 'M', 'VIDAL','OSSES','LUIS','IMPERIAL', '907565739', '28/08/1981','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (14526736,'1', 'F', 'VALENZUELA','MONTOYA','ROSA','GENARO', '970149076', '20/10/1957','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (9964101,'2', 'F', 'MENESES','RUBIO','CARLOS','MARTA', '986308448', '26/12/1989','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12495120,'3', 'M', 'RUIZ','BRIONES','CRISTIAN','FREIRINA', '999246729', '17/06/1964','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13050707,'4', 'M', 'VALLE','CASTRIZELO','FREDY','PALERMO', '920729087', '30/08/1969','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12459400,'6', 'M', 'PICHIHUINCA','JORQUERA','RAFAEL','INGENIERO', '990022570', '23/08/2001','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12649413,'7', 'F', 'MANZANO','QUINTANILLA','JESSICA','MINERALE', '910992801', '30/09/1999','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12610458,'8', 'F', 'BARTLAU','VARGAS','MACARENA','MARIA', '961428070', '01/04/1983','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12364085,'9', 'M', 'ARAYA','CAMUS','FREDDY','CARRERA', '921424681', '19/04/1976','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12460769,'K', 'M', 'DAZA','GUERRERO','ERIC','HERRERA', '908698988', '12/07/1971','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (13072796,'5', 'F', 'MEDINA','CAMUS','WANDA','ICTINOS', '906658455', '12/03/1964','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
INSERT INTO paciente VALUES (12649650,'6', 'M', 'CUADRA','DISSI','DIEGO','OLGA', '997949308', '26/07/1957','correodeprueba' || sq_mail.NEXTVAL || '@gmail.com', 'password');
insert into paciente values (21729527, '0', 'M', 'APONTE', 'BRAVO', 'VICTOR', 'MAURICIO', '952325783', '11/07/1999', 'correo@correo.com', '123456789');

INSERT INTO agenda VALUES (sq_age.NEXTVAL, '28-09-2022', '09:45', 'N', null, 1,  21729527, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '30-09-2022', '16:00', 'N', null, 4,  21729527, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '25-09-2022', '16:15', 'N', null, 6,  21729527, 50);

INSERT INTO solicitud VALUES(sq_soli.nextval, 'Urgente', 'Necesito con urgencia una hora a cardiologia. He buscado por todos lados y ésta es mi única opción', 'Y', null, '20-11-2022', null, null, 12610458);
INSERT INTO solicitud VALUES(sq_soli.nextval, 'Urgente', 'Necesito con urgencia una hora a traumatologia. Se me cae una pierna', 'Y', null, '19-11-2022', null, null, 12364085);
INSERT INTO solicitud VALUES(sq_soli.nextval, 'Urgente', 'Necesito con urgencia una hora a Ginecologia. Tengo una infección que incluso el olor me traspasa la ropa interior', 'Y', null, '20-11-2022', null, null, 12460769);
INSERT INTO solicitud VALUES(sq_soli.nextval, 'Agendar hora', 'Necesito una hora a medicina general con cualquier medico y cualquier fecha', 'Y', null, '17-11-2022', null, null, 13072796);
INSERT INTO solicitud VALUES(sq_soli.nextval, 'Agendar hora', 'Necesito una hora a medicina general con cualquier medico y cualquier fecha', 'Y', null, '15-11-2022', null, null, 12649650);

INSERT INTO agenda VALUES (sq_age.NEXTVAL, '28-09-2022', '06:00', 'Y',null, 1,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '30-09-2022', '06:15', 'Y',null, 4,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '25-09-2022', '06:30', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '22-09-2022', '06:45', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '21-09-2022', '07:00', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '12-09-2022', '07:15', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '29-09-2022', '07:30', 'Y',null, 14, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '10-09-2022', '07:45', 'Y',null, 23, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '04-09-2022', '08:15', 'Y',null, 11, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '02-09-2022', '08:30', 'Y',null, 14, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '13-09-2022', '09:00', 'Y',null, 14, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '10-09-2022', '09:15', 'Y',null, 17, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '20-09-2022', '09:30', 'Y',null, 10, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '05-09-2022', '10:00', 'Y',null, 9,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '06-09-2022', '10:15', 'Y',null, 1,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '09-09-2022', '10:30', 'Y',null, 19, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '20-09-2022', '10:45', 'Y',null, 15, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '31-09-2022', '11:00', 'Y',null, 8,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '20-09-2022', '11:15', 'Y',null, 13, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '11-09-2022', '11:30', 'Y',null, 24, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '13-09-2022', '11:45', 'Y',null, 15, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '16-09-2022', '12:00', 'Y',null, 9,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '18-09-2022', '12:15', 'Y',null, 3,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '19-09-2022', '12:30', 'Y',null,14 , null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '23-09-2022', '12:45', 'Y',null, 21, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '02-09-2022', '13:00', 'Y',null, 3,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '01-09-2022', '13:15', 'Y',null, 7,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '16-09-2022', '13:30', 'Y',null, 15, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '11-09-2022', '13:45', 'Y',null, 7,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '10-09-2022', '14:00', 'Y',null, 23, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '11-09-2022', '14:15', 'Y',null, 9,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '16-09-2022', '14:30', 'Y',null, 18, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '13-09-2022', '15:00', 'Y',null, 18, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '23-09-2022', '15:15', 'Y',null, 1,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '15-09-2022', '15:30', 'Y',null, 18, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '26-09-2022', '15:45', 'Y',null, 23, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '20-09-2022', '16:00', 'Y',null, 16, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '02-09-2022', '16:15', 'Y',null, 16, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '01-09-2022', '16:45', 'Y',null, 7,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '15-09-2022', '17:00', 'Y',null, 17, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '19-09-2022', '17:15', 'Y',null, 17, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '28-09-2022', '17:30', 'Y',null, 3,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '17-09-2022', '17:45', 'Y',null, 19, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '27-09-2022', '18:15', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '26-09-2022', '18:30', 'Y',null, 4,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '02-09-2022', '18:45', 'Y',null, 19, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '06-09-2022', '19:00', 'Y',null, 11, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '08-09-2022', '19:15', 'Y',null, 3,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '06-09-2022', '19:30', 'Y',null, 24, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '12-09-2022', '20:00', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '11-09-2022', '20:30', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '03-09-2022', '20:45', 'Y',null, 6,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '03-09-2022', '21:15', 'Y',null, 7,  null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '25-09-2022', '21:30', 'Y',null, 21, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '24-09-2022', '21:45', 'Y',null, 10, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '23-09-2022', '22:00', 'Y',null, 12, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '26-09-2022', '22:15', 'Y',null, 12, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '25-09-2022', '22:45', 'Y',null, 14, null, 50);
INSERT INTO agenda VALUES (sq_age.NEXTVAL, '11-09-2022', '23:00', 'Y',null, 25, null, 50);

-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2000);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2001);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2002);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2003);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2004);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2005);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2006);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2007);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2008);
-- INSERT INTO pago VALUES (sq_pag.NEXTVAL, 10000, 10000*0.19, 2009);

-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 1, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 2, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 3, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 4, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 5, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 6, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 7, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 8, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 9, 5);
-- INSERT INTO atencion VALUES (sq_ate.NEXTVAL,'Especialista', 10, 5);

-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 1, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 2, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 3, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 4, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 5, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 6, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 7, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 8, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 9, 3);
-- INSERT INTO boleta VALUES (sq_bol.NEXTVAL, 11900, 10, 3);

-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 1, 1);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 4, 2);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 6, 3);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 6, 4);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 6, 5);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 6, 6);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 14, 7);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 23, 8);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 11, 9);
-- INSERT INTO comision VALUES (sq_comi.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, 14, 10);

commit;
/

-- Trigger
DROP TRIGGER tr_comision;
CREATE OR REPLACE TRIGGER tr_comision AFTER INSERT OR DELETE OR UPDATE OF id_medico, id_atencion ON atencion FOR EACH ROW
DECLARE
BEGIN
    IF inserting THEN
        INSERT INTO comision VALUES(sq_com.NEXTVAL, to_char(sysdate, 'dd-mm-yyyy'), 3000, :new.id_medico, :new.id_atencion);
    END IF;
END tr_comision;
/
