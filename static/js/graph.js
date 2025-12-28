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
    var html = '';
    if (d.defines && d.defines.length > 0) {
      html = '<strong style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Defines</strong><br>' + d.defines.join('<br>');
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

  d3.json('/js/knowledge-graph.json').then(function(originalData) {
    // Article types matching the legend
    var articleTypes = [
      { id: 'foundational', label: 'Foundational', color: '#8b5cf6' },
      { id: 'core', label: 'Core', color: '#1e293b' },
      { id: 'theoretical', label: 'Theoretical', color: '#6b8e23' },
      { id: 'empirical', label: 'Empirical', color: '#f59e0b' },
      { id: 'applied', label: 'Applied', color: '#4a90a4' },
      { id: 'practice', label: 'Practice', color: '#64748b' }
    ];

    // Create type filter UI
    var filterContainer = document.getElementById('concept-filter');
    if (filterContainer) {
      var allBtn = document.createElement('button');
      allBtn.className = 'concept-btn active';
      allBtn.textContent = 'All';
      allBtn.setAttribute('data-type', '');
      filterContainer.appendChild(allBtn);

      articleTypes.forEach(function(type) {
        var btn = document.createElement('button');
        btn.className = 'concept-btn';
        btn.innerHTML = '<span class="filter-dot" style="background:' + type.color + '"></span>' + type.label;
        btn.setAttribute('data-type', type.id);
        filterContainer.appendChild(btn);
      });
    }

    var simulation = null;
    var currentLinks = null;

    function renderGraph(filterType) {
      // Clear existing graph
      g.selectAll('.links').remove();
      g.selectAll('.nodes').remove();

      // Filter nodes
      var filteredNodes;
      if (filterType) {
        filteredNodes = originalData.nodes.filter(function(n) {
          return n.type === filterType;
        });
      } else {
        filteredNodes = originalData.nodes.slice();
      }

      // Get node IDs for link filtering
      var nodeIds = {};
      filteredNodes.forEach(function(n) {
        nodeIds[n.id] = true;
      });

      // Filter links to only include those between visible nodes
      var filteredLinks = originalData.links.filter(function(l) {
        var sourceId = typeof l.source === 'object' ? l.source.id : l.source;
        var targetId = typeof l.target === 'object' ? l.target.id : l.target;
        return nodeIds[sourceId] && nodeIds[targetId];
      }).map(function(l) {
        // Create fresh link objects with string IDs
        return {
          source: typeof l.source === 'object' ? l.source.id : l.source,
          target: typeof l.target === 'object' ? l.target.id : l.target,
          type: l.type,
          label: l.label
        };
      });

      currentLinks = filteredLinks;

      // Stop old simulation
      if (simulation) {
        simulation.stop();
      }

      // Create new simulation
      simulation = d3.forceSimulation(filteredNodes)
        .force('link', d3.forceLink(filteredLinks).id(function(d) { return d.id; }).distance(100))
        .force('charge', d3.forceManyBody().strength(-350))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(45));

      // Draw links
      var link = g.append('g')
        .attr('class', 'links')
        .selectAll('g')
        .data(filteredLinks)
        .join('g')
        .attr('class', function(d) { return 'link-' + d.type; });

      link.append('line')
        .attr('stroke', function(d) { return linkColors[d.type] || '#999'; })
        .attr('stroke-opacity', 0.7)
        .attr('stroke-width', function(d) { return d.type === 'core' ? 1.5 : 1; })
        .attr('stroke-dasharray', function(d) { return d.type === 'soft' ? '5,3' : 'none'; })
        .attr('marker-end', function(d) { return 'url(#arrow-' + d.type + ')'; });

      // Link labels
      link.filter(function(d) { return d.label; })
        .append('text')
        .text(function(d) { return d.label; })
        .attr('font-size', '8px')
        .attr('fill', '#888')
        .attr('text-anchor', 'middle')
        .attr('dy', -4);

      // Draw nodes
      var node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(filteredNodes)
        .join('g')
        .attr('class', function(d) { return 'node node-' + d.type; })
        .style('cursor', function(d) { return d.url ? 'pointer' : 'default'; })
        .call(drag(simulation));

      // Circle nodes for articles
      node.append('circle')
        .attr('r', function(d) { return d.type === 'core' || d.type === 'foundational' ? 12 : 9; })
        .attr('fill', function(d) { return colors[d.type] || '#666'; })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);

      // Node labels
      node.append('text')
        .text(function(d) { return d.label; })
        .attr('x', 15)
        .attr('y', 4)
        .attr('font-size', '11px')
        .attr('fill', '#333')
        .attr('font-family', 'system-ui, -apple-system, sans-serif');

      // Click to navigate (articles only) - opens in new tab
      node.filter(function(d) { return d.url; }).on('click', function(event, d) {
        window.open(d.url, '_blank');
      });

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
        link.select('line').attr('stroke-opacity', function(l) {
          return (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15;
        });
        link.select('text').attr('fill-opacity', function(l) {
          return (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.15;
        });

        // Dim unconnected nodes
        var connectedIds = {};
        connectedIds[d.id] = true;
        currentLinks.forEach(function(l) {
          if (l.source.id === d.id) connectedIds[l.target.id] = true;
          if (l.target.id === d.id) connectedIds[l.source.id] = true;
        });
        node.attr('opacity', function(n) { return connectedIds[n.id] ? 1 : 0.3; });
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

      simulation.on('tick', function() {
        link.select('line')
          .attr('x1', function(d) { return d.source.x; })
          .attr('y1', function(d) { return d.source.y; })
          .attr('x2', function(d) { return d.target.x; })
          .attr('y2', function(d) { return d.target.y; });

        link.select('text')
          .attr('x', function(d) { return (d.source.x + d.target.x) / 2; })
          .attr('y', function(d) { return (d.source.y + d.target.y) / 2; });

        node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
      });
    }

    function drag(sim) {
      return d3.drag()
        .on('start', function(event) {
          if (!event.active) sim.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        })
        .on('drag', function(event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on('end', function(event) {
          if (!event.active) sim.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        });
    }

    // Type filter click handlers
    if (filterContainer) {
      filterContainer.addEventListener('click', function(e) {
        var btn = e.target.closest('.concept-btn');
        if (btn) {
          // Update active state
          filterContainer.querySelectorAll('.concept-btn').forEach(function(b) {
            b.classList.remove('active');
          });
          btn.classList.add('active');

          var type = btn.getAttribute('data-type');
          renderGraph(type || null);
        }
      });
    }

    // Initial render with all nodes
    renderGraph(null);
  });
});
