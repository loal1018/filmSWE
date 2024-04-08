# Copyright (C) 2024 -  Juergen Zimmermann, Hochschule Karlsruhe
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

# https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7

# Aufruf:   .\generate-load.ps1 [ingress]

# ggf. vorher:  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# oder:         Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser

Set-StrictMode -Version Latest

$versionMinimum = [Version]'7.5.0'
$versionCurrent = $PSVersionTable.PSVersion
if ($versionMinimum -gt $versionCurrent) {
  throw "PowerShell $versionMinimum statt $versionCurrent erforderlich"
}

# Titel setzen
$host.ui.RawUI.WindowTitle = 'generate-load'

$ProgressPreference = 'SilentlyContinue'
for ($index = 1; ; $index++) {
  switch ($index) {
    { $_ % 2 -eq 0 } {
      $id = 20
    }
    { $_ % 3 -eq 0 } {
      $id = 30
    }
    { $_ % 5 -eq 0 } {
      $id = 40
    }
    { $_ % 7 -eq 0 } {
      $id = 50
    }
    default {
      $id = 1
    }
  }


  Write-Output "id=$id"
  $url = "https`://localhost`:3000/rest/$id"
  #$url = "http`://localhost`:3000/rest/$id"

  Invoke-WebRequest $url `
    -Headers @{Accept = 'application/hal+json' } -SkipHeaderValidation `
    -SslProtocol Tls13 -SkipCertificateCheck  | Out-Null # DevSkim: ignore DS440000

  Start-Sleep -Seconds 0.3
}
