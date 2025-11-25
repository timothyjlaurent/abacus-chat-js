/**
 * =====================================================
 * ABACUS.AI CHAT WIDGET - PRODUCTION-READY CLEAN VERSION
 * =====================================================
 * 
 * VERSION: 3.1.0 (Workspace URL Support + Streaming)
 * LICENSE: MIT
 * LAST UPDATED: November 25, 2025
 * NEW: Added workspace URL configuration for custom deployments
 * NEW: Added streaming support with progressive text display
 * FIX: Corrected API parameter naming from snake_case to camelCase (deploymentToken, deploymentId)
 * FIX: Updated API paths to use workspace-specific URLs (/api/getStreamingChatResponse)
 * 
 * ⚠️ IMPORTANT: NO HARDCODED CREDENTIALS
 * This version contains NO hardcoded deployment tokens, API keys,
 * or other sensitive information. All credentials MUST be provided
 * via data attributes or programmatic configuration.
 * 
 * =====================================================
 * USAGE METHOD 1: Data Attributes (Recommended)
 * =====================================================
 * 
 * Load the widget with credentials in HTML:
 * 
 *   <script src="abacus-chat-widget-clean.js" 
 *           data-deployment-id="YOUR_DEPLOYMENT_ID" 
 *           data-deployment-token="YOUR_DEPLOYMENT_TOKEN"
 *           data-title="My Assistant"
 *           data-position="bottom-right"
 *           data-enable-streaming="true">
 *   </script>
 * 
 * Available data attributes:
 *   - data-deployment-id (REQUIRED)
 *   - data-deployment-token (REQUIRED)
 *   - data-workspace-url (optional, default: 'api.abacus.ai')
 *       Example: 'genedx.abacus.ai' for workspace-specific deployments
 *   - data-api-endpoint (optional, overrides workspace URL for regular API)
 *   - data-enable-streaming (optional, default: true)
 *   - data-simulate-streaming (optional, default: true - fallback if true streaming fails)
 *   - data-title (optional)
 *   - data-subtitle (optional)
 *   - data-placeholder (optional)
 *   - data-position (optional: bottom-left, bottom-right, top-left, top-right)
 *   - data-primary-color (optional, hex color)
 *   - data-width (optional, e.g., "400px")
 *   - data-height (optional, e.g., "600px")
 * 
 * =====================================================
 * USAGE METHOD 2: Programmatic (For Advanced Use)
 * =====================================================
 * 
 * Initialize the widget via JavaScript:
 * 
 *   <script src="abacus-chat-widget-clean.js"></script>
 *   <script>
 *     AbacusChatWidget({
 *       deploymentToken: 'YOUR_TOKEN',
 *       deploymentId: 'YOUR_ID',
 *       workspaceUrl: 'genedx.abacus.ai',  // Optional: specify your workspace
 *       title: 'My Assistant',
 *       position: 'bottom-right',
 *       enableStreaming: true,
 *       simulateStreaming: true
 *     });
 *   </script>
 * 
 * =====================================================
 * STREAMING SUPPORT:
 * =====================================================
 * 
 * - enableStreaming: true (default) - Uses streaming API for progressive text display
 * - simulateStreaming: true (default) - Falls back to simulated streaming if true streaming fails
 * - Displays text progressively as it's generated
 * - Shows a blinking cursor during streaming
 * - Applies markdown rendering after streaming completes
 * - Adds copy button after streaming completes
 * 
 * =====================================================
 * SECURITY NOTES:
 * =====================================================
 * 
 * 1. This JS file can be safely hosted on public CDNs
 * 2. Keep credentials separate in your HTML/backend
 * 3. Use environment variables for credential management
 * 4. Rotate tokens regularly
 * 5. Monitor API usage for suspicious activity
 * 
 * =====================================================
 */

(function() {
  'use strict';

  // Default configuration (NO sensitive data)
  const DEFAULT_CONFIG = {
    // ⚠️ NO CREDENTIALS HERE - Must be provided via data attributes or config
    deploymentToken: null,  // REQUIRED
    deploymentId: null,     // REQUIRED
    workspaceUrl: 'api.abacus.ai',  // Workspace URL (e.g., 'genedx.abacus.ai' or 'api.abacus.ai')
    apiUrl: null,  // Will be built dynamically from workspaceUrl
    streamingApiUrl: null,  // Will be built dynamically from workspaceUrl
    enableStreaming: true,  // NEW: Enable streaming by default
    simulateStreaming: true, // NEW: Simulate streaming if true streaming fails
    
    // UI Configuration (safe defaults)
    title: 'Chat Assistant',
    subtitle: '',
    placeholder: 'Type your message...',
    position: 'bottom-left',
    theme: {
      primaryColor: '#293ba8',
      backgroundColor: '#FFFFFF',
      userMessageColor: '#293ba8',
      botMessageColor: '#F3F4F6',
      textColor: '#1F2937',
      buttonColor: '#FFFFFF',
      buttonHoverColor: '#F5F5F5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    width: '400px',
    height: '600px',
    buttonSize: '45px',
  };

  // DNA Helix SVG for bot avatar
  function getDNAHelixSVG() {
    return `
      <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#293ba8" d="M34.8,29.2,27.5,24l7.3-5.2a9.6,9.6,0,0,0,4.2-8,9.8,9.8,0,0,0-4.2-8.1l-.5-.3a1.9,1.9,0,0,0-2.8.4A2,2,0,0,0,32,5.6l.5.4A5.8,5.8,0,0,1,35,10.8a5.6,5.6,0,0,1-2.5,4.7L24,21.6,20.4,19H25a2,2,0,0,0,0-4H14.9a6.6,6.6,0,0,1-1.4-2H31a2,2,0,0,0,0-4H13.3a5.6,5.6,0,0,1,1.1-2H27a2,2,0,0,0,0-4H16.6c0-.1,0-.1-.1-.2a1.9,1.9,0,0,0-2.8-.4l-.5.3A9.8,9.8,0,0,0,9,10.8a9.6,9.6,0,0,0,4.2,8L20.5,24l-7.3,5.2a9.6,9.6,0,0,0-4.2,8,9.8,9.8,0,0,0,4.2,8.1l.5.3a1.9,1.9,0,0,0,1.2.4,2.1,2.1,0,0,0,1.6-.8,2,2,0,0,0-.5-2.8l-.5-.4A5.8,5.8,0,0,1,13,37.2a5.6,5.6,0,0,1,2.5-4.7l8.5-6L27.6,29H23a2,2,0,0,0,0,4H33.1a6.6,6.6,0,0,1,1.4,2H17a2,2,0,0,0,0,4H34.7a5.6,5.6,0,0,1-1.1,2H21a2,2,0,0,0,0,4H31.4c0,.1.1.1.1.2a2.1,2.1,0,0,0,1.6.8,1.9,1.9,0,0,0,1.2-.4l.5-.3A9.8,9.8,0,0,0,39,37.2,9.6,9.6,0,0,0,34.8,29.2Z"/>
      </svg>
    `;
  }

  // Auto-link emails and phone numbers
  function autoLinkEmailsAndPhones(text) {
    if (!text) return text;
    
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const phoneRegex = /(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;
    
    text = text.replace(emailRegex, '<a href="mailto:$1">$1</a>');
    text = text.replace(phoneRegex, function(match) {
      const cleanPhone = match.replace(/[\s.\-()]/g, '');
      return `<a href="tel:${cleanPhone}">${match}</a>`;
    });
    
    return text;
  }

  // Simple markdown renderer
  function renderMarkdown(text) {
    if (!text) return '';
    
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = autoLinkEmailsAndPhones(html);
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p>([•\-\*] .+?)<\/p>/g, '<ul><li>$1</li></ul>');
    html = html.replace(/([•\-\*] )/g, '');
    
    return html;
  }

  // Generate CSS for the widget
  function generateCSS(config) {
    const theme = config.theme;
    const position = config.position || 'bottom-right';
    
    let buttonPositionStyles = '';
    let windowPositionStyles = '';
    
    if (position === 'bottom-left') {
      buttonPositionStyles = 'bottom: 75px; left: 15px;';
      windowPositionStyles = 'bottom: 128px; left: 15px;';
    } else if (position === 'bottom-right') {
      buttonPositionStyles = 'bottom: 20px; right: 20px;';
      windowPositionStyles = 'bottom: 90px; right: 20px;';
    } else if (position === 'top-right') {
      buttonPositionStyles = 'top: 20px; right: 20px;';
      windowPositionStyles = 'top: 90px; right: 20px;';
    } else if (position === 'top-left') {
      buttonPositionStyles = 'top: 20px; left: 20px;';
      windowPositionStyles = 'top: 90px; left: 20px;';
    }
    
    return `
      /* Abacus Chat Widget Styles */
      .abacus-chat-widget-container {
        position: fixed;
        z-index: 999999;
        font-family: ${theme.fontFamily};
      }
      
      .abacus-chat-widget-button {
        position: fixed;
        ${buttonPositionStyles}
        width: ${config.buttonSize};
        height: ${config.buttonSize};
        border-radius: 50%;
        background: ${theme.buttonColor};
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 999999;
      }
      
      .abacus-chat-widget-button:hover {
        background: ${theme.buttonHoverColor};
      }
      
      .abacus-chat-widget-button:active {
        transform: scale(0.9);
      }
      
      .abacus-chat-widget-button svg {
        display: block;
        margin: 0 auto;
      }
      
      .abacus-chat-widget-window {
        position: fixed;
        ${windowPositionStyles}
        width: ${config.width};
        height: ${config.height};
        background: ${theme.backgroundColor};
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
        display: none;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 20000;
      }
      
      .abacus-chat-widget-window.open {
        display: flex;
        opacity: 1;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .abacus-chat-widget-header {
        background: ${theme.primaryColor};
        color: white;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      
      .abacus-chat-widget-header-text {
        flex: 1;
        text-align: center;
      }
      
      .abacus-chat-widget-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: white;
      }
      
      .abacus-chat-widget-subtitle {
        margin: 4px 0 0 0;
        font-size: 12px;
        opacity: 0.9;
        display: ${config.subtitle ? 'block' : 'none'};
      }
      
      .abacus-chat-widget-header-buttons {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .abacus-chat-widget-new-chat,
      .abacus-chat-widget-close {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
        transition: opacity 0.2s;
      }
      
      .abacus-chat-widget-new-chat:hover,
      .abacus-chat-widget-close:hover {
        opacity: 1;
      }
      
      .abacus-chat-widget-new-chat svg,
      .abacus-chat-widget-close svg {
        width: 24px;
        height: 24px;
      }
      
      .abacus-chat-widget-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .abacus-chat-widget-message {
        display: flex;
        flex-direction: column;
        animation: messageIn 0.3s ease;
      }
      
      @keyframes messageIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .abacus-chat-widget-message.user {
        align-self: flex-end;
        max-width: 75%;
      }
      
      .abacus-chat-widget-message.bot {
        align-self: flex-start;
        flex-direction: row;
        align-items: flex-start;
        gap: 8px;
        width: 100%;
      }
      
      .abacus-chat-widget-message-avatar {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 4px;
      }
      
      .abacus-chat-widget-message-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      
      .abacus-chat-widget-message-content {
        padding: 12px 16px;
        border-radius: 12px;
        word-wrap: break-word;
        line-height: 1.5;
      }
      
      .abacus-chat-widget-message.user .abacus-chat-widget-message-content {
        background: #f5f5f5;
        color: #000000;
        border-bottom-right-radius: 4px;
      }
      
      .abacus-chat-widget-message.bot .abacus-chat-widget-message-content {
        background: transparent;
        color: ${theme.textColor};
        border-bottom-left-radius: 4px;
        padding-left: 0;
      }
      
      .abacus-chat-widget-copy-btn {
        background: transparent;
        border: 1px solid #d1d5db;
        color: #6b7280;
        padding: 4px 8px;
        font-size: 11px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 8px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: all 0.2s;
        align-self: flex-start;
      }
      
      .abacus-chat-widget-copy-btn:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
        color: #374151;
      }
      
      .abacus-chat-widget-copy-btn.copied {
        background: #10b981;
        border-color: #10b981;
        color: white;
      }
      
      .abacus-chat-widget-copy-btn svg {
        width: 12px;
        height: 12px;
      }
      
      .abacus-chat-widget-message-content h1,
      .abacus-chat-widget-message-content h2,
      .abacus-chat-widget-message-content h3 {
        margin: 8px 0 4px 0;
        font-size: 1em;
        font-weight: 600;
      }
      
      .abacus-chat-widget-message-content p {
        margin: 4px 0;
      }
      
      .abacus-chat-widget-message-content code {
        background: rgba(0, 0, 0, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: 'Courier New', monospace;
      }
      
      .abacus-chat-widget-message-content pre {
        background: rgba(0, 0, 0, 0.1);
        padding: 12px;
        border-radius: 6px;
        overflow-x: auto;
        margin: 8px 0;
      }
      
      .abacus-chat-widget-message-content pre code {
        background: none;
        padding: 0;
      }
      
      .abacus-chat-widget-message-content a {
        color: inherit;
        text-decoration: underline;
      }
      
      .abacus-chat-widget-message-content ul {
        margin: 8px 0;
        padding-left: 20px;
      }
      
      .abacus-chat-widget-message-content li {
        margin: 4px 0;
      }
      
      .abacus-chat-widget-streaming-cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: ${theme.primaryColor};
        margin-left: 2px;
        animation: blink 1s infinite;
        vertical-align: text-bottom;
      }
      
      @keyframes blink {
        0%, 49% {
          opacity: 1;
        }
        50%, 100% {
          opacity: 0;
        }
      }
      
      .abacus-chat-widget-message-time {
        font-size: 11px;
        opacity: 0.6;
        margin-top: 4px;
        align-self: flex-end;
      }
      
      .abacus-chat-widget-typing {
        display: flex;
        gap: 4px;
        padding: 12px 16px;
        background: ${theme.botMessageColor};
        border-radius: 12px;
        border-bottom-left-radius: 4px;
        max-width: 80px;
        align-self: flex-start;
      }
      
      .abacus-chat-widget-typing span {
        width: 8px;
        height: 8px;
        background: #9CA3AF;
        border-radius: 50%;
        animation: typing 1.4s infinite;
      }
      
      .abacus-chat-widget-typing span:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .abacus-chat-widget-typing span:nth-child(3) {
        animation-delay: 0.4s;
      }
      
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      
      .abacus-chat-widget-input-container {
        padding: 16px;
        border-top: 1px solid #E5E7EB;
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .abacus-chat-widget-input {
        flex: 1;
        width: 100%;
        padding: 12px 16px;
        border: 1px solid #D1D5DB;
        border-radius: 24px;
        outline: none;
        font-size: 14px;
        font-family: ${theme.fontFamily};
        transition: border-color 0.2s;
      }
      
      .abacus-chat-widget-input:focus {
        border-color: ${theme.primaryColor};
      }
      
      .abacus-chat-widget-send {
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 50%;
        background: ${theme.primaryColor};
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .abacus-chat-widget-send:hover:not(:disabled) {
        background: ${theme.buttonHoverColor};
        transform: scale(1.05);
      }
      
      .abacus-chat-widget-send:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .abacus-chat-widget-send svg {
        width: 20px;
        height: 20px;
        fill: white;
      }
      
      .abacus-chat-widget-error {
        background: #FEE2E2;
        color: #991B1B;
        padding: 12px;
        margin: 0 20px 16px 20px;
        border-radius: 8px;
        font-size: 13px;
      }
      
      @media (max-width: 480px) {
        .abacus-chat-widget-window {
          width: calc(100vw - 40px) !important;
          height: calc(100vh - 100px) !important;
        }
      }
    `;
  }

  // Read configuration from script tag data attributes
  function getConfigFromDataAttributes() {
    // Find the script tag that loaded this file
    const scripts = document.querySelectorAll('script[data-deployment-id], script[data-deployment-token]');
    if (scripts.length === 0) return null;
    
    const script = scripts[scripts.length - 1]; // Get the most recent one
    
    const config = {};
    
    // Required attributes
    if (script.hasAttribute('data-deployment-id')) {
      config.deploymentId = script.getAttribute('data-deployment-id');
    }
    if (script.hasAttribute('data-deployment-token')) {
      config.deploymentToken = script.getAttribute('data-deployment-token');
    }
    
    // Optional attributes
    if (script.hasAttribute('data-workspace-url')) {
      config.workspaceUrl = script.getAttribute('data-workspace-url');
    }
    if (script.hasAttribute('data-api-endpoint')) {
      config.apiUrl = script.getAttribute('data-api-endpoint');
    }
    if (script.hasAttribute('data-enable-streaming')) {
      config.enableStreaming = script.getAttribute('data-enable-streaming') === 'true';
    }
    if (script.hasAttribute('data-simulate-streaming')) {
      config.simulateStreaming = script.getAttribute('data-simulate-streaming') === 'true';
    }
    if (script.hasAttribute('data-title')) {
      config.title = script.getAttribute('data-title');
    }
    if (script.hasAttribute('data-subtitle')) {
      config.subtitle = script.getAttribute('data-subtitle');
    }
    if (script.hasAttribute('data-placeholder')) {
      config.placeholder = script.getAttribute('data-placeholder');
    }
    if (script.hasAttribute('data-position')) {
      config.position = script.getAttribute('data-position');
    }
    if (script.hasAttribute('data-width')) {
      config.width = script.getAttribute('data-width');
    }
    if (script.hasAttribute('data-height')) {
      config.height = script.getAttribute('data-height');
    }
    
    // Theme attributes
    if (script.hasAttribute('data-primary-color')) {
      config.theme = config.theme || {};
      config.theme.primaryColor = script.getAttribute('data-primary-color');
    }
    
    return config;
  }

  // Validate required configuration
  function validateConfig(config) {
    const errors = [];
    
    if (!config.deploymentToken) {
      errors.push('Missing required configuration: deploymentToken');
    }
    if (!config.deploymentId) {
      errors.push('Missing required configuration: deploymentId');
    }
    
    if (errors.length > 0) {
      console.error('Abacus Chat Widget Configuration Error:');
      errors.forEach(err => console.error('  - ' + err));
      console.error('\nPlease provide credentials via:');
      console.error('  1. Data attributes: data-deployment-id and data-deployment-token');
      console.error('  2. Or programmatically: AbacusChatWidget({ deploymentId: "...", deploymentToken: "..." })');
      return false;
    }
    
    return true;
  }

  // Build API URLs from workspace URL
  function buildApiUrls(config) {
    // Only build URLs if they're not already set
    if (!config.apiUrl) {
      // For workspace URLs, use the new format: https://{workspace}/api/getChatResponse
      config.apiUrl = `https://${config.workspaceUrl}/api/getChatResponse`;
    }
    
    if (!config.streamingApiUrl) {
      // For workspace URLs, use: https://{workspace}/api/getStreamingChatResponse
      config.streamingApiUrl = `https://${config.workspaceUrl}/api/getStreamingChatResponse`;
    }
  }

  // Chat Widget Class
  class AbacusChatWidget {
    constructor(config = {}) {
      this.config = { ...DEFAULT_CONFIG, ...config };
      if (config.theme) {
        this.config.theme = { ...DEFAULT_CONFIG.theme, ...config.theme };
      }
      
      // Build API URLs from workspace URL
      buildApiUrls(this.config);
      
      // Validate configuration
      if (!validateConfig(this.config)) {
        console.error('❌ Abacus Chat Widget failed to initialize due to missing credentials.');
        return;
      }
      
      console.log('✅ Abacus Chat Widget v3.1.0 initialized successfully (Workspace URL + Streaming support enabled)');
      
      this.messages = [];
      this.conversationId = null;
      this.isTyping = false;
      this.isOpen = false;
      
      this.init();
    }
    
    init() {
      this.injectCSS();
      this.createWidget();
      this.addMessage('bot', 'Hello! How can I help you today?', new Date(), true);
    }
    
    injectCSS() {
      const styleId = 'abacus-chat-widget-styles';
      
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = generateCSS(this.config);
        document.head.appendChild(style);
      }
    }
    
    createWidget() {
      const container = document.createElement('div');
      container.className = 'abacus-chat-widget-container';
      container.innerHTML = `
        <div class="abacus-chat-widget-window" id="abacus-chat-window">
          <div class="abacus-chat-widget-header">
            <div class="abacus-chat-widget-header-text">
              <h3 class="abacus-chat-widget-title">${this.config.title}</h3>
              <p class="abacus-chat-widget-subtitle">${this.config.subtitle}</p>
            </div>
            <div class="abacus-chat-widget-header-buttons">
              <button class="abacus-chat-widget-new-chat" id="abacus-chat-new" title="New Conversation">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </button>
              <button class="abacus-chat-widget-close" id="abacus-chat-close" title="Close">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="abacus-chat-widget-messages" id="abacus-chat-messages"></div>
          <div class="abacus-chat-widget-input-container">
            <input 
              type="text" 
              class="abacus-chat-widget-input" 
              id="abacus-chat-input"
              placeholder="${this.config.placeholder}"
            />
            <button class="abacus-chat-widget-send" id="abacus-chat-send">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
        <button class="abacus-chat-widget-button" id="abacus-chat-button">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8279 9.11782C13.7174 8.33618 12.0539 6.67267 11.2723 4.56217C11.223 4.42858 11.0338 4.42858 10.984 4.56217C10.2023 6.67267 8.53882 8.33617 6.42832 9.11782C6.29473 9.16704 6.29473 9.35629 6.42832 9.4061C8.53882 10.1877 10.2023 11.8513 10.984 13.9618C11.0332 14.0953 11.2224 14.0953 11.2723 13.9618C12.0539 11.8513 13.7174 10.1878 15.8279 9.4061C15.9615 9.35688 15.9615 9.16763 15.8279 9.11782Z" fill="#293BA8"/>
            <path d="M17.5425 4.55812C16.7503 4.26574 16.1263 3.64171 15.8338 2.84947C15.8157 2.80026 15.7436 2.80026 15.726 2.84947C15.4337 3.64165 14.8096 4.26568 14.0174 4.55812C13.9682 4.57629 13.9682 4.64836 14.0174 4.66594C14.8096 4.95832 15.4336 5.58235 15.726 6.37459C15.7442 6.4238 15.8163 6.4238 15.8338 6.37459C16.1262 5.58241 16.7503 4.95838 17.5425 4.66594C17.5917 4.64777 17.5917 4.5757 17.5425 4.55812Z" fill="#293BA8"/>
            <path d="M21.6108 0H1.59239C1.17007 0 0.765045 0.167767 0.466418 0.466394C0.16779 0.765022 2.31923e-05 1.17005 2.31923e-05 1.59237V19.7909C-0.0016221 20.0945 0.0843045 20.3921 0.247507 20.6481C0.410709 20.9041 0.644264 21.1076 0.920185 21.2342C1.13084 21.332 1.36018 21.3828 1.59239 21.3832C1.96752 21.3835 2.33045 21.25 2.61606 21.0068L2.62288 21.0011L6.39566 17.7435H21.6108C22.0331 17.7435 22.4381 17.5758 22.7367 17.2772C23.0354 16.9785 23.2031 16.5735 23.2031 16.1512V1.59237C23.2031 1.17005 23.0354 0.765022 22.7367 0.466394C22.4381 0.167767 22.0331 0 21.6108 0ZM21.8382 16.1512C21.8382 16.2115 21.8143 16.2694 21.7716 16.312C21.7289 16.3547 21.6711 16.3787 21.6108 16.3787H6.14202C5.97829 16.3787 5.82005 16.4377 5.69616 16.5447L1.73571 19.9649C1.7025 19.9918 1.66237 20.0089 1.61993 20.0141C1.57748 20.0192 1.53444 20.0124 1.49573 19.9942C1.45702 19.976 1.42422 19.9473 1.40108 19.9113C1.37794 19.8754 1.36541 19.8336 1.36491 19.7909V1.59237C1.36491 1.53204 1.38888 1.47418 1.43154 1.43152C1.4742 1.38885 1.53206 1.36489 1.59239 1.36489H21.6108C21.6711 1.36489 21.7289 1.38885 21.7716 1.43152C21.8143 1.47418 21.8382 1.53204 21.8382 1.59237V16.1512Z" fill="#293ba8"/>
          </svg>
        </button>
      `;
      
      document.body.appendChild(container);
      this.attachEventListeners();
    }
    
    attachEventListeners() {
      const button = document.getElementById('abacus-chat-button');
      const closeBtn = document.getElementById('abacus-chat-close');
      const newChatBtn = document.getElementById('abacus-chat-new');
      const input = document.getElementById('abacus-chat-input');
      const sendBtn = document.getElementById('abacus-chat-send');
      
      button.addEventListener('click', () => this.toggleWidget());
      closeBtn.addEventListener('click', () => this.closeWidget());
      newChatBtn.addEventListener('click', () => this.newConversation());
      
      sendBtn.addEventListener('click', () => this.sendMessage());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.sendMessage();
        }
      });
    }
    
    newConversation() {
      this.messages = [];
      this.conversationId = null;
      
      const messagesContainer = document.getElementById('abacus-chat-messages');
      messagesContainer.innerHTML = '';
      
      this.addMessage('bot', 'Hello! How can I help you today?', new Date(), true);
    }
    
    toggleWidget() {
      const window = document.getElementById('abacus-chat-window');
      this.isOpen = !this.isOpen;
      
      if (this.isOpen) {
        window.classList.add('open');
        document.getElementById('abacus-chat-input').focus();
      } else {
        window.classList.remove('open');
      }
    }
    
    closeWidget() {
      const window = document.getElementById('abacus-chat-window');
      this.isOpen = false;
      window.classList.remove('open');
    }
    
    addMessage(type, content, timestamp = new Date(), isWelcomeMessage = false) {
      const message = { type, content, timestamp };
      this.messages.push(message);
      
      const messagesContainer = document.getElementById('abacus-chat-messages');
      const messageEl = document.createElement('div');
      messageEl.className = `abacus-chat-widget-message ${type}`;
      
      if (type === 'bot') {
        const avatarEl = document.createElement('div');
        avatarEl.className = 'abacus-chat-widget-message-avatar';
        avatarEl.innerHTML = getDNAHelixSVG();
        messageEl.appendChild(avatarEl);
        
        const wrapperEl = document.createElement('div');
        wrapperEl.className = 'abacus-chat-widget-message-wrapper';
        
        const contentEl = document.createElement('div');
        contentEl.className = 'abacus-chat-widget-message-content';
        contentEl.innerHTML = renderMarkdown(content);
        
        wrapperEl.appendChild(contentEl);
        
        if (!isWelcomeMessage) {
          const copyBtn = document.createElement('button');
          copyBtn.className = 'abacus-chat-widget-copy-btn';
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span class="copy-text">Copy</span>
          `;
          copyBtn.addEventListener('click', () => this.copyToClipboard(content, copyBtn));
          wrapperEl.appendChild(copyBtn);
        }
        
        const timeEl = document.createElement('div');
        timeEl.className = 'abacus-chat-widget-message-time';
        timeEl.textContent = this.formatTime(timestamp);
        
        wrapperEl.appendChild(timeEl);
        messageEl.appendChild(wrapperEl);
      } else {
        const contentEl = document.createElement('div');
        contentEl.className = 'abacus-chat-widget-message-content';
        contentEl.innerHTML = renderMarkdown(content);
        
        const timeEl = document.createElement('div');
        timeEl.className = 'abacus-chat-widget-message-time';
        timeEl.textContent = this.formatTime(timestamp);
        
        messageEl.appendChild(contentEl);
        messageEl.appendChild(timeEl);
      }
      
      messagesContainer.appendChild(messageEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    copyToClipboard(text, button) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      try {
        document.execCommand('copy');
        
        const textSpan = button.querySelector('.copy-text');
        const originalText = textSpan.textContent;
        textSpan.textContent = 'Copied!';
        button.classList.add('copied');
        
        setTimeout(() => {
          textSpan.textContent = originalText;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
    
    showTyping() {
      const messagesContainer = document.getElementById('abacus-chat-messages');
      const messageEl = document.createElement('div');
      messageEl.className = 'abacus-chat-widget-message bot';
      messageEl.id = 'abacus-typing-indicator';
      
      const avatarEl = document.createElement('div');
      avatarEl.className = 'abacus-chat-widget-message-avatar';
      avatarEl.innerHTML = getDNAHelixSVG();
      messageEl.appendChild(avatarEl);
      
      const typingEl = document.createElement('div');
      typingEl.className = 'abacus-chat-widget-typing';
      typingEl.innerHTML = '<span></span><span></span><span></span>';
      messageEl.appendChild(typingEl);
      
      messagesContainer.appendChild(messageEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      this.isTyping = true;
    }
    
    hideTyping() {
      const typingEl = document.getElementById('abacus-typing-indicator');
      if (typingEl) {
        typingEl.remove();
      }
      this.isTyping = false;
    }
    
    showError(message) {
      const messagesContainer = document.getElementById('abacus-chat-messages');
      const errorEl = document.createElement('div');
      errorEl.className = 'abacus-chat-widget-error';
      errorEl.textContent = message;
      messagesContainer.appendChild(errorEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      setTimeout(() => errorEl.remove(), 5000);
    }
    
    formatTime(date) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    async sendMessage() {
      const input = document.getElementById('abacus-chat-input');
      const sendBtn = document.getElementById('abacus-chat-send');
      const message = input.value.trim();
      
      if (!message || this.isTyping) return;
      
      this.addMessage('user', message);
      input.value = '';
      
      sendBtn.disabled = true;
      input.disabled = true;
      
      // Use streaming if enabled
      if (this.config.enableStreaming) {
        try {
          await this.sendMessageWithStreaming(message);
        } catch (error) {
          console.error('Streaming error:', error);
          // Fallback to non-streaming if streaming fails
          if (this.config.simulateStreaming) {
            console.log('Falling back to simulated streaming...');
            await this.sendMessageWithSimulatedStreaming(message);
          } else {
            this.showError('Sorry, I encountered an error. Please try again.');
          }
        }
      } else {
        // Use traditional non-streaming approach
        this.showTyping();
        
        try {
          const response = await this.callAbacusAPI(message);
          
          this.hideTyping();
          
          if (response && response.message) {
            this.addMessage('bot', response.message);
            
            if (response.conversationId) {
              this.conversationId = response.conversationId;
            }
          } else {
            this.showError('Sorry, I received an empty response. Please try again.');
          }
        } catch (error) {
          console.error('Abacus API Error:', error);
          this.hideTyping();
          this.showError('Sorry, I encountered an error. Please try again.');
        }
      }
      
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
    
    async sendMessageWithStreaming(message) {
      const conversationHistory = [];
      
      for (const msg of this.messages) {
        conversationHistory.push({
          is_user: msg.type === 'user',
          text: msg.content
        });
      }
      
      const requestBody = {
        messages: conversationHistory,
        temperature: 0.0
      };
      
      if (this.conversationId) {
        requestBody.externalSessionId = this.conversationId;
      }
      
      const url = new URL(this.config.streamingApiUrl);
      url.searchParams.append('deploymentToken', this.config.deploymentToken);
      url.searchParams.append('deploymentId', this.config.deploymentId);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Streaming API request failed: ${response.status} - ${errorText}`);
      }
      
      // Create bot message element for streaming
      const messageEl = this.createStreamingBotMessage();
      const contentEl = messageEl.querySelector('.abacus-chat-widget-message-content');
      const cursorEl = document.createElement('span');
      cursorEl.className = 'abacus-chat-widget-streaming-cursor';
      contentEl.appendChild(cursorEl);
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // Try to parse streaming chunks (newline-delimited JSON)
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              // Try parsing as JSON
              const data = JSON.parse(line);
              
              // Extract text from various possible fields
              let textChunk = '';
              if (data.text) textChunk = data.text;
              else if (data.token) textChunk = data.token;
              else if (data.content) textChunk = data.content;
              else if (data.delta) textChunk = data.delta;
              
              if (textChunk) {
                fullText += textChunk;
                contentEl.innerHTML = this.escapeHtml(fullText);
                contentEl.appendChild(cursorEl);
                this.scrollToBottom();
              }
              
              // Update conversation ID if present
              if (data.conversation_id || data.external_session_id) {
                this.conversationId = data.conversation_id || data.external_session_id;
              }
            } catch (e) {
              // Try SSE format
              if (line.startsWith('data: ')) {
                try {
                  const jsonData = JSON.parse(line.substring(6));
                  let textChunk = '';
                  if (jsonData.text) textChunk = jsonData.text;
                  else if (jsonData.token) textChunk = jsonData.token;
                  else if (jsonData.content) textChunk = jsonData.content;
                  else if (jsonData.delta) textChunk = jsonData.delta;
                  
                  if (textChunk) {
                    fullText += textChunk;
                    contentEl.innerHTML = this.escapeHtml(fullText);
                    contentEl.appendChild(cursorEl);
                    this.scrollToBottom();
                  }
                } catch (e2) {
                  console.warn('Could not parse SSE data:', line);
                }
              }
            }
          }
        }
      }
      
      // Remove cursor and finalize message
      cursorEl.remove();
      this.finalizeStreamingMessage(messageEl, fullText);
    }
    
    async sendMessageWithSimulatedStreaming(message) {
      // Fetch the full response first
      const response = await this.callAbacusAPI(message);
      
      if (!response || !response.message) {
        this.showError('Sorry, I received an empty response. Please try again.');
        return;
      }
      
      // Update conversation ID
      if (response.conversationId) {
        this.conversationId = response.conversationId;
      }
      
      // Create bot message element for streaming
      const messageEl = this.createStreamingBotMessage();
      const contentEl = messageEl.querySelector('.abacus-chat-widget-message-content');
      const cursorEl = document.createElement('span');
      cursorEl.className = 'abacus-chat-widget-streaming-cursor';
      contentEl.appendChild(cursorEl);
      
      // Simulate streaming by revealing text progressively
      const text = response.message;
      const words = text.split(' ');
      let currentText = '';
      
      for (let i = 0; i < words.length; i++) {
        currentText += (i > 0 ? ' ' : '') + words[i];
        contentEl.innerHTML = this.escapeHtml(currentText);
        contentEl.appendChild(cursorEl);
        this.scrollToBottom();
        
        // Delay between words (faster for shorter words)
        const delay = Math.min(50, Math.max(20, words[i].length * 5));
        await this.sleep(delay);
      }
      
      // Remove cursor and finalize message
      cursorEl.remove();
      this.finalizeStreamingMessage(messageEl, text);
    }
    
    createStreamingBotMessage() {
      const messagesContainer = document.getElementById('abacus-chat-messages');
      const messageEl = document.createElement('div');
      messageEl.className = 'abacus-chat-widget-message bot';
      messageEl.id = 'abacus-streaming-message';
      
      const avatarEl = document.createElement('div');
      avatarEl.className = 'abacus-chat-widget-message-avatar';
      avatarEl.innerHTML = getDNAHelixSVG();
      messageEl.appendChild(avatarEl);
      
      const wrapperEl = document.createElement('div');
      wrapperEl.className = 'abacus-chat-widget-message-wrapper';
      
      const contentEl = document.createElement('div');
      contentEl.className = 'abacus-chat-widget-message-content';
      
      wrapperEl.appendChild(contentEl);
      messageEl.appendChild(wrapperEl);
      
      messagesContainer.appendChild(messageEl);
      this.isTyping = true;
      
      return messageEl;
    }
    
    finalizeStreamingMessage(messageEl, text) {
      const wrapperEl = messageEl.querySelector('.abacus-chat-widget-message-wrapper');
      const contentEl = messageEl.querySelector('.abacus-chat-widget-message-content');
      
      // Apply markdown rendering
      contentEl.innerHTML = renderMarkdown(text);
      
      // Add copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'abacus-chat-widget-copy-btn';
      copyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <span class="copy-text">Copy</span>
      `;
      copyBtn.addEventListener('click', () => this.copyToClipboard(text, copyBtn));
      wrapperEl.appendChild(copyBtn);
      
      // Add timestamp
      const timeEl = document.createElement('div');
      timeEl.className = 'abacus-chat-widget-message-time';
      timeEl.textContent = this.formatTime(new Date());
      wrapperEl.appendChild(timeEl);
      
      // Store in messages array
      this.messages.push({
        type: 'bot',
        content: text,
        timestamp: new Date()
      });
      
      messageEl.id = '';
      this.isTyping = false;
      this.scrollToBottom();
    }
    
    scrollToBottom() {
      const messagesContainer = document.getElementById('abacus-chat-messages');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
    
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async callAbacusAPI(message) {
      const conversationHistory = [];
      
      for (const msg of this.messages) {
        conversationHistory.push({
          is_user: msg.type === 'user',
          text: msg.content
        });
      }
      
      const requestBody = {
        messages: conversationHistory,
        temperature: 0.0
      };
      
      if (this.conversationId) {
        requestBody.externalSessionId = this.conversationId;
      }
      
      const url = new URL(this.config.apiUrl);
      url.searchParams.append('deploymentToken', this.config.deploymentToken);
      url.searchParams.append('deploymentId', this.config.deploymentId);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      
      let botMessage = '';
      
      const result = data.result || data;
      
      if (result.messages && Array.isArray(result.messages)) {
        const lastBotMessage = result.messages
          .filter(msg => !msg.is_user)
          .pop();
        
        if (lastBotMessage && lastBotMessage.text) {
          botMessage = lastBotMessage.text;
        }
      } else if (data.response) {
        botMessage = data.response;
      } else if (data.message) {
        botMessage = data.message;
      } else if (data.text) {
        botMessage = data.text;
      } else if (typeof data === 'string') {
        botMessage = data;
      }
      
      return {
        message: botMessage,
        conversationId: result.conversation_id || result.external_session_id || this.conversationId
      };
    }
  }
  
  // Global initialization function
  window.AbacusChatWidget = function(config) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        new AbacusChatWidget(config);
      });
    } else {
      new AbacusChatWidget(config);
    }
  };
  
  // Auto-initialize from data attributes
  function autoInitializeFromDataAttributes() {
    const dataConfig = getConfigFromDataAttributes();
    
    if (dataConfig && dataConfig.deploymentId && dataConfig.deploymentToken) {
      console.log('🔍 Found data attributes, auto-initializing widget...');
      new AbacusChatWidget(dataConfig);
    } else {
      console.log('ℹ️ No data attributes found. Waiting for manual initialization via AbacusChatWidget()');
    }
  }
  
  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitializeFromDataAttributes);
  } else {
    autoInitializeFromDataAttributes();
  }
  
})();
