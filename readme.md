## Laravel 5.4 simple ajax implementation

Simples implementação de Laravel 5.4 com Ajax

**Autor**: Marcelo Barros da Silva

**Resume**: https://marcelobdsilva.github.io


### Requisitos da aplicação

T1. Crie uma tela para cadastrar um clube de futebol.
   > Esta tela deve conter somente o campo "Nome do clube".

T2. Crie uma tela para listar os clubes cadastrados.
   > Essa tela deve ser capaz de excluir o clube cadastrado.

T3. Crie uma tela para cadastrar um sócio.
   > Esta tela deve conter o campo "Nome completo" e o campo "Clube" 
para a associação deste sócio. Os clubes são os cadastrados no passo T1.
   > O sócio poderá estar associado a mais de um clube.

T4. Crie uma tela para listar os sócios criados.
   > Esta listagem deve constar todos os sócios cadastrados e constar o 
clube na qual o sócio está associado.
   > Essa tela deve ser capaz de excluir o sócio.
 
 
### Desenvolvimento
 
 **Recursos utilizados**
 
 - Laravel 5.4
 
 - PHP 7.0
 
 - Admin Template [gurayyarar/AdminBSBMaterialDesign](https://github.com/gurayyarar/AdminBSBMaterialDesign)
 
 - [Axios](https://github.com/mzabriskie/axios) HTTP client
 
 - [Laravel Collective](https://laravelcollective.com/docs/5.4/html)
 
 - [DataTables](https://datatables.net)
 
### Instalação
 
1 - Clonar o repositório e instalar as dependências ([Composer](https://getcomposer.org/download) é necessário)

```
git clone https://github.com/marcelobdsilva/laravel-ajax-sample
cd ./laravel-ajax-sample
composer install
```
 
2 - Criar arquivo de configurações .env

```
cp .env.example .env
```
 
3 - Criar chave da aplicação

```
php artisan key:generate
```
 
4 - Criar banco de dados e inserir informações no arquivo de configuração .env, como no exemplo abaixo
 
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=clubs
DB_USERNAME=postgres
DB_PASSWORD=root
```
 
5 - Carregar dados no banco

```
php artisan migrate
```

6 - Iniciar o servidor interno do Laravel
 
```
php artisan serve
```
 
7 - Acessar [http://localhost:8000](http://localhost:8000) para ver a aplicação rodando
 
 ![screenshot.png](https://github.com/marcelobdsilva/laravel-ajax-sample/blob/master/public/images/screenshot.png?raw=true)
