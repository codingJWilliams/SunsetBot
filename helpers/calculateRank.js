module.exports = (level) => {
  var reward = 0;
  var rank = "Initiate";
  if (level == 5) {
    reward = 50000;
  }
  if (level == 10) {
    reward = 100000;
  }
  if (level == 20) {
    reward = 250000;
  }
  if (level == 30) {
    reward = 500000;
  }
  if (level == 40) {
    reward = 1000000;
  }
  if (level == 90) {
    reward = 10000000;
  }
  if (level >= 5) {
    rank = "Initiate";
  }
  if (level >= 10) {
    rank = "Protector";
  }
  if (level >= 20) {
    rank = "Enforcer";
  }
  if (level >= 30) {
    rank = "Veteran";
  }
  if (level >= 40) {
    rank = "Guardian";
  }
  return {
    reward: reward,
    addrank: ({
      "Initiate": "341143713625669632",
      "Protector": "341143798832693248",
      "Enforcer": "341143817552134154",
      "Veteran": "341143835604156428",
      "Guardian": "341143849646686211"
    })[rank]
  };
}
