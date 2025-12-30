// Ontology Explorer with SPARQL Query Builder
// Uses Comunica for client-side SPARQL queries

(function() {
  'use strict';

  const PREFIXES = `
    PREFIX mo: <http://molsen.ca/ontology#>
    PREFIX article: <http://molsen.ca/writing/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  `;

  const STARTER_QUERIES = [
    {
      name: "Concepts",
      query: `SELECT ?label ?comment ?article WHERE {
  ?concept rdfs:label ?label .
  OPTIONAL { ?concept rdfs:comment ?comment }
  OPTIONAL { ?concept mo:definedIn ?article }
  FILTER(STRSTARTS(STR(?concept), "http://molsen.ca/ontology#"))
}
ORDER BY ?label`
    },
    {
      name: "Articles",
      query: `SELECT ?article ?type ?comment WHERE {
  ?article a mo:Article ;
           rdfs:label ?label .
  OPTIONAL { ?article mo:hasType ?typeUri . ?typeUri rdfs:label ?type }
  OPTIONAL { ?article rdfs:comment ?comment }
}
ORDER BY ?label`
    },
    {
      name: "Solves",
      query: `SELECT ?solver ?problem ?article WHERE {
  ?s mo:solves ?p .
  ?s rdfs:label ?solver .
  ?p rdfs:label ?problem .
  OPTIONAL { ?s mo:definedIn ?article }
}
ORDER BY ?problem`
    },
    {
      name: "Creates",
      query: `SELECT ?creator ?problem ?article WHERE {
  ?c mo:creates ?p .
  ?c rdfs:label ?creator .
  ?p rdfs:label ?problem .
  OPTIONAL { ?c mo:definedIn ?article }
}
ORDER BY ?problem`
    },
    {
      name: "Foundations",
      query: `SELECT ?foundation ?enables ?article WHERE {
  ?f mo:foundationalTo ?t .
  ?f rdfs:label ?foundation .
  ?t rdfs:label ?enables .
  OPTIONAL { ?f mo:definedIn ?article }
}
ORDER BY ?foundation`
    },
    {
      name: "Dependencies",
      query: `SELECT ?concept ?requires ?article WHERE {
  ?c mo:requires ?r .
  ?c rdfs:label ?concept .
  ?r rdfs:label ?requires .
  OPTIONAL { ?c mo:definedIn ?article }
}
ORDER BY ?concept`
    },
    {
      name: "Definitions",
      query: `SELECT ?concept ?article WHERE {
  ?c mo:definedIn ?article .
  ?c rdfs:label ?concept .
}
ORDER BY ?concept`
    },
    {
      name: "Verification Paradox",
      query: `SELECT ?relation ?concept ?article WHERE {
  {
    ?c mo:creates mo:VerificationParadox .
    BIND("creates" AS ?relation)
  } UNION {
    ?c mo:solves mo:VerificationParadox .
    BIND("solves" AS ?relation)
  } UNION {
    ?c mo:doesNotSolve mo:VerificationParadox .
    BIND("doesn't solve" AS ?relation)
  }
  ?c rdfs:label ?concept .
  OPTIONAL { ?c mo:definedIn ?article }
}
ORDER BY ?relation`
    },
    {
      name: "EKA",
      query: `SELECT ?relation ?concept ?article WHERE {
  {
    mo:ExecutableKnowledgeArchitecture mo:requires ?t .
    BIND("requires" AS ?relation)
  } UNION {
    mo:ExecutableKnowledgeArchitecture mo:implements ?t .
    BIND("implements" AS ?relation)
  } UNION {
    mo:ExecutableKnowledgeArchitecture mo:produces ?t .
    BIND("produces" AS ?relation)
  } UNION {
    mo:ExecutableKnowledgeArchitecture mo:solves ?t .
    BIND("solves" AS ?relation)
  }
  ?t rdfs:label ?concept .
  OPTIONAL { ?t mo:definedIn ?article }
}
ORDER BY ?relation`
    }
  ];

  let engine = null;
  let store = null;
  let activeQuery = 0;

  async function init() {
    const container = document.getElementById('explorer-container');
    if (!container) return;

    container.innerHTML = '<p class="explorer-loading">Loading ontology...</p>';

    try {
      engine = new Comunica.QueryEngine();

      const response = await fetch('/ontology/knowledge-graph.ttl');
      const ttlContent = await response.text();

      store = new N3.Store();
      const parser = new N3.Parser();
      const quads = parser.parse(ttlContent);
      store.addQuads(quads);

      renderUI(container);
      runQuery(STARTER_QUERIES[0].query);

    } catch (err) {
      console.error('Init error:', err);
      container.innerHTML = '<p class="explorer-error">Error loading ontology: ' + err.message + '</p>';
    }
  }

  function renderUI(container) {
    container.innerHTML = `
      <div class="query-buttons">
        ${STARTER_QUERIES.map((q, i) =>
          `<button class="query-btn${i === 0 ? ' active' : ''}" data-idx="${i}">${q.name}</button>`
        ).join('')}
        <button class="query-btn query-btn-custom" data-idx="-1">Custom</button>
      </div>

      <div id="custom-query" class="custom-query hidden">
        <textarea id="query-input" rows="8" placeholder="Write your SPARQL query here...">${STARTER_QUERIES[0].query}</textarea>
        <div class="custom-query-actions">
          <button id="run-custom" class="btn-run">Run Query</button>
          <span class="query-hint">Prefixes: mo:, article:, rdf:, rdfs: | Predicates: solves, creates, requires, foundationalTo, definedIn</span>
        </div>
      </div>

      <div id="results-container" class="results-container">
        <p class="explorer-hint">Select a query above</p>
      </div>
    `;

    // Query button clicks
    container.querySelectorAll('.query-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.query-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const idx = parseInt(btn.dataset.idx);
        const customPanel = document.getElementById('custom-query');

        if (idx === -1) {
          customPanel.classList.remove('hidden');
        } else {
          customPanel.classList.add('hidden');
          activeQuery = idx;
          document.getElementById('query-input').value = STARTER_QUERIES[idx].query;
          runQuery(STARTER_QUERIES[idx].query);
        }
      });
    });

    // Custom query run
    document.getElementById('run-custom').addEventListener('click', () => {
      runQuery(document.getElementById('query-input').value);
    });

    // Ctrl+Enter to run
    document.getElementById('query-input').addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        runQuery(document.getElementById('query-input').value);
      }
    });
  }

  async function runQuery(queryBody) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '<p class="explorer-loading">Running...</p>';

    const fullQuery = PREFIXES + '\n' + queryBody;

    try {
      const bindingsStream = await engine.queryBindings(fullQuery, {
        sources: [store]
      });

      const bindings = await bindingsStream.toArray();

      if (bindings.length === 0) {
        resultsContainer.innerHTML = '<p class="explorer-empty">No results</p>';
        return;
      }

      const vars = [...bindings[0].keys()].map(k => k.value);

      let html = `<div class="results-header">${bindings.length} result${bindings.length === 1 ? '' : 's'}</div>`;
      html += '<table class="results-table"><thead><tr>';
      vars.forEach(v => {
        html += `<th>${v}</th>`;
      });
      html += '</tr></thead><tbody>';

      bindings.forEach(binding => {
        html += '<tr>';
        vars.forEach(v => {
          const term = binding.get(v);
          let value = term ? term.value : '';

          if (value.startsWith('http://molsen.ca/writing/')) {
            const slug = value.replace('http://molsen.ca/writing/', '');
            value = `<a href="/writing/${slug}">${slug.replace(/-/g, ' ')}</a>`;
          } else if (value.startsWith('http://molsen.ca/ontology#')) {
            value = value.replace('http://molsen.ca/ontology#', '');
          }

          html += `<td>${value}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table>';
      resultsContainer.innerHTML = html;

    } catch (err) {
      console.error('Query error:', err);
      resultsContainer.innerHTML = `<p class="explorer-error">Error: ${err.message}</p>`;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
