# Curso Online EAD (Plataforma Frontend)

Bem-vindo ao repositório frontend da plataforma **Curso Online EAD**. Este projeto foi desenvolvido em **Angular** e serve como a interface principal de aprendizado e gestão educacional, com áreas dedicadas para Alunos, Instrutores/Facilitadores e equipe de Bem-estar.

## 🚀 Funcionalidades

A plataforma oferece uma variedade de recursos para apoiar o ecossistema educacional:

- **Área do Aluno (Participante):**
  - Visualização de trilhas de aprendizado e módulos (Aulas em vídeo).
  - Acompanhamento do Cronograma diário/semanal de aulas.
  - Entrega de Exercícios e atividades obrigatórias.
  - Barômetro diário (avaliação de humor/aprendizado).
  - Acesso a links úteis e Links do Zoom para aulas síncronas.
  - Visualização de Avisos.
  - Criação de Currículo (dados pessoais, educação, idiomas, portfólio).

- **Área do Instrutor / Facilitador:**
  - Liberação de Aulas e Módulos para as turmas.
  - Criação e gerenciamento de Exercícios.
  - Gerenciamento de Links do Zoom (fixos ou por sessão).
  - Configuração do Cronograma (via cadastro unitário ou importação em massa com Excel).
  - Publicação de Avisos para os alunos.
  - Acesso a Relatórios de entrega de exercícios e barômetro.

- **Área de Bem-estar:**
  - Acompanhamento de formulários e solicitações de bem-estar.
  - Geração de relatórios de saúde e engajamento das turmas (Barômetro).

- **Fórum de Dúvidas:** Espaço para interação entre alunos e instrutores.

## 🛠 Tecnologias Utilizadas

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) versão 9.0.7.

As principais dependências incluem:
- **Angular:** 9.0.7
- **Bootstrap:** 4.1.3 (Para estrutura de UI e responsividade)
- **FullCalendar:** (Integração de calendário para cronogramas)
- **SweetAlert2:** (Alertas e modais elegantes)
- **FontAwesome:** (Ícones vetorizados)
- **XLSX & File-saver:** (Importação/Exportação de relatórios e cronogramas)

## 🔧 Pré-requisitos

Para rodar este projeto localmente, você precisará ter instalado na sua máquina:
- **Node.js** (Recomendado versão 12.x ou compatível com Angular 9)
- **NPM** (Gerenciador de pacotes do Node)
- **Angular CLI** globalmente (`npm install -g @angular/cli@9`)

## ⚙️ Instalação e Execução

1. Clone o repositório para a sua máquina local.
2. Acesse o diretório do projeto:
   ```bash
   cd CursoOnlineEad
   ```
3. Instale as dependências do projeto:
   ```bash
   npm install
   ```
   *Nota: Caso enfrente problemas com dependências legadas no Node mais recente, você pode precisar usar `npm install --legacy-peer-deps` ou setar a variável de ambiente `NODE_OPTIONS=--openssl-legacy-provider`.*

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   Ou através do Angular CLI diretamente:
   ```bash
   ng serve
   ```
5. Abra o navegador e acesse `http://localhost:4200/`. A aplicação será recarregada automaticamente caso você altere algum dos arquivos de origem.

## 📦 Build para Produção

Para compilar o projeto para produção, execute:
```bash
npm run build
```
Os artefatos de compilação serão armazenados no diretório `dist/`.

## 📚 Documentação do Código

O projeto conta com documentação gerada pelo **Compodoc**. Para visualizar:

1. Gere e sirva a documentação executando:
   ```bash
   npm run compodoc
   ```
2. A documentação ficará disponível em `http://localhost:4400/`.

## 🧪 Testes

- **Testes Unitários:** Execute `ng test` para rodar os testes unitários via [Karma](https://karma-runner.github.io).
- **Testes End-to-End:** Execute `ng e2e` para rodar os testes end-to-end via [Protractor](http://www.protractortest.org/).

---

*Desenvolvido para revolucionar o aprendizado online.*
