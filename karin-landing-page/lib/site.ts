export const SITE = {
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  phone: "+18172914860",
  sms: "sms:+18172914860",
  stagingOne: "https://www.youtube.com/watch?v=e1ecj15Kd4I",
  stagingTwo: "https://www.youtube.com/watch?v=nKKLnFUBojY",
  consumerNotice: "https://www.trec.texas.gov/forms/consumer-protection-notice",
  iabs: "https://www.trec.texas.gov/forms/information-about-brokerage-services",
};
