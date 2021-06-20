#!/bin/bash

echo "settings server"

echo "Purging Nodejs"
sudo apt purge nodejs -y
sudo apt autoremove -y

echo "install curl"
sudo apt-get install curl -y

echo "install Node JS"
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs -y

echo "install pm2"
sudo npm install pm2 -g

echo "install nginx"
sudo apt install nginx -y

