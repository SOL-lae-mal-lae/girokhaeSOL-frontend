import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.plugins('import', 'prettier'),
	...compat.extends('plugin:prettier/recommended', 'plugin:import/recommended'),
	{
		ignores: ['node_modules/', '.next/'],
	},
	{
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project: './tsconfig.json',
				},
			},
		},
	},
	{
		rules: {
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling'],
						'index',
						'object',
						'type',
					],
					pathGroups: [
						{
							pattern: 'react',
							group: 'builtin',
							position: 'before',
						},
						{
							pattern: 'next/**',
							group: 'builtin',
							position: 'before',
						},
						{
							pattern: '@/**',
							group: 'internal',
							position: 'after',
						},
					],
					pathGroupsExcludedImportTypes: ['react', 'next'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/no-unresolved': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
		},
	},
];

export default eslintConfig;
