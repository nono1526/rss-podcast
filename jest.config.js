module.exports = {
  moduleNameMapper: {
    '^@src(.*)$': '<rootDir>/src$1'
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.[jt]sx?$': 'babel-jest'
  }
}
