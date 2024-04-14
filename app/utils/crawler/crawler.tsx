import axios from "axios";
import cheerio from "cheerio";

const Crawler = async (url: string) => {
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    switch (true) {
      case /^https:\/\/www\.acmicpc\.net\/.*/.test(url):
        return {
          siteName: "백준",
          name: $("#problem_title").text(),
        };
      case /^https:\/\/school\.programmers\.co\.kr\/.*/.test(url):
        return {
          siteName: "프로그래머스",
          name: $(
            "body > div.navbar.navbar-dark.navbar-expand-lg.navbar-application.navbar-breadcrumb > ol > li.active"
          ).text(),
        };
      case /^https:\/\/leetcode\.com\/.*/.test(url):
      default:
        return {
          사이트명: "leetCode",
          문제명: $(
            "#b4bdb94e-da8b-3206-dcbe-846c5d1f7ee3 > div > div.flex.w-full.flex-1.flex-col.gap-4.overflow-y-auto.px-4.py-5 > div.flex.items-start.justify-between.gap-4 > div > div > a"
          ).text(),
        };
    }
  } catch (e) {}
};
export default Crawler;
