module.exports = {
    env: {
        browser: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    // Fixes parserOptions.project not matching project.config
    ignorePatterns: ["vite.config.ts"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    plugins: ["react", "@typescript-eslint"],
    root: true,
    rules: {
        "no-console": "error",
        // import React from "react" is no longer necessary
        // https://stackoverflow.com/a/64646593
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
    },
};
