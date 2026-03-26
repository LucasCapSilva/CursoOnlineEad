const fs = require('fs');

const docPath = '/Users/user/Desktop/cursoonline-angular-master/plataformafrontend-dotnet/documentation/responsividade-tecnica.md';
let content = fs.readFileSync(docPath, 'utf8');

const additionalNotes = `
- **Auditoria Final de Iframes e Vídeos**:
  - Utilizado o utilitário nativo do Bootstrap 4 \`.embed-responsive\` e \`.embed-responsive-16by9\` nos iframes do componente de \`soft\` (módulos soft skills) e \`sobre-nos\`, substituindo atributos fixos de \`height\` e \`width\` para manter a proporção exata em todos os dispositivos, evitando distorções.

- **Auditoria Final de Tabelas**:
  - Script automatizado aplicou a div \`.table-responsive\` em torno de todos os elementos \`<table class="table">\` ausentes em 14 componentes adicionais (como \`chamada\`, \`criar-exercicio\`, \`relatorio-barometro\`, \`relatorio-entrega-exercicio\`, etc), assegurando que o scroll horizontal seja habilitado globalmente na aplicação em telas menores.

- **Correção de Botões Inconsistentes**:
  - Criada uma nova classe CSS global \`.btn-responsive\` no \`styles.css\` para substituir a classe utilitária do bootstrap \`w-25\` presente em mais de 20 formulários e views (\`cadastro\`, \`avisos-instrutor\`, \`barometro-diario\`, etc). A classe define largura de 100% no mobile e 25% a partir do breakpoint de tablet (768px), resolvendo o overflow de texto e problemas de toques causados por botões muito estreitos em telas pequenas.

- **Ajustes de Layout do Currículo**:
  - Revisadas as definições fixas de altura (\`height: 180px\`, \`height: 204px\`) no CSS do \`curriculo-template\` e \`view-curriculo-all\`, alterando-as para \`min-height\` e \`height: auto\`. Isso impede que blocos de texto maiores escapem dos containers ou fiquem cortados. Adicionada regra \`@media (max-width: 767px)\` para expandir \`.width-50\` a 100% de largura no mobile nestes componentes de impressão/visualização.

- **Resolução de Erros de Sintaxe Angular**:
  - Correção pontual de um erro de lint de \`Invalid binding syntax\` no componente \`cadastro-cor\`, substituindo a anotação incorreta \`([ngModel])\` por \`[(ngModel)]\`.
`;

content = content.replace('- Adicionada classe `.text-truncate` nos links de avisos muito longos para prevenir overflow lateral.', '- Adicionada classe `.text-truncate` nos links de avisos muito longos para prevenir overflow lateral.\n' + additionalNotes);

fs.writeFileSync(docPath, content, 'utf8');