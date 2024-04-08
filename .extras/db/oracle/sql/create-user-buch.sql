-- noinspection SqlNoDataSourceInspectionForFile

-- Copyright (C) 2024 - present Juergen Zimmermann, Hochschule Karlsruhe
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version.
--
-- This program is distributed in the hope that it will be useful,
-- but WITHOUT ANY WARRANTY; without even the implied warranty of
-- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
-- GNU General Public License for more details.
--
-- You should have received a copy of the GNU General Public License
-- along with this program. If not, see <https://www.gnu.org/licenses/>.

-- docker compose exec db sqlplus SYS/p@FREEPDB1 as SYSDBA '@/sql/create-user-buch.sql'
-- docker compose exec db sqlplus buch/p@FREEPDB1 '@/sql/create-schema-buch.sql'
-- docker compose exec db sqlplus buch/p@FREEPDB1 '@/sql/create.sql'

-- https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/CREATE-DIRECTORY.html
CREATE DIRECTORY IF NOT EXISTS csv_dir AS '/csv';

-- https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/CREATE-USER.html
-- https://blogs.oracle.com/sql/post/how-to-create-users-grant-them-privileges-and-remove-them-in-oracle-database
CREATE USER IF NOT EXISTS buch IDENTIFIED BY p;

-- https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/GRANT.html
GRANT
  CONNECT,
  CREATE SESSION,
  CREATE TABLE,
  CREATE SEQUENCE,
  DROP ANY TABLE,
  READ ANY TABLE,
  INSERT ANY TABLE,
  UPDATE ANY TABLE,
  DELETE ANY TABLE,
  CREATE ANY INDEX,
  DROP ANY INDEX
TO buch;
GRANT READ, WRITE ON DIRECTORY csv_dir TO buch;
GRANT UNLIMITED TABLESPACE TO buch;

-- Remote-Login zulassen
EXEC DBMS_XDB.SETLISTENERLOCALACCESS(FALSE);

-- https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/CREATE-TABLESPACE.html
-- https://www.carajandb.com/blog/2018/oracle-18-xe-und-multitenant
-- hier: initiale Groesse 10 MB mit 500 KB Extensions
-- dbf = data(base) file, default: im Verzeichnis /opt/oracle/product/18c/dbhomeXE/dbs
-- ALTER SYSTEM SET DB_CREATE_FILE_DEST = '/opt/oracle/tablespace';
-- DROP TABLESPACE buchspace INCLUDING CONTENTS AND DATAFILES;
-- CREATE TABLESPACE buchspace DATAFILE 'buch.dbf' SIZE 10M;

exit
