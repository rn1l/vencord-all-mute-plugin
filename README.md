# Vencord All Mute Plugin

![Demo](Allmute.gif)

* **[日本語ドキュメント (README_JP.md)](README_JP.md)**

A custom Vencord plugin that adds "All Mute" and "All Unmute" buttons to the server (guild) right-click context menu, allowing you to mute/unmute a server and suppress/unsuppress all notification settings with a single click.

## Plugin Features

### 1. All Mute
Applies the following settings to the target server at once:
- **Mute Guild**: Until unmuted (Duration set to `-1`)
- **Notification Settings**: Nothing
- **Suppress @everyone and @here**: Enabled (Checked)
- **Suppress all role @mentions**: Enabled (Checked)
- **Suppress Highlights**: Enabled (Checked)
- **Mute New Events**: Enabled (Checked)

### 2. All Unmute
Restores all notification settings back to default/enabled:
- **Unmute Guild**: Disabled (Unmuted)
- **Notification Settings**: All Messages
- **Suppress @everyone and @here**: Disabled (Unchecked)
- **Suppress all role @mentions**: Disabled (Unchecked)
- **Suppress Highlights**: Disabled (Unchecked)
- **Mute New Events**: Disabled (Unchecked)

---

## Installation

You need to have Vencord cloned from source to load custom plugins.

### 1. Place the Plugin Files
Create a folder named `allMute` inside your local Vencord repository's `src/userplugins` directory, and place `index.tsx` inside it.

**Path:**
`[Vencord Repository Root]/src/userplugins/allMute/index.tsx`

> [!TIP]
> If the `userplugins` directory does not exist, create it under the `src` folder.

### 2. Build Vencord
Open your terminal in your Vencord root directory and compile Vencord:

```bash
pnpm build
```
Or use watch mode during development:
```bash
pnpm build --watch
```

Once built, restart Discord (or press `Ctrl + R` to reload).

### 3. Enable the Plugin
1. Open Discord Settings.
2. In the **Vencord** section, click **Plugins** in the left menu.
3. Search for "**Server All Mute**".
4. Toggle the switch to **ON** to enable it.

---

## How to Use

1. Right-click any server (guild) icon.
2. Click **`All Mute`** or **`All Unmute`** at the bottom (or top) of the menu.
3. A toast notification confirming `Server fully muted!` or `Server fully unmuted!` will appear.
