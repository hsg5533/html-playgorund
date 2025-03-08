/**
 * editor.js
 * - 실제 에디터 기능(코드 미리보기, 해시/로컬 스토리지 저장, 로딩 등) 담당
 */

import { utf8ToB64, b64ToUtf8 } from "./base64Handler.js";

// 1. 페이지 로드 시 실행 (app.js 에서 onload 시점에 initiate() 호출)
export function initiate() {
  // 1) URL 해시에 저장된 Base64 → textarea 복원
  loadFromURL();

  // 2) URL 해시에 데이터가 없으면 로컬스토리지 로딩
  const savedHtml = localStorage.getItem("savedHtml");
  const savedCSS = localStorage.getItem("savedCSS");
  const savedJs = localStorage.getItem("savedJs");

  if (!document.getElementById("html-code").value && savedHtml) {
    document.getElementById("html-code").value = savedHtml;
  }
  if (!document.getElementById("css-code").value && savedCSS) {
    document.getElementById("css-code").value = savedCSS;
  }
  if (!document.getElementById("js-code").value && savedJs) {
    document.getElementById("js-code").value = savedJs;
  }

  // 3) 처음 로드 시점에 iframe 렌더링
  run();

  // 4) 에디터 이벤트/탭/들여쓰기 설정
  attachEditorEvents();
}

// 2. textarea → iframe 미리보기 & URL 해시(Base64) 저장
export function run() {
  const htmlValue = document.getElementById("html-code").value;
  const cssValue =
    "<style>" + document.getElementById("css-code").value + "</style>";
  const jsValue = document.getElementById("js-code").value;

  // (A) iframe에 HTML + CSS 반영
  const outputFrame = document.getElementById("output");
  outputFrame.contentDocument.body.innerHTML = htmlValue + cssValue;

  // (B) JS 실행
  outputFrame.contentWindow.eval(jsValue);

  // (C) URL 해시에 Base64로 저장
  saveToURL();
}

// 3. 현재 코드(HTML/CSS/JS) → JSON → Base64 → URL 해시 반영
function saveToURL() {
  const htmlCode = document.getElementById("html-code").value;
  const cssCode = document.getElementById("css-code").value;
  const jsCode = document.getElementById("js-code").value;

  const codeObject = { html: htmlCode, css: cssCode, js: jsCode };
  const jsonStr = JSON.stringify(codeObject);

  // 한글 안전 인코딩
  const b64 = utf8ToB64(jsonStr);

  // 히스토리 누적 없이 해시만 갱신
  history.replaceState(null, "", "#" + b64);
}

// 4. Base64 해시 → textarea 복원
function loadFromURL() {
  if (!location.hash) return;
  const hashData = location.hash.substring(1); // '#' 제거

  try {
    const decodedJson = b64ToUtf8(hashData);
    const codeObject = JSON.parse(decodedJson);

    if (codeObject.html !== undefined) {
      document.getElementById("html-code").value = codeObject.html;
    }
    if (codeObject.css !== undefined) {
      document.getElementById("css-code").value = codeObject.css;
    }
    if (codeObject.js !== undefined) {
      document.getElementById("js-code").value = codeObject.js;
    }
  } catch (err) {
    console.error("URL 해시 Base64 디코딩 오류:", err);
  }
}

// 5. 탭 전환
export function chooseHtml() {
  document.getElementById("html-code").classList.add("active");
  document.getElementById("css-code").classList.remove("active");
  document.getElementById("js-code").classList.remove("active");
}

export function chooseCss() {
  document.getElementById("html-code").classList.remove("active");
  document.getElementById("css-code").classList.add("active");
  document.getElementById("js-code").classList.remove("active");
}

export function chooseJs() {
  document.getElementById("html-code").classList.remove("active");
  document.getElementById("css-code").classList.remove("active");
  document.getElementById("js-code").classList.add("active");
}

// 6. 로컬스토리지 자동 저장, Tab키 들여쓰기, keyup 시 실시간 렌더링 이벤트 설정
function attachEditorEvents() {
  // (A) 로컬 스토리지 저장
  document.getElementById("html-code").addEventListener("keyup", function () {
    localStorage.setItem("savedHtml", this.value);
  });
  document.getElementById("css-code").addEventListener("keyup", function () {
    localStorage.setItem("savedCSS", this.value);
  });
  document.getElementById("js-code").addEventListener("keyup", function () {
    localStorage.setItem("savedJs", this.value);
  });

  // (B) keyup 시 자동 렌더링
  ["html-code", "css-code", "js-code"].forEach((id) => {
    document.getElementById(id).addEventListener("keyup", run);
  });

  // (C) Tab 키로 들여쓰기
  ["html-code", "css-code", "js-code"].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        // 탭 문자열(\t) 삽입
        this.value =
          this.value.substring(0, start) + "\t" + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 1;
      }
    });
  });
}
