# syntax=docker/dockerfile:1.7.0

# Copyright (C) 2022 - present Juergen Zimmermann, Hochschule Karlsruhe
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

# Aufruf:   docker build --tag juergenzimmermann/jenkins:2024.04.0 .
#           Get-Content Dockerfile | docker run --rm --interactive hadolint/hadolint:2.12.1-beta-debian
#           docker compose exec jenkins bash
#               cat /etc/os-release
#                   ID=debian
#                   VERSION="12 (bookworm)"

# https://www.jenkins.io/doc/tutorials/build-a-node-js-and-react-app-with-npm
# https://www.jenkins.io/doc/book/installing/docker
# https://manpages.debian.org/bullseye/apt/apt-get.8.en.html

ARG JENKINS_VERSION=2.450-jdk21

FROM jenkins/jenkins:${JENKINS_VERSION}

USER root

RUN <<EOF
set -ex

apt-get update --yes
apt-get upgrade --yes

# https://packages.debian.org/bookworm/lsb-release
apt-get install --no-install-recommends --yes --show-progress lsb-release=12.0-1

# GPG-Schluessel fuer Docker hinzufuegen
curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc https://download.docker.com/linux/debian/gpg

# Docker-Repository hinzufuegen
# https://docs.docker.com/engine/install/debian
# https://www.howtoforge.de/anleitung/so-installierst-du-docker-unter-debian-11
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.asc] https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

# https://docs.docker.com/engine/install/debian/#install-from-a-package
# https://download.docker.com/linux/debian/dists/bookworm/pool/stable/amd64
# dpkg -l
# apt-cache policy docker-ce-cli
apt-get update --yes
apt-get install --no-install-recommends --yes --show-progress docker-ce-cli=5:24.0.5-1~debian.12~bookworm
apt-get upgrade --yes

# https://unix.stackexchange.com/questions/217369/clear-apt-get-list
apt-get autoremove --yes
apt-get clean
rm -rf /var/lib/apt/lists/*
EOF

USER jenkins
# https://plugins.jenkins.io/blueocean
# https://plugins.jenkins.io/docker-workflow
RUN jenkins-plugin-cli --plugins "blueocean:1.27.11 docker-workflow:572.v950f58993843"
