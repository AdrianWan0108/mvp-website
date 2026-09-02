#!/usr/bin/env bash
# Verify every rule in public/_redirects resolves as a 301 to the expected
# target. Run against the workers.dev preview BEFORE pointing DNS at the
# Worker — once the custom domain is attached, real visitors are on it.
#
#   ./scripts/verify-redirects.sh https://mvp-website.<subdomain>.workers.dev
#
# Exits non-zero if any rule fails, so it can gate a deploy.

set -uo pipefail

BASE="${1:-}"
if [ -z "$BASE" ]; then
  echo "usage: $0 <base-url>" >&2
  echo "  e.g. $0 https://mvp-website.example.workers.dev" >&2
  exit 2
fi
BASE="${BASE%/}"

REDIRECTS="$(dirname "$0")/../public/_redirects"
if [ ! -f "$REDIRECTS" ]; then
  echo "cannot find $REDIRECTS" >&2
  exit 2
fi

pass=0; fail=0

check() {
  local from="$1" want="$2"
  # --max-redirs 0 so we inspect the redirect itself, not where it lands.
  local out status loc
  out=$(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' \
        --max-redirs 0 "$BASE$from")
  status="${out%% *}"
  loc="${out#* }"
  # Compare paths only; the host varies between preview and production.
  local got="${loc#"$BASE"}"
  got="${got%/}"
  local expect="${want%/}"

  if [ "$status" = "301" ] && [ "$got" = "$expect" ]; then
    printf '  ok   %-45s -> %s\n' "$from" "$expect"
    pass=$((pass + 1))
  else
    printf '  FAIL %-45s -> got %s %s (want 301 %s)\n' \
      "$from" "$status" "${got:-<none>}" "$expect"
    fail=$((fail + 1))
  fi
}

echo "Verifying redirects against $BASE"
echo

while read -r from to code _rest; do
  # The file is edited on Windows, so strip the trailing CR that would
  # otherwise make the status read as "301\r" and match nothing.
  from="${from%$'\r'}"; to="${to%$'\r'}"; code="${code%$'\r'}"

  # Skip blanks and comments.
  case "${from:-}" in ''|'#'*) continue ;; esac
  [ "${code:-}" = "301" ] || continue

  if [ "${from%\*}" != "$from" ]; then
    # Splat rule: exercise it with a representative child path rather than
    # the literal asterisk.
    check "${from%\*}wix-demo-page" "$to"
  else
    check "$from" "$to"
  fi
done < "$REDIRECTS"

echo
echo "$pass passed, $fail failed"
[ "$fail" -eq 0 ]
