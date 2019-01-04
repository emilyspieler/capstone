const ApplicationPolicy = require("./application");

module.exports = class FlagPolicy extends ApplicationPolicy {
  destroy(){
    return this._isOwner();
  }
}
