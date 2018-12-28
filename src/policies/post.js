const ApplicationPolicy = require("./application");

module.exports = class PostPolicy extends ApplicationPolicy {

  create() {
    return this.new();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }

}
