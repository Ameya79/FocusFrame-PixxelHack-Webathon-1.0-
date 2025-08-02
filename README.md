# 🎯 FocusFrame — A Beautiful Focus Timer Web App

**FocusFrame** is a visually stunning, distraction-free timer app built for productivity, clarity, and elegance. Designed for the **TCET Webathon**, it combines modern web UI aesthetics with a lightweight Flask backend — all in a single, seamless deployment.

## 🌟 Features

✅ **Loader Animation**  
A custom animated loader with brand reveal, bouncing gradient ball, and smooth text appearance.

✅ **Timer Cards with Hover Interactions**  
Visually interactive cards for Pomodoro (25 min), Deep Focus (50 min), and Ultra Focus (90 min) — each card animates on hover with glowing effects.

✅ **Text Typing Animation**  
Motivational quotes appear at the bottom of the page using a typing animation to inspire users during sessions.

✅ **Smooth Page Transitions**  
Transitions between pages and sections are animated to provide a polished, fluid experience across the app.

✅ **"Our Team" Modal Section**  
A beautifully designed modal popup displays core team members (Ameya Kulkarni and Dev Shah, IT-B) with smooth appearance and blur backdrop.

✅ **Custom Timer Support**  
Users can enter a custom duration up to 300 minutes and instantly launch a personalized focus session.

✅ **Mobile-Responsive Design**  
Optimized for both desktop and mobile devices with fully responsive layout and controls.

✅ **Single Deployment**  
Both backend and frontend are combined and deployed via a single lightweight Flask app — no separate deployment needed.

---

## 💻 Built With

- [Python Flask](https://flask.palletsprojects.com/) – Lightweight backend framework
- [HTML5 + CSS3](https://developer.mozilla.org/) – Modern structure & styles
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Typing effect, timer control, modal logic
- [Google Fonts](https://fonts.google.com/) – Inter & Playfair Display for modern, readable typography

---

## 🚀 Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/focusframe.git
cd focusframe
````

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the App

```bash
python main.py
```

Or with gunicorn:

```bash
gunicorn main:app
```

### 4. Visit the App

```
http://localhost:5000
```

---

## 📦 Deployment

Deploy the app for free using [Render](https://render.com/), Railway, or any platform that supports Flask + Gunicorn. You can host both backend and frontend together.

Sample `start command`:

```bash
gunicorn main:app
```

---

## 🙌 Team

* 👨‍💻 **Ameya Kulkarni** – IT B
* 👨‍💻 **Dev Shah** – IT B

---

## 📸 Screenshots

> *(Include some screenshots of the homepage, timer view, modal, etc. if desired)*

---

## 📄 License

This project is licensed for use in the TCET Webathon 2025. For external usage or contributions, please contact the team.

---

> Designed with 💜 by Ameya Kulkarni and Dev Shah (IT B) for productivity, focus, and minimalism (And for pixxelweb ofc ;) ).

```

---

Let me know if you want this exported as a file or want to include screenshots, GitHub badge icons, or a live demo badge.
```
