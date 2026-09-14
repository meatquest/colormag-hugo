(() => {
  const menuButton = document.querySelector(".cm-menu-toggle");
  const menu = document.querySelector("#primary-menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        menuButton.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      }
    });
  }

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    const updateButton = () => {
      backToTop.hidden = window.scrollY < 500;
    };
    window.addEventListener("scroll", updateButton, { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    updateButton();
  }

  const searchPage = document.querySelector("[data-search-page]");
  if (!searchPage) return;

  const form = searchPage.querySelector(".cm-search-form");
  const input = form?.querySelector('input[name="q"]');
  const status = searchPage.querySelector(".cm-search-status");
  const results = searchPage.querySelector(".cm-search-results");
  const indexUrl = searchPage.dataset.indexUrl;
  const emptyMessage = searchPage.dataset.emptyMessage || "Enter a search query.";
  const singularResult = searchPage.dataset.resultsSingular || "result";
  const pluralResults = searchPage.dataset.resultsPlural || "results";
  const errorMessage = searchPage.dataset.errorMessage || "Unable to load the search index.";
  let index = [];

  const escapeHtml = (value) => {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
  };

  const normalize = (value) => String(value || "").normalize("NFKC").toLowerCase();

  const render = (query) => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (!terms.length) {
      status.textContent = emptyMessage;
      results.replaceChildren();
      return;
    }

    const matches = index.filter((item) => {
      const haystack = normalize([
        item.title,
        item.description,
        item.content,
        ...(item.categories || []),
        ...(item.tags || []),
      ].join(" "));
      return terms.every((term) => haystack.includes(term));
    }).slice(0, 30);

    status.textContent = `${matches.length} ${matches.length === 1 ? singularResult : pluralResults} found.`;
    results.innerHTML = matches.map((item) => `
      <article class="cm-search-result">
        <h2><a href="${encodeURI(item.url)}">${escapeHtml(item.title)}</a></h2>
        <div class="cm-search-result-meta">${escapeHtml(item.date)}${item.categories?.length ? ` · ${escapeHtml(item.categories.join(" / "))}` : ""}</div>
        <p>${escapeHtml(item.description || "")}</p>
      </article>
    `).join("");
  };

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  if (input) input.value = initialQuery;

  fetch(indexUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((data) => {
      index = Array.isArray(data) ? data : [];
      render(initialQuery);
    })
    .catch(() => {
      status.textContent = errorMessage;
    });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input?.value.trim() || "";
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", url);
    render(query);
  });
})();
