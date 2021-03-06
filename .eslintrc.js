{
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
  },

  "extends": "eslint:recommended",

  "parser": "babel-eslint",

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },


  "rules": {
    "indent": [2, 2],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
  }
}