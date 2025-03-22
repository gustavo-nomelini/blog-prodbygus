<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet 
  version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap XML | PRODBYGUS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
            color: #333;
            background-color: #f9f9f9;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          h1 {
            font-size: 24px;
            color: #2a2a2a;
            margin: 0;
          }
          .stats {
            color: #666;
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          th {
            background-color: #f5f5f5;
            font-weight: 600;
            color: #333;
            position: sticky;
            top: 0;
          }
          tr:hover {
            background-color: #f9f9f9;
          }
          a {
            color: #0066cc;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority, .changefreq {
            text-align: center;
          }
          .high {
            color: #0066cc;
            font-weight: 600;
          }
          .medium {
            color: #32a852;
          }
          .low {
            color: #666;
          }
          .brand {
            font-weight: bold;
            color: #2a2a2a;
          }
          .badge {
            display: inline-block;
            font-size: 12px;
            border-radius: 4px;
            padding: 2px 8px;
            margin-left: 8px;
            vertical-align: middle;
          }
          footer {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
            text-align: center;
          }
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            th, td {
              padding: 8px;
            }
            .hidden-mobile {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <h1>Sitemap XML <span class="brand">PRODBYGUS</span></h1>
            <div class="stats">
              <p>Total de URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong></p>
              <p>Última atualização: <strong><xsl:value-of select="sitemap:urlset/sitemap:url[1]/sitemap:lastmod"/></strong></p>
            </div>
          </header>
          
          <table>
            <tr>
              <th>URL</th>
              <th class="hidden-mobile">Última Atualização</th>
              <th>Prioridade</th>
              <th class="hidden-mobile">Frequência de Alteração</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                </td>
                <td class="hidden-mobile">
                  <xsl:value-of select="sitemap:lastmod"/>
                </td>
                <td class="priority">
                  <xsl:choose>
                    <xsl:when test="sitemap:priority >= 0.8">
                      <span class="high"><xsl:value-of select="sitemap:priority"/></span>
                    </xsl:when>
                    <xsl:when test="sitemap:priority >= 0.5">
                      <span class="medium"><xsl:value-of select="sitemap:priority"/></span>
                    </xsl:when>
                    <xsl:otherwise>
                      <span class="low"><xsl:value-of select="sitemap:priority"/></span>
                    </xsl:otherwise>
                  </xsl:choose>
                </td>
                <td class="changefreq hidden-mobile">
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
              </tr>
            </xsl:for-each>
          </table>
          
          <footer>
            <p>© <xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod, 1, 4)"/> PRODBYGUS - Blog sobre desenvolvimento, tecnologia, design e fotografia.</p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet> 