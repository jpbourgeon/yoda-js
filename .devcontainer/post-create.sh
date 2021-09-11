#!/bin/sh

## Github CLI v1.12.1
cd /home/node
wget -nc https://github.com/cli/cli/releases/download/v1.12.1/gh_1.12.1_linux_amd64.deb
dpkg -i gh_1.12.1_linux_amd64.deb

### npm, pnpm
npm install -g npm pnpm

### npm-check, rush, heft
pnpm install --global npm-check @microsoft/rush @microsoft/heft