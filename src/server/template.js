const isProd = process.env.NODE_ENV === 'production'

export const template = (scriptSrc, hydrationData = {}, markup = '') => `
  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel"shortcut icon" href="/favicon.ico">
      <title>Author Spotlight</title>
      <esi:include src="/globalassets/v2/include?mode=www" />
      <link rel="stylesheet" type="text/css" href="https://media-cdn.sueddeutsche.de/pagelayout/assets/css/2bab7c4287ae91ec5eb799173c393f0c-sz-global-styles.css">
      <link rel="stylesheet" type="text/css" href="https://www.sueddeutsche.de/overviewpage/assets/css/a768b47214cedae4664b9b7ec3f310d6-sz-overview-page-desktop.css">
    </head>
    <body class="homepage">
      <esi:include src="/header/snippet" />
      <script id="hydration-data" type="application/json">${JSON.stringify(hydrationData)}</script>
      <div id="root"></div>
      ${
        isProd
          ? `<script src="${scriptSrc}" defer></script>`
          : `<script src="${scriptSrc}" defer crossorigin></script>`
      }
    </body>
  </html>
`
