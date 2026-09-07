import fs from "fs";

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const checks = [
  ["dist/index.html", "Best Web Design", "Digital"],
  ["dist/faqs-web-design-hosting-digital-marketing/index.html", "FAQs", "Frequently Asked"],
  ["dist/android-ios-mobile-app-development-company-baroda/index.html", "Android", "Mobile"],
  ["dist/responsive-website-designing-company-vadodara/index.html", "Responsive", "website"],
];

let failed = false;
for (const [file, titleNeedle, bodyNeedle] of checks) {
  const html = fs.readFileSync(file, "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const text = visibleText(html);
  const ok = title.includes(titleNeedle) && text.includes(bodyNeedle) && text.length > 200;
  console.log(`${ok ? "PASS" : "FAIL"} ${file}`);
  console.log(`  title=${title.slice(0, 72)}`);
  console.log(`  textLen=${text.length} bodyHas="${bodyNeedle}": ${text.includes(bodyNeedle)}`);
  if (!ok) failed = true;
}

const shell = fs.readFileSync("dist/spa-shell.html", "utf8");
const shellEmpty = /<div id="root">\s*<\/div>/.test(shell);
const shellText = visibleText(shell);
console.log(`${shellEmpty ? "PASS" : "FAIL"} spa-shell empty root: ${shellEmpty} (visible extras ok in head)`);

const faqCanon = (fs.readFileSync(checks[1][0], "utf8").match(/rel="canonical" href="([^"]+)"/) || [])[1];
const homeCanon = (fs.readFileSync(checks[0][0], "utf8").match(/rel="canonical" href="([^"]+)"/) || [])[1];
const webHtml = fs.readFileSync(checks[3][0], "utf8");
const webCanon = (webHtml.match(/rel="canonical" href="([^"]+)"/) || [])[1];
const webDesc = (webHtml.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] || "";
const distinct = faqCanon && homeCanon && faqCanon !== homeCanon;
const webOk =
  webCanon === "https://www.dotsandcoms.in/responsive-website-designing-company-vadodara" &&
  /responsive website designing/i.test(webDesc);
console.log(`${distinct ? "PASS" : "FAIL"} distinct canonicals: ${homeCanon} | ${faqCanon}`);
console.log(`${webOk ? "PASS" : "FAIL"} web-design page meta: ${webCanon} | ${webDesc.slice(0, 72)}`);
if (!distinct || !shellEmpty || !webOk) failed = true;

process.exit(failed ? 1 : 0);
