const common = [
  '--require-module ts-node/register' // Load TypeScript module
];

const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature',
  '--require tests/apps/backoffice/backend/features/step_definitions/*.steps.ts'
].join(' ');
const mooc_backend = [
  ...common,
  'tests/apps/mooc/backend/features/**/*.feature',
  '--require tests/apps/mooc/backend/features/step_definitions/*.steps.ts'
].join(' ');

const policy_backend = [
  ...common,
  'tests/apps/policy/*.feature',
  '--require tests/apps/policy/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  backoffice_backend,
  mooc_backend,
  policy_backend
};
