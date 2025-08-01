// Intern Portal JavaScript

// Theme management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-bs-theme', this.theme);
        this.updateToggleButton();
        this.bindEvents();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        document.documentElement.setAttribute('data-bs-theme', this.theme);
        this.updateToggleButton();
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = this.theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode';
            toggleBtn.className = this.theme === 'light' 
                ? 'btn btn-outline-primary btn-sm ms-2' 
                : 'btn btn-outline-warning btn-sm ms-2';
        }
    }

    bindEvents() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    }
}

// API service
class APIService {
    static async getInternData() {
        try {
            const response = await fetch('/api/intern');
            return await response.json();
        } catch (error) {
            console.error('Error fetching intern data:', error);
            return null;
        }
    }

    static async getLeaderboardData() {
        try {
            const response = await fetch('/api/leaderboard');
            return await response.json();
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
            return null;
        }
    }
}

// Dashboard functionality
class Dashboard {
    constructor() {
        this.internData = null;
        this.rewards = [
            { name: 'Amazon Gift Card', icon: 'fas fa-gift', amount: 1000, description: '₹1000 Amazon Gift Card' },
            { name: 'T-Shirt', icon: 'fas fa-tshirt', amount: 1500, description: 'Exclusive Intern T-Shirt' },
            { name: 'Certificate', icon: 'fas fa-certificate', amount: 2000, description: 'Achievement Certificate' }
        ];
        this.init();
    }

    async init() {
        await this.loadInternData();
        this.renderStats();
        this.renderRewards();
    }

    async loadInternData() {
        this.internData = await APIService.getInternData();
        if (!this.internData) {
            // Fallback data
            this.internData = {
                name: "Praveen Revalla",
                referralCode: "praveen2025",
                totalDonations: 1700
            };
        }
    }

    renderStats() {
        if (this.internData) {
            const nameElement = document.getElementById('displayName');
            const referralElement = document.getElementById('referralCode');
            const donationsElement = document.getElementById('totalDonations');

            if (nameElement) nameElement.textContent = this.internData.name;
            if (referralElement) referralElement.textContent = this.internData.referralCode;
            if (donationsElement) donationsElement.textContent = this.internData.totalDonations;
        }
    }

    renderRewards() {
        const container = document.getElementById('rewardsContainer');
        if (!container || !this.internData) return;

        container.innerHTML = '';
        
        this.rewards.forEach(reward => {
            const isUnlocked = this.internData.totalDonations >= reward.amount;
            const card = this.createRewardCard(reward, isUnlocked);
            container.appendChild(card);
        });
    }

    createRewardCard(reward, isUnlocked) {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-3';
        
        col.innerHTML = `
            <div class="card reward-card ${isUnlocked ? 'unlocked' : 'locked'} h-100">
                <div class="card-body text-center">
                    <i class="${reward.icon} display-6 mb-3"></i>
                    <h5 class="card-title">${reward.name}</h5>
                    <p class="card-text">${reward.description}</p>
                    <div class="mt-3">
                        <span class="badge ${isUnlocked ? 'bg-success' : 'bg-secondary'}">
                            <i class="fas ${isUnlocked ? 'fa-check-circle' : 'fa-lock'} me-1"></i>
                            ${isUnlocked ? 'Unlocked' : 'Locked'}
                        </span>
                    </div>
                    <small class="text-muted d-block mt-2">
                        <i class="fas fa-coins me-1"></i>
                        Requires: ₹${reward.amount}
                    </small>
                </div>
            </div>
        `;

        return col;
    }
}

// Leaderboard functionality
class Leaderboard {
    constructor() {
        this.leaderboardData = [];
        this.init();
    }

    async init() {
        await this.loadLeaderboardData();
        this.renderLeaderboard();
        this.renderStats();
    }

    async loadLeaderboardData() {
        this.leaderboardData = await APIService.getLeaderboardData();
        if (!this.leaderboardData) {
            // Fallback data
            this.leaderboardData = [
                {"name": "Anu", "referral": "anu2025", "total": 2200},
                {"name": "Praveen", "referral": "praveen2025", "total": 1700},
                {"name": "Ravi", "referral": "ravi2025", "total": 900}
            ];
        }
    }

    renderLeaderboard() {
        const tbody = document.getElementById('leaderboardBody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        this.leaderboardData.forEach((entry, index) => {
            const row = this.createLeaderboardRow(entry, index + 1);
            tbody.appendChild(row);
        });
    }

    createLeaderboardRow(entry, position) {
        const row = document.createElement('tr');
        
        // Determine status based on position
        let status = '';
        let statusClass = '';
        let statusIcon = '';
        if (position === 1) {
            status = 'Gold Medal';
            statusClass = 'text-warning';
            statusIcon = 'fas fa-gem';
        } else if (position === 2) {
            status = 'Silver Medal';
            statusClass = 'text-secondary';
            statusIcon = 'fas fa-medal';
        } else if (position === 3) {
            status = 'Bronze Medal';
            statusClass = 'text-danger';
            statusIcon = 'fas fa-award';
        } else {
            status = 'Participant';
            statusClass = 'text-muted';
            statusIcon = 'fas fa-star';
        }

        row.innerHTML = `
            <td><strong>${position}</strong></td>
            <td>${entry.name}</td>
            <td><code>${entry.referral}</code></td>
            <td>₹${entry.total}</td>
            <td class="${statusClass}">
                <i class="${statusIcon} me-1"></i>
                ${status}
            </td>
        `;

        return row;
    }

    renderStats() {
        if (this.leaderboardData.length === 0) return;

        const topPerformer = document.getElementById('topPerformer');
        const totalRaised = document.getElementById('totalRaised');
        const participantCount = document.getElementById('participantCount');

        if (topPerformer) {
            topPerformer.textContent = this.leaderboardData[0].name;
        }

        if (totalRaised) {
            const total = this.leaderboardData.reduce((sum, entry) => sum + entry.total, 0);
            totalRaised.textContent = total;
        }

        if (participantCount) {
            participantCount.textContent = this.leaderboardData.length;
        }
    }
}

// Login form handler
class LoginForm {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('loginForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Clear validation errors when user starts typing
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            
            if (fullNameInput) {
                fullNameInput.addEventListener('input', () => {
                    fullNameInput.classList.remove('is-invalid');
                });
            }
            
            if (emailInput) {
                emailInput.addEventListener('input', () => {
                    emailInput.classList.remove('is-invalid');
                });
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        
        if (fullName && email) {
            // Store email in localStorage for potential future use
            localStorage.setItem('userEmail', email);
            window.location.href = `/dashboard?name=${encodeURIComponent(fullName)}`;
        } else {
            // Show validation message
            if (!fullName) {
                fullNameInput.focus();
                fullNameInput.classList.add('is-invalid');
            }
            if (!email) {
                emailInput.focus();
                emailInput.classList.add('is-invalid');
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    const themeManager = new ThemeManager();
    
    // Initialize based on current page
    const currentPath = window.location.pathname;
    
    if (currentPath === '/dashboard') {
        new Dashboard();
    } else if (currentPath === '/leaderboard') {
        new Leaderboard();
    } else if (currentPath === '/') {
        new LoginForm();
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}); 