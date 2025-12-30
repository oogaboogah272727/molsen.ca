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
      name: "All Concepts",
      description: "List all concepts in the ontology",
      query: `SELECT ?concept ?label ?comment WHERE {
  ?concept rdfs:label ?label .
  OPTIONAL { ?concept rdfs:comment ?comment }
  FILTER(STRSTARTS(STR(?concept), "http://molsen.ca/ontology#"))
}
ORDER BY ?label`
    },
    {
      name: "All Articles",
      description: "List all articles with their types",
      query: `SELECT ?article ?label ?type ?comment WHERE {
  ?article a mo:Article ;
           rdfs:label ?label .
  OPTIONAL { ?article mo:hasType ?typeUri . ?typeUri rdfs:label ?type }
  OPTIONAL { ?article rdfs:comment ?comment }
}
ORDER BY ?label`
    },
    {
      name: "What solves problems?",
      description: "Find concepts that solve problems",
      query: `SELECT ?solver ?solverLabel ?problem ?problemLabel WHERE {
  ?solver mo:solves ?problem .
  ?solver rdfs:label ?solverLabel .
  ?problem rdfs:label ?problemLabel .
}
ORDER BY ?problemLabel`
    },
    {
      name: "What creates problems?",
      description: "Find concepts that create problems",
      query: `SELECT ?creator ?creatorLabel ?problem ?problemLabel WHERE {
  ?creator mo:creates ?problem .
  ?creator rdfs:label ?creatorLabel .
  ?problem rdfs:label ?problemLabel .
}
ORDER BY ?problemLabel`
    },
    {
      name: "Foundation chain",
      description: "What is foundational to what?",
      query: `SELECT ?foundation ?foundationLabel ?target ?targetLabel WHERE {
  ?foundation mo:foundationalTo ?target .
  ?foundation rdfs:label ?foundationLabel .
  ?target rdfs:label ?targetLabel .
}
ORDER BY ?foundationLabel`
    },
    {
      name: "Concept dependencies",
      description: "What requires what?",
      query: `SELECT ?concept ?conceptLabel ?requires ?requiresLabel WHERE {
  ?concept mo:requires ?requires .
  ?concept rdfs:label ?conceptLabel .
  ?requires rdfs:label ?requiresLabel .
}
ORDER BY ?conceptLabel`
    },
    {
      name: "Where is X defined?",
      description: "Find where concepts are authoritatively defined",
      query: `SELECT ?concept ?conceptLabel ?article ?articleLabel WHERE {
  ?concept mo:definedIn ?article .
  ?concept rdfs:label ?conceptLabel .
  ?article rdfs:label ?articleLabel .
}
ORDER BY ?articleLabel`
    },
    {
      name: "Verification Paradox",
      description: "Everything related to the Verification Paradox",
      query: `SELECT ?relation ?concept ?conceptLabel WHERE {
  {
    ?concept mo:creates mo:VerificationParadox .
    BIND("creates" AS ?relation)
  } UNION {
    ?concept mo:solves mo:VerificationParadox .
    BIND("solves" AS ?relation)
  } UNION {
    ?concept mo:doesNotSolve mo:VerificationParadox .
    BIND("does not solve" AS ?relation)
  }
  ?concept rdfs:label ?conceptLabel .
}
ORDER BY ?relation`
    },
    {
      name: "EKA dependencies",
      description: "What does Executable Knowledge Architecture require and produce?",
      query: `SELECT ?relation ?thing ?thingLabel WHERE {
  {
    mo:ExecutableKnowledgeArchitecture mo:requires ?thing .
    BIND("requires" AS ?relation)
  } UNION {
    mo:ExecutableKnowledgeArchitecture mo:implements ?thing .
    BIND("implements" AS ?relation)
  } UNION {
    mo:ExecutableKnowledgeArchitecture mo:produces ?thing .
    BIND("produces" AS ?relation)
  } UNION {
    mo:ExecutableKnowledgeArchitecture mo:solves ?thing .
    BIND("solves" AS ?relation)
  }
  ?thing rdfs:label ?thingLabel .
}
ORDER BY ?relation`
    },
    {
      name: "Article → Concepts map",
      description: "Which concepts are defined in which articles?",
      query: `SELECT ?articleLabel (GROUP_CONCAT(?conceptLabel; separator=", ") AS ?concepts) WHERE {
  ?concept mo:definedIn ?article .
  ?concept rdfs:label ?conceptLabel .
  ?article rdfs:label ?articleLabel .
}
GROUP BY ?articleLabel
ORDER BY ?articleLabel`
    }
  ];

  let engine = null;
  let store = null;

  async function init() {
    const container = document.getElementById('explorer-container');
    if (!container) return;

    // Show loading state
    container.innerHTML = '<p class="loading">Loading ontology...</p>';

    try {
      // Initialize Comunica
      engine = new Comunica.QueryEngine();

      // Fetch and parse the TTL file
      const response = await fetch('/ontology/knowledge-graph.ttl');
      const ttlContent = await response.text();

      // Create an N3 store and parse the TTL
      store = new N3.Store();
      const parser = new N3.Parser();
      const quads = parser.parse(ttlContent);
      store.addQuads(quads);

      // Render the UI
      renderUI(container);

      // Run initial query
      runQuery(STARTER_QUERIES[0].query);

    } catch (err) {
      console.error('Init error:', err);
      container.innerHTML = '<p class="error">Error loading ontology: ' + err.message + '</p>';
    }
  }

  function renderUI(container) {
    container.innerHTML = `
      <div class="explorer-layout">
        <div class="query-panel">
          <h3>Query Builder</h3>

          <div class="starter-queries">
            <label>Starter Queries:</label>
            <select id="starter-select">
              ${STARTER_QUERIES.map((q, i) =>
                `<option value="${i}">${q.name}</option>`
              ).join('')}
            </select>
            <p id="query-description" class="query-desc">${STARTER_QUERIES[0].description}</p>
          </div>

          <div class="query-editor">
            <label>SPARQL Query:</label>
            <textarea id="query-input" rows="12">${STARTER_QUERIES[0].query}</textarea>
          </div>

          <div class="query-actions">
            <button id="run-query" class="btn-primary">Run Query</button>
            <button id="clear-query" class="btn-secondary">Clear</button>
          </div>

          <div class="prefixes-info">
            <details>
              <summary>Available Prefixes</summary>
              <pre>mo: = http://molsen.ca/ontology#
article: = http://molsen.ca/writing/
rdf: = standard RDF
rdfs: = standard RDFS</pre>
            </details>
          </div>

          <div class="predicates-info">
            <details>
              <summary>Available Predicates</summary>
              <ul>
                <li><code>mo:solves</code> - concept solves problem</li>
                <li><code>mo:creates</code> - concept creates problem</li>
                <li><code>mo:doesNotSolve</code> - explicitly doesn't solve</li>
                <li><code>mo:requires</code> - depends on</li>
                <li><code>mo:extends</code> - builds on</li>
                <li><code>mo:foundationalTo</code> - provides foundation for</li>
                <li><code>mo:enables</code> - makes possible</li>
                <li><code>mo:implements</code> - realizes pattern</li>
                <li><code>mo:produces</code> - outputs</li>
                <li><code>mo:governs</code> - constrains</li>
                <li><code>mo:scales</code> - applies at larger scope</li>
                <li><code>mo:definedIn</code> - authoritative source</li>
                <li><code>mo:discussedIn</code> - mentioned in article</li>
                <li><code>mo:threatens</code> - poses risk to</li>
                <li><code>mo:mitigates</code> - reduces</li>
              </ul>
            </details>
          </div>
        </div>

        <div class="results-panel">
          <h3>Results</h3>
          <div id="results-container">
            <p class="hint">Select a query and click "Run Query"</p>
          </div>
        </div>
      </div>
    `;

    // Attach event listeners
    document.getElementById('starter-select').addEventListener('change', (e) => {
      const idx = parseInt(e.target.value);
      const q = STARTER_QUERIES[idx];
      document.getElementById('query-input').value = q.query;
      document.getElementById('query-description').textContent = q.description;
    });

    document.getElementById('run-query').addEventListener('click', () => {
      const query = document.getElementById('query-input').value;
      runQuery(query);
    });

    document.getElementById('clear-query').addEventListener('click', () => {
      document.getElementById('query-input').value = '';
      document.getElementById('results-container').innerHTML = '<p class="hint">Enter a query and click "Run Query"</p>';
    });

    // Allow Ctrl+Enter to run query
    document.getElementById('query-input').addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        runQuery(document.getElementById('query-input').value);
      }
    });
  }

  async function runQuery(queryBody) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '<p class="loading">Running query...</p>';

    const fullQuery = PREFIXES + '\n' + queryBody;

    try {
      const bindingsStream = await engine.queryBindings(fullQuery, {
        sources: [store]
      });

      const bindings = await bindingsStream.toArray();

      if (bindings.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
        return;
      }

      // Get variable names from first result
      const vars = [...bindings[0].keys()].map(k => k.value);

      // Build results table
      let html = `<p class="result-count">${bindings.length} result${bindings.length === 1 ? '' : 's'}</p>`;
      html += '<div class="results-table-wrapper"><table class="results-table"><thead><tr>';
      vars.forEach(v => {
        html += `<th>${v}</th>`;
      });
      html += '</tr></thead><tbody>';

      bindings.forEach(binding => {
        html += '<tr>';
        vars.forEach(v => {
          const term = binding.get(v);
          let value = term ? term.value : '';

          // Make URIs clickable if they're articles
          if (value.startsWith('http://molsen.ca/writing/')) {
            const slug = value.replace('http://molsen.ca/writing/', '');
            value = `<a href="/writing/${slug}" target="_blank">${slug}</a>`;
          } else if (value.startsWith('http://molsen.ca/ontology#')) {
            value = value.replace('http://molsen.ca/ontology#', 'mo:');
          }

          html += `<td>${value}</td>`;
        });
        html += '</tr>';
      });

      html += '</tbody></table></div>';
      resultsContainer.innerHTML = html;

    } catch (err) {
      console.error('Query error:', err);
      resultsContainer.innerHTML = `<p class="error">Query error: ${err.message}</p>`;
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
