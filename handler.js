"use strict";

const { getAuthToken, getSpreadSheetValues } = require("./lib.js");
const fetch = require("isomorphic-fetch");

module.exports.financePush = async (event) => {
  try {
    const auth = await getAuthToken();
    const { data } = await getSpreadSheetValues({
      auth,
      spreadsheetId: process.env.SPREADSHEET_ID,
      sheetName: process.env.SHEET_NAME,
    });
    const message = data.values
      .slice(1)
      .map(([name, _, price, change]) => `[${name}]\n${price}\n${change}$`)
      .join("\n\n");

    const reqBody = {
      user: process.env.PUSHOVER_USER,
      token: process.env.PUSHOVER_TOKEN,
      message,
    };

    console.log(JSON.stringify(reqBody, null, "\n"));

    await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    return `${data.values.length} items are pushed`;
  } catch (err) {
    console.error(err.message);
  }
};
