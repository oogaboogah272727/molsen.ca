// Knowledge Graph Visualization
// Articles as nodes, relationships as edges

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('graph-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = Math.max(500, window.innerHeight - 250);

  // Color scheme by article type
  const colors = {
    foundational: '#8b5cf6',  // purple - theoretical foundations
    core: '#1e293b',          // dark - central framework pieces
    theoretical: '#6b8e23',   // green - theoretical extensions
    empirical: '#f59e0b',     // orange - empirical evidence
    applied: '#4a90a4',       // blue - practical applications
    practice: '#94a3b8'       // gray - practice/advice pieces
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
    .scaleExtent([0.5, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    }));

  // Arrow marker
  svg.append('defs').append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 25)
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
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-600))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(60));

    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('g')
      .data(data.links)
      .join('g');

    link.append('line')
      .attr('stroke', '#bbb')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 1.5)
      .attr('marker-end', 'url(#arrow)');

    // Link labels
    link.append('text')
      .text(d => d.label)
      .attr('font-size', '9px')
      .attr('fill', '#888')
      .attr('text-anchor', 'middle')
      .attr('dy', -5);

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'node')
      .style('cursor', 'pointer')
      .call(drag(simulation));

    // Node circles
    node.append('circle')
      .attr('r', d => d.type === 'core' || d.type === 'foundational' ? 14 : 10)
      .attr('fill', d => colors[d.type] || '#666')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Node labels
    node.append('text')
      .text(d => d.label)
      .attr('x', 18)
      .attr('y', 4)
      .attr('font-size', '11px')
      .attr('fill', '#333')
      .attr('font-family', 'system-ui, -apple-system, sans-serif');

    // Click to navigate
    node.on('click', (event, d) => {
      window.location.href = d.url;
    });

    // Hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'core' || d.type === 'foundational' ? 18 : 14);

      // Show concepts defined
      if (d.defines && d.defines.length > 0) {
        showTooltip(event, d);
      }

      // Highlight connected links
      link.select('line').attr('stroke-opacity', l =>
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.3
      );
      link.select('text').attr('fill-opacity', l =>
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.3
      );
    });

    node.on('mouseout', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'core' || d.type === 'foundational' ? 14 : 10);

      hideTooltip();

      link.select('line').attr('stroke-opacity', 0.8);
      link.select('text').attr('fill-opacity', 1);
    });

    // Update positions on tick
    simulation.on('tick', () => {
      link.select('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      link.select('text')
        .attr('x', d => (d.source.x + d.target.x) / 2)
        .attr('y', d => (d.source.y + d.target.y) / 2);

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

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'graph-tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background', 'white')
    .style('border', '1px solid #ddd')
    .style('border-radius', '4px')
    .style('padding', '8px 12px')
    .style('font-size', '12px')
    .style('font-family', 'system-ui, -apple-system, sans-serif')
    .style('box-shadow', '0 2px 8px rgba(0,0,0,0.1)')
    .style('max-width', '250px')
    .style('z-index', '1000');

  function showTooltip(event, d) {
    tooltip
      .html(`<strong>Defines:</strong><br>${d.defines.join('<br>')}`)
      .style('visibility', 'visible')
      .style('left', (event.pageX + 15) + 'px')
      .style('top', (event.pageY - 10) + 'px');
  }

  function hideTooltip() {
    tooltip.style('visibility', 'hidden');
  }
});
