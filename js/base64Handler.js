/**
 * base64Handler.js
 * - 한글 등 유니코드 문자열을 안전하게 Base64로 인코딩/디코딩하는 유틸 함수
 */

/**
 * UTF-8 문자열을 안전하게 Base64 인코딩
 * @param {string} str - 유니코드 문자열
 * @returns {string} base64 인코딩된 문자열
 */
export function utf8ToB64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * Base64 문자열을 유니코드 문자열로 디코딩
 * @param {string} str - base64 인코딩된 문자열
 * @returns {string} 디코딩된 유니코드 문자열
 */
export function b64ToUtf8(str) {
  return decodeURIComponent(escape(atob(str)));
}
