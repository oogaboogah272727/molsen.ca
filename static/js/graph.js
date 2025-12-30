// 3D Knowledge Graph Visualization

(function() {
  'use strict';

  function init() {
    var container = document.getElementById('graph-container');
    if (!container) {
      console.log('No graph container found');
      return;
    }

    // Check if library loaded
    if (typeof ForceGraph3D === 'undefined') {
      console.error('ForceGraph3D not loaded');
      container.innerHTML = '<p style="padding:2rem;text-align:center;color:#888;">Loading 3D graph library failed. <a href="javascript:location.reload()">Reload</a></p>';
      return;
    }

    console.log('ForceGraph3D available, initializing...');

    // Colors
    var colors = {
      hub: '#dc2626',
      foundational: '#8b5cf6',
      core: '#1e293b',
      theoretical: '#6b8e23',
      empirical: '#f59e0b',
      applied: '#4a90a4',
      practice: '#64748b'
    };

    // Sizes
    var sizes = {
      hub: 10,
      foundational: 7,
      core: 6,
      theoretical: 5,
      empirical: 4,
      applied: 4,
      practice: 3
    };

    // Tooltip
    var tooltip = document.createElement('div');
    tooltip.style.cssText = 'position:fixed;display:none;background:#fff;border:1px solid #ccc;padding:8px 12px;border-radius:4px;font-size:12px;max-width:250px;z-index:9999;pointer-events:none;box-shadow:0 2px 8px rgba(0,0,0,0.15)';
    document.body.appendChild(tooltip);

    // Fetch data
    fetch('/js/knowledge-graph.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        console.log('Loaded', data.nodes.length, 'nodes and', data.links.length, 'links');

        // Build filter UI
        var filterDiv = document.getElementById('concept-filter');
        if (filterDiv) {
          var types = ['', 'hub', 'foundational', 'core', 'theoretical', 'empirical', 'applied', 'practice'];
          var labels = ['All', 'Hub', 'Foundational', 'Core', 'Theoretical', 'Empirical', 'Applied', 'Practice'];
          types.forEach(function(t, i) {
            var btn = document.createElement('button');
            btn.className = 'concept-btn' + (t === '' ? ' active' : '');
            btn.setAttribute('data-type', t);
            if (t && colors[t]) {
              btn.innerHTML = '<span class="filter-dot" style="background:' + colors[t] + '"></span>' + labels[i];
            } else {
              btn.textContent = labels[i];
            }
            filterDiv.appendChild(btn);
          });
        }

        // Store original data
        var originalData = JSON.parse(JSON.stringify(data));

        // Get actual dimensions
        var rect = container.getBoundingClientRect();
        var width = rect.width || 800;
        var height = rect.height || 500;
        console.log('Container dimensions:', width, 'x', height);

        // Create graph
        var Graph = ForceGraph3D()(container)
          .width(width)
          .height(height)
          .graphData(data)
          .nodeId('id')
          .nodeLabel(function(n) { return n.label; })
          .nodeColor(function(n) { return colors[n.type] || '#999'; })
          .nodeVal(function(n) { return sizes[n.type] || 4; })
          .nodeOpacity(0.85)
          .linkColor(function(l) { return l.type === 'core' ? '#666' : '#bbb'; })
          .linkWidth(function(l) { return l.type === 'core' ? 1.2 : 0.4; })
          .linkOpacity(0.5)
          .linkDirectionalArrowLength(2.5)
          .linkDirectionalArrowRelPos(1)
          .backgroundColor('#ffffff')
          .enableNavigationControls(true)
          .showNavInfo(false);

        // Click handler
        Graph.onNodeClick(function(node) {
          if (node && node.url) {
            window.open(node.url, '_blank');
          }
        });

        // Hover handler
        var hovered = null;
        Graph.onNodeHover(function(node) {
          hovered = node;
          container.style.cursor = node ? 'pointer' : 'grab';
          if (node && node.defines && node.defines.length) {
            tooltip.innerHTML = '<strong>' + node.label + '</strong><br><span style="color:#666;font-size:11px">Defines: ' + node.defines.join(', ') + '</span>';
            tooltip.style.display = 'block';
          } else {
            tooltip.style.display = 'none';
          }
        });

        // Move tooltip with mouse
        document.addEventListener('mousemove', function(e) {
          if (hovered) {
            tooltip.style.left = (e.clientX + 15) + 'px';
            tooltip.style.top = (e.clientY + 10) + 'px';
          }
        });

        // Initial camera - position to see the whole graph
        setTimeout(function() {
          Graph.cameraPosition({ x: 0, y: 0, z: 400 }, { x: 0, y: 0, z: 0 }, 1000);
        }, 500);

        // Filter handler
        if (filterDiv) {
          filterDiv.addEventListener('click', function(e) {
            var btn = e.target.closest('.concept-btn');
            if (!btn) return;

            filterDiv.querySelectorAll('.concept-btn').forEach(function(b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var type = btn.getAttribute('data-type');
            if (type) {
              var nodes = originalData.nodes.filter(function(n) { return n.type === type; });
              var ids = {};
              nodes.forEach(function(n) { ids[n.id] = true; });
              var links = originalData.links.filter(function(l) {
                var s = typeof l.source === 'object' ? l.source.id : l.source;
                var t = typeof l.target === 'object' ? l.target.id : l.target;
                return ids[s] && ids[t];
              });
              Graph.graphData({ nodes: nodes, links: links });
            } else {
              Graph.graphData(JSON.parse(JSON.stringify(originalData)));
            }
          });
        }

        // Resize handler
        window.addEventListener('resize', function() {
          Graph.width(container.clientWidth);
          Graph.height(container.clientHeight);
        });

        console.log('Graph initialized successfully');
      })
      .catch(function(err) {
        console.error('Graph error:', err);
        container.innerHTML = '<p style="padding:2rem;text-align:center;color:#c00;">Error loading graph data: ' + err.message + '</p>';
      });
  }

  // Run when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
