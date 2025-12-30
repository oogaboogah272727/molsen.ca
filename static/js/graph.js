// 3D Knowledge Graph Visualization

(function() {
  'use strict';

  function init() {
    var container = document.getElementById('graph-container');
    var panel = document.getElementById('panel-content');
    if (!container) return;

    // Check libraries
    if (typeof ForceGraph3D === 'undefined') {
      container.innerHTML = '<p style="padding:2rem;text-align:center;color:#888;">Loading graph library...</p>';
      return;
    }

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

    // Type labels
    var typeLabels = {
      hub: 'Hub',
      foundational: 'Foundational',
      core: 'Core',
      theoretical: 'Theoretical',
      empirical: 'Empirical',
      applied: 'Applied',
      practice: 'Practice'
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

    // Update panel with node info
    function updatePanel(node) {
      if (!panel) return;

      if (!node) {
        panel.innerHTML = '<p class="panel-hint">Click a node to see details</p>';
        return;
      }

      var html = '<h3 class="panel-title">' + node.label + '</h3>';
      html += '<span class="panel-type" style="background:' + (colors[node.type] || '#666') + '">' + (typeLabels[node.type] || node.type) + '</span>';

      if (node.defines && node.defines.length) {
        html += '<div class="panel-section">';
        html += '<div class="panel-section-title">Defines</div>';
        html += '<ul class="panel-list">';
        node.defines.forEach(function(d) {
          html += '<li>' + d + '</li>';
        });
        html += '</ul></div>';
      }

      if (node.themes && node.themes.length) {
        html += '<div class="panel-section">';
        html += '<div class="panel-section-title">Themes</div>';
        html += '<ul class="panel-list">';
        node.themes.forEach(function(t) {
          html += '<li>' + t + '</li>';
        });
        html += '</ul></div>';
      }

      if (node.url) {
        html += '<a href="' + node.url + '" class="panel-link" target="_blank">Read Article →</a>';
      }

      panel.innerHTML = html;
    }

    // Fetch data
    fetch('/js/knowledge-graph.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
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

        var originalData = JSON.parse(JSON.stringify(data));
        var selectedNode = null;

        // Get dimensions
        var rect = container.getBoundingClientRect();
        var width = rect.width || 700;
        var height = rect.height || 500;

        // Create graph
        var Graph = ForceGraph3D()(container)
          .width(width)
          .height(height)
          .graphData(data)
          .nodeId('id')
          .nodeColor(function(n) { return colors[n.type] || '#999'; })
          .nodeVal(function(n) { return sizes[n.type] || 4; })
          .nodeOpacity(0.9)
          .linkColor(function(l) { return l.type === 'core' ? '#666' : '#bbb'; })
          .linkWidth(function(l) { return l.type === 'core' ? 1.2 : 0.4; })
          .linkOpacity(0.5)
          .linkDirectionalArrowLength(2.5)
          .linkDirectionalArrowRelPos(1)
          .backgroundColor('#ffffff')
          .enableNavigationControls(true)
          .showNavInfo(false);

        // Add text labels using SpriteText
        if (typeof SpriteText !== 'undefined') {
          Graph.nodeThreeObject(function(node) {
            var sprite = new SpriteText(node.label);
            sprite.color = '#333';
            sprite.textHeight = node.type === 'hub' ? 6 : 4;
            sprite.backgroundColor = 'rgba(255,255,255,0.85)';
            sprite.padding = [1, 2];
            sprite.borderRadius = 2;
            return sprite;
          })
          .nodeThreeObjectExtend(true);  // Keep the sphere, add text on top
        } else {
          // Fallback to built-in labels
          Graph.nodeLabel(function(n) { return n.label; });
        }

        // Click handler - select node and show in panel
        Graph.onNodeClick(function(node) {
          selectedNode = node;
          updatePanel(node);

          // Highlight selected node
          Graph.nodeColor(function(n) {
            if (n.id === node.id) return colors[n.type] || '#999';
            return colors[n.type] ? colors[n.type] + '99' : '#99999999';
          });
        });

        // Hover handler
        Graph.onNodeHover(function(node) {
          container.style.cursor = node ? 'pointer' : 'grab';
        });

        // Background click - deselect
        Graph.onBackgroundClick(function() {
          selectedNode = null;
          updatePanel(null);
          Graph.nodeColor(function(n) { return colors[n.type] || '#999'; });
        });

        // Initial camera
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

            // Reset panel
            selectedNode = null;
            updatePanel(null);
          });
        }

        // Resize handler
        window.addEventListener('resize', function() {
          var r = container.getBoundingClientRect();
          Graph.width(r.width || 700);
          Graph.height(r.height || 500);
        });

      })
      .catch(function(err) {
        console.error('Graph error:', err);
        container.innerHTML = '<p style="padding:2rem;text-align:center;color:#c00;">Error: ' + err.message + '</p>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
