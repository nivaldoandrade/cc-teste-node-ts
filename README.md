# <p align="center">Creative Code </p>


Criação de uma API básica em typescript com as entidades usuário, token do usuário e endereço. Foi implementado CRUD e relacionamento nas entidades.


## **Configurações Iniciais**

### **Node.js e Yarn**
Realizar a instalação do <a href="https://nodejs.org/en/">node.js</a> e <a href="https://classic.yarnpkg.com/en/">yarn.</a>

Se optar, pode utilizar o **docker** para facilitar a criação do container(PostgreSQL).

### **Instalação do Docker**

Para iniciar a instalação do Docker vamos prosseguir para a seção "Get Started" presente no site da ferramenta <a href="https://www.docker.com/">link.</a>

Com o docker instalado, crie o container do PostgreSQL com o seguinte comando no terminal:

```
docker run --name creative_code -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres

```
**OBS:**
- **Se preferir alterar o nome do container, só alterar o creative_code**;
- **Verificar se a porta 5433 já esta sendo utilizando em outro container, se caso estiver, realizar a alteração no comando. EX: -p 5434:5432**.

### **DBearver ou PostBird**
Utilizando database manager para conectar ao container PostgreSQL e realizar a criação do banco de dados **creative_code**.

Se caso, não optar por utilizar o docker, realize alterações no arquivo ormconfig.json com as informações do banco de dado.

```
#Clonar o repositório
git clone https://github.com/nivaldoandrade/cc-teste-node-ts

# Instalar as dependências
yarn

# Run migrations
yarn typeorm migration:run

# Iniciar a aplicação
yarn dev:start

```

### **.env / ormconfig**
Na raiz do projeto tem o arquivo **.env.example** e **ormconfig.example**. Apagar o o **.example** dos dois arquivo. EX: **.env** e **ormconfig**
- **.env** tem que adicionar uma chave na variável **APP_SECRET**
- **ormconfig** alterar as informações de acordo com seu banco de dados, se caso seguiu a seção de instalação do **docker**, já vai está tudo configurado.

## **Insomnia**
Se optar, utilize o Insomnia para testar as requisições da API. <a href="https://insomnia.rest/download/">Download Insomnia Core.</a>

### **Workspace Insomnia**
Tutorial de como importar Workspace para testes <a href="https://support.insomnia.rest/article/52-importing-and-exporting-data">Importing and Exporting Data.</a><br/>
<a href="https://github.com/nivaldoandrade/cc-teste-node-ts/blob/main/AssetsREADME/Insomnia_create_code.json">Download do Workspace.<a/>

### **Autenticação Insomnia**
Tutorial de como inserir o Bearer token gerado na rota sessions. <a href="https://support.insomnia.rest/article/174-authentication">Authentication - Bearer Token.</a>

## **Rotas da aplicação**

### **Session**:
* POST /sessions: Autenticação do usuário.
  * Corpo da requisição:
  ```JSON
    {
        "email": "jonhdoe@email.com",
        "password": "123456"
    }
  ```
  * Resposta da requisição:
  ```JSON
    {
      "user": {
        "id": "84e2553b-6dc6-428f-bb58-51f202e8c0d0",
        "name": "John Doe",
        "telephone": "119123456784",
        "email": "johndoe@email.com",
        "age": 25,
        "weight": "175.00",
        "ethnicity": "branco",
        "created_at": "2021-03-09T22:09:10.773Z",
        "updated_at": "2021-03-10T18:09:23.207Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTUzOTQwMzIsImV4cCI6MTYxNTQ4MDQzMiwic3ViIjoiODRlMjU1M2ItNmRjNi00MjhmLWJiNTgtNTFmMjAyZThjMGQwIn0.Dd6w7kX_LOr8g9p63YnJ_byy5nfvh0vaCcXsNDzR9fw"
    }
  ```
  **OBS: TODAS AS ROTAS QUE É NECESSÁRIO AUTENTICAÇÃO REALIZE ESSE PROCEDIMENTO: [AUTENTICAÇÃO](#autenticação-insomnia)**

### **User**:

* POST /user: A rota recebe **name, telephone, email, password, age, weight, ethnicity, street, address_number, complement, zip_code, city e state** dentro do corpo da requisição, sendo que o **street, address_number, complement, zip_code, city e state** são opcionais, se caso queira criar o usuário já atrelado ao um endereço.
  -  Impossível a criação de usuário com o e-mail duplicado;
  - **Ethnicity** só aceita os valores **branco | negro | indigena | pardo | amarelo**.

  ```JSON
    {
      "name": "John Doe",
      "telephone": "11912345678",
      "email": "johndoe@email.com",
      "password": "123mudar",
      "age": 30,
      "weight": 180,
      "ethnicity": "indigena",
      "street": "Rua Teste 1",
      "address_number": 1,
      "complement": "Apartamento",
      "zip_code": "12345678",
      "city": "São Carlos",
      "state": "São Paulo"
    }
  ```
* PUT /user: A rota recebe **name, telephone, email, old_password, password, password_confirmation age, weight e ethnicity** dentro do corpo da requisição, sendo que **old_password** corresponde a senha atual e **password / password_confirmation** a senha nova.

  - É necessário o Bearer token de autenticação.
  - **old_password** só é necessário se contém o **password / password_confirmation** no corpo da requisição para atualização de senha;
  -  Impossível atulização do e-mail já sendo utilizado;
  - **Ethnicity** só aceita os valores **branco | negro | indigena | pardo | amarelo**.

  ```JSON
    {
      "name": "John Doe",
      "telephone": "11912345678",
      "email": "johndoe@email.com",
      "old_password": "123mudar",
      "password": "123Mudar",
      "password_confirmation": "123Mudar",
      "age": 25,
      "weight": 175,
      "ethnicity": "branco"
    }
  ```
* GET /user/profile: Essa rota retorna as informações do usuário.

  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

  ```JSON
    {
      "id": "c1463e32-99f4-4d36-8374-0ec983b8922b",
      "name": "John Doe",
      "telephone": "11912345678",
      "email": "johndoe@email.com",
      "age": 25,
      "weight": 175,
      "ethnicity": "branco",
      "created_at": "2021-03-09T14:31:51.784Z",
      "updated_at": "2021-03-09T14:33:05.645Z"
    }
* GET /user: Essa rota retorna as informações do usuário, com todos endereços recuperado através do relacionamento entre as tabelas users e adresses.

  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

  ```JSON
    {
      "id": "c1463e32-99f4-4d36-8374-0ec983b8922b",
      "name": "John Doe",
      "telephone": "11912345678",
      "email": "johndoe@email.com",
      "age": 25,
      "weight": 175,
      "ethnicity": "branco",
      "created_at": "2021-03-09T14:31:51.784Z",
      "updated_at": "2021-03-09T14:33:05.645Z",
      "addresses": [
        {
          "id": "bfe3cf96-0bc4-489f-aa7a-4157813f7f18",
          "street": "Rua Teste 15",
          "address_number": 15,
          "complement": "Apartamento",
          "zip_code": "122345678",
          "city": "São Carlos",
          "state": "São Paulo"
        }
      ]
    }
  ```
* DELETE /user: Essa rota retorna **"User successfully deleted"**, se caso o usuário foi deletado com sucesso.

  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

### **Address**:

* POST /address: A rota recebe **street, address_number, complement, zip_code, city e state** dentro do corpo da requisição

  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

  ```JSON
    {
      "street": "Rua Teste 2",
      "address_number": 2,
      "complement": "Apartamento",
      "zip_code": "12345678",
      "city": "São Carlos",
      "state": "São Paulo"
    }
  ```
* PUT /address: A rota recebe **address_id, street, address_number, complement, zip_code, city e state** dentro do corpo da requisição.

  - É necessário o id(**address_id**) do endereço que vai ser atualizado;
  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

  ```JSON
    {
      "address_id": "1b58cb6e-951d-44a5-b23d-6816f1f50f8a",
      "street": "Rua Teste 3",
      "address_number": 3,
      "complement": "casa",
      "zip_code": "12345678",
      "city": "São Pedro",
      "state": "São Carlos"
    }
  ```
* GET /address: Essa rota retorna todos os endereços do usuário.

  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

  ```JSON
    [
      {
        "id": "bfe3cf96-0bc4-489f-aa7a-4157813f7f18",
        "street": "Rua Teste 1",
        "address_number": 1,
        "complement": "Apartamento",
        "zip_code": "12345678",
        "city": "São Pedro",
        "state": "São Paulo"
      },
      {
        "id": "14051555-ac18-478d-b6f0-7af39f05d7e1",
        "street": "Rua Teste 2",
        "address_number": 2,
        "complement": "Apartamento",
        "zip_code": "12345678",
        "city": "São Carlos",
        "state": "São Paulo"
      },
      {
        "id": "1b58cb6e-951d-44a5-b23d-6816f1f50f8a",
        "street": "Rua Teste 3",
        "address_number": 3,
        "complement": "casa",
        "zip_code": "12345678",
        "city": "São José",
        "state": "São Carlos"
      }
    ]
  ```
* DELETE /address: Essa rota retorna **"Address successfully deleted"**, se caso o endereço foi deletado com sucesso.

  - É necessário o Bearer token de autenticação: [AUTENTICAÇÃO](#autenticação-insomnia).

### **Password**:

* POST /password/forgot: Essa rota envia um email com procedimento de resetar a senha. Só foi configurado o envio de email para teste com o Ethereal, porém o ambiente está preparado para receber qualquer serviço de envio de email.

  - Essa rota salva na tabela **user_tokens** o **token** gerado pelo usuário.
  - Para ambiente de desenvolvimento, foi utilizado o Ethereal. Ele gera um link do corpo email.

  ```JSON
    {
	    "email": "jhondoe@email.com"
    }
  ```
* POST /password/reset: Essa rota recebe **token, password, password_confirmation** no corpo da requisição.

  - O link gerado pela rota de **forgot** contém o **token**.
  - **Token** expira depois de 30 minutos, podendo ser alterado no services **ResetPasswordService**.

  ```JSON
    {
        "token": "50a18668-fa1b-4b6f-841b-2297e9a1afa6",
        "password": "1234567",
        "password_confirmation": "1234567"
    }
  ```

## **Testes**

Foi utilizado o **JEST** para realizar os testes unitário em cima da regra de negócio da aplicação, ou seja, todos os **services** de cada entidade.

```
#Iniciar os testes
yarn test

Esse comando realiza os testes e gera o coverage dentro de ./coverage.
```
Todos os testes estão dentro da pasta modules/**/services/__tests/*.spec.ts.

## **Tecnologias**

 - [Bcryptjs;](https://github.com/dcodeIO/bcrypt.js#readme)
 - [Celebrate;](https://github.com/arb/celebrate#readme)
 - [Class-transformer;](https://github.com/typestack/class-transformer)
 - [Date-fns;](https://date-fns.org/)
 - [Express;](https://expressjs.com/)
 - [Handlebars;](https://handlebarsjs.com/)
 - [Jsonwebtoken;](https://github.com/auth0/node-jsonwebtoken#readme)
 - [Nodemailer;](https://nodemailer.com/about/)
 - [PostgreSQL;](https://www.postgresql.org/)
 - [Tsyringe;](https://github.com/microsoft/tsyringe)
 - [Typeorm;](https://typeorm.io/#/)
 - [Jest;](https://jestjs.io/)
 - [Typescript;](https://www.typescriptlang.org/)
 - [Docker;](https://www.docker.com/)

