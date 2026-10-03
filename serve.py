"""Static server with clean URLs (/work -> work.html), matching how the Next export expects to be hosted.

    python serve.py          # http://localhost:4173
"""
import http.server, os, sys

PORT = int(os.environ.get("PORT") or (sys.argv[1] if len(sys.argv) > 1 else 4173))
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def translate_path(self, path):
        p = super().translate_path(path)
        # clean URLs: /work -> work.html (even when a work/ folder of case studies exists)
        base = p.rstrip("/\\")
        if os.path.exists(base + ".html") and (not os.path.exists(p) or os.path.isdir(p)):
            return base + ".html"
        return p

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


http.server.ThreadingHTTPServer(("", PORT), Handler).serve_forever()
