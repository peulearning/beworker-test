Teste Técnico BeWorker Backend (Júnior/Pleno)

---

1. Como você modelou as entidades?

R: A modelagem foi baseada nos principais conceitos do domínio proposto: usuários, projetos, links, parâmetros e redirecionamento. Estruturei as entidades de forma relacional e normalizada:
- "Um usuário pode possuir múltiplos projetos".  Relação (1:N)
- "Um projeto agrupa múltiplos links". Relação (1:N)
- "Um link representa um template reutilizável de URL".

Para os parâmetros, utilizei uma modelagem com relacionametno muito pra muitos, permitindo que múltiplos links compartilhem os mesmos parâmetros evitando duplicação de dados.

A configuração de redirecionamento foi modelada como uma entidade associada ao link. Relação (1:1), garantindo flexibilidade na definição de comportamento.

A modelagem foi implementada utilizando Prims como ORM (Object Relational Mapping) com banco relacionao (MySQL), garantindo consistência e integridade dos dados.

---

2. Quais decisões você tomou e por quê?

R: Algumas decisões importantes durante o desenvolvimento:

- Separação de parâmetros em entidade própria

- Permite reutilização entre múltiplos links
- Evita duplicação de dados

Uso de relação muitos-para-muitos (Link ↔ Parameter)

- Um link pode ter vários parâmetros
- Um parâmetro pode ser compartilhado entre links

Redirecionamento como entidade separada (1:1)

- Nem todo link precisa de redirect
- Mantém a flexibilidade do sistema

Uso de UUID como identificador

- Evita exposição de IDs sequenciais
- Melhora segurança

Estrutura modular por domínio

- Facilita manutenção e escalabilidade

Seed com dados iniciais

- Permite testar rapidamente o sistema sem depender de criação manual

---

3. Como sua solução resolve o problema de escala na edição de links?



---
