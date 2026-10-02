# 📝 To-Do List App

A simple To-Do List app built with **HTML, CSS, and JavaScript** as a learning project. It runs entirely in the browser, with no installation or build step required.

## 🎓 Credits

This project is a practice exercise based on a tutorial video by the **GreatStack** YouTube channel:

▶️ [Watch the tutorial](https://youtu.be/G0jO8kUrg-I?si=Kob-18S_2aOEaEtE)

All credit for the original idea and design goes to GreatStack. This repository is my own hands-on practice following along with the video.

## ✨ Features

**From the original tutorial**

- Add tasks with the input field and the **Add** button
- Click a task to mark it as completed
- Delete tasks with the **×** button
- Tasks are saved in the browser with `localStorage`

**My own additions**

- Press **Enter** to add a task
- **Edit** a task with the ✎ button (Enter to save, Esc to cancel)
- **Filter** tasks by All / Active / Completed
- Live counter showing how many tasks are left
- **Clear completed** button
- Friendly empty-state messages
- Tasks are now stored as structured data (JSON) instead of raw HTML, and rendered with `textContent` to avoid injecting HTML
- Old saved tasks from the previous version are migrated automatically

## 🛠️ Built With

| Technology | Purpose |
| ---------- | ------- |
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript (Vanilla) | App logic and DOM manipulation |

## 📁 Project Structure

```
to-do-list-app/
├── images/        # Image assets (app icon)
├── index.html     # Main page
├── script.js      # App logic
└── style.css      # Styles
```

## 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bobbyrahmanh/to-do-list-app.git
   ```

2. **Go into the project folder**:

   ```bash
   cd to-do-list-app
   ```

3. **Open `index.html`** in your browser (double-click the file, or use an extension like *Live Server* in VS Code).

No dependencies or build tools needed.

## 📖 Usage

1. Type your task into the **"Add your text..."** field
2. Click **Add** (or press **Enter**) to put it on the list
3. Click a task to mark it as completed
4. Click ✎ to edit a task, or × to delete it
5. Use the **All / Active / Completed** buttons to filter the list

## 🎯 Learning Goals

This project helped me practice the fundamentals of web development, including:

- DOM manipulation with JavaScript
- Event handling and event delegation
- Persisting data with `localStorage`
- Styling user interfaces with CSS

## 🤝 Contributing

This is a learning project, but suggestions and feedback are welcome. Feel free to open an issue or submit a pull request.

## 👤 Author

**bobbyrahmanh** – [GitHub](https://github.com/bobbyrahmanh)

## 📄 License

No license has been specified yet. Add a `LICENSE` file (e.g. MIT) if you'd like others to be able to use this project.
