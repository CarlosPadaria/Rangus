<img src="printrangus.png">

# Rangus

Projeto feito como parte de nota semestral do segundo semestre, no curso de Desenvolvimento de Sistemas do Sesi Senai.
Trata-se de um aplicativo de receitas, feito com React Native(Frontend), Node(Backend) e MySQL(Banco de dados).
Qualquer uso deste projeto deverá ser notificado.

# Requisitos
MySQL Workbench configurado,
  Android Studio configurado,
  React Native configurado,
# Como setar?

Primeiro você deve executar o script.sql(dentro da pasta Backend) pelo MySQL Workbench. Na mesma pasta altere o ormconfig.json, coloque o password como a senha que você colocou no MySQL Workbench, também altere o username pro seu nome de usuário no MySQL Workbench(normalmente já vem como root).
Já na pasta Frontend/src/ altere o baseURL para "https://{seu ip}:3333".

# Como rodar?
com um terminal na pasta Frontend/src escreva o comando "yarn add react-native", depois "yarn run start", com o mesmo terminal(splited) entre no mesmo diretório e escreva "yarn run android"
em agora na pasta Backend/ escreva o comando "yarn dev", aguarde um pouco e o aplicativo estará funcionando.
  
Se após isso aparecer algum erro, rode novamente o "yarn run start" e o "yarn run android".


