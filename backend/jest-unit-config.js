const config = require('./jest.config')
config.testPathIgnorePatterns = ['<rootDir>/src/infra/db/repositories']
config.testMatch = ['**/*.spec.ts']
module.exports = config
