# 🎓 Intern Portal

A fully functional, cleanly styled Intern Portal built with Flask + Bootstrap, featuring dynamic UI, dark/light mode, and a rewards system.

## ✨ Features

### 🎨 UI/UX
- **Responsive Design**: Built with Bootstrap 5 for mobile-first experience
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Smooth Animations**: Hover effects, transitions, and reward unlock animations
- **Modern Interface**: Clean cards, shadows, and professional styling

### 🔧 Core Functionality
- **Login System**: Simple name-based authentication
- **Dashboard**: Personal stats and progress tracking
- **Rewards System**: Dynamic reward cards with unlock animations
- **Leaderboard**: Real-time ranking with medals and statistics
- **API Integration**: RESTful endpoints for data management

### 🎁 Rewards System
- **Amazon Gift Card** - Unlocks at ₹1000
- **T-Shirt** - Unlocks at ₹1500  
- **Certificate** - Unlocks at ₹2000
- **Visual Feedback**: Unlocked rewards glow and are highlighted

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package installer)

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files locally, navigate to the project directory
   cd intern-portal
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
intern-portal/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css     # Custom styles and animations
│   └── js/
│       └── script.js     # Dynamic functionality
├── templates/
│   ├── index.html        # Login page
│   ├── dashboard.html    # Main dashboard
│   └── leaderboard.html  # Leaderboard page
└── README.md             # This file
```

## 🛠️ API Endpoints

### GET `/api/intern`
Returns intern data:
```json
{
  "name": "Praveen Revalla",
  "referralCode": "praveen2025",
  "totalDonations": 1700
}
```

### GET `/api/leaderboard`
Returns leaderboard data:
```json
[
  {"name": "Anu", "referral": "anu2025", "total": 2200},
  {"name": "Praveen", "referral": "praveen2025", "total": 1700},
  {"name": "Ravi", "referral": "ravi2025", "total": 900}
]
```

## 🎯 Pages

### `/` - Login Page
- Simple name input form
- Redirects to dashboard with personalized URL
- Dark/light mode toggle
- Link to leaderboard

### `/dashboard` - Main Dashboard
- Welcome message with personalized name
- Stats cards (Name, Referral Code, Total Donations)
- Rewards section with unlock animations
- Navigation to other pages

### `/leaderboard` - Leaderboard
- Dynamic table with rankings
- Medal system (Gold, Silver, Bronze)
- Statistics summary
- Responsive design

## 🎨 Customization

### Adding New Rewards
Edit the `rewards` array in `static/js/script.js`:
```javascript
this.rewards = [
    { name: 'New Reward', emoji: '🎉', amount: 2500, description: 'Description here' },
    // ... existing rewards
];
```

### Modifying Data
Update the static data in `app.py`:
```python
INTERN_DATA = {
    "name": "Your Name",
    "referralCode": "yourcode2025",
    "totalDonations": 2000
}
```

### Styling
- Main styles: `static/css/style.css`
- Bootstrap classes for layout
- Custom CSS variables for theming

## 🔧 Technical Details

### Frontend
- **Bootstrap 5**: Responsive grid system and components
- **Vanilla JavaScript**: ES6+ classes and async/await
- **CSS3**: Custom animations and transitions
- **HTML5**: Semantic markup

### Backend
- **Flask**: Lightweight web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Jinja2**: Template engine
- **Static Data**: No database required

### Features
- **Theme Persistence**: localStorage for user preferences
- **Responsive Design**: Mobile-first approach
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: Semantic HTML and ARIA labels

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production (using Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker (optional)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

## 🎉 Features in Action

1. **Login**: Enter any name to access the portal
2. **Dashboard**: View your stats and available rewards
3. **Rewards**: See which rewards are unlocked based on donations
4. **Leaderboard**: Compare your performance with others
5. **Theme Toggle**: Switch between dark and light modes
6. **Responsive**: Works perfectly on mobile and desktop

## 🤝 Contributing

Feel free to enhance the portal with:
- Additional reward types
- More detailed statistics
- User authentication
- Database integration
- Additional animations

## 📝 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Flask + Bootstrap** 