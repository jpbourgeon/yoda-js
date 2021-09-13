#!/bin/sh

## Update the image
apt-get update && apt-get upgrade

## Github CLI v2.0.0
cd /home/node
wget -nc https://github.com/cli/cli/releases/download/v2.0.0/gh_2.0.0_linux_amd64.deb
dpkg -i gh_2.0.0_linux_amd64.deb

### pnpm
npm install -g npm@7.23.0

### pnpm
npm install -g pnpm@6.7.1

### npm-check, rush, heft
pnpm install --global npm-check @microsoft/rush@5.53.0 @rushstack/heft@0.37.3
