// Eligible School list: search + render. Page text comes from window.STUDENT_PAGE.
(function () {
  var page = window.STUDENT_PAGE;
  var isZh = page.lang === "zh";
  var collator = new Intl.Collator(isZh ? "zh-Hant-u-co-stroke" : "en", { sensitivity: "base" });

  var schools = window.SCHOOLS.map(function (s) {
    return {
      name: isZh ? s.zh : s.en,
      altName: isZh ? s.en : s.zh,
      domains: s.domains,
      haystack: [s.en, s.zh].concat(s.domains).join("\n").toLowerCase()
    };
  }).sort(function (a, b) { return collator.compare(a.name, b.name); });

  var input = document.getElementById("search");
  var list = document.getElementById("schoolList");
  var count = document.getElementById("resultCount");
  var empty = document.getElementById("empty");
  var langLink = document.getElementById("langLink");

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function render() {
    var raw = input.value.trim();
    var q = raw.toLowerCase().replace(/^@/, "");
    var matches = q ? schools.filter(function (s) { return s.haystack.indexOf(q) !== -1; }) : schools;

    list.innerHTML = matches.map(function (s) {
      return '<li class="school-card"><div class="name">' + escapeHtml(s.name) + "</div>" +
        (s.altName !== s.name ? '<div class="alt-name">' + escapeHtml(s.altName) + "</div>" : "") +
        '<div class="domains">' + s.domains.map(function (d) {
          return '<span class="domain">@' + escapeHtml(d) + "</span>";
        }).join("") + "</div></li>";
    }).join("");

    count.textContent = q ? page.countFound(matches.length) : page.countAll(schools.length);
    empty.hidden = matches.length > 0;

    var params = raw ? "?q=" + encodeURIComponent(raw) : "";
    langLink.href = page.otherLangPath + params;
    history.replaceState(null, "", location.pathname + params);
  }

  input.value = new URLSearchParams(location.search).get("q") || "";
  input.addEventListener("input", render);
  render();

  window.copyTemplate = function (btn) {
    var text = document.getElementById("template").textContent.trim();
    function done() {
      var t = btn.textContent;
      btn.textContent = page.copied;
      btn.classList.add("copied");
      setTimeout(function () { btn.textContent = t; btn.classList.remove("copied"); }, 2200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done);
    } else {
      var ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      done();
    }
  };
})();
