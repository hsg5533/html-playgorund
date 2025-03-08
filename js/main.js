/**
 * app.js
 * - 페이지가 로드될 때, editor.js 의 initiate() 호출
 * - HTML 탭 전환 버튼 등에 대한 onclick(이벤트)도 여기서 연결
 */

import { initiate, chooseHtml, chooseCss, chooseJs } from "./editor.js";

// 1. 페이지 로드 시점에 initiate() 실행
window.onload = () => {
  initiate();

  // 필요하다면, 탭 전환 버튼의 onclick을 여기서 지정할 수도 있음
  document.getElementById("tab-html").onclick = chooseHtml;
  document.getElementById("tab-css").onclick = chooseCss;
  document.getElementById("tab-js").onclick = chooseJs;
};
