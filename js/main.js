function initiate() {
  var e = document.getElementById("html-code"),
    t = document.getElementById("css-code"),
    n = localStorage.savedHtml,
    s = localStorage.savedCSS;
  n && (e.value = n), s && (t.value = s), run();
}
function run() {
  let e = document.querySelector(".editor #html-code").value,
    t =
      "<style>" +
      document.querySelector(".editor #css-code").value +
      "</style>",
    n = document.querySelector(".editor #js-code").value,
    s = document.querySelector(".editor #output");
  console.log(e),
    console.log(t),
    console.log(n),
    console.log(s),
    (s.contentDocument.body.innerHTML = e + t),
    s.contentWindow.eval(n);
}
function chooseHtml() {
  var e = document.getElementById("html-code"),
    t = document.getElementById("css-code"),
    n = document.getElementById("js-code");
  (e.style.display = "flex"),
    (t.style.display = "none"),
    (n.style.display = "none");
}
function chooseCss() {
  var e = document.getElementById("html-code"),
    t = document.getElementById("css-code"),
    n = document.getElementById("js-code");
  (t.style.display = "flex"),
    (e.style.display = "none"),
    (n.style.display = "none");
}
function chooseJs() {
  var e = document.getElementById("html-code"),
    t = document.getElementById("css-code");
  (document.getElementById("js-code").style.display = "flex"),
    (e.style.display = "none"),
    (t.style.display = "none");
}
document.querySelector(".editor #html-code").addEventListener("keyup", run),
  document.querySelector(".editor #css-code").addEventListener("keyup", run),
  document.querySelector(".editor #js-code").addEventListener("keyup", run),
  document
    .getElementById("html-code")
    .addEventListener("keydown", function (e) {
      if ("Tab" == e.key) {
        e.preventDefault();
        var t = this.selectionStart,
          n = this.selectionEnd;
        (this.value =
          this.value.substring(0, t) + "	" + this.value.substring(n)),
          (this.selectionStart = this.selectionEnd = t + 1);
      }
    }),
  document.getElementById("css-code").addEventListener("keydown", function (e) {
    if ("Tab" == e.key) {
      e.preventDefault();
      var t = this.selectionStart,
        n = this.selectionEnd;
      (this.value = this.value.substring(0, t) + "	" + this.value.substring(n)),
        (this.selectionStart = this.selectionEnd = t + 1);
    }
  }),
  document.getElementById("js-code").addEventListener("keydown", function (e) {
    if ("Tab" == e.key) {
      e.preventDefault();
      var t = this.selectionStart,
        n = this.selectionEnd;
      (this.value = this.value.substring(0, t) + "	" + this.value.substring(n)),
        (this.selectionStart = this.selectionEnd = t + 1);
    }
  }),
  document.getElementById("html-code").addEventListener("keyup", function () {
    localStorage.setItem(
      "savedHtml",
      document.getElementById("html-code").value
    );
  }),
  document.getElementById("css-code").addEventListener("keyup", function () {
    localStorage.setItem("savedCSS", document.getElementById("css-code").value);
  }),
  document.getElementById("js-code").addEventListener("keyup", function () {
    localStorage.setItem("savedJs", document.getElementById("js-code").value);
  }),
  (window.onload = initiate());
