// Dashboard Application
class Dashboard {
  constructor() {
    this.currentTime = new Date();
    this.isVisible = true;
    this.userStats = {
      totalUsers: 1247,
      activeUsers: 892,
      newUsers: 156,
      revenue: 45678
    };
    
    this.chartData = [
      { name: 'Jan', users: 400, revenue: 2400, sales: 2400 },
      { name: 'Feb', users: 300, revenue: 1398, sales: 2210 },
      { name: 'Mar', users: 200, revenue: 9800, sales: 2290 },
      { name: 'Apr', users: 278, revenue: 3908, sales: 2000 },
      { name: 'May', users: 189, revenue: 4800, sales: 2181 },
      { name: 'Jun', users: 239, revenue: 3800, sales: 2500 },
      { name: 'Jul', users: 349, revenue: 4300, sales: 2100 },
    ];

    this.pieData = [
      { name: 'Desktop', value: 400, color: '#8884d8' },
      { name: 'Mobile', value: 300, color: '#82ca9d' },
      { name: 'Tablet', value: 200, color: '#ffc658' },
      { name: 'Other', value: 100, color: '#ff7300' },
    ];

    this.tableData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2024-01-15', visits: 245 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', lastLogin: '2024-01-10', visits: 189 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', lastLogin: '2024-01-14', visits: 312 },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', lastLogin: '2024-01-16', visits: 156 },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'Inactive', lastLogin: '2024-01-08', visits: 98 },
      { id: 6, name: 'Diana Davis', email: 'diana@example.com', status: 'Active', lastLogin: '2024-01-17', visits: 423 },
      { id: 7, name: 'Eve Miller', email: 'eve@example.com', status: 'Active', lastLogin: '2024-01-13', visits: 267 },
      { id: 8, name: 'Frank Garcia', email: 'frank@example.com', status: 'Inactive', lastLogin: '2024-01-05', visits: 134 },
    ];

    this.gaugeData = [
      {
        title: 'Performance Score',
        value: 87,
        maxValue: 100,
        icon: '📈',
        color: '#10b981'
      },
      {
        title: 'Target Achievement',
        value: 73,
        maxValue: 100,
        icon: '🎯',
        color: '#f59e0b'
      },
      {
        title: 'System Uptime',
        value: 99.2,
        maxValue: 100,
        icon: '⚡',
        color: '#3b82f6'
      }
    ];

    this.init();
  }

  init() {
    this.updateTime();
    this.renderStats();
    this.renderCharts();
    this.renderGauges();
    this.renderDataTable();
    this.setupEventListeners();
    this.startTimeUpdate();
  }

  updateTime() {
    this.currentTime = new Date();
    const timeDisplay = document.getElementById('timeDisplay');
    if (timeDisplay) {
      timeDisplay.textContent = this.currentTime.toLocaleTimeString();
    }
  }

  startTimeUpdate() {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    if (!statsGrid) return;

    const stats = [
      {
        title: 'Total Users',
        value: this.userStats.totalUsers.toLocaleString(),
        icon: '👥',
        change: '+12.5%',
        isPositive: true
      },
      {
        title: 'Active Users',
        value: this.userStats.activeUsers.toLocaleString(),
        icon: '📊',
        change: '+8.2%',
        isPositive: true
      },
      {
        title: 'New Users',
        value: this.userStats.newUsers.toLocaleString(),
        icon: '⚡',
        change: '-2.1%',
        isPositive: false
      },
      {
        title: 'Revenue',
        value: `$${this.userStats.revenue.toLocaleString()}`,
        icon: '💰',
        change: '+15.3%',
        isPositive: true
      }
    ];

    statsGrid.innerHTML = stats.map(stat => `
      <div class="stat-card" style="animation: fadeInUp 0.6s ease forwards;">
        <div class="stat-icon">
          ${stat.icon}
        </div>
        <div class="stat-content">
          <h3>${stat.title}</h3>
          <div class="stat-value">${stat.value}</div>
          <div class="stat-change ${stat.isPositive ? 'positive' : 'negative'}">
            ${stat.isPositive ? '↗' : '↘'} ${stat.change}
          </div>
        </div>
      </div>
    `).join('');
  }

  renderCharts() {
    const chartsGrid = document.getElementById('chartsGrid');
    if (!chartsGrid) return;

    const charts = [
      {
        title: '📈 User Growth',
        icon: '📊',
        type: 'line'
      },
      {
        title: '🌐 Revenue Trends',
        icon: '📈',
        type: 'area'
      },
      {
        title: '📊 Sales Performance',
        icon: '🎯',
        type: 'bar'
      },
      {
        title: '🥧 Device Distribution',
        icon: '👥',
        type: 'pie'
      }
    ];

    chartsGrid.innerHTML = charts.map((chart, index) => `
      <div class="chart-card" style="animation: fadeInUp 0.6s ease ${index * 0.1}s forwards;">
        <div class="chart-header">
          <h3>${chart.icon} ${chart.title}</h3>
          <span>${chart.icon}</span>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            ${chart.type.toUpperCase()} Chart
            <br>
            <small>Interactive chart would be rendered here</small>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderGauges() {
    const gaugeGrid = document.getElementById('gaugeGrid');
    if (!gaugeGrid) return;

    gaugeGrid.innerHTML = this.gaugeData.map((gauge, index) => {
      const percentage = Math.min((gauge.value / gauge.maxValue) * 100, 100);
      return `
        <div class="gauge-container" style="animation: fadeInUp 0.6s ease ${index * 0.1}s forwards;">
          <div class="gauge-header">
            <h3>${gauge.title}</h3>
            <span style="font-size: 20px;">${gauge.icon}</span>
          </div>
          
          <div class="gauge-wrapper">
            <svg width="200" height="120" viewBox="0 0 200 120">
              <!-- Background arc -->
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e5e7eb"
                stroke-width="8"
                stroke-linecap="round"
              />
              
              <!-- Progress arc -->
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="${gauge.color}"
                stroke-width="8"
                stroke-linecap="round"
                stroke-dasharray="${percentage * 2.51}"
                stroke-dashoffset="${251 - (percentage * 2.51)}"
                style="transition: stroke-dasharray 1s ease 0.5s;"
              />
              
              <!-- Center circle -->
              <circle cx="100" cy="100" r="4" fill="${gauge.color}" />
              
              <!-- Needle -->
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="${gauge.color}"
                stroke-width="3"
                stroke-linecap="round"
                style="transform: rotate(${-90 + (percentage * 1.8)}deg); transform-origin: 100px 100px; transition: transform 1s ease 0.5s;"
              />
            </svg>
            
            <div class="gauge-value">
              <div class="value-display" style="animation: scaleIn 0.5s ease 1s forwards;">
                ${gauge.value.toLocaleString()}
              </div>
              <div class="value-label">of ${gauge.maxValue.toLocaleString()}</div>
            </div>
          </div>
          
          <div class="gauge-percentage">
            <div 
              class="percentage-bar"
              style="width: ${percentage}%; background-color: ${gauge.color}; animation: widthGrow 1s ease 0.8s forwards;"
            ></div>
            <span class="percentage-text">${percentage.toFixed(1)}%</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderDataTable() {
    const container = document.getElementById('dataTableContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="data-table-container" style="animation: fadeInUp 0.6s ease 0.7s forwards;">
        <div class="table-header">
          <h3>📊 User Analytics</h3>
          <div class="table-controls">
            <div class="search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search users..." id="searchInput">
            </div>
            <button class="control-btn" title="Filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
              </svg>
            </button>
            <button class="control-btn" title="Download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="table-wrapper">
          <table class="data-table" id="dataTable">
            <thead>
              <tr>
                <th data-sort="name">Name ↑</th>
                <th data-sort="email">Email</th>
                <th data-sort="status">Status</th>
                <th data-sort="lastLogin">Last Login</th>
                <th data-sort="visits">Visits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              ${this.tableData.map((row, index) => `
                <tr class="table-row" style="animation: fadeInLeft 0.3s ease ${index * 0.1}s forwards;">
                  <td>${row.name}</td>
                  <td>${row.email}</td>
                  <td>
                    <span class="status-badge ${row.status.toLowerCase()}">
                      ${row.status}
                    </span>
                  </td>
                  <td>${row.lastLogin}</td>
                  <td>${row.visits.toLocaleString()}</td>
                  <td>
                    <button class="action-btn" title="View">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="table-footer">
          <span>Showing ${this.tableData.length} of ${this.tableData.length} users</span>
        </div>
      </div>
    `;

    this.setupTableEvents();
  }

  setupTableEvents() {
    const searchInput = document.getElementById('searchInput');
    const tableHeaders = document.querySelectorAll('#dataTable th[data-sort]');
    const tableBody = document.getElementById('tableBody');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
          const name = row.cells[0].textContent.toLowerCase();
          const email = row.cells[1].textContent.toLowerCase();
          
          if (name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }

    tableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const sortBy = header.dataset.sort;
        this.sortTable(sortBy, header);
      });
    });
  }

  sortTable(sortBy, header) {
    const tbody = document.getElementById('tableBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // Update header indicators
    document.querySelectorAll('#dataTable th').forEach(th => {
      th.textContent = th.textContent.replace(' ↑', '').replace(' ↓', '');
    });
    
    const currentOrder = header.textContent.includes('↑') ? 'desc' : 'asc';
    const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    
    header.textContent = header.textContent.replace(' ↑', '').replace(' ↓', '') + (newOrder === 'asc' ? ' ↑' : ' ↓');
    
    // Sort rows
    rows.sort((a, b) => {
      const aValue = a.cells[this.getColumnIndex(sortBy)].textContent;
      const bValue = b.cells[this.getColumnIndex(sortBy)].textContent;
      
      if (newOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
    
    // Reorder rows in DOM
    rows.forEach(row => tbody.appendChild(row));
  }

  getColumnIndex(sortBy) {
    const columns = ['name', 'email', 'status', 'lastLogin', 'visits'];
    return columns.indexOf(sortBy);
  }

  setupEventListeners() {
    const visibilityToggle = document.getElementById('visibilityToggle');
    if (visibilityToggle) {
      visibilityToggle.addEventListener('click', () => {
        this.isVisible = !this.isVisible;
        const icon = visibilityToggle.querySelector('svg');
        if (this.isVisible) {
          icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          `;
        } else {
          icon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          `;
        }
      });
    }
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes widthGrow {
    from {
      width: 0;
    }
    to {
      width: var(--target-width);
    }
  }

  .stat-card,
  .chart-card,
  .gauge-container,
  .data-table-container {
    opacity: 0;
  }
`;
document.head.appendChild(style);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
}); 