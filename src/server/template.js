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
    </head>
    <body>
      <div id="root" data-react='${JSON.stringify(hydrationData)}'>${markup}</div>
      ${
        isProd
          ? `<script src="${scriptSrc}" defer></script>`
          : `<script src="${scriptSrc}" defer crossorigin></script>`
      }
    </body>
  </html>
`
