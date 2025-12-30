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

  // Tooltip element
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

      // Track state
      let hoveredNode = null;
      let originalData = JSON.parse(JSON.stringify(data));

      // Initialize 3D Force Graph
      const Graph = ForceGraph3D()(container)
        .graphData(data)
        .nodeId('id')
        .nodeLabel(node => node.label)
        .nodeColor(node => colors[node.type] || '#666')
        .nodeVal(node => nodeSizes[node.type] || 5)
        .nodeOpacity(0.9)
        .linkSource('source')
        .linkTarget('target')
        .linkColor(link => link.type === 'core' ? 'rgba(100,100,100,0.5)' : 'rgba(156,163,175,0.3)')
        .linkWidth(link => link.type === 'core' ? 1.5 : 0.5)
        .linkOpacity(0.6)
        .linkDirectionalArrowLength(3)
        .linkDirectionalArrowRelPos(1)
        .backgroundColor('rgba(255,255,255,0)')
        .showNavInfo(false)
        .enableNodeDrag(true)
        .onNodeClick(node => {
          if (node && node.url) {
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
        });

      // Mouse move for tooltip
      container.addEventListener('mousemove', (e) => {
        if (hoveredNode) {
          tooltip.style.left = (e.pageX + 15) + 'px';
          tooltip.style.top = (e.pageY - 10) + 'px';
        }
      });

      // Camera position
      Graph.cameraPosition({ x: 0, y: 0, z: 350 });

      // Slow auto-rotate
      let angle = 0;
      let isInteracting = false;

      container.addEventListener('mousedown', () => { isInteracting = true; });
      container.addEventListener('mouseup', () => { setTimeout(() => { isInteracting = false; }, 2000); });
      container.addEventListener('wheel', () => { isInteracting = true; setTimeout(() => { isInteracting = false; }, 2000); });

      function rotate() {
        if (!isInteracting && !hoveredNode) {
          angle += 0.002;
          Graph.cameraPosition({
            x: 350 * Math.sin(angle),
            z: 350 * Math.cos(angle)
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
              const filteredNodes = originalData.nodes.filter(n => n.type === type);
              const nodeIds = new Set(filteredNodes.map(n => n.id));
              const filteredLinks = originalData.links.filter(l => {
                const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
                const targetId = typeof l.target === 'object' ? l.target.id : l.target;
                return nodeIds.has(sourceId) && nodeIds.has(targetId);
              });
              Graph.graphData({ nodes: filteredNodes, links: filteredLinks });
            } else {
              Graph.graphData(JSON.parse(JSON.stringify(originalData)));
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
    })
    .catch(err => {
      console.error('Graph load error:', err);
      container.innerHTML = '<p style="padding:2rem;color:#666;">Error loading graph. Please refresh.</p>';
    });
});
