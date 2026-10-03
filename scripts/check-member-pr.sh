#!/usr/bin/env bash
# Cadastro de membro: quem não é da organização só altera o próprio perfil.
# Entrada (env): AUTHOR (login de quem abriu a PR) e ASSOC (author_association).
# Roda no checkout do merge commit da PR: HEAD^1 é a base, HEAD é o resultado.
set -euo pipefail

dir="src/data/comunidade"
fotos="public/img/comunidade"
re_md="^${dir}/([a-z0-9]+(-[a-z0-9]+)*)\.md$"
re_foto="^${fotos}/([a-z0-9]+(-[a-z0-9]+)*)\.(jpg|jpeg|png|webp)$"

changed="$(git -c core.quotepath=off diff --name-only HEAD^1 HEAD)"

if ! grep -qE "^(${dir}|${fotos})/" <<<"$changed"; then
  echo "PR não altera dados da comunidade."
  exit 0
fi

# Autor confiável é isento; a aprovação de mantenedor segue obrigatória (CODEOWNERS).
case "${ASSOC:-}" in
  OWNER|MEMBER|COLLABORATOR) echo "Autor confiável ($ASSOC): checagem ignorada."; exit 0 ;;
esac

login="$(tr '[:upper:]' '[:lower:]' <<<"$AUTHOR")"
bad=0
err() { echo "::error file=$1::$2"; bad=1; }

# github: do frontmatter de um arquivo (ref:caminho), em minúsculas. Vazio se não houver.
gh_of() {
  { git show "$1" 2>/dev/null || true; } | tr -d '\r' | awk '
    NR == 1 && $0 != "---" { exit }
    NR > 1 && $0 == "---" { exit }
    /^github:/ {
      sub(/^github:[[:space:]]*/, ""); gsub(/["'\'']/, ""); sub(/[[:space:]]*#.*$/, ""); gsub(/[[:space:]]+$/, "")
      print tolower($0); exit
    }'
}
exists() { git cat-file -e "$1" 2>/dev/null; }

slugs=""
while IFS= read -r f; do
  if [[ "$f" =~ $re_md ]] || [[ "$f" =~ $re_foto ]]; then
    slugs+="${BASH_REMATCH[1]}"$'\n'
  else
    err "$f" "PR de membro só pode alterar o próprio perfil (<slug>.md) e a própria foto"
  fi
done <<<"$changed"
[ "$bad" = 0 ] || exit 1

slug_list="$(sort -u <<<"$slugs" | sed '/^$/d')"
if [ "$(wc -l <<<"$slug_list" | tr -d ' ')" != 1 ]; then
  err "$dir" "PR de membro deve alterar um único perfil (encontrei: $(tr '\n' ' ' <<<"$slug_list"))"
  exit 1
fi

md="$dir/$(tr -d '\n' <<<"$slug_list").md"
head_exists=0; base_exists=0
exists "HEAD:$md" && head_exists=1
exists "HEAD^1:$md" && base_exists=1

if [ "$head_exists" = 0 ] && [ "$base_exists" = 0 ]; then
  err "$md" "foto enviada sem o perfil correspondente"
fi
if [ "$head_exists" = 1 ] && [ "$(gh_of "HEAD:$md")" != "$login" ]; then
  err "$md" "o campo github deve ser o usuário de quem abriu a PR ($AUTHOR)"
fi
if [ "$base_exists" = 1 ] && [ "$(gh_of "HEAD^1:$md")" != "$login" ]; then
  err "$md" "este perfil pertence a outra pessoa: só ela pode alterá-lo ou removê-lo"
fi
exit $bad
