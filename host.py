#!/usr/bin/env python3

# Inspired by https://gist.github.com/jtangelder/e445e9a7f5e31c220be6
# Python3 http.server for Single Page Application

import urllib.parse
import http.server
import socketserver
import re
from pathlib import Path


pattern = re.compile('.png|.jpg|.jpeg|.js|.css|.ico|.gif|.svg', re.IGNORECASE)


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        url_parts = urllib.parse.urlparse(self.path)
        request_file_path = Path(url_parts.path.strip("/"))

        ext = request_file_path.suffix
        if not request_file_path.is_file() and not pattern.match(ext):
            self.path = 'index.html'

        return http.server.SimpleHTTPRequestHandler.do_GET(self)


def host(port):
    HOST = ('0.0.0.0', port)
    httpd = socketserver.TCPServer(HOST, Handler)
    print("Hosted on port "+str(p)+".")
    httpd.serve_forever()

for p in range(8000,8010):
    pass
    try:
        host(p)
        break
    except OSError:
        print("Failed to host on port "+str(p)+".")
        continue
    except KeyboardInterrupt:
        print("Done hosting");
        break;



