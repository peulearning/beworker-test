# 🚀 Teste Técnico BeWorker — JR/Pleno Backend

```
Importante : Este código e totalmente livre e não tem nenhum fim comercial, apenas acerca de testar minhas habilidades e pensamento crítico de um desenvolvedor. As instruções para funcionamento do projeto se encontra no final deste README.
```

---

## 1. Como você modelou as entidades?

A modelagem foi baseada nos principais conceitos do domínio proposto: **usuários, projetos, links, parâmetros e redirecionamento**, seguindo uma abordagem relacional e normalizada.

As relações foram definidas da seguinte forma:

* **Usuário → Projeto (1:N)**
  Um usuário pode possuir múltiplos projetos, permitindo organização por contexto (ex: campanhas, canais, etc).

* **Projeto → Link (1:N)**
  Cada projeto agrupa múltiplos links, funcionando como um container lógico.

* **Link → Parâmetros (N:N)**
  A relação entre links e parâmetros foi modelada como muitos-para-muitos através de uma tabela intermediária (`LinkParameter`).
  Isso permite que:

  * um link tenha múltiplos parâmetros
  * um parâmetro seja reutilizado em vários links

* **Link → Redirect (1:1 opcional)**
  O redirecionamento foi modelado como uma entidade separada, associada de forma opcional ao link.

Além disso:

* Os identificadores utilizam **UUID**, evitando exposição de IDs sequenciais
* O banco de dados utilizado é **relacional (MySQL)**
* A modelagem foi implementada com **Prisma ORM**, garantindo tipagem forte e integridade dos dados

---

## 2. Quais decisões você tomou e por quê?

Durante o desenvolvimento, algumas decisões arquiteturais foram fundamentais:

### 🔹 Separação dos parâmetros em entidade própria

* Permite reutilização entre múltiplos links
* Evita duplicação de dados
* Facilita manutenção em larga escala

### 🔹 Uso de relacionamento muitos-para-muitos (Link ↔ Parameter)

* Flexibiliza a associação entre links e parâmetros
* Permite combinações dinâmicas sem alterar a estrutura do banco

### 🔹 Redirecionamento como entidade separada (1:1)

* Nem todo link precisa de redirect
* Mantém o modelo flexível e extensível
* Permite evoluções futuras (ex: múltiplos destinos, tracking, etc.)

### 🔹 Uso de UUID como identificador

* Evita exposição de IDs sequenciais
* Melhora segurança em endpoints públicos

### 🔹 Estrutura modular por domínio

* Organização por responsabilidade (users, projects, links, parameters)
* Facilita manutenção e evolução do sistema

### 🔹 Uso de JWT para autenticação

* Garante que cada usuário acesse apenas seus próprios dados
* Permite proteger rotas com middleware

### 🔹 Seed inicial

* Permite testar rapidamente o sistema
* Facilita validação funcional sem setup manual

---

## 3. Como sua solução resolve o problema de escala na edição de links?

O problema apresentado envolve a dificuldade de gerenciar links manualmente quando há necessidade de alteração em massa (como UTMs ou destinos).

A solução proposta resolve esse problema através de **geração dinâmica de links**.

### 🔹 Principais pontos da solução:

* Os links são armazenados como **templates (baseUrl)**
* Os parâmetros são entidades separadas e reutilizáveis
* A URL final é **gerada em tempo de execução**, através do endpoint:

```
GET /links/:id/generate
```

### 🔹 Como isso resolve o problema:

* **Elimina a necessidade de editar links manualmente**
* Permite alterar parâmetros uma única vez e refletir em múltiplos links
* Reduz redundância de dados
* Facilita manutenção em larga escala

### 🔹 Exemplo prático:

Em vez de armazenar:

```
https://example.com?utm_source=facebook&utm_campaign=black
```

O sistema armazena:

* baseUrl: `https://example.com`
* parâmetros:

  * utm_source=facebook
  * utm_campaign=black

E gera dinamicamente:

```
https://example.com?utm_source=facebook&utm_campaign=black
```

### 🔹 Sobre o redirecionamento

Caso o link possua um redirect configurado:

* A API responde com um **HTTP 302 (redirect real)**
* Simulando o comportamento real de navegação

Isso permite que o sistema funcione não apenas como gerador de links, mas também como intermediador de navegação.

---

## ✅ Conclusão

A solução proposta transforma links estáticos em estruturas dinâmicas, reutilizáveis e escaláveis, reduzindo esforço operacional e permitindo maior flexibilidade na gestão de campanhas.

---

## Instruções
---

## ⚙️ Como executar o projeto

### 📌 Pré-requisitos

* Node.js (>= 18)
* MySQL
* npm ou yarn

---

### 🔧 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/bework-test.git
cd bework-test
```

---

### 📦 2. Instale as dependências

```bash
npm install
```

---

### 🔐 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="mysql://root:@localhost:3306/beworker"
JWT_SECRET="supersecret"
PORT=3000
```

---

### 🧱 4. Execute as migrações

```bash
npx prisma migrate dev
```

---

### 🌱 5. Rodar seed (dados iniciais)

```bash
npx prisma db seed
```

---

### 🚀 6. Iniciar servidor

```bash
npm run dev
```

Servidor disponível em:

```bash
http://localhost:3000
```

---

### 🧪 Teste com Insomnia/Postman

1. Faça login em `/auth/login`
2. Copie o token JWT
3. Utilize no header:

```http
Authorization: Bearer SEU_TOKEN
```

---

### 🔗 Endpoint principal

```http
GET /links/:id/generate
```

---
