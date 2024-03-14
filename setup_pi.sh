sudo apt update -y
sudo apt full-upgrade -y
sudo apt install postgresql -y

sudo apt-get dist-upgrade -y
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt install git -y
sudo apt install vim -y

sudo su postgres
createuser pi -P --interactive
psql
CREATE DATABASE pi;
exit
exit


ssh-keygen -t ed25519 