// i18n-js's package "main" points to ./dist/require but ships its typings
// from ./typings, so the CJS subpath import has no co-located declarations.
// Re-export the package's public types for that subpath.
declare module 'i18n-js/dist/require' {
  export * from 'i18n-js';
}
