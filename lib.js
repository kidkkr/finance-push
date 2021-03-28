// source: https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f
"use strict";

const { google } = require("googleapis");
const sheets = google.sheets("v4");
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes,
  });
  const authToekn = await auth.getClient();
  return authToekn;
}

async function getSpreadSheet({ spreadsheetId, auth }) {
  const res = await sheets.spreadsheets.get({
    spreadsheetId,
    auth,
  });
  return res;
}

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

async function getSpreadSheetValues({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

module.exports = {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues,
};
