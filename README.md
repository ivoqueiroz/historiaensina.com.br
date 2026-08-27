# História Ensina

Site oficial de vendas do projeto **História Ensina**, preparado como site estático para publicação no GitHub Pages.

## Publicação segura

- O conteúdo está pronto para ser servido a partir da raiz da branch `main`.
- O arquivo `.nojekyll` evita processamento desnecessário pelo Jekyll.
- O arquivo `CNAME` registra o domínio pretendido `historiaensina.com.br`.
- A existência do `CNAME` no repositório não muda o DNS e não interrompe o site atualmente publicado.
- Só altere os registros do Registro.br depois de validar a versão do GitHub Pages e habilitar HTTPS.

## Teste local

Em um terminal aberto na raiz do repositório:

```powershell
python -m http.server 4173
```

Depois, abra `http://127.0.0.1:4173/`.

## Publicação no GitHub Pages

Depois da validação, configure **Settings → Pages → Build and deployment → Deploy from a branch**, selecionando `main` e `/ (root)`. A mudança de DNS deve ser uma etapa posterior e separada.
