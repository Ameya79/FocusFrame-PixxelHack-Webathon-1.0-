#!/usr/bin/env python3
"""
FocusFrame - Minimal Focus Timer Web App
Main Flask application entry point
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import os
from datetime import datetime

app = Flask(__name__)

# Ensure sessions.json exists
SESSIONS_FILE = 'sessions.json'
if not os.path.exists(SESSIONS_FILE):
    with open(SESSIONS_FILE, 'w') as f:
        json.dump([], f)

def load_sessions():
    """Load sessions from JSON file"""
    try:
        with open(SESSIONS_FILE, 'r') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_sessions(sessions):
    """Save sessions to JSON file"""
    with open(SESSIONS_FILE, 'w') as f:
        json.dump(sessions, f, indent=2)

@app.route('/')
def loader():
    """Loader page with bouncing ball animation - clears previous sessions"""
    # Clear all previous sessions when user visits the site
    try:
        with open(SESSIONS_FILE, 'w') as f:
            json.dump([], f)
    except Exception as e:
        print(f"Error clearing sessions: {e}")
    
    return render_template('loader.html')

@app.route('/home')
def home():
    """Main home page with timer options"""
    return render_template('home.html')

@app.route('/start/<int:minutes>')
def start_timer(minutes):
    """Timer page for specified duration"""
    if minutes <= 0 or minutes > 300:  # Max 5 hours
        return redirect(url_for('home'))
    return render_template('timer.html', minutes=minutes)

@app.route('/save-session', methods=['POST'])
def save_session():
    """Save completed focus session"""
    try:
        data = request.get_json()
        duration = int(data.get('duration', 0))  # Ensure it's an integer
        notes = data.get('notes', '').strip()
        
        # Validate duration
        if duration <= 0:
            return jsonify({'success': False, 'error': 'Invalid duration'}), 400
        
        # Load existing sessions
        sessions = load_sessions()
        
        # Create new session entry
        new_session = {
            'id': len(sessions) + 1,
            'duration': duration,  # Now guaranteed to be an integer
            'notes': notes,
            'timestamp': datetime.now().isoformat(),
            'date': datetime.now().strftime('%Y-%m-%d %H:%M')
        }
        
        # Add and save
        sessions.append(new_session)
        save_sessions(sessions)
        
        return jsonify({'success': True, 'message': 'Session saved successfully!'})
    
    except (ValueError, TypeError) as e:
        return jsonify({'success': False, 'error': 'Invalid data format'}), 400
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/stats')
def stats():
    """Statistics and session history page"""
    sessions = load_sessions()
    
    # Calculate stats with proper type handling
    total_sessions = len(sessions)
    total_minutes = 0
    
    # Safely sum durations, ensuring they're integers
    for session in sessions:
        duration = session.get('duration', 0)
        # Convert to int if it's a string, default to 0 if invalid
        try:
            if isinstance(duration, str):
                duration = int(duration)
            elif not isinstance(duration, int):
                duration = 0
            total_minutes += duration
        except (ValueError, TypeError):
            continue  # Skip invalid duration entries
    
    total_hours = total_minutes // 60
    remaining_minutes = total_minutes % 60
    
    # Reverse for newest first
    sessions_copy = sessions.copy()
    sessions_copy.reverse()
    
    # Clean up session data for display
    for session in sessions_copy:
        # Ensure duration is always an integer for display
        try:
            session['duration'] = int(session.get('duration', 0))
        except (ValueError, TypeError):
            session['duration'] = 0
    
    stats_data = {
        'total_sessions': total_sessions,
        'total_hours': total_hours,
        'total_minutes': remaining_minutes,
        'sessions': sessions_copy
    }
    
    return render_template('stats.html', **stats_data)

@app.route('/clear-sessions', methods=['POST'])
def clear_sessions():
    """Clear all saved sessions"""
    try:
        with open(SESSIONS_FILE, 'w') as f:
            json.dump([], f)
        return jsonify({'success': True, 'message': 'All sessions cleared successfully!'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/dashboard')
def dashboard():
    """Alternative stats endpoint"""
    return redirect(url_for('stats'))

if __name__ == '__main__':
    # Create empty sessions file if it doesn't exist
    if not os.path.exists(SESSIONS_FILE):
        with open(SESSIONS_FILE, 'w') as f:
            json.dump([], f)
    
    app.run(debug=True, host='0.0.0.0', port=5000)