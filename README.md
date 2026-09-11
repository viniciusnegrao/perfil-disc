# Perfil DISC

Teste de perfil comportamental DISC, em português, que roda como site estático
(GitHub Pages) e grava as respostas numa planilha do Google.

- Quem responde: abre o link, lê como funciona, coloca o nome, responde 24 blocos
  e vê **só o próprio resultado**, com opção de baixar em PDF ou imprimir.
- Quem aplica: abre o mesmo link, entra em "Acesso do administrador" com a chave
  e vê o painel com todas as respostas, podendo abrir o resultado completo de
  cada pessoa.

A separação é real: quem responde consegue **gravar** na planilha, mas não
consegue **ler** as respostas dos outros — a leitura exige a chave, que fica
guardada apenas no script da planilha e no navegador de quem administra.

## Estrutura

```
index.html           o site inteiro (teste, resultado, painel)
config.js            onde você cola a URL do Apps Script
apps-script/Codigo.gs  script que recebe as respostas e grava na planilha
```

## Como colocar no ar

### 1. Criar a planilha e o script

1. Crie uma planilha nova no Google Sheets (ex.: "Perfil DISC — Respostas").
2. No menu, vá em **Extensões › Apps Script**.
3. Apague o conteúdo do arquivo que abrir e cole todo o conteúdo de
   `apps-script/Codigo.gs`.
4. Na primeira linha do script, troque `troque-esta-chave` por uma chave só sua
   (pode ser qualquer texto, ex.: `disc-carmovel-2026`). É essa chave que você vai
   digitar no painel do site.
5. Salve.

### 2. Publicar o script como app da web

1. No Apps Script, clique em **Implantar › Nova implantação**.
2. Em tipo, escolha **App da Web**.
3. Configure:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em implantar e autorize o acesso quando o Google pedir.
5. Copie a **URL do app da web** (termina em `/exec`).

> "Qualquer pessoa" é necessário para que quem responde o teste consiga enviar a
> resposta sem fazer login no Google. A planilha em si continua privada — só você
> a enxerga.

### 3. Ligar o site à planilha

1. Abra `config.js`.
2. Cole a URL dentro das aspas de `apiUrl`.
3. Salve e envie a alteração para o GitHub (commit + push).

### 4. Ativar o GitHub Pages

1. No repositório, vá em **Settings › Pages**.
2. Em "Source", escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Salve. Em alguns minutos o site fica disponível em
   `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Esse é o link que você manda para as pessoas responderem.

## Trocar a chave de acesso depois

Basta editar `CHAVE_ADMIN` no Apps Script e **criar uma nova implantação**
(Implantar › Gerenciar implantações › editar › nova versão). A chave antiga
para de funcionar.

## Pontos de atenção

- O link é público: qualquer pessoa com ele pode responder o teste. Se isso virar
  problema (respostas de fora da empresa), dá para exigir um código da empresa na
  tela inicial.
- O teste é inspirado no modelo DISC de William Marston e serve para
  autoconhecimento e conversa de desenvolvimento. Não passou por validação
  psicométrica formal, e não deve ser usado como laudo nem como critério único de
  contratação ou demissão.
