const ApplicationPolicy = require("./application");

module.exports = class SpacePolicy extends ApplicationPolicy {

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
