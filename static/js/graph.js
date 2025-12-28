// Knowledge Graph Visualization
// Uses D3.js force-directed layout

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('graph-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = Math.max(600, window.innerHeight - 200);

  // Color scheme by node type
  const colors = {
    pattern: '#4a90a4',
    problem: '#c44536',
    concept: '#6b8e23',
    framework: '#8b5cf6',
    claim: '#f59e0b',
    article: '#1e293b'
  };

  // Create SVG
  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height]);

  // Add zoom behavior
  const g = svg.append('g');

  svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([0.3, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    }));

  // Arrow marker for directed edges
  svg.append('defs').selectAll('marker')
    .data(['creates', 'solves', 'implements', 'foundationalTo', 'definedIn', 'discussedIn', 'isVariantOf', 'doesNotSolve', 'enables', 'motivates', 'componentOf'])
    .join('marker')
    .attr('id', d => `arrow-${d}`)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 20)
    .attr('refY', 0)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('fill', '#999')
    .attr('d', 'M0,-5L10,0L0,5');

  // Load data
  d3.json('/js/knowledge-graph.json').then(data => {
    // Create force simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'node')
      .call(drag(simulation));

    // Node circles
    node.append('circle')
      .attr('r', d => d.type === 'article' ? 12 : 8)
      .attr('fill', d => colors[d.type] || '#666')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', d => d.url ? 'pointer' : 'default');

    // Node labels
    node.append('text')
      .text(d => d.label)
      .attr('x', 15)
      .attr('y', 4)
      .attr('font-size', '11px')
      .attr('fill', '#333')
      .attr('font-family', 'system-ui, -apple-system, sans-serif');

    // Click handler for articles
    node.on('click', (event, d) => {
      if (d.url) {
        window.location.href = d.url;
      } else {
        showConceptInfo(d, data);
      }
    });

    // Hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'article' ? 16 : 12);

      // Highlight connected links
      link.attr('stroke-opacity', l =>
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.2
      );
    });

    node.on('mouseout', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'article' ? 12 : 8);

      link.attr('stroke-opacity', 0.6);
    });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag behavior
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  });

  // Show concept info panel
  function showConceptInfo(concept, data) {
    const existing = document.getElementById('concept-panel');
    if (existing) existing.remove();

    const relatedArticles = data.links
      .filter(l => l.source.id === concept.id && l.target.type === 'article')
      .map(l => l.target);

    const panel = document.createElement('div');
    panel.id = 'concept-panel';
    panel.innerHTML = `
      <button class="close-panel" onclick="this.parentElement.remove()">×</button>
      <h3>${concept.label}</h3>
      <p class="concept-type">${concept.type}</p>
      <p>${concept.description || ''}</p>
      ${relatedArticles.length > 0 ? `
        <h4>Related Articles</h4>
        <ul>
          ${relatedArticles.map(a => `<li><a href="${a.url}">${a.label}</a></li>`).join('')}
        </ul>
      ` : ''}
    `;
    container.appendChild(panel);
  }
});
