import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          {/* <link rel="shortcut icon"} /> */}
          {/* <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={require("assets/img/apple-icon.png")}
          /> */}
          {/* Fonts and icons */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
          />
          <script async src="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/jvectormap/2.0.4/jquery-jvectormap.css"
            type="text/css"
            media="screen"
          />
          {/* <link
            rel="stylesheet"
            href="//cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css"
            type="text/css"
            media="screen"
          /> */}
          <link
            href="https://use.fontawesome.com/releases/v5.0.7/css/all.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons&display=swap"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
            rel="stylesheet"
          />
          <script async src="https://kit.fontawesome.com/e6650453fe.js" crossOrigin="anonymous"></script>
          <script async src="https://js.stripe.com/v3/"></script>
        </Head>
        <body>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default MyDocument;
