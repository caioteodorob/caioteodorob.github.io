# Caio Teodoro | Portfólio e Serviços

Site pessoal de Caio Teodoro, Analista Operacional e de BI. Reúne o portfólio profissional e duas frentes de serviço sob demanda: soluções de Business Intelligence e estruturação de currículos.

**No ar em:** https://caioteodorob.github.io

---

## Sobre o projeto

Site estático de quatro páginas, sem build step. O visual usa Bootstrap 5 (grid, navbar, cards, accordion, formulários) como base, com uma camada de CSS própria por cima para aplicar a identidade de marca (tema escuro, azul elétrico, tipografia Archivo + Inter). Todo o estilo e comportamento compartilhado vive em um único CSS e um único JS.

- `index.html`: portfólio, trajetória e visão geral dos dois serviços
- `bi.html`: serviços de BI, teaser do estudo de caso, demonstração interativa, pacotes e FAQ
- `curriculos.html`: serviço de currículos otimizados para ATS
- `caso-agro.html`: estudo de caso completo (BI com RLS no agro)

---

## Tecnologias

- HTML5 semântico
- Bootstrap 5.3 (CSS + JS bundle, via CDN) para grid, navbar, cards, accordion e formulários
- Bootstrap Icons (via CDN)
- CSS3 com variáveis nativas para sobrepor o tema de marca aos componentes do Bootstrap
- JavaScript puro, sem bibliotecas de build
- Chart.js (via CDN) para o dashboard de demonstração
- Supabase como backend dos formulários (REST, insert em tabela única)
- Google Fonts (Archivo e Inter)
- GitHub Pages para hospedagem

---

## Estrutura de arquivos

```
.
├── index.html          # Página inicial e portfólio
├── bi.html             # Serviços de BI + demonstração + FAQ
├── curriculos.html     # Serviços de currículo
├── caso-agro.html      # Estudo de caso completo
├── styles.css           # Tema de marca sobre o Bootstrap 5
├── app.js               # Menu mobile, busca e envio dos formulários (Supabase)
├── dashboard.js          # Gráficos de demonstração (Chart.js, dados fictícios)
└── assets/
    ├── avatar.webp     # Foto de perfil otimizada (fallback em .jpg)
    ├── avatar.jpg
    ├── favicon.svg     # Ícone da aba do navegador
    └── og-cover.png    # Imagem de prévia para compartilhamento (Open Graph)
```

---

## Recursos implementados

- Layout responsivo com navbar colapsável (Bootstrap Collapse) em telas pequenas
- Meta tags de SEO e Open Graph para prévia de link em LinkedIn e WhatsApp
- Formulários com validação, honeypot anti-spam e persistência via Supabase
- Controle de acesso por Row Level Security na tabela de solicitações
- FAQ em accordion (Bootstrap) na página de BI — revise as respostas antes de publicar
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
- A tag `<link rel="canonical">`, no `<head>` de cada HTML, deve apontar para o domínio real para que a prévia de link renderize corretamente

---

## Contato

- LinkedIn: https://www.linkedin.com/in/caiobarbosateodoro/

---

© 2026 Caio Teodoro
