// Knowledge Graph Visualization
// Articles with core and thematic connections

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('graph-container');
  if (!container) return;

  // Use fixed dimensions for viewBox, CSS handles responsive sizing
  const width = 1000;
  const height = 600;

  // Color scheme
  const colors = {
    foundational: '#8b5cf6',
    core: '#1e293b',
    theoretical: '#6b8e23',
    empirical: '#f59e0b',
    applied: '#4a90a4',
    practice: '#64748b'
  };

  // Link colors by type
  const linkColors = {
    core: '#666',
    soft: '#9ca3af'
  };

  const svg = d3.select('#graph-container')
    .append('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const g = svg.append('g');

  svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([0.4, 3])
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    }));

  // Arrow markers
  const markerTypes = ['core', 'soft'];
  svg.append('defs').selectAll('marker')
    .data(markerTypes)
    .join('marker')
    .attr('id', d => `arrow-${d}`)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 22)
    .attr('refY', 0)
    .attr('markerWidth', 5)
    .attr('markerHeight', 5)
    .attr('orient', 'auto')
    .append('path')
    .attr('fill', d => d === 'soft' ? '#9ca3af' : '#666')
    .attr('d', 'M0,-4L8,0L0,4');

  d3.json('/js/knowledge-graph.json').then(data => {
    // Extract all unique concepts
    var allConcepts = [];
    data.nodes.forEach(function(n) {
      if (n.defines) {
        n.defines.forEach(function(c) {
          if (allConcepts.indexOf(c) === -1) allConcepts.push(c);
        });
      }
    });
    allConcepts.sort();

    // Create concept filter UI
    var filterContainer = document.getElementById('concept-filter');
    if (filterContainer) {
      var allBtn = document.createElement('button');
      allBtn.className = 'concept-btn active';
      allBtn.textContent = 'All';
      allBtn.setAttribute('data-concept', '');
      filterContainer.appendChild(allBtn);

      allConcepts.forEach(function(concept) {
        var btn = document.createElement('button');
        btn.className = 'concept-btn';
        btn.textContent = concept;
        btn.setAttribute('data-concept', concept);
        filterContainer.appendChild(btn);
      });
    }

    var selectedConcept = null;

    // Create simulation
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(45));

    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('g')
      .data(data.links)
      .join('g')
      .attr('class', d => `link-${d.type}`);

    link.append('line')
      .attr('stroke', d => linkColors[d.type] || '#999')
      .attr('stroke-opacity', 0.7)
      .attr('stroke-width', d => d.type === 'core' ? 1.5 : 1)
      .attr('stroke-dasharray', d => d.type === 'soft' ? '5,3' : 'none')
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // Link labels
    link.filter(d => d.label)
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

    // Circle nodes for articles
    node.append('circle')
      .attr('r', d => d.type === 'core' || d.type === 'foundational' ? 12 : 9)
      .attr('fill', d => colors[d.type] || '#666')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Node labels
    node.append('text')
      .text(d => d.label)
      .attr('x', 15)
      .attr('y', 4)
      .attr('font-size', '11px')
      .attr('fill', '#333')
      .attr('font-family', 'system-ui, -apple-system, sans-serif');

    // Click to navigate (articles only) - opens in new tab
    node.filter(d => d.url).on('click', (event, d) => {
      window.open(d.url, '_blank');
    });

    // Concept filter click handlers
    if (filterContainer) {
      filterContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('concept-btn')) {
          // Update active state
          filterContainer.querySelectorAll('.concept-btn').forEach(function(b) {
            b.classList.remove('active');
          });
          e.target.classList.add('active');

          var concept = e.target.getAttribute('data-concept');
          selectedConcept = concept || null;

          // Filter nodes
          if (selectedConcept) {
            node.attr('opacity', function(d) {
              return d.defines && d.defines.indexOf(selectedConcept) !== -1 ? 1 : 0.15;
            });
            link.select('line').attr('stroke-opacity', 0.1);
            link.select('text').attr('fill-opacity', 0.1);
          } else {
            node.attr('opacity', 1);
            link.select('line').attr('stroke-opacity', 0.7);
            link.select('text').attr('fill-opacity', 1);
          }
        }
      });
    }

    // Hover effects
    node.on('mouseover', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'core' || d.type === 'foundational' ? 16 : 13);

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
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', d.type === 'core' || d.type === 'foundational' ? 12 : 9);

      hideTooltip();

      link.select('line').attr('stroke-opacity', 0.7);
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
