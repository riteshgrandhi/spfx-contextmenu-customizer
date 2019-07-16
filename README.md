## Context Menu Customizer

Context Menu Customizer provides a way for SPFx developers to make customized context menus and actions on top of SharePoint Modern Pages.
Enable Customers to and add Custom Actions without compromising the Modern SharePoint Experience

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean                      - clears last build
gulp test                       - TODO
gulp serve                      - builds solution and serves to url specified in config/serve.json
gulp bundle (--ship)            - compiles and creates minified files for solution, --ship is optional parameter for creating shipping ready bundle
gulp package-solution (--ship)  - create .sppkg package file to deploy in sharepoint tenant, --ship is optional parameter for creating shipping ready package
