# Usar a imagem node:16.14-alpine como base

FROM node:16.14-alpine
# Mudar para o diretório de trabalho /app-backend

WORKDIR /app-frontend
# Copiar os package.json e package-lock.json para o container

# Instalar as dependências Node
COPY . .

RUN npm install
# Copiar o restante dos arquivos da aplicação para o container

# Sinalize que aplicação expõe a porta 3001

EXPOSE 3000
# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas
ENTRYPOINT [ "npm", "start"]
# Dica: Leia a seção Docker e Docker-compose no README para mais informações