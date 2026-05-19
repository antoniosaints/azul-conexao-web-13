# Estudo do Projeto — Site CAS

> Última análise: 2026-04-17
> Projeto analisado em `C:/Users/Usuario/Desktop/Projetos/Site-CAS`

## 1. Visão geral

Este projeto é um site institucional/comercial da **CAS Internet**, construído com **Vite + React + TypeScript + Tailwind + shadcn/ui**.

A aplicação tem um comportamento principal muito claro:

1. o usuário entra na rota `/`
2. seleciona uma cidade atendida
3. é redirecionado para `/:citySlug`
4. a home da cidade mostra banners, planos, contato, blog, depoimentos e cobertura
5. quase todo o conteúdo vem de um backend HTTP externo

Além disso, existem páginas estáticas de apoio:
- termos de uso
- regulamento
- privacidade
- defesa do consumidor
- contato
- planos
- blog post individual

---

## 2. Stack tecnológica

### Front-end
- **React 18**
- **TypeScript**
- **React Router DOM 6**
- **Tailwind CSS 3**
- **shadcn/ui**
- **Lucide React**
- **Leaflet** para mapa de cobertura
- **Axios** para consumo da API

### Infra / build
- **Vite 5**
- **ESLint 9**
- **SWC** via `@vitejs/plugin-react-swc`

### Dependências presentes mas pouco ou nada aproveitadas no fluxo atual
- `@tanstack/react-query` (provider existe, uso real não foi encontrado)
- várias peças do `shadcn/ui`
- `react-hook-form`, `zod`, `recharts`, `next-themes`, `date-fns` em partes pouco aproveitadas ou ausentes no fluxo principal

---

## 3. Estrutura do projeto

## Raiz
- `package.json` — scripts e dependências
- `vite.config.ts` — configuração do Vite
- `tailwind.config.ts` — tokens, animações e tema
- `eslint.config.js` — lint
- `index.html` — metadados principais e bootstrap do app
- `README.md` — README padrão gerado pelo Lovable

## Código-fonte principal
- `src/main.tsx` — renderiza `<App />`
- `src/App.tsx` — providers globais e definição de rotas
- `src/index.css` — design tokens, variáveis CSS e estilos globais
- `src/App.css` — arquivo legado do template Vite, aparentemente não utilizado

## Camadas do app
- `src/contexts` — contexto global de cidade e dados remotos
- `src/lib` — utilitários e cliente HTTP
- `src/helpers` — helpers simples
- `src/pages` — páginas de rota
- `src/components/layout` — header, footer e efeitos globais
- `src/components/sections` — seções da home e páginas compostas
- `src/components/ui` — componentes base do shadcn/ui
- `src/components/auth` — login e proteção de rota, hoje fora do fluxo principal
- `src/data/mockData.ts` — mocks antigos/paralelos ao backend atual

## Assets públicos
- `public/assets/*` — logos, banners, ícones e imagens estáticas
- `public/robots.txt`
- `public/sitemap.xml`

---

## 4. Arquitetura funcional

## 4.1 Bootstrap

### `src/main.tsx`
Responsabilidade:
- monta a aplicação em `#root`
- carrega `src/index.css`

### `src/App.tsx`
Responsabilidade:
- inicializa `QueryClientProvider`
- inicializa `TooltipProvider`
- inicializa `CityProvider`
- monta efeitos globais (`SnowFall`, `Fireworks`)
- registra toaster e sonner
- define as rotas do sistema

Rotas atuais:
- `/` → `CitySelector`
- `/termos` → `TermsOfService`
- `/regulamento` → `Regulations`
- `/privacidade` → `PrivacyPolicy`
- `/defesa` → `ConsumerDefense`
- `/blog/:postId` → `BlogPost`
- `/planos` → `Plans`
- `/contato` → `Contact`
- `/:citySlug` → `CityHome`
- `*` → `NotFound`

Observação importante:
- existe página `Admin.tsx`, `Login.tsx` e `ProtectedRoute.tsx`, mas **não existe rota ativa para o painel administrativo**.

---

## 4.2 Camada de dados central

### `src/contexts/CityContext.tsx`
É o coração do projeto.

Responsabilidades:
- carregar dados remotos do backend
- armazenar cidade selecionada
- persistir cidade no `localStorage`
- expor listas e helpers para toda a interface

### Estado exposto pelo contexto
- `selectedCity`
- `availableCities`
- `availablePlans`
- `depoiments`
- `posts`
- `parametros`
- `repoImages`
- `loading`
- `setSelectedCity()`
- `getCityById()`
- `getCityBySlug()`
- `getCitySlug()`

### Endpoints consumidos
A partir de `src/lib/http.ts`, usando `baseURL`:
- `VITE_API_URL`
- fallback: `https://sistemas.cas.net.br/censo/public/site/api/home/`

Chamadas realizadas no carregamento inicial:
- `getCidades`
- `getPlanosAplicativos`
- `getParametros`
- `getDepoimentos`
- `getPosts`

Ação de formulário:
- `saveCadastro`

### Modelos principais no contexto
- `City`
- `Plan`
- `Posts`
- `Parametros`
- `Depoiments`
- `Banners`
- `Apps`

### Fluxo de inicialização
Ao montar o provider:
1. define `repoImages` via env ou URL padrão
2. busca cidades
3. busca planos
4. busca parâmetros
5. busca depoimentos
6. busca posts
7. tenta restaurar a cidade do `localStorage`
8. libera `loading`

### Como o slug da cidade é gerado
Função `getCitySlug(city)`:
- lowercase
- substitui espaços por `-`
- remove acentos com `normalize('NFD')`

Exemplo:
- `São Luís` → `sao-luis`

---

## 5. Fluxo principal do usuário

## 5.1 Seleção da cidade

### `src/pages/CitySelector.tsx`
Responsabilidade:
- exibir tela inicial com fundo institucional
- listar cidades ativas
- permitir seleção
- redirecionar para a home da cidade

Comportamentos:
- usa `availableCities`
- grava a cidade selecionada no contexto + localStorage
- navega para `/${citySlug}`
- usa `parametros[0].link_atendimento` para contato
- alterna branding natalino conforme data

Observações:
- a seleção já navega imediatamente no `onValueChange`
- existe `handleCitySelect`, mas a função está sobrando
- há imports não utilizados

---

## 5.2 Home da cidade

### `src/pages/CityHome.tsx`
Responsabilidade:
- resolver `citySlug` pela URL
- sincronizar `selectedCity`
- montar a landing page principal

Seções renderizadas:
- `Header`
- `HeroCarousel`
- `IconBar`
- `PlansSection`
- `CoverageMap`
- `ContactForm`
- `TestimonialsSection`
- `AboutSection`
- `BlogSection`
- `Footer`

Comportamento adicional:
- se houver `#hash` na URL, faz scroll suave para a seção

Observação:
- se a cidade não existir, o redirecionamento está comentado

---

## 6. Páginas do projeto

## 6.1 Páginas ativas e seu papel

### `src/pages/CitySelector.tsx`
Tela inicial de seleção de cidade.

### `src/pages/CityHome.tsx`
Home dinâmica por cidade.

### `src/pages/BlogPost.tsx`
Renderiza um post individual vindo de `posts` do contexto.
- usa `dangerouslySetInnerHTML` em `post.conteudo`
- mostra imagem, autor, data e posts relacionados

### `src/pages/Plans.tsx`
Página institucional de planos com conteúdo majoritariamente estático.
- reutiliza `PlansSection`
- adiciona benefícios, tabela comparativa, testimonials e CTA estáticos

### `src/pages/Contact.tsx`
Página institucional de contato.
- mistura `ContactForm` com blocos estáticos de contato, lojas, FAQ e CTA

### `src/pages/TermsOfService.tsx`
Página estática de termos.

### `src/pages/Regulations.tsx`
Página estática de regulamento.

### `src/pages/PrivacyPolicy.tsx`
Página estática de privacidade.

### `src/pages/ConsumerDefense.tsx`
Página estática sobre CDC.

### `src/pages/NotFound.tsx`
Página 404 simples.

## 6.2 Páginas presentes mas fora do fluxo atual

### `src/pages/Admin.tsx`
Painel administrativo visual.
Hoje não está ligado em rota.
Usa muitos mocks locais.

### `src/pages/Index.tsx`
Home antiga/alternativa.
Parece sobrar, já que a rota principal usa `CitySelector`.

---

## 7. Componentes principais

## Layout

### `src/components/layout/header.tsx`
Responsabilidades:
- navegação principal
- badge da cidade atual
- CTA “Assine Já”
- dropdown com links externos
- menu mobile

Dependências:
- `selectedCity`
- `getCitySlug`
- `parametros[0]`

Observações:
- faz navegação por hash usando a cidade atual
- troca logo em período natalino
- se o usuário entrar em páginas como `/planos` sem cidade selecionada, o slug pode ficar vazio

### `src/components/layout/footer.tsx`
Responsabilidades:
- contatos
- links rápidos
- links legais
- redes sociais

Dependências:
- `parametros[0]`
- `selectedCity`

Observação importante:
- se `selectedCity === null`, o footer retorna `null`
- isso cria comportamento inconsistente em páginas que podem ser acessadas sem seleção de cidade

### `src/components/layout/SnowFall.tsx`
Efeito visual global de neve.

### `src/components/layout/Firerworks.tsx`
Efeito visual global de fogos.

## Seções da home

### `src/components/ui/hero-carousel.tsx`
Carrossel principal.
- usa `selectedCity.banners`
- faz autoplay a cada 5s
- pausa em hover
- usa `repoImages + slide.imagem`

Observações:
- há código morto (`slides`, `mockCarouselSlides`, `filterByCity`) não utilizado
- existem IDs repetidos no array local morto

### `src/components/sections/plans-section.tsx`
Renderiza os planos da cidade atual.
- filtra por cidade
- filtra `status === "1"`
- limita a 4 cards
- exibe promoção, premium, benefícios, apps e CTA

Dependências:
- `selectedCity`
- `availablePlans`
- `parametros`
- `repoImages`

### `src/components/sections/contact-form.tsx`
Formulário de contratação.
- campos: nome, email, telefone, plano, endereço, mensagem
- envia para `saveCadastro`
- usa toast de sucesso/erro
- lista planos filtrados pela cidade selecionada

### `src/components/sections/blog-section.tsx`
Lista os 3 primeiros posts.

### `src/components/sections/about-section.tsx`
Mostra missão, anos da empresa, quantidade de cidades e números institucionais.

### `src/components/sections/testimonials-section.tsx`
Mostra depoimentos vindos do backend.

### `src/components/sections/coverage-map.tsx`
Mapa Leaflet com cobertura.
- centro fixo no Maranhão
- usa `availableCities`
- monta popup por cidade

### `src/components/sections/icon-bar.tsx`
Faixa com diferenciais usando ícones estáticos.

### `src/components/sections/carrosel-icons.tsx`
Carrossel de parceiros com placeholders/emojis.
Está desativado no fluxo principal.

---

## 8. Cliente HTTP e integração externa

### `src/lib/http.ts`
Instância única do Axios.

Configuração:
- `baseURL = import.meta.env.VITE_API_URL || "https://sistemas.cas.net.br/censo/public/site/api/home/"`
- header JSON padrão

### Variáveis de ambiente identificadas
- `VITE_API_URL`
- `VITE_REPO_IMAGES`

Fallbacks embutidos:
- API padrão pública
- repositório de imagens padrão em `CityContext`

---

## 9. Design system e estilos

## Arquivos-chave
- `src/index.css`
- `tailwind.config.ts`
- `components.json`

## Tokens principais
- `--primary`
- `--success`
- `--secondary`
- `--accent`
- gradientes customizados
- sombras customizadas
- fonte `Poppins`

## Observações
- o projeto segue padrão shadcn/ui
- os componentes de `src/components/ui` são, em grande parte, base gerada/reaproveitada
- existe `src/App.css` com CSS padrão do template Vite, sem uso real visível

---

## 10. Painel administrativo existente

### Arquivos
- `src/pages/Admin.tsx`
- `src/components/auth/Login.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/hooks/useAuth.ts`
- `src/data/mockData.ts`

## Estado atual
O projeto possui um esqueleto de painel administrativo, mas ele ainda não está pronto para produção.

### O que já existe
- login visual
- proteção por componente
- dashboard com abas
- blocos de planos, depoimentos, blog e configurações
- mocks para exibição

### Limitações atuais
- sem rota ativa
- sem backend real ligado ao painel
- autenticação baseada em `localStorage`
- credenciais hardcoded (`admin/admin`)
- modelos de `mockData.ts` divergem dos modelos reais do backend

---

## 11. Qualidade técnica atual

## Build
Comando executado:
- `npm run build`

Resultado:
- build concluída com sucesso

Ponto de atenção:
- bundle principal gerado em produção com cerca de **675 KB minificados**, acima do alerta padrão do Vite

## Lint
Comando executado:
- `npm run lint`

Resultado:
- há erros e warnings

### Erros encontrados
1. `src/components/ui/command.tsx`
   - `@typescript-eslint/no-empty-object-type`
2. `src/components/ui/textarea.tsx`
   - `@typescript-eslint/no-empty-object-type`
3. `tailwind.config.ts`
   - `@typescript-eslint/no-require-imports`

### Warnings relevantes
1. `src/components/sections/coverage-map.tsx`
   - `useEffect` sem dependência `availableCities`
2. `src/components/ui/hero-carousel.tsx`
   - `useEffect` sem dependência `startAutoPlay`
3. warnings de Fast Refresh em arquivos de UI/exportações mistas

## TypeScript/LSP
- diagnóstico LSP sem erros de tipagem no workspace no momento da análise

---

## 12. Problemas e riscos identificados

## 12.1 Críticos

### 1. Autenticação insegura
Arquivos:
- `src/hooks/useAuth.ts`
- `src/components/auth/Login.tsx`

Problema:
- autenticação baseada apenas em `localStorage`
- credenciais hardcoded `admin/admin`

Risco:
- total insegurança se o painel for exposto

### 2. `dangerouslySetInnerHTML` sem sanitização aparente
Arquivo:
- `src/pages/BlogPost.tsx`

Problema:
- conteúdo HTML do backend é renderizado diretamente

Risco:
- XSS se a origem não estiver rigidamente controlada

### 3. Mapa pode não refletir cidades carregadas async
Arquivo:
- `src/components/sections/coverage-map.tsx`

Problema:
- `useEffect` executa apenas uma vez
- `availableCities` chega depois da carga async
- os marcadores podem não ser desenhados corretamente em cenários reais

Risco:
- mapa incompleto ou vazio

---

## 12.2 Altos

### 4. Páginas estáticas inconsistentes com o backend dinâmico
Arquivos:
- `src/pages/Plans.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Regulations.tsx`

Problema:
- várias informações nessas páginas são placeholders ou dados fixos
- isso pode divergir da operação real da CAS

Exemplos:
- telefones fictícios
- cidades genéricas
- depoimentos fixos
- promessas que não necessariamente batem com a API

### 5. Código morto e legado coexistindo com o fluxo real
Arquivos:
- `src/pages/Index.tsx`
- `src/pages/Admin.tsx`
- `src/data/mockData.ts`
- `src/App.css`
- arrays/imports não usados em `hero-carousel.tsx` e `CitySelector.tsx`

Problema:
- aumenta custo de manutenção
- reduz clareza arquitetural

### 6. Falta de tratamento consolidado de erro/loading por recurso
Arquivo:
- `src/contexts/CityContext.tsx`

Problema:
- cada fetch trata erro localmente
- o provider não expõe estados granulares de falha
- o usuário não recebe fallback funcional por seção

---

## 12.3 Médios

### 7. Bundle inicial grande
- ausência de lazy loading de rotas
- páginas legais e institucionais entram no bundle principal
- painel admin também tende a pesar quando integrado

### 8. React Query configurado, mas não utilizado
Arquivo:
- `src/App.tsx`

Problema:
- o provider existe, mas os dados são buscados manualmente no contexto

### 9. Footer depende de cidade selecionada
Arquivo:
- `src/components/layout/footer.tsx`

Problema:
- páginas acessadas diretamente podem ficar sem footer

### 10. Links externos com `target="_blank"` sem `rel`
Presente em vários arquivos.

Risco:
- problema de segurança/auditoria e boas práticas

### 11. HTML/semântica acessível fraca em alguns pontos
Exemplo:
- `PlansSection` envolve múltiplos cards e botões dentro de um `<a>` pai

---

## 12.4 Baixos

### 12. Conteúdo visual sazonal acoplado na aplicação global
Arquivo:
- `src/App.tsx`

Problema:
- `SnowFall` e `Fireworks` ficam globais o tempo todo
- faltam feature flags claras

### 13. Nomes e padronização
- `Depoiments` em vez de `Testimonials`/`Depoimentos`
- `Firerworks.tsx` com nome digitado incorretamente
- `footer.tsx` e `header.tsx` minúsculos enquanto outras páginas seguem PascalCase

### 14. Guard do contexto pouco efetivo
Arquivo:
- `src/contexts/CityContext.tsx`

Problema:
- `createContext({} as CityContextData)` torna o check `if (!context)` praticamente inútil

---

## 13. Inventário funcional por arquivo-chave

## Núcleo
- `src/main.tsx` — entrada da aplicação
- `src/App.tsx` — providers e rotas
- `src/contexts/CityContext.tsx` — estado global e integração com backend
- `src/lib/http.ts` — cliente Axios

## Navegação e layout
- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/pages/NotFound.tsx`

## Jornada principal
- `src/pages/CitySelector.tsx`
- `src/pages/CityHome.tsx`
- `src/components/ui/hero-carousel.tsx`
- `src/components/sections/plans-section.tsx`
- `src/components/sections/contact-form.tsx`
- `src/components/sections/coverage-map.tsx`
- `src/components/sections/testimonials-section.tsx`
- `src/components/sections/about-section.tsx`
- `src/components/sections/blog-section.tsx`

## Conteúdo institucional
- `src/pages/Plans.tsx`
- `src/pages/Contact.tsx`
- `src/pages/TermsOfService.tsx`
- `src/pages/Regulations.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/ConsumerDefense.tsx`

## Área administrativa/legado
- `src/pages/Admin.tsx`
- `src/components/auth/Login.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/hooks/useAuth.ts`
- `src/data/mockData.ts`
- `src/pages/Index.tsx`
- `src/App.css`

---

## 14. Como o projeto funciona hoje, em resumo executivo

O site funciona como uma **landing page multi-cidade alimentada por uma API externa**.

A lógica principal é:
- obter cidades, planos, parâmetros, posts e depoimentos do backend
- persistir a cidade escolhida no navegador
- gerar uma rota amigável por slug
- exibir a experiência principal adaptada à cidade

O projeto **já entrega uma boa base visual** e uma arquitetura relativamente simples de entender.

Por outro lado, ele ainda mistura:
- partes reais e partes mockadas
- páginas dinâmicas e páginas institucionais hardcoded
- um painel administrativo incompleto
- alguns trechos legados do template e do Lovable

Ou seja: **a base é aproveitável, mas precisa de consolidação arquitetural antes de crescer**.

---

## 15. Recomendação estratégica

A melhor direção para evolução é:

1. **stabilizar a base atual**
2. **separar claramente o que é público, dinâmico, administrativo e legado**
3. **padronizar consumo de dados**
4. **corrigir riscos técnicos e de segurança**
5. **só depois expandir funcionalidades**

Consulte o plano em:
- `docs/PLANO-MELHORIAS.md`
