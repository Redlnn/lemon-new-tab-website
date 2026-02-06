import pluginOxlint from 'eslint-plugin-oxlint'
import pluginVue from 'eslint-plugin-vue'

import { defineFlatConfigs } from '@nuxt/eslint-config'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { vueTsConfigs } from '@vue/eslint-config-typescript'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

// https://eslint.nuxt.com/packages/module
export default defineFlatConfigs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue,js,cjs,mjs,jsx}']
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    name: 'app/overrides',
    rules: {
      'no-var': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    name: 'app/overrides-js',
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.cjx'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting
)
