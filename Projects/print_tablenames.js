const { DOMParser } = require('xmldom');
async function getAllTablesFromWebsite(url) {
  const response = await fetch(url);
  const htmlString = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const tables = doc.querySelectorAll('table');
  return Array.from(tables);
}

const tables = getAllTablesFromWebsite('https://www.boc.cn/sourcedb/whpj');
console.log(tables); // prints an array of table elements to the console