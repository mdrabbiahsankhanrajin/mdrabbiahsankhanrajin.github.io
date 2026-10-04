"""Swap the placeholder host for the real site URL everywhere (meta tags, sitemap, robots).

    python tools/set-domain.py https://yourdomain.com
"""
import os, sys

OLD = "https://rajinlabs.example"
if len(sys.argv) != 2 or not sys.argv[1].startswith("http"):
    sys.exit("usage: python tools/set-domain.py https://yourdomain.com")
new = sys.argv[1].rstrip("/")
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
n = 0
for r, d, f in os.walk(root):
    if ".git" in r.split(os.sep):
        continue
    for x in f:
        if x.endswith((".html", ".xml", ".txt", ".js", ".md")):
            p = os.path.join(r, x)
            t = open(p, encoding="utf8", errors="surrogateescape", newline="").read()
            if OLD in t:
                open(p, "w", encoding="utf8", errors="surrogateescape", newline="").write(t.replace(OLD, new))
                n += 1
print("updated", n, "files ->", new)
