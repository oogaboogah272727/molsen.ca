// 3D Knowledge Graph Visualization
// Using 3d-force-graph library

document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('graph-container');
  if (!container) return;

  // Color scheme
  const colors = {
    hub: '#dc2626',
    foundational: '#8b5cf6',
    core: '#1e293b',
    theoretical: '#6b8e23',
    empirical: '#f59e0b',
    applied: '#4a90a4',
    practice: '#64748b'
  };

  // Node sizes by type
  const nodeSizes = {
    hub: 12,
    foundational: 8,
    core: 7,
    theoretical: 6,
    empirical: 5,
    applied: 5,
    practice: 4
  };

  // Tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'graph-tooltip';
  tooltip.style.cssText = 'position:absolute;visibility:hidden;background:white;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px;font-size:12px;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,0.1);max-width:280px;z-index:1000;line-height:1.5;pointer-events:none';
  document.body.appendChild(tooltip);

  fetch('/js/knowledge-graph.json')
    .then(response => response.json())
    .then(data => {
      // Create type filter UI
      const articleTypes = [
        { id: 'hub', label: 'Hub', color: colors.hub },
        { id: 'foundational', label: 'Foundational', color: colors.foundational },
        { id: 'core', label: 'Core', color: colors.core },
        { id: 'theoretical', label: 'Theoretical', color: colors.theoretical },
        { id: 'empirical', label: 'Empirical', color: colors.empirical },
        { id: 'applied', label: 'Applied', color: colors.applied },
        { id: 'practice', label: 'Practice', color: colors.practice }
      ];

      const filterContainer = document.getElementById('concept-filter');
      if (filterContainer) {
        const allBtn = document.createElement('button');
        allBtn.className = 'concept-btn active';
        allBtn.textContent = 'All';
        allBtn.setAttribute('data-type', '');
        filterContainer.appendChild(allBtn);

        articleTypes.forEach(function(type) {
          const btn = document.createElement('button');
          btn.className = 'concept-btn';
          btn.innerHTML = '<span class="filter-dot" style="background:' + type.color + '"></span>' + type.label;
          btn.setAttribute('data-type', type.id);
          filterContainer.appendChild(btn);
        });
      }

      // Track hovered node
      let hoveredNode = null;

      // Initialize 3D Force Graph
      const Graph = ForceGraph3D()(container)
        .graphData(data)
        .nodeId('id')
        .nodeLabel(node => '')  // We'll use custom tooltip instead
        .nodeColor(node => colors[node.type] || '#666')
        .nodeVal(node => nodeSizes[node.type] || 5)
        .nodeOpacity(0.95)
        .linkSource('source')
        .linkTarget('target')
        .linkColor(link => link.type === 'core' ? 'rgba(100,100,100,0.6)' : 'rgba(156,163,175,0.4)')
        .linkWidth(link => link.type === 'core' ? 1.5 : 0.8)
        .linkOpacity(0.7)
        .linkDirectionalArrowLength(4)
        .linkDirectionalArrowRelPos(1)
        .linkCurvature(0.1)
        .backgroundColor('rgba(0,0,0,0)')
        .showNavInfo(false)
        .enableNodeDrag(true)
        .onNodeClick(node => {
          if (node.url) {
            window.open(node.url, '_blank');
          }
        })
        .onNodeHover(node => {
          container.style.cursor = node ? 'pointer' : 'default';
          hoveredNode = node;

          if (node && node.defines && node.defines.length > 0) {
            tooltip.innerHTML = '<strong style="color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.5px">Defines</strong><br>' + node.defines.join('<br>');
            tooltip.style.visibility = 'visible';
          } else {
            tooltip.style.visibility = 'hidden';
          }

          // Highlight connected nodes
          Graph.nodeColor(n => {
            if (!node) return colors[n.type] || '#666';
            if (n.id === node.id) return colors[n.type] || '#666';
            const isConnected = data.links.some(l =>
              (l.source.id === node.id && l.target.id === n.id) ||
              (l.target.id === node.id && l.source.id === n.id) ||
              (l.source === node.id && l.target === n.id) ||
              (l.target === node.id && l.source === n.id)
            );
            return isConnected ? colors[n.type] || '#666' : 'rgba(100,100,100,0.2)';
          });
        });

      // Track mouse for tooltip positioning
      container.addEventListener('mousemove', (e) => {
        if (hoveredNode) {
          tooltip.style.left = (e.pageX + 15) + 'px';
          tooltip.style.top = (e.pageY - 10) + 'px';
        }
      });

      // Add node labels using CSS2D
      Graph.nodeThreeObject(node => {
        const sprite = new SpriteText(node.label);
        sprite.color = '#333';
        sprite.textHeight = node.type === 'hub' ? 4 : 3;
        sprite.position.y = nodeSizes[node.type] + 3;
        return sprite;
      })
      .nodeThreeObjectExtend(true);

      // Camera positioning
      Graph.cameraPosition({ x: 0, y: 0, z: 400 });

      // Auto-rotate slowly
      let angle = 0;
      function rotate() {
        if (!hoveredNode) {
          angle += 0.001;
          Graph.cameraPosition({
            x: 400 * Math.sin(angle),
            z: 400 * Math.cos(angle)
          });
        }
        requestAnimationFrame(rotate);
      }
      rotate();

      // Filter functionality
      if (filterContainer) {
        filterContainer.addEventListener('click', function(e) {
          const btn = e.target.closest('.concept-btn');
          if (btn) {
            filterContainer.querySelectorAll('.concept-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const type = btn.getAttribute('data-type');

            if (type) {
              const filteredNodes = data.nodes.filter(n => n.type === type);
              const nodeIds = new Set(filteredNodes.map(n => n.id));
              const filteredLinks = data.links.filter(l => {
                const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
                const targetId = typeof l.target === 'object' ? l.target.id : l.target;
                return nodeIds.has(sourceId) && nodeIds.has(targetId);
              });
              Graph.graphData({ nodes: filteredNodes, links: filteredLinks });
            } else {
              Graph.graphData(data);
            }
          }
        });
      }

      // Handle resize
      function handleResize() {
        Graph.width(container.clientWidth);
        Graph.height(container.clientHeight);
      }
      window.addEventListener('resize', handleResize);
      handleResize();
    });
});
