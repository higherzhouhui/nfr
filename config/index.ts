// 网站地址
let webUrl = 'http://localhost:10004';
// api
let apiUrl = 'http://anft-api.capsid.one';

if (process.env.APP_ENV === 'development') {
  webUrl = 'http://localhost:10004';
  apiUrl = 'http://anft-api.capsid.one';
}

if (process.env.APP_ENV === 'test') {
  webUrl = 'http://por.capsid.one/';
  apiUrl = 'http://anft-api.capsid.one';
}

if (process.env.APP_ENV === 'production') {
  webUrl = 'http://por.capsid.one/';
  apiUrl = 'http://anft-api.capsid.one';
}

// 固定地址
const discordUrl = 'https://discord.gg/2qu3BVTn7t';
const capsidOneUrl = 'https://www.capsid.one/';
const twitterUrl =
  'https://twitter.com/Capsid_One?t=2Bv4osporUm6UmYUuACsIw&s=09';

const aliOss = 'https://nfr-capsid.oss-us-west-1.aliyuncs.com';

export {webUrl, apiUrl, discordUrl, twitterUrl, capsidOneUrl, aliOss};
