// eslint-disable-next-line @typescript-eslint/no-var-requires
const base = require('./.eslintrc')
base.parserOptions.project = './tsconfig.eslint.json'

base.rules['@typescript-eslint/no-floating-promises'] = 'error' // see https://github.com/xjamundx/eslint-plugin-promise/issues/151

// rules which are slower because they require type checking
//https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.json
base.extends.push('plugin:@typescript-eslint/recommended-requiring-type-checking')
base.rules["@typescript-eslint/unbound-method"] = ['error', {'ignoreStatic': true}]
base.rules['@typescript-eslint/no-for-in-array'] = 'warn' // sometimes index is necessary
base.rules['@typescript-eslint/no-unnecessary-type-assertion'] = 'warn' //it has false positives
module.exports = base
