# Testes automatizados da aplicação bancária

Projeto de testes automatizados com Cypress e JavaScript, criado para mostrar
aos alunos da **Mentoria 2.0** como estruturar e automatizar testes de uma
aplicação Web. Os exemplos cobrem os fluxos de login e transferência bancária,
com Custom Commands para reutilizar ações comuns e relatórios HTML dos
resultados.

## Componentes do projeto

- **Cypress**: executa os testes end-to-end no navegador.
- **Custom Commands**: encapsulam operações reutilizáveis, como fazer login,
  escolher opções de conta e verificar mensagens.
- **Fixtures**: armazenam dados usados nos testes, como as credenciais em
  `cypress/fixtures/credenciais.json`.
- **cypress-mochawesome-reporter**: gera relatórios HTML da execução.
- **Screenshots e vídeos**: registros produzidos pelo Cypress durante a
  execução.

## Pré-requisitos

- Node.js e npm instalados.
- A API [banco-api](https://github.com/juliodelimas/banco-api) em execução.
- A aplicação Web [banco-web](https://github.com/juliodelimas/banco-web) em
  execução.

Os testes dependem tanto da API quanto da aplicação Web. Inicie ambos os
projetos antes de executar a suíte. A URL base configurada para a aplicação Web
é `http://localhost:4000` (`baseUrl` em `cypress.config.js`).

## Instalação

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/marcifs/banco-web-tests.git
cd banco-web-tests
npm ci
```

## Execução

Com a API e a aplicação Web em execução, rode todos os testes em modo headless:

```bash
npm test
```

Para abrir a interface interativa do Cypress:

```bash
npm run cy:open
```

Para executar em modo headed:

```bash
npm run cy:headed
```

O script `test-prod` também está disponível:

```bash
npm run test-prod
```

Atualmente, esse script executa `cypress run` com a mesma configuração padrão
de `npm test`. Para usar outra URL base, passe a configuração diretamente:

```bash
npx cypress run --config baseUrl=https://endereco-da-aplicacao
```

### Relatórios e evidências

O `cypress-mochawesome-reporter` gera o relatório HTML em
`cypress/reports/html/index.html`. O Cypress também salva screenshots em
`cypress/screenshots/` e vídeos em `cypress/videos/`. Esses artefatos são
ignorados pelo Git.

## Testes automatizados

Os testes estão em `cypress/e2e/`:

### Login — `login.cy.js`

- **Login com dados válidos**: autentica com as credenciais válidas da fixture
  e verifica se a seção “Realizar Transferência” é exibida.
- **Login com dados inválidos**: tenta autenticar com credenciais inválidas e
  verifica a mensagem de erro no toast.

### Transferências — `transferencia.cy.js`

- **Transferência válida**: transfere um valor entre contas e verifica a
  mensagem de sucesso.
- **Transferência acima de R$ 5.000,00 sem token**: verifica a mensagem que
  informa a necessidade de autenticação.

Os dados de login usados nesses cenários estão em
`cypress/fixtures/credenciais.json`.

## Custom Commands

Os comandos são carregados por `cypress/support/commands.js`, que importa os
arquivos da pasta `cypress/support/commands/`.

| Comando | Arquivo | Descrição |
| --- | --- | --- |
| `cy.fazerLoginComCredenciaisValidas()` | `login.js` | Lê as credenciais válidas da fixture, preenche usuário e senha e envia o formulário. |
| `cy.fazerLoginComCredenciaisInvalidas()` | `login.js` | Lê as credenciais inválidas da fixture, preenche usuário e senha e envia o formulário. |
| `cy.verificarMensagemNoToast(mensagem)` | `common.js` | Verifica se o toast exibe exatamente a mensagem informada. |
| `cy.selecionarOpcaoNaCombobox(labelDoCampo, opcao)` | `common.js` | Abre a combobox associada ao campo e seleciona a opção informada. |
| `cy.realizarTransferencia(contaOrigem, contaDestino, valor)` | `transferencia.js` | Seleciona as contas, informa o valor e envia a transferência. |

## Estrutura

```text
cypress/
├── e2e/                 # Specs de login e transferência
├── fixtures/            # Dados usados pelos testes
├── reports/             # Relatórios Mochawesome
└── support/
    ├── commands/        # Implementações dos Custom Commands
    ├── commands.js      # Registro dos comandos
    └── e2e.js           # Configuração de suporte e do reporter
cypress.config.js        # Configuração do Cypress
package.json             # Dependências e scripts npm
```
