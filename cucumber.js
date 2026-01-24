module.exports = {
  default: {
    paths: ["tests/features/**/*.feature"],
    require: [
      "tests/step-definitions/**/*.js",
      "tests/hooks/**/*.js"
    ],
    publishQuiet: true
  }
};
