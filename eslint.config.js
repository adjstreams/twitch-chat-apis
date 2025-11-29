// eslint.config.js
import tseslint from "typescript-eslint";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettier, // disables formatting rules that conflict with Prettier

    {
        ignores: [
            "node_modules",
            "dist",
            ".wrangler",
            "worker-configuration.d.ts",
        ],
    },

    {
        files: ["**/*.d.ts"],
        rules: {
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-unused-vars": "off",
        },
    },
    {
        files: ["test/**/*.ts"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
        },
    },

    {
        files: ["src/**/*.ts", "test/**/*.ts"],
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { "argsIgnorePattern": "^_" } // ignore _env, _ctx, _whatever
            ],
            "no-undef": "off", // Cloudflare Workers env types
        },
    },
];
