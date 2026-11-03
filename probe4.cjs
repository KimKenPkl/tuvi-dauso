const { astro } = require('iztro');
const a = astro.bySolar('1998-9-22', 2, '男', true, 'zh-CN');
console.log('rawDates:', JSON.stringify(a.rawDates, null, 1));
console.log('soul:', a.soul, 'body:', a.body);
console.log('earthlyBranchOfBodyPalace:', a.earthlyBranchOfBodyPalace, '| ofSoul:', a.earthlyBranchOfSoulPalace);
console.log('gender:', a.gender);
const a2 = astro.byLunar('2020-4-1', 6, '女', false, true, 'zh-CN');
console.log('byLunar -> solar:', a2.solarDate, '| lunar:', a2.lunarDate, '| raw:', JSON.stringify(a2.rawDates.lunarDate));
