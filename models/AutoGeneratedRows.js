const generateUniqueRows = (count) => {
    const reasons = ["accepted", "rejected", "modify", ""];
    const comments = {
      accepted: ["ok tested", "good to go", "all set", "ok nice good to go"],
      rejected: ["not good", "needs work", "rejected", "reevaluated"],
      modify: [
        "oks tddested",
        "needs changes",
        "update required",
        "modified control",
      ],
      "": [""],
    };
  
    function uniqueString() {
      return "xxxxxx"
        .replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16))
        .toUpperCase();
    }
  
    function randomDate() {
      const start = new Date(2020, 9, 1); // October 1, 2020
      const end = new Date(2020, 11, 31); // December 31, 2020
      const randomTime =
        start.getTime() + Math.random() * (end.getTime() - start.getTime());
      return new Date(randomTime).toLocaleString("en-GB", { timeZone: "UTC" });
    }
  
    const rows = [];
    const usedNames = new Set();
  
    for (let i = 0; i < count; i++) {
      let name;
      do {
        name = uniqueString();
      } while (usedNames.has(name));
      usedNames.add(name);
  
      const reason = reasons[Math.floor(Math.random() * reasons.length)];
      const comment =
        comments[reason][Math.floor(Math.random() * comments[reason].length)];
  
      // If reason is empty, set requestnumber and datetime to empty as well
      const requestnumber = reason === "" ? "" : name + i;
      const datetime = reason === "" ? "" : randomDate();
  
      const row = {
        id: i + 1,
        name: name,
        reason: reason,
        comment: comment,
        requestnumber: requestnumber,
        datetime: datetime,
      };
      rows.push(row);
    }
  
    return rows;
  };

  module.exports = generateUniqueRows;
  