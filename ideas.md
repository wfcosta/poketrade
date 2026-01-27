# PokéTrade - Design Brainstorming

## Contexto
Aplicativo de compra, venda e troca de cartas Pokémon TCG com sistema de matching estilo Tinder. Inspiração: design limpo do app "Poke TCG" com paleta Branco, #F4F4F9 (cinza muito claro) e #FF0000 (vermelho).

---

## Ideia 1: Minimalismo Escandinavo com Detalhes Vermelhos Estratégicos

**Design Movement:** Escandinavo/Minimalismo Nórdico

**Core Principles:**
- Simplicidade radical: apenas o essencial, nada supérfluo
- Hierarquia através de espaçamento e tipografia, não cores
- Vermelho como acento funcional (CTAs, badges, status)
- Foco absoluto no conteúdo (as cartas Pokémon)

**Color Philosophy:**
- Fundo: Branco puro (#FFFFFF) para máxima clareza
- Secundário: Cinza muito claro (#F4F4F9) para separação sutil
- Destaque: Vermelho (#FF0000) apenas para ações críticas e badges
- Tipografia: Cinza escuro (#2C2C2C) para texto principal
- Filosofia: A cor é usada com parcimônia; o design respira através do espaço em branco

**Layout Paradigm:**
- Grid assimétrico com cards de tamanho variável
- Navegação mínima: apenas ícones + texto em mobile
- Sidebar desktop com apenas ícones, expandindo ao hover
- Seções separadas por espaço generoso, não por linhas

**Signature Elements:**
1. Cards com sombra suave (1px blur) que aumenta ao hover
2. Badges vermelhas circulares com números (preço, estado)
3. Divisores invisíveis (apenas espaço) entre seções

**Interaction Philosophy:**
- Transições suaves (200ms) em todos os elementos
- Hover: elevação sutil + mudança de cor de fundo para #F4F4F9
- Cliques: feedback imediato com mudança de escala (98%)
- Sem animações desnecessárias; movimento tem propósito

**Animation:**
- Entrada de cards: fade-in + slide-up (300ms)
- Hover em cards: elevação suave (transform: translateY(-2px))
- Transição de abas: fade + slide horizontal (250ms)
- Botões: ripple effect sutil ao clicar

**Typography System:**
- Display: "Poppins" Bold (700) para títulos de seção
- Heading: "Poppins" SemiBold (600) para títulos de cards
- Body: "Inter" Regular (400) para descrições
- Small: "Inter" Regular (400) com opacity 70% para metadados
- Hierarquia: Tamanho + peso, não cor

**Probability:** 0.08

---

## Ideia 2: Futurismo Limpo com Glassmorphism

**Design Movement:** Futurismo Digital / Glassmorphism Moderno

**Core Principles:**
- Transparência e profundidade através de camadas
- Contraste alto entre elementos
- Movimento fluido e responsivo
- Sensação de "superfícies flutuantes"

**Color Philosophy:**
- Fundo: Branco (#FFFFFF) com gradiente sutil (branco → #F4F4F9)
- Cards: Glassmorphism com backdrop-filter (blur 10px) e 80% opacity
- Destaque: Vermelho (#FF0000) com glow effect
- Secundário: Tons de cinza para hierarquia
- Filosofia: Profundidade através de transparência, não cores sólidas

**Layout Paradigm:**
- Cards flutuam sobre o fundo com sombras profundas
- Navegação: Pills arredondadas com ícones + texto
- Sidebar desktop com efeito glassmorphism
- Sobreposição de elementos criando sensação de profundidade

**Signature Elements:**
1. Cards com glassmorphism (backdrop-filter, border com opacity)
2. Botões com glow effect vermelho ao hover
3. Ícones com gradiente sutil

**Interaction Philosophy:**
- Transições suaves com easing personalizado (cubic-bezier)
- Hover: intensifica o blur e aumenta a opacidade
- Cliques: glow effect expandindo do ponto de clique
- Movimento constante mas sutil (parallax em scroll)

**Animation:**
- Entrada: scale-up + fade-in com blur (400ms)
- Hover: aumento de blur + elevação (200ms)
- Clique: glow radial expandindo (300ms)
- Transição de abas: slide com blur transition (350ms)

**Typography System:**
- Display: "Outfit" Bold (700) para títulos (futurista)
- Heading: "Outfit" SemiBold (600) para subtítulos
- Body: "Inter" Regular (400) para descrições
- Small: "Inter" Light (300) para metadados
- Hierarquia: Peso + tamanho + opacidade

**Probability:** 0.07

---

## Ideia 3: Playful Moderno com Bordas Arredondadas e Animações Lúdicas

**Design Movement:** Playful Design / Neumorphism Suave

**Core Principles:**
- Bordas arredondadas generosas em todos os elementos
- Animações que transmitem alegria e leveza
- Paleta suave com tons quentes
- Sensação de "amigável" mas profissional

**Color Philosophy:**
- Fundo: Branco (#FFFFFF) com padrão sutil de pontos ou linhas
- Cards: Branco com borda suave (#E8E8E8) e sombra neumórfica
- Destaque: Vermelho (#FF0000) com transições suaves
- Secundário: Tons de bege/creme (#FAF8F3) para áreas alternadas
- Filosofia: Cores quentes e suaves, sem agressividade

**Layout Paradigm:**
- Cards com bordas muito arredondadas (border-radius: 24px)
- Navegação com botões arredondados e espaçamento generoso
- Sidebar com cantos arredondados e fundo levemente colorido
- Seções com divisores arredondados

**Signature Elements:**
1. Cards com bordas muito arredondadas e sombra suave
2. Botões com bordas arredondadas e ícones com animação bounce
3. Badges com fundo colorido e texto branco

**Interaction Philosophy:**
- Transições alegres e responsivas
- Hover: mudança de cor suave + elevação
- Cliques: animação bounce (scale + spring)
- Feedback visual em todas as interações

**Animation:**
- Entrada: bounce-in (400ms com spring easing)
- Hover: scale-up + cor mais vibrante (200ms)
- Clique: bounce-out + feedback visual (300ms)
- Transição de abas: slide com bounce (350ms)

**Typography System:**
- Display: "Poppins" Bold (700) para títulos (playful)
- Heading: "Poppins" SemiBold (600) para subtítulos
- Body: "Inter" Regular (400) para descrições
- Small: "Inter" Regular (400) com cor mais clara para metadados
- Hierarquia: Peso + tamanho + cor

**Probability:** 0.06

---

## Decisão Final

Após análise das três abordagens, a escolha será **Ideia 1: Minimalismo Escandinavo com Detalhes Vermelhos Estratégicos**.

**Justificativa:**
- Alinha-se perfeitamente com a inspiração do "Poke TCG" (design limpo)
- A paleta Branco + #F4F4F9 + #FF0000 é naturalmente minimalista
- Permite que as cartas Pokémon sejam o foco principal
- Transições suaves e movimento propositivo criam profissionalismo
- Escalável para desktop e mobile sem comprometer a estética
- Reflete a qualidade e seriedade do mercado de TCG
