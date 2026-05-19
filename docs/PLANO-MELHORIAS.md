# Plano de Melhoria — Site CAS

> Baseado na análise registrada em `docs/ESTUDO-PROJETO-CAS.md`

## Objetivo

Transformar o projeto atual em uma base:
- mais estável
- mais segura
- mais consistente com o backend real
- mais fácil de manter
- pronta para evolução futura

---

## Prioridade 1 — Correções críticas imediatas

## 1. Corrigir bugs reais de funcionamento

### Ações
- corrigir `CoverageMap` para reagir a `availableCities`
- revisar `HeroCarousel` para remover código morto e estabilizar autoplay
- revisar `BlogPost` para corrigir `useEffect` sem array de dependências
- revisar páginas acessadas sem cidade selecionada (`/planos`, `/contato`, páginas legais)

### Resultado esperado
- menos bugs silenciosos
- melhor previsibilidade de renderização

---

## 2. Fechar brechas de segurança

### Ações
- remover ou isolar a autenticação fake do admin
- se o admin for mantido, integrar autenticação real por backend
- revisar `dangerouslySetInnerHTML` do blog e adicionar sanitização
- adicionar `rel="noopener noreferrer"` aos links externos com `target="_blank"`

### Resultado esperado
- redução de risco de exposição indevida
- base pronta para auditoria mínima de segurança

---

## 3. Limpar código legado que confunde a arquitetura

### Ações
- remover ou arquivar `src/App.css`
- remover ou documentar `src/pages/Index.tsx`
- remover código morto/imports não usados
- revisar `src/data/mockData.ts` e decidir entre:
  - excluir
  - mover para ambiente de desenvolvimento
  - reaproveitar apenas no futuro admin

### Resultado esperado
- projeto mais legível
- onboarding mais rápido

---

## Prioridade 2 — Padronização arquitetural

## 4. Padronizar a camada de dados

### Ações
- decidir entre manter `CityContext` como camada principal ou migrar para `React Query`
- centralizar tipagem da API em uma pasta como `src/types`
- extrair serviços HTTP para algo como:
  - `src/services/cities.ts`
  - `src/services/plans.ts`
  - `src/services/posts.ts`
  - `src/services/parameters.ts`
- definir um modelo consistente de loading/error/success por recurso

### Resultado esperado
- manutenção mais simples
- melhor rastreabilidade de problemas
- menos acoplamento no contexto

---

## 5. Separar conteúdo dinâmico de conteúdo institucional fixo

### Ações
- revisar `Plans.tsx` e `Contact.tsx`
- decidir o que deve vir da API e o que é conteúdo fixo
- eliminar placeholders e dados genéricos
- alinhar telefones, endereços, promessas comerciais e FAQs com a operação real

### Resultado esperado
- consistência entre home, páginas institucionais e backend
- menos risco comercial/jurídico

---

## 6. Reorganizar estrutura por domínio

### Sugestão
Migrar gradualmente para algo como:

```txt
src/
  app/
    routes/
    providers/
  features/
    cities/
    plans/
    blog/
    contact/
    coverage/
    legal/
  components/
    ui/
    shared/
  services/
  types/
  hooks/
  lib/
```

### Resultado esperado
- melhor escalabilidade
- menor acoplamento entre páginas e seções

---

## Prioridade 3 — UX, performance e qualidade

## 7. Melhorar performance

### Ações
- lazy loading de rotas (`React.lazy` + `Suspense`)
- separar páginas legais em chunks independentes
- analisar bundle principal
- remover dependências sem uso real
- revisar imagens grandes e aplicar compressão/formatos modernos onde necessário

### Resultado esperado
- carregamento inicial mais rápido
- menor bundle JS

---

## 8. Melhorar acessibilidade e semântica

### Ações
- corrigir estruturas clicáveis aninhadas indevidamente
- revisar contraste, foco e navegação por teclado
- adicionar labels/aria quando necessário
- revisar botões e links com funções semânticas corretas

### Resultado esperado
- melhor UX
- melhor compatibilidade com leitores de tela
- SEO técnico mais saudável

---

## 9. Melhorar observabilidade básica do front

### Ações
- adicionar camada simples de logging de erro
- padronizar mensagens de erro para usuário
- criar fallback visual para API indisponível
- considerar integração com Sentry no futuro

### Resultado esperado
- diagnóstico mais rápido em produção

---

## Prioridade 4 — Evolução funcional

## 10. Decidir o futuro do painel admin

Há 3 caminhos possíveis:

### Opção A — Remover por enquanto
Se o painel não será usado agora, remover do projeto público e documentar a decisão.

### Opção B — Manter apenas como backlog
Deixar sem rota e sem build target principal, mas com documentação clara de que é protótipo.

### Opção C — Evoluir para produto real
Nesse caso será necessário:
- autenticação real
- autorização por papel
- CRUD real para planos/posts/depoimentos/cidades
- upload de mídia
- auditoria mínima
- validação e persistência reais

### Recomendação atual
**Opção B no curto prazo, Opção C apenas se houver demanda confirmada.**

---

## 11. Consolidar conteúdo comercial por cidade

### Ações
- validar se todas as cidades devem ter:
  - banners
  - planos
  - endereço
  - posts
  - depoimentos
- criar regras claras para fallback quando algum recurso faltar

### Resultado esperado
- home por cidade mais robusta
- menos estados quebrados

---

## Plano de execução sugerido em fases

## Fase 1 — Higiene e correções rápidas
Tempo estimado: curto

- corrigir bugs de hooks/efeitos
- corrigir mapa
- corrigir blog post render cycle
- limpar arquivos mortos
- corrigir lint errors
- documentar variáveis de ambiente

## Entregáveis
- projeto mais estável
- lint sem erros
- documentação técnica consolidada

---

## Fase 2 — Consolidação da arquitetura
Tempo estimado: curto a médio

- reorganizar camada de dados
- separar serviços e tipos
- revisar páginas estáticas vs dinâmicas
- padronizar fallback de erro/loading

## Entregáveis
- arquitetura mais clara
- código mais manutenível

---

## Fase 3 — Performance e UX
Tempo estimado: médio

- code splitting por rota
- revisão de acessibilidade
- melhoria de semântica HTML
- otimização de imagens e assets

## Entregáveis
- bundle menor
- UX melhor
- base pronta para crescer

---

## Fase 4 — Admin e evolução de negócio
Tempo estimado: variável

- decidir escopo do admin
- implementar somente se houver demanda validada
- conectar CRUD real ao backend

## Entregáveis
- gestão operacional dentro do produto, se fizer sentido

---

## Backlog objetivo por impacto

## Alto impacto / baixo esforço
- corrigir `CoverageMap`
- corrigir `BlogPost`
- remover `App.css`
- remover imports mortos
- adicionar `rel` em links externos
- corrigir erros de lint

## Alto impacto / médio esforço
- sanitizar conteúdo HTML do blog
- padronizar serviços da API
- alinhar páginas estáticas com dados reais
- lazy load de rotas

## Alto impacto / alto esforço
- autenticação real do admin
- CRUD real de conteúdo
- reestruturação completa por domínio

---

## Recomendação prática de próximo passo

Se formos executar as melhorias agora, eu recomendo começar nesta ordem:

1. **limpeza e correções técnicas rápidas**
2. **padronização da camada de dados**
3. **revisão das páginas estáticas/institucionais**
4. **decisão sobre admin**
5. **performance e UX**

---

## Resultado que buscamos

Ao final das melhorias, o projeto deve ficar com estas características:
- home por cidade confiável
- conteúdo coerente entre páginas
- código limpo e sem legado confuso
- integração com backend mais clara
- base segura para expansão futura

---

## Arquivos de referência
- `docs/ESTUDO-PROJETO-CAS.md`
- `README.md`
