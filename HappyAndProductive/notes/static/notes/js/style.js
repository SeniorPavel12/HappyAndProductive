const html = document.querySelectorAll('html')[0];

const styleHtml = getComputedStyle(html);

const widthHtml = parseInt(styleHtml.width);

/*!--Навигационная секция--start--!*/

const navigationSection = document.querySelectorAll('.navigation_section')[0];
const styleNavigationSection = getComputedStyle(navigationSection);
const widthNavigationSection = parseInt(styleNavigationSection.width);

/*!--Навигационная секция--end--!*/


/*!--Информационная секция--start--!*/

const infoSection = document.querySelectorAll('.info_section')[0];
const styleInfoSection = getComputedStyle(infoSection);
const widthInfoSection = parseInt(styleInfoSection.width);

/*!--Информационная секция--end--!*/


/*!--Главная секция--start--!*/

const mainSection = document.querySelectorAll('.main_section')[0];
const styleMainSection = getComputedStyle(mainSection);
const widthMainSection = parseInt(styleMainSection.width);

/*!--Главная секция--end--!*/


/*!--Детальная секция--start--!*/

const detailSection = document.querySelectorAll('.detail_section')[0];
const styleDetailSection = getComputedStyle(detailSection);

detailSection.style.cssText = `width: ${widthHtml - widthNavigationSection - widthInfoSection - widthMainSection}px;`

/*!--Детальная секция--end--!*/