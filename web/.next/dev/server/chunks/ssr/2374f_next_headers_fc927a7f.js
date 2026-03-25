module.exports = [
"[project]/web/node_modules/next/headers.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/2374f_next_37b58b7e._.js",
  "server/chunks/ssr/[externals]_next_dist_server_app-render_7c4bb6f7._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/web/node_modules/next/headers.js [app-ssr] (ecmascript)");
    });
});
}),
];