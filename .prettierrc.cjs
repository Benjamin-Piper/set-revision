module.exports = {
    // import sorting taken from https://dev.to/diballesteros/how-to-quickly-sort-imports-with-prettier-3po7
    importOrder: ["^@/common/(.*)$", "^@/components/(.*)$", "^[./]" ],
    importOrderSeparation: true, 
    importOrderSortSpecifiers: true,
    tabWidth: 4,
};
