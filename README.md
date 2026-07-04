# Caio Teodoro | Portfólio e Serviços

Site pessoal de Caio Teodoro, Analista Operacional e de BI. Reúne o portfólio profissional e duas frentes de serviço sob demanda: soluções de Business Intelligence e estruturação de currículos.

**No ar em:** https://caioteodorob.github.io

---

## Sobre o projeto

Site estático de três páginas, sem frameworks ou dependências de build. Todo o estilo e comportamento são compartilhados entre as páginas por meio de um único arquivo de CSS e um único de JavaScript, o que mantém a manutenção centralizada.

- `index.html`: portfólio, trajetória e projeto em destaque
- `bi.html`: serviços de BI, pacotes de referência e formulário de solicitação
- `curriculos.html`: serviço de currículos otimizados para ATS e formulário de solicitação

---

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis nativas (design tokens) para tema e paleta
- JavaScript puro, sem bibliotecas
- Supabase como backend dos formulários (REST, insert em tabela única)
- Google Fonts (Archivo e Inter)
- GitHub Pages para hospedagem

---

## Estrutura de arquivos

```
.
├── index.html          # Página inicial e portfólio
├── bi.html             # Serviços de BI
├── curriculos.html     # Serviços de currículo
├── styles.css          # Folha de estilo compartilhada pelas três páginas
├── app.js              # Menu mobile e envio dos formulários (Supabase)
└── assets/
    ├── avatar.webp     # Foto de perfil otimizada (fallback em .jpg)
    ├── avatar.jpg
    ├── favicon.svg     # Ícone da aba do navegador
    └── og-cover.png    # Imagem de prévia para compartilhamento (Open Graph)
```

---

## Recursos implementados

- Layout responsivo com menu recolhível (hamburger) em telas pequenas
- Meta tags de SEO e Open Graph para prévia de link em LinkedIn e WhatsApp
- Formulários com validação, honeypot anti-spam e persistência via Supabase
- Controle de acesso por Row Level Security na tabela de solicitações
- Contraste de cores dentro do padrão de acessibilidade WCAG AA
- Foco de teclado visível para navegação sem mouse

---

## Executar localmente

Por ser um site estático, basta um servidor local simples. Com Python instalado:

```bash
# Na raiz do projeto
python3 -m http.server 8000
```

- Acesse `http://localhost:8000` no navegador
- Qualquer editor de texto serve para alterar os arquivos, sem etapa de compilação

---

## Configuração do backend

Os formulários enviam os dados para uma tabela `solicitacoes` no Supabase. Para reaproveitar o código:

- Crie um projeto no Supabase e uma tabela `solicitacoes`
- Ative Row Level Security com política permitindo apenas `INSERT`
- Substitua as constantes `SUPABASE_URL` e `SUPABASE_KEY` no início do `app.js`

---

## Deploy

- O repositório está publicado via GitHub Pages a partir da branch `main`
- Cada commit na `main` atualiza o site no ar em 1 a 2 minutos
- A constante `SITE_URL`, no topo do `<head>` de cada HTML, deve apontar para o domínio real para que a prévia de link renderize corretamente

---

## Contato

- LinkedIn: https://www.linkedin.com/in/caiobarbosateodoro/

---

© 2026 Caio Teodoro
