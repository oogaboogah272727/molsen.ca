// Knowledge Graph Visualization
// Articles + Themes, with multiple relationship types

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('graph-container');
  if (!container) return;

  const width = container.clientWidth;
  const height = Math.max(550, window.innerHeight - 250);

  // Color scheme
  const colors = {
    foundational: '#8b5cf6',
    core: '#1e293b',
    theoretical: '#6b8e23',
    empirical: '#f59e0b',
    applied: '#4a90a4',
    practice: '#64748b',
    theme: '#e2e8f0'
  };

  // Link colors by type
  const linkColors = {
    extends: '#666',
    implements: '#666',
    requires: '#666',
    cites: '#888',
    supports: '#888',
    motivates: '#888',
    prerequisite: '#9ca3af',
    contextualizes: '#9ca3af',
    'same-domain': '#9ca3af',
    parallel: '#9ca3af',
    theme: '#d1d5db'
  };

  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height]);

  const g = svg.append('g');

  svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([0.4, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    }));

  // Arrow markers
  const markerTypes = ['strong', 'weak', 'theme'];
  svg.append('defs').selectAll('marker')
    .data(markerTypes)
    .join('marker')
    .attr('id', d => `arrow-${d}`)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', d => d === 'theme' ? 18 : 22)
    .attr('refY', 0)
    .attr('markerWidth', 5)
    .attr('markerHeight', 5)
    .attr('orient', 'auto')
    .append('path')
    .attr('fill', d => d === 'theme' ? '#d1d5db' : d === 'weak' ? '#9ca3af' : '#888')
    .attr('d', 'M0,-4L8,0L0,4');

  d3.json('/js/knowledge-graph.json').then(data => {
    // Separate theme and article nodes for different forces
    const themeNodes = data.nodes.filter(n => n.type === 'theme');
    const articleNodes = data.nodes.filter(n => n.type !== 'theme');

    // Create simulation with custom forces
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(d =>
        d.type === 'theme' ? 80 : 120
      ))
      .force('charge', d3.forceManyBody().strength(d =>
        d.type === 'theme' ? -200 : -400
      ))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d =>
        d.type === 'theme' ? 30 : 50
      ))
      // Pull themes toward edges
      .force('themeX', d3.forceX(d =>
        d.type === 'theme' ? (d.id.includes('epistemology') || d.id.includes('ai-governance') ? width * 0.15 : width * 0.85) : width / 2
      ).strength(d => d.type === 'theme' ? 0.1 : 0))
      .force('themeY', d3.forceY(d =>
        d.type === 'theme' ? (d.id.includes('epistemology') || d.id.includes('organizational') ? height * 0.2 : height * 0.8) : height / 2
      ).strength(d => d.type === 'theme' ? 0.1 : 0));

    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('g')
      .data(data.links)
      .join('g')
      .attr('class', d => `link-${d.type}`);

    link.append('line')
      .attr('stroke', d => linkColors[d.type] || '#999')
      .attr('stroke-opacity', d => d.type === 'theme' ? 0.4 : 0.7)
      .attr('stroke-width', d => d.type === 'theme' ? 1 : 1.5)
      .attr('stroke-dasharray', d =>
        d.type === 'theme' ? '3,3' :
        ['prerequisite', 'contextualizes', 'same-domain', 'parallel'].includes(d.type) ? '5,3' :
        'none'
      )
      .attr('marker-end', d =>
        d.type === 'theme' ? 'url(#arrow-theme)' :
        ['prerequisite', 'contextualizes', 'same-domain', 'parallel'].includes(d.type) ? 'url(#arrow-weak)' :
        'url(#arrow-strong)'
      );

    // Link labels (only for non-theme links)
    link.filter(d => d.type !== 'theme' && d.label)
      .append('text')
      .text(d => d.label)
      .attr('font-size', '8px')
      .attr('fill', '#888')
      .attr('text-anchor', 'middle')
      .attr('dy', -4);

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', d => `node node-${d.type}`)
      .style('cursor', d => d.url ? 'pointer' : 'default')
      .call(drag(simulation));

    // Different shapes for different node types
    node.each(function(d) {
      const el = d3.select(this);
      if (d.type === 'theme') {
        // Diamond shape for themes
        el.append('polygon')
          .attr('points', '0,-12 12,0 0,12 -12,0')
          .attr('fill', colors.theme)
          .attr('stroke', '#cbd5e1')
          .attr('stroke-width', 2);
      } else {
        // Circle for articles
        el.append('circle')
          .attr('r', d.type === 'core' || d.type === 'foundational' ? 12 : 9)
          .attr('fill', colors[d.type] || '#666')
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);
      }
    });

    // Node labels
    node.append('text')
      .text(d => d.label)
      .attr('x', d => d.type === 'theme' ? 16 : 15)
      .attr('y', 4)
      .attr('font-size', d => d.type === 'theme' ? '10px' : '11px')
      .attr('fill', d => d.type === 'theme' ? '#64748b' : '#333')
      .attr('font-weight', d => d.type === 'theme' ? '500' : 'normal')
      .attr('font-family', 'system-ui, -apple-system, sans-serif');

    // Click to navigate (articles only)
    node.filter(d => d.url).on('click', (event, d) => {
      window.location.href = d.url;
    });

    // Hover effects
    node.on('mouseover', function(event, d) {
      if (d.type !== 'theme') {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.type === 'core' || d.type === 'foundational' ? 16 : 13);
      }

      // Show tooltip
      if ((d.defines && d.defines.length > 0) || d.description) {
        showTooltip(event, d);
      }

      // Highlight connected links
      link.select('line').attr('stroke-opacity', l =>
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15
      );
      link.select('text').attr('fill-opacity', l =>
        (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15
      );

      // Dim unconnected nodes
      const connectedIds = new Set([d.id]);
      data.links.forEach(l => {
        if (l.source.id === d.id) connectedIds.add(l.target.id);
        if (l.target.id === d.id) connectedIds.add(l.source.id);
      });
      node.attr('opacity', n => connectedIds.has(n.id) ? 1 : 0.3);
    });

    node.on('mouseout', function(event, d) {
      if (d.type !== 'theme') {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr('r', d.type === 'core' || d.type === 'foundational' ? 12 : 9);
      }

      hideTooltip();

      link.select('line').attr('stroke-opacity', l => l.type === 'theme' ? 0.4 : 0.7);
      link.select('text').attr('fill-opacity', 1);
      node.attr('opacity', 1);
    });

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

    function drag(simulation) {
      return d3.drag()
        .on('start', (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', (event) => {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', (event) => {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        });
    }
  });

  // Tooltip
  const tooltip = d3.select('body').append('div')
    .attr('class', 'graph-tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background', 'white')
    .style('border', '1px solid #e2e8f0')
    .style('border-radius', '6px')
    .style('padding', '10px 14px')
    .style('font-size', '12px')
    .style('font-family', 'system-ui, -apple-system, sans-serif')
    .style('box-shadow', '0 4px 12px rgba(0,0,0,0.1)')
    .style('max-width', '280px')
    .style('z-index', '1000')
    .style('line-height', '1.5');

  function showTooltip(event, d) {
    let html = '';
    if (d.defines && d.defines.length > 0) {
      html = `<strong style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Defines</strong><br>${d.defines.join('<br>')}`;
    } else if (d.description) {
      html = d.description;
    }
    tooltip
      .html(html)
      .style('visibility', 'visible')
      .style('left', (event.pageX + 15) + 'px')
      .style('top', (event.pageY - 10) + 'px');
  }

  function hideTooltip() {
    tooltip.style('visibility', 'hidden');
  }
});
