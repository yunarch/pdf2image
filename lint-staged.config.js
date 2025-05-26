/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*': (stagedFiles) => [
    `eslint ${stagedFiles.join(' ')}`,
    'bun run lint:ts',
    `bun run format:all`,
  ],
};
