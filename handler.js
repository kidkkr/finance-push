"use strict";

const { getAuthToken, getSpreadSheetValues } = require("./lib.js");
const fetch = require("isomorphic-fetch");

function formatValues(values) {
  return values
    .map(([name, _, price, change]) => `[${name}]\n${price}\n${change}$`)
    .join("\n\n");
}

module.exports.financePush = async () => {
  try {
    // Get finance data from Google Sheets
    const auth = await getAuthToken();
    const { data } = await getSpreadSheetValues({
      auth,
      spreadsheetId: process.env.SPREADSHEET_ID,
      sheetName: process.env.SHEET_NAME,
    });

    if (!data || !data.values || data.values.length < 2)
      throw new Error("No data fetched");

    const reqBody = {
      user: process.env.PUSHOVER_USER,
      token: process.env.PUSHOVER_TOKEN,
      message: formatValues(data.values.slice(1)),
    };
    // Send to Pushover
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
