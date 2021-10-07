module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/recommended', '@vue/prettier'],
	plugins: ['prettier', 'import', 'simple-import-sort'],
	rules: {
		'no-undef': 'off',
		quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
		'vue/no-mutating-props': 'off',
		'import/extensions': ['error', 'never', { vue: 'always' }],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'vue/no-v-html': 'off',
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
		{
			files: ['*.js'],
			rules: {
				'no-undef': 'error',
			},
		},
	],
};
