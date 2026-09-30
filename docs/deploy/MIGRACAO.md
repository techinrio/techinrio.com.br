# Migração Vercel → GitHub Pages (domínio na Cloudflare)

Estado antes da migração (Cloudflare, DNS only):

- `techinrio.com.br` A `216.150.16.65` e `216.150.1.65` (Vercel)
- `www` CNAME `240337c9f7523b7d.vercel-dns-017.com` (Vercel)

## 1. Antes do DNS

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Merge das PRs de comunidade, CI e deploy; conferir o deploy verde em Actions e o site no link do run.
3. Org `techinrio` → Settings → Pages → **Add domain** `techinrio.com.br` (verificar o apex cobre os subdomínios). O GitHub mostra um TXT `_github-pages-challenge-techinrio`: criar na Cloudflare (Type TXT, Name `_github-pages-challenge-techinrio`, Proxy off) e clicar em **Verify**.
4. Repo → Settings → Branches: proteger `master` (PR obrigatória, 1 aprovação de code owner, check `build` obrigatório, sem push direto).
5. Repo → Settings → Actions → General: exigir aprovação para workflows de colaboradores externos.

## 2. DNS na Cloudflare

Import é **aditivo**: não remove nada. Por isso:

1. DNS → Records: apagar os 2 registros A do apex e o CNAME `www` da Vercel.
2. DNS → Records → **Import and Export** → Import → escolher `docs/deploy/cloudflare.zone`. Deixar "Proxy imported DNS records" **desligado** (o arquivo já marca `cf-proxied:false`).
3. Conferir: 4 A + 4 AAAA no apex e 1 CNAME `www` → `techinrio.github.io`, todos com nuvem cinza (DNS only).

Alternativa via API (token com `DNS:Edit`; `ZONE_ID` está em Overview da zona):

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/import" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -F "file=@docs/deploy/cloudflare.zone" \
  -F "proxied=false"
```

Não usar registros wildcard (`*`): risco de takeover de subdomínio.

## 3. Domínio e HTTPS

1. Repo → Settings → Pages → Custom domain **`www.techinrio.com.br`** (é o domínio canônico do site, `productionUrl` em `src/data/site.js`) → Save (aguardar o DNS check). Com os A/AAAA no apex, o GitHub redireciona `techinrio.com.br` para o www automaticamente.
2. Marcar **Enforce HTTPS** quando liberar (de minutos a 24 h). Até o certificado sair, o HTTPS do domínio pode dar aviso.
3. Validar: `dig techinrio.com.br`, `curl -I https://techinrio.com.br` (deve redirecionar para o www) e `https://www.techinrio.com.br/comunidade/`.

## 4. Depois

- Site estável: remover o domínio e o projeto na Vercel.
- Opcional: ligar o proxy laranja da Cloudflare com SSL/TLS **Full**, só depois do HTTPS do GitHub ativo.

## Rollback

Na Cloudflare, apagar os registros do GitHub e recriar os da Vercel (A `216.150.16.65` e `216.150.1.65`; CNAME `www` `240337c9f7523b7d.vercel-dns-017.com`), enquanto o projeto na Vercel estiver no ar.
