// import from https://apis.google.com/js/api.js

export function authenticate() {
  gapi.auth2.getAuthInstance().signIn().then(() => {
    console.log("Success to autheticate")
  }).catch(error => {
    console.error("Failed to authenticate")
    console.error(error)
  })
}

export function getSheetData() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: "YOUR_SHEET_ID",
    range: "SHEET_NAME_IN_SPREADSHEET"
  }).then(response => {
    console.log(response)
  })
}

gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: "YOUR_API_KEY",
    clientId: "YOUR_CLIENT_ID",
    discoveryDocs: [
      "https://sheets.googleapis.com/$discovery/rest?version=v4"
    ],
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
  }).then(() => {
    console.log("Success to initialize Google API Client")
  })
    .catch(error => {
      console.error("Failed to initialize Google API Client")
      console.error(error)
    })
})
