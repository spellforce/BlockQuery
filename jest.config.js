module.exports = {  
  transformIgnorePatterns: ['"<rootDir>/node_modules/(?!(antd|other-es-lib))"'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
    '\\.(less|css)$': 'jest-less-loader'
  },
}