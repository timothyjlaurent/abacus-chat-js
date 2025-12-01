# 🚀 Abacus Chat Widget

### **Version 3.4.0** | Production-Ready | Security-First Design

A modern, feature-rich chat widget for integrating Abacus.AI conversational AI into any website. Features streaming responses, custom welcome messages, automatic source citation removal, customizable theming, workspace URL support, and a beautiful DNA helix avatar.

[![CDN Available](https://img.shields.io/badge/CDN-Available-brightgreen)](#installation)
[![Browser Support](https://img.shields.io/badge/Browsers-Modern-blue)](#browser-support)
[![Version](https://img.shields.io/badge/Version-3.4.0-orange)](#version-history)

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Installation](#-installation)
4. [Configuration](#-configuration)
5. [Usage Examples](#-usage-examples)
6. [Customization](#-customization)
7. [Advanced Features](#-advanced-features)
8. [Troubleshooting](#-troubleshooting)
9. [Browser Support](#-browser-support)
10. [Version History](#-version-history)
11. [Security Best Practices](#-security-best-practices)

---

## ✨ Features

- ✅ **Zero Dependencies** - Pure vanilla JavaScript
- ✅ **Custom Welcome Messages** - Configurable welcome text with markdown support
- ✅ **Streaming Responses** - Progressive text display like ChatGPT
- ✅ **Automatic Source Citation Removal** - Filters out `<a>source</a>` tags from responses
- ✅ **Workspace URL Support** - Works with custom Abacus.AI workspaces
- ✅ **DNA Helix Avatar** - Customizable bot avatar with your brand colors
- ✅ **Markdown Support** - Bold, italic, code blocks, and links
- ✅ **Auto-Linking** - Converts emails and phone numbers to clickable links
- ✅ **Conversation History** - Maintains context across messages
- ✅ **Responsive Design** - Works on desktop and mobile
- 🔒 **No Hardcoded Credentials** - All sensitive data provided externally
- 🔒 **CDN-Ready** - Safe for public hosting
- 🎨 **Fully Themeable** - Colors, fonts, sizing all customizable

---

## ⚡ Quick Start

> **Important:** Replace placeholder values with your actual credentials from the [Abacus.AI dashboard](https://app.abacus.ai).

Add this single line to your HTML:

```html
<script src="https://your-cdn.com/path/to/abacus-chat-widget.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID">
</script>
```

**Replace placeholders:**
- `YOUR_DEPLOYMENT_TOKEN` - Your deployment token from Abacus.AI
- `YOUR_DEPLOYMENT_ID` - Your deployment ID from Abacus.AI
- `https://your-cdn.com/path/to/abacus-chat-widget.js` - Your CDN or local path

The widget will automatically appear in the bottom-left corner. 🎉

---

## 📦 Installation

### Method 1: CDN (Recommended)

```html
<!-- Basic integration -->
<script src="https://your-cdn.com/path/to/abacus-chat-widget.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID">
</script>
```

### Method 2: Local File

1. Download `abacus-chat-widget-clean.js`
2. Place in your web directory (e.g., `/assets/js/`)
3. Reference in your HTML:

```html
<script src="/assets/js/abacus-chat-widget-clean.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID">
</script>
```

### Method 3: Programmatic Initialization

```html
<script src="https://your-cdn.com/path/to/abacus-chat-widget.js"></script>
<script>
  AbacusChatWidget({
    deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
    deploymentId: 'YOUR_DEPLOYMENT_ID',
    title: 'Support Assistant'
  });
</script>
```

### Method 4: WordPress

Add to your theme's `footer.php` before `</body>`:

```php
<script src="<?php echo get_template_directory_uri(); ?>/js/abacus-chat-widget-clean.js"
        data-deployment-token="<?php echo getenv('ABACUS_TOKEN'); ?>"
        data-deployment-id="<?php echo getenv('ABACUS_ID'); ?>">
</script>
```

---

## ⚙️ Configuration

### Required Options

| Option | Type | Description | Where to Find |
|--------|------|-------------|---------------|
| `deploymentToken` | string | **REQUIRED** - Your Abacus.AI deployment token | Abacus.AI Dashboard → Deployments |
| `deploymentId` | string | **REQUIRED** - Your Abacus.AI deployment ID | Abacus.AI Dashboard → Deployments |

### Optional Configuration

#### UI Customization

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `"Chat Assistant"` | Widget header title |
| `subtitle` | string | `""` | Widget header subtitle |
| `placeholder` | string | `"Type your message..."` | Input field placeholder |
| `welcomeMessage` | string | `"Hello! How can I help you today?"` | Welcome message shown when chat opens (supports markdown) |
| `showWelcomeMessage` | boolean | `true` | Show/hide welcome message |
| `position` | string | `"bottom-left"` | Position: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `width` | string | `"400px"` | Chat window width |
| `height` | string | `"600px"` | Chat window height |

#### Advanced Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `workspaceUrl` | string | `"api.abacus.ai"` | Custom workspace URL (e.g., `yourcompany.abacus.ai`) |
| `apiUrl` | string | `null` | Override API endpoint (auto-built from workspaceUrl if not set) |
| `enableStreaming` | boolean | `true` | Enable streaming responses |
| `simulateStreaming` | boolean | `true` | Fallback to simulated streaming if true streaming fails |
| `primaryColor` | string | `"#293ba8"` | Primary brand color |

### Configuration Methods

#### Option A: Data Attributes (Recommended)

```html
<script src="abacus-chat-widget-clean.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID"
        data-title="Support Assistant"
        data-welcome-message="Welcome! How can I help you today?"
        data-show-welcome-message="true"
        data-position="bottom-right"
        data-primary-color="#FF5722">
</script>
```

#### Option B: Programmatic

```javascript
AbacusChatWidget({
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID',
  title: 'Support Assistant',
  welcomeMessage: 'Welcome! **I\'m here to help.** Ask me anything!',
  showWelcomeMessage: true,
  position: 'bottom-right',
  theme: {
    primaryColor: '#FF5722'
  }
});
```

---

## 📝 Usage Examples

### Example 1: Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  
  <!-- Chat widget integration -->
  <script src="https://your-cdn.com/path/to/abacus-chat-widget.js"
          data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
          data-deployment-id="YOUR_DEPLOYMENT_ID">
  </script>
</body>
</html>
```

### Example 2: Custom Branding

```html
<script src="https://your-cdn.com/path/to/abacus-chat-widget.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID"
        data-title="Customer Support"
        data-subtitle="We're here to help!"
        data-position="bottom-right"
        data-primary-color="#FF5722">
</script>
```

### Example 3: Custom Workspace

For organizations with custom Abacus.AI workspaces:

```html
<script src="https://your-cdn.com/path/to/abacus-chat-widget.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID"
        data-workspace-url="yourcompany.abacus.ai">
</script>
```

> **Finding Your Workspace URL:**
> - Check your Abacus.AI dashboard URL
> - Common format: `yourcompany.abacus.ai`
> - Default: `api.abacus.ai`

### Example 4: Full Customization

```javascript
AbacusChatWidget({
  // Required credentials
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID',
  
  // Workspace (if custom)
  workspaceUrl: 'yourcompany.abacus.ai',
  
  // UI customization
  title: 'AI Assistant',
  subtitle: 'Powered by Abacus.AI',
  placeholder: 'Ask me anything...',
  position: 'bottom-right',
  width: '450px',
  height: '650px',
  
  // Theme
  theme: {
    primaryColor: '#293ba8',
    backgroundColor: '#F9FAFB',
    fontFamily: '"Inter", sans-serif'
  }
});
```

### Example 5: Custom Welcome Messages

Welcome messages support markdown formatting and can be customized or disabled:

```html
<!-- Custom welcome message with markdown -->
<script src="https://your-cdn.com/path/to/abacus-chat-widget.js"
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID"
        data-welcome-message="Welcome! **I'm here to help.** Feel free to ask me anything!"
        data-show-welcome-message="true">
</script>
```

```javascript
// Multi-line welcome message with formatting
AbacusChatWidget({
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID',
  welcomeMessage: `👋 Hello! Welcome to **Customer Support**.

I can help you with:
- Product information
- Technical support
- Billing questions

*Feel free to ask anything!*`,
  showWelcomeMessage: true
});
```

```javascript
// Disable welcome message
AbacusChatWidget({
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID',
  showWelcomeMessage: false  // No welcome message
});
```

> **Features:**
> - ✅ Supports markdown: **bold**, *italic*, `code`, [links](url)
> - ✅ Multi-line messages with proper formatting
> - ✅ Emojis fully supported
> - ✅ No copy button on welcome messages
> - ✅ Not included in API conversation history

---

## 🎨 Customization

### Theming

```javascript
AbacusChatWidget({
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID',
  theme: {
    primaryColor: '#667eea',           // Brand color
    backgroundColor: '#FFFFFF',        // Window background
    userMessageColor: '#667eea',       // User bubble color
    botMessageColor: '#F3F4F6',        // Bot bubble color
    textColor: '#1F2937',              // Text color
    fontFamily: '"SF Pro", sans-serif' // Custom font
  }
});
```

### Positioning & Sizing

```html
<!-- Compact Widget -->
<script src="..." 
        data-width="350px"
        data-height="500px"
        data-position="bottom-left">
</script>

<!-- Large Widget -->
<script src="..."
        data-width="500px"
        data-height="800px"
        data-position="bottom-right">
</script>
```

**Note:** On mobile (<480px), the widget automatically adapts to fit the screen.

---

## 🔥 Advanced Features

### Streaming Responses

Version 3.0.0+ includes ChatGPT-style streaming with progressive text display.

```html
<!-- Enable streaming (default) -->
<script src="..."
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID"
        data-enable-streaming="true">
</script>
```

**How it works:**
1. **True Streaming** - Real-time text chunks from server (lowest latency)
2. **Simulated Streaming** - Fallback that reveals text word-by-word
3. **Smart Fallback** - Automatically switches if API unavailable

**Visual Features:**
- ✨ Blinking cursor during typing
- ✨ Progressive word-by-word display
- ✨ Smooth, natural reading pace

### Workspace URLs

Version 3.1.0+ supports custom Abacus.AI workspaces.

```javascript
// Default workspace
AbacusChatWidget({
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID'
  // Uses: https://api.abacus.ai/api/...
});

// Custom workspace
AbacusChatWidget({
  deploymentToken: 'YOUR_DEPLOYMENT_TOKEN',
  deploymentId: 'YOUR_DEPLOYMENT_ID',
  workspaceUrl: 'yourcompany.abacus.ai'
  // Uses: https://yourcompany.abacus.ai/api/...
});
```

### Source Citation Removal

Version 3.2.0+ automatically removes source citation anchor tags from bot responses.

**What it does:**
- Filters out `<a href="...">source</a>` tags from all bot messages
- Works in both streaming and non-streaming modes
- Case-insensitive pattern matching
- Preserves all other links (emails, URLs, phone numbers)

**Example:**
```
Bot response: "The answer is 42. <a href="#ref1">source</a> This is important."
Displayed text: "The answer is 42. This is important."
```

**How it works:**
- Uses regex pattern: `/\<a\s+[^>]*>\s*source\s*\<\/a>/gi`
- Applied before markdown rendering
- Automatic - no configuration needed

### Markdown & Auto-Linking

The widget automatically renders:

**Markdown:**
- `**Bold text**`
- `*Italic text*`
- `` `inline code` ``
- `[Links](https://example.com)`

**Auto-Links:**
- Emails: `support@example.com` → clickable mailto link
- Phones: `(555) 123-4567` → clickable tel link

---

## 🔧 Troubleshooting

### Widget Doesn't Appear

**Check console (F12 → Console) for errors:**

```
❌ Missing required configuration: deploymentToken
❌ Missing required configuration: deploymentId
```

**Solution:** Verify your credentials and attribute names.

**Correct data attribute format:**
```html
<!-- ✅ Correct -->
<script data-deployment-token="..." data-deployment-id="..."></script>

<!-- ❌ Incorrect (old format) -->
<script data-abacus-deployment-token="..." data-abacus-deployment-id="..."></script>
```

### Widget Doesn't Respond

**Check Network Tab (F12 → Network):**
- Look for POST requests to `getChatResponse` or `getStreamingChatResponse`
- Check response status (should be 200)

**Common API Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Invalid credentials | Verify token/ID in Abacus.AI dashboard |
| 401 Unauthorized | Token expired | Generate new deployment token |
| 404 Not Found | Wrong workspace URL | Add `data-workspace-url` attribute |

### Workspace URL Errors

**Error:** "Please use your workspace URL: https://yourworkspace.abacus.ai"

**Solution:** Add workspace URL to configuration:

```html
<script src="..."
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
        data-deployment-id="YOUR_DEPLOYMENT_ID"
        data-workspace-url="yourworkspace.abacus.ai">
</script>
```

### Streaming Not Working

Check console output. If streaming fails, simulated streaming provides identical visual experience.

To disable streaming entirely:
```html
<script src="..." data-enable-streaming="false"></script>
```

---

## 🌐 Browser Support

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 60+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| Chrome Mobile | 60+ | ✅ Fully Supported |
| Safari iOS | 12+ | ✅ Fully Supported |
| Internet Explorer | Any | ❌ Not Supported |

**Required Features:**
- ES6+ JavaScript
- Fetch API
- Promises
- ReadableStream API (for streaming)

---

## 📜 Version History

### v3.4.0 (December 1, 2025) - **Current**

**New Features:**
- ✨ **Custom welcome message configuration** - Fully configurable welcome messages
- ✨ `welcomeMessage` config option - Set custom text with markdown support
- ✨ `showWelcomeMessage` config option - Enable/disable welcome message
- ✨ Data attribute support - `data-welcome-message` and `data-show-welcome-message`
- ✨ Welcome messages excluded from API conversation history
- ✨ No copy button on welcome messages

**Implementation:**
- Added welcome message configuration to `DEFAULT_CONFIG`
- Modified `addMessage()` to skip adding welcome messages to conversation history
- Updated `init()` and `newConversation()` methods to use configurable welcome message
- Added data attribute parsing for `data-welcome-message` and `data-show-welcome-message`
- Updated console initialization message to v3.4.0

---

### v3.3.0 (November 2025)

**New Features:**
- ✨ **Poppins font styling** - Updated all text to use Poppins font family
- ✨ Google Fonts integration for Poppins (weights 400, 500, 600)
- ✨ Consistent text color (#1A1A1A) across all elements
- ✨ Maintained 16px base font size

---

### v3.2.0 (November 25, 2025)

**New Features:**
- ✨ **Automatic source citation removal** - Filters `<a>source</a>` tags from bot responses
- ✨ Removes source citations in all rendering modes (streaming and non-streaming)
- ✨ Case-insensitive pattern matching for source tags
- ✨ Preserves other anchor tags (emails, URLs, phone numbers)

**Implementation:**
- Added `removeSourceCitations()` function with regex pattern: `/\<a\s+[^>]*>\s*source\s*\<\/a>/gi`
- Applied to markdown rendering and streaming display paths
- Updated console initialization message to v3.2.0

---

### v3.1.0 (November 2025)

**New Features:**
- ✨ Workspace URL support for custom Abacus.AI deployments
- ✨ Dynamic API URL building
- ✨ Updated API paths from `/api/v0/` to `/api/`

**Bug Fixes:**
- Fixed streaming API path construction

---

### v3.0.0 (November 2025)

**New Features:**
- ✨ Streaming responses with progressive text display
- ✨ Animated blinking cursor
- ✨ Smart fallback to simulated streaming

---

### v2.0.0 (November 2025)

**Security Update:**
- Removed all hardcoded credentials
- Added data attribute support
- Made file safe for public CDN hosting

---

### v1.x (Original)

**Initial Features:**
- Basic chat widget functionality
- DNA helix avatar
- Markdown support
- Auto-linking emails and phone numbers

---

## 🔐 Security Best Practices

### ✅ DO:

1. **Use HTTPS** - Always serve your site over HTTPS
2. **Environment Variables** - Store credentials in environment variables
   ```bash
   # .env file
   ABACUS_DEPLOYMENT_TOKEN=your_token
   ABACUS_DEPLOYMENT_ID=your_id
   ```
3. **Backend Injection** - Inject credentials from backend
   ```javascript
   // Node.js example
   res.render('index', {
     token: process.env.ABACUS_TOKEN,
     id: process.env.ABACUS_ID
   });
   ```
4. **Rotate Tokens** - Change deployment tokens every 90 days
5. **Monitor Usage** - Check Abacus.AI dashboard regularly

### ❌ DON'T:

1. **Never Commit Credentials** - Add credentials to `.gitignore`
   ```bash
   # .gitignore
   .env
   config/credentials.json
   **/secrets/**
   ```
2. **Don't Hardcode in Public Repos**
   ```javascript
   // Bad ❌
   const token = 'abc123...';
   
   // Good ✅
   const token = process.env.ABACUS_TOKEN;
   ```
3. **Don't Share Tokens Publicly** - Never post in forums or support tickets

### Production Checklist

- [ ] HTTPS enabled
- [ ] Credentials in environment variables
- [ ] `.gitignore` configured
- [ ] Token rotation schedule set
- [ ] API usage monitoring enabled
- [ ] Error tracking configured

### Secure Integration Example

```html
<!-- Don't do this ❌ -->
<script src="widget.js" 
        data-deployment-token="abc123actual_token_here"
        data-deployment-id="xyz789">
</script>

<!-- Do this ✅ -->
<script src="widget.js"
        data-deployment-token="<?php echo getenv('ABACUS_TOKEN'); ?>"
        data-deployment-id="<?php echo getenv('ABACUS_ID'); ?>">
</script>
```

---

## 🤝 Getting Your Credentials

### Where to Find Your Credentials

1. **Log in to Abacus.AI Dashboard:** [https://app.abacus.ai](https://app.abacus.ai)
2. **Navigate to Deployments**
3. **Select your chatbot deployment**
4. **Copy your credentials:**
   - **Deployment Token** - Long alphanumeric string
   - **Deployment ID** - Short alphanumeric ID
   - **Workspace URL** (if custom) - Format: `yourcompany.abacus.ai`

### Need Help?

- Check browser console for error messages
- Review included demo files for working examples
- Verify credentials in Abacus.AI dashboard
- Ensure data attributes use correct naming

---

## 📄 License

**MIT License** - Copyright (c) 2025 Abacus.AI

See LICENSE file for full details.

---

## 🎉 Quick Start Summary

1. **Get credentials** from Abacus.AI dashboard
2. **Copy script tag** from Quick Start section
3. **Replace placeholders** with your actual credentials
4. **Add to your HTML** before `</body>` tag
5. **Test in browser**
6. **Deploy**

**That's it! Your AI chat widget is ready. 💬✨**

---

*Last Updated: November 25, 2025 | Version 3.2.0*

**Note:** This README uses placeholder values (`YOUR_DEPLOYMENT_TOKEN`, `YOUR_DEPLOYMENT_ID`, `yourcompany.abacus.ai`) for security. Replace these with your actual credentials from the Abacus.AI dashboard before deployment.
