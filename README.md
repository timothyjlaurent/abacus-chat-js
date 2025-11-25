# Abacus.AI Chat Widget - Cleansed Version

## 🔒 Security-First Design

This is a **production-ready, security-focused** version of the Abacus.AI chat widget with:

- ✅ **NO hardcoded credentials** - all sensitive data must be provided externally
- ✅ **Data attribute support** - credentials passed via HTML attributes
- ✅ **Safe for public hosting** - the JS file contains no secrets
- ✅ **Validation built-in** - warns if credentials are missing
- ✅ **CDN-ready** - can be hosted on public CDNs safely

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Installation Methods](#installation-methods)
3. [Configuration Options](#configuration-options)
4. [Security Best Practices](#security-best-practices)
5. [Troubleshooting](#troubleshooting)
6. [API Reference](#api-reference)

---

## ⚡ Quick Start

### Method 1: Data Attributes (Recommended)

Add this single line to your HTML:

```html
<script src="path/to/abacus-chat-widget-clean.js" 
        data-deployment-id="YOUR_DEPLOYMENT_ID" 
        data-deployment-token="YOUR_DEPLOYMENT_TOKEN">
</script>
```

**That's it!** The widget will automatically initialize with your credentials.

### Method 2: Programmatic Initialization

```html
<script src="path/to/abacus-chat-widget-clean.js"></script>
<script>
  AbacusChatWidget({
    deploymentToken: 'YOUR_TOKEN',
    deploymentId: 'YOUR_ID'
  });
</script>
```

---

## 📦 Installation Methods

### Option A: Local File

1. Download `abacus-chat-widget-clean.js`
2. Place it in your web directory (e.g., `/assets/js/`)
3. Reference it in your HTML:

```html
<script src="/assets/js/abacus-chat-widget-clean.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN">
</script>
```

### Option B: CDN Hosting

You can safely host this file on any CDN:

```html
<script src="https://your-cdn.com/abacus-chat-widget-clean.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN">
</script>
```

### Option C: WordPress

Add to your theme's `footer.php` or use a custom HTML block:

```html
<script src="<?php echo get_template_directory_uri(); ?>/js/abacus-chat-widget-clean.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN">
</script>
```

---

## ⚙️ Configuration Options

### Data Attributes Reference

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `data-deployment-id` | ✅ Yes | - | Your Abacus.AI deployment ID |
| `data-deployment-token` | ✅ Yes | - | Your deployment authentication token |
| `data-api-endpoint` | ❌ No | Abacus.AI API | Custom API endpoint (advanced) |
| `data-title` | ❌ No | "Chat Assistant" | Widget header title |
| `data-subtitle` | ❌ No | "" | Widget header subtitle |
| `data-placeholder` | ❌ No | "Type your message..." | Input field placeholder |
| `data-position` | ❌ No | "bottom-left" | Position: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `data-width` | ❌ No | "400px" | Widget window width |
| `data-height` | ❌ No | "600px" | Widget window height |
| `data-primary-color` | ❌ No | "#293ba8" | Theme color (hex format) |

### Complete Example with All Options

```html
<script src="abacus-chat-widget-clean.js" 
        data-deployment-id="1045906d8e" 
        data-deployment-token="02b22c9a799148399659d55614dc7eab"
        data-title="Support Assistant"
        data-subtitle="We're here to help!"
        data-position="bottom-right"
        data-width="450px"
        data-height="650px"
        data-primary-color="#FF5722">
</script>
```

### Programmatic Configuration

```javascript
AbacusChatWidget({
  // Required
  deploymentToken: 'YOUR_TOKEN',
  deploymentId: 'YOUR_ID',
  
  // Optional UI customization
  title: 'Customer Support',
  subtitle: 'Ask us anything!',
  placeholder: 'How can we help?',
  position: 'bottom-right',
  width: '450px',
  height: '650px',
  
  // Optional theme customization
  theme: {
    primaryColor: '#FF5722',
    backgroundColor: '#FFFFFF',
    userMessageColor: '#FF5722',
    botMessageColor: '#F3F4F6',
    textColor: '#1F2937',
    buttonColor: '#FFFFFF',
    buttonHoverColor: '#F5F5F5',
    fontFamily: 'Arial, sans-serif'
  },
  
  // Advanced
  apiUrl: 'https://api.abacus.ai/api/v0/getChatResponse'
});
```

---

## 🔐 Security Best Practices

### ✅ DO:

1. **Keep credentials in your backend** when possible
   - Use server-side templates to inject credentials
   - Example (PHP): `data-deployment-token="<?php echo getenv('ABACUS_TOKEN'); ?>"`

2. **Use environment variables**
   ```bash
   # .env file
   ABACUS_DEPLOYMENT_ID=your_id_here
   ABACUS_DEPLOYMENT_TOKEN=your_token_here
   ```

3. **Rotate tokens regularly**
   - Change your deployment tokens every 90 days
   - Update all HTML pages when rotating

4. **Monitor API usage**
   - Check Abacus.AI dashboard for suspicious activity
   - Set up alerts for unusual usage patterns

5. **Use HTTPS**
   - Always serve your website over HTTPS
   - Credentials are exposed in HTML, HTTPS prevents interception

### ❌ DON'T:

1. **Never commit credentials to Git**
   ```bash
   # Add to .gitignore
   .env
   config/credentials.json
   ```

2. **Don't hardcode in public repositories**
   - Keep HTML files with credentials out of public repos
   - Or use template variables instead

3. **Don't share tokens publicly**
   - Tokens should be treated like passwords
   - Don't post in forums, screenshots, or support tickets

### Credential Management Examples

#### Node.js / Express

```javascript
// server.js
app.get('/', (req, res) => {
  res.render('index', {
    deploymentId: process.env.ABACUS_DEPLOYMENT_ID,
    deploymentToken: process.env.ABACUS_DEPLOYMENT_TOKEN
  });
});
```

```html
<!-- views/index.ejs -->
<script src="/js/abacus-chat-widget-clean.js" 
        data-deployment-id="<%= deploymentId %>" 
        data-deployment-token="<%= deploymentToken %>">
</script>
```

#### PHP

```php
<!-- index.php -->
<?php
$deploymentId = getenv('ABACUS_DEPLOYMENT_ID');
$deploymentToken = getenv('ABACUS_DEPLOYMENT_TOKEN');
?>

<script src="/js/abacus-chat-widget-clean.js" 
        data-deployment-id="<?php echo htmlspecialchars($deploymentId); ?>" 
        data-deployment-token="<?php echo htmlspecialchars($deploymentToken); ?>">
</script>
```

#### Static Site with Build Step

```javascript
// build.js
const fs = require('fs');

const template = fs.readFileSync('template.html', 'utf8');
const output = template
  .replace('{{DEPLOYMENT_ID}}', process.env.ABACUS_DEPLOYMENT_ID)
  .replace('{{DEPLOYMENT_TOKEN}}', process.env.ABACUS_DEPLOYMENT_TOKEN);

fs.writeFileSync('public/index.html', output);
```

```html
<!-- template.html -->
<script src="/js/abacus-chat-widget-clean.js" 
        data-deployment-id="{{DEPLOYMENT_ID}}" 
        data-deployment-token="{{DEPLOYMENT_TOKEN}}">
</script>
```

---

## 🔧 Troubleshooting

### Widget doesn't appear

**Check browser console** (F12 → Console tab):

```
❌ Missing required configuration: deploymentToken
❌ Missing required configuration: deploymentId
```

**Solution:** Verify data attributes are set correctly in HTML.

### "Configuration Error" in console

The widget validates credentials on load. If you see:

```
Abacus Chat Widget Configuration Error:
  - Missing required configuration: deploymentToken
  - Missing required configuration: deploymentId
```

**Checklist:**
1. ✅ Script tag has `data-deployment-id` attribute
2. ✅ Script tag has `data-deployment-token` attribute
3. ✅ Attributes are spelled correctly (with dashes, not camelCase)
4. ✅ Values are not empty strings

### Widget initializes but shows error on messages

**Check:**
1. Deployment ID and token are **valid** and not expired
2. Deployment is **active** in Abacus.AI dashboard
3. API endpoint is accessible (not blocked by firewall/CORS)

### Multiple widgets on same page

The widget is designed as a singleton. Only initialize once per page.

**Wrong:**
```html
<script src="widget.js" data-deployment-id="..." data-deployment-token="..."></script>
<script src="widget.js" data-deployment-id="..." data-deployment-token="..."></script>
```

**Right:**
```html
<script src="widget.js" data-deployment-id="..." data-deployment-token="..."></script>
```

---

## 📚 API Reference

### Global Function: `AbacusChatWidget(config)`

Initializes the chat widget programmatically.

**Parameters:**
- `config` (Object): Configuration object

**Returns:** Widget instance (internal use)

**Example:**
```javascript
AbacusChatWidget({
  deploymentToken: 'YOUR_TOKEN',
  deploymentId: 'YOUR_ID',
  title: 'My Assistant',
  position: 'bottom-right'
});
```

### Auto-initialization

The widget automatically initializes when:
1. Script tag has `data-deployment-id` AND `data-deployment-token`
2. DOM is fully loaded

You don't need to call `AbacusChatWidget()` manually when using data attributes.

---

## 🎨 Customization Examples

### Minimal Setup

```html
<script src="widget.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN">
</script>
```

### Custom Branding

```html
<script src="widget.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN"
        data-title="Acme Support"
        data-subtitle="24/7 Customer Service"
        data-primary-color="#FF5722">
</script>
```

### Different Position

```html
<!-- Top right corner -->
<script src="widget.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN"
        data-position="top-right">
</script>
```

### Larger Widget

```html
<script src="widget.js" 
        data-deployment-id="YOUR_ID" 
        data-deployment-token="YOUR_TOKEN"
        data-width="500px"
        data-height="700px">
</script>
```

---

## 🆚 Comparison with Original Version

| Feature | Original (`abacus-chat-widget.js`) | Cleansed (`abacus-chat-widget-clean.js`) |
|---------|-----------------------------------|------------------------------------------|
| Hardcoded credentials | ❌ Yes | ✅ No |
| Data attribute support | ⚠️ Limited | ✅ Full |
| Validation on init | ❌ No | ✅ Yes |
| Safe for CDN | ❌ No | ✅ Yes |
| Production-ready | ⚠️ For demos only | ✅ Yes |
| Security warnings | ❌ No | ✅ Yes |

---

## 📄 File Information

- **File:** `abacus-chat-widget-clean.js`
- **Version:** 2.0.0
- **Size:** ~35KB (unminified)
- **License:** MIT
- **Dependencies:** None (vanilla JavaScript)
- **Browser Support:** All modern browsers (Chrome, Firefox, Safari, Edge)

---

## 🔗 Related Files

- `demo-clean-widget.html` - Working demo with test credentials
- `SECURITY-NOTES.md` - Detailed security guidelines
- `abacus-chat-widget.js` - Original version (with hardcoded credentials)

---

## ❓ FAQ

### Q: Can I use this with my own backend?
**A:** Yes! Set `data-api-endpoint` to your proxy server that forwards to Abacus.AI.

### Q: Is it safe to expose credentials in HTML?
**A:** Deployment tokens are meant to be client-facing. However:
- Use HTTPS to prevent interception
- Rotate tokens regularly
- Monitor usage for abuse
- Consider rate limiting on your deployment

### Q: Can I modify the widget appearance?
**A:** Yes! Use the `data-primary-color` attribute or pass a full `theme` object programmatically.

### Q: Does this work on mobile?
**A:** Yes! The widget is fully responsive and mobile-friendly.

### Q: Can I have multiple widgets with different deployments?
**A:** No, the current version supports one widget per page. For multiple assistants, you'd need to modify the code to support namespacing.

---

## 📞 Support

For issues related to:
- **Widget code:** Check this README and SECURITY-NOTES.md
- **Abacus.AI API:** Contact Abacus.AI support
- **Deployment tokens:** Check your Abacus.AI dashboard

---

## 📝 License

MIT License - Free to use, modify, and distribute.

---

**Last Updated:** November 2025  
**Version:** 2.0.0 (Security-Focused)
