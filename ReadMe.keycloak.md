# Hinweise zu Keycloak als "Identity Management and Access" System

<!--
  Copyright (C) 2024 - present Juergen Zimmermann, Hochschule Karlsruhe

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
-->

[Juergen Zimmermann](mailto:Juergen.Zimmermann@h-ka.de)

> Diese Datei ist in Markdown geschrieben und kann mit `<Strg><Shift>v` in
> VS Code leicht gelesen werden.

## Inhalt

- [Installation](#installation)
- [Konfiguration](#konfiguration)
- [Initial Access Token](#initial-access-token)
- [Inspektion der H2-Datenbank](#inspektion-der-h2-datenbank)

## Installation

_Keycloak_ wird als Docker Container gestartet:

```powershell
    cd .extras\compose\keycloak
    docker compose up
```

Im Verzeichnis `.extras\compose\keycloak` in der Datei `.env` sind Benutzername
und Passwort für die Administrationskonsole (s.u.) von Keycloak konfiguriert,
und zwar Benutzername `admin` und Passwort `p`.

Außerdem sind die Umgebungsvariablen für die beiden Dateien für den privatem
Schlüssel und das Zertifikat gesetzt, so dass Keycloak wahlweise über
`http://localhost:8080` oder `https://localhost:8443` aufgerufen werden kann.

## Konfiguration

Nachdem Keycloak als Container gestartet ist, sind folgende umfangreiche
Konfigurationsschritte _sorgfältig_ durchzuführen, nachdem man in einem
Webbrowser `http://localhost:8080` oder `https://localhost:8443` aufgerufen hat:

```text
    "Administration Console" anklicken
        Username    admin
        Password    p
            siehe .env in .extras\compose\keycloak

    Realm "master" ist voreingestellt
        Drop-Down Menü: <Create realm> anklicken
            Realm name      acme
            <Create> anklicken
    Menüpunkt "Realm settings"
        Tab "Sessions"
            # Refresh Token: siehe https://stackoverflow.com/questions/52040265/how-to-specify-refresh-tokens-lifespan-in-keycloak
            SSO Session Idle                                60 Minutes
            <Save> anklicken
        Tab "Tokens"
            Access Tokens
                Access Token Lifespan                       30 Minutes
                Access Token Lifespan For Implicit Flow     30 Minutes
                <Save> anklicken

    Menüpunkt "Clients"
        <Create client> anklicken
        Client ID   buch-client
        <Next>
            "Capability config"
                Client authentication       On
        <Next>
            Root URL                https://localhost:3000
            Valid redirect URIs     https://localhost:3000
                                    https://buch:3000
                                    https://oauth.pstmn.io/v1/callback
        <Save>

        buch-client
            Tab "Roles"
                <Create Role> anklicken
                Role name       admin
                <Save> anklicken
                <Create Role> anklicken
                Role name       user
                <Save> anklicken
            Breadcrumb "Clients" anklicken
                Tab "Initial access token"
                    <Create> anklicken
                        Eine hinreichend lange Zeitdauer verwenden

    # https://www.keycloak.org/docs/latest/server_admin/index.html#assigning-permissions-using-roles-and-groups
    Menüpunkt "Realm roles"
        <Create role> anklicken
            Role name       buch-admin
            <Save> anklicken
        Breadcrumb "Realm roles" anklicken
            "buch-admin" anklicken
                Drop-down Menü "Action" (in der rechten oberen Ecke):  "Add associated roles" auswählen
                "Filter by clients"       auswählen und anklicken
                "buch-client admin"       Haken setzen
                <Assign> anklicken
        Breadcrumb "Realm roles" anklicken
        <Create role> anklicken
            Role name       buch-user
            <Save>
        Breadcrumb "Realm roles" anklicken
            "buch-user" anklicken
                Drop-down Menü "Action" (in der rechten oberen Ecke):  "Add associated roles" auswählen
                "Filter by clients"       auswählen und anklicken
                "buch-client user"        Haken setzen
                <Assign> anklicken
            WICHTIG: "buch-admin" und "buch-user" haben in der Spalte "Composite" den Wert "True"

    Menüpunkt "Users"
        <Add user>
            Required User Actions:      Überprüfen, dass nichts ausgewählt ist
            Username                    admin
            Email                       admin@acme.com
            <Create> anklicken
            Tab "Credentials"
                <Set password> anklicken
                    "p" eingeben und wiederholen
                    "Temporary" auf "Off" setzen
                    <Save> anklicken
                    <Save password> anklicken
            Tab "Role Mapping"
                <Assign Role> anklicken
                    "Filter by clients" auswählen
                        "buch-client admin"     Haken setzen     (ggf. blättern)
                        <Assign> anklicken
            Tab "Details"
                Required user actions       Überprüfen, dass nichts ausgewählt ist
                <Save> anklicken
        <Add user>
            Required User Actions:      Überprüfen, dass nichts ausgewählt ist
            Username                    user
            Email                       user@acme.com
            <Create> anklicken
            Tab "Credentials"
                <Set password> anklicken
                    "p" eingeben und wiederholen
                    "Temporary" auf "Off" setzen
                    <Save> anklicken
                    <Save password> anklicken
            Tab "Role Mapping"
                <Assign Role> anklicken
                    "Filter by clients" auswählen
                        "buch-client user"     Haken setzen     (ggf. blättern)
                        <Assign> anklicken
            Tab "Details"
                Required user actions       Überprüfen, dass nichts ausgewählt ist
                <Save> anklicken
        Breadcrumb "Users" anklicken
            WICHTIG: "admin" und "user" mit der jeweiligen Emailadresse sind aufgelistet
```

## Client Secret

Im Wurzelverzeichnis des Projekts in der Datei `.env` muss man die
Umgebungsvariable `CLIENT_SECRET` auf folgenden Wert aus _Keycloak_ setzen:

- Menüpunkt `Clients`
- `buch-client` aus der Liste beim voreingestellten Tab `Clients list` auswählen
- Tab `Credentials` anklicken
- Die Zeichenkette beim Label `Client Secret` kopieren und in der Datei `.env`
  bei der Umgebungsvariablen `CLIENT_SECRET` als Wert eintragen.

## Initial Access Token

Ein _Initial Access Token_ für z.B. _Postman_ wurde bei der obigen Konfiguration
für _Keycloak_ folgendermaßen erzeugt:

- Menüpunkt `Clients`
- Tab `Initial access token` anklicken
- Button `Create` anklicken und eine hinreichend lange Gültigkeitsdauer einstellen.

## Inspektion der H2-Datenbank

Im Development-Modus verwaltet Keycloak seine Daten in einer H2-Datenbank. Um
die _H2 Console_ als DB-Browser zu starten, lädt man zunächst die JAR-Datei
von `https://repo.maven.apache.org/maven2/com/h2database/h2/2.2.224/h2-2.2.224.jar`.
herunter und speichert sie z.B. im Verzeichnis `.extras\compose\keycloak`.

Mit dem Kommando `java -jar h2-2.2.224.jar` startet man nun die H2 Console, wobei
ein Webbrowser gestartet wird. Dort gibt man folgende Werte ein:

- JDBC URL: `jdbc:h2:tcp://localhost/C:/Zimmermann/volumes/keycloak/h2/keycloakdb`
- Benutzername: `sa`
- Passwort: `password`

Danach kann man z.B. die Tabellen `USER_ENTITY` und `USER_ROLE_MAPPING` inspizieren.

**VORSICHT: AUF KEINEN FALL IRGENDEINE TABELLE EDITIEREN, WEIL MAN SONST
KEYCLOAK NEU AUFSETZEN MUSS!**
