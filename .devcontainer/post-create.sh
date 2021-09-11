#!/bin/sh

## Github CLI v2.0.0
cd /home/node
wget -nc https://github.com/cli/cli/releases/download/v2.0.0/gh_2.0.0_linux_amd64.deb
dpkg -i gh_2.0.0_linux_amd64.deb

### npm, pnpm
npm install -g npm pnpm

### npm-check, rush, heft
pnpm install --global npm-check @microsoft/rush @rushstack/heft
