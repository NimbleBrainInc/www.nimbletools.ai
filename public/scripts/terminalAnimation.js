// Terminal Animation for How It Works page
// Simulates the deployment journey with typing animation

// Terminal animation data showing the journey
const terminalLines = [
  {
    type: "comment",
    text: "# Platform team deploying GitHub MCP for developer workspace",
    delay: 0,
  },
  { type: "command", text: "ntcli auth login --sso", delay: 500 },
  { type: "output", text: "Opening SSO login...", delay: 1000 },
  {
    type: "success",
    text: "✓ Authenticated as platform-team@acme.com",
    delay: 1500,
  },
  { type: "output", text: "", delay: 1700 },

  {
    type: "comment",
    text: "# Create workspace for development team (50 developers)",
    delay: 1900,
  },
  {
    type: "command",
    text: "ntcli workspace create dev-team --users 50",
    delay: 2400,
  },
  {
    type: "success",
    text: "✓ Workspace 'dev-team' created with 50 user slots",
    delay: 2900,
  },
  { type: "success", text: "✓ SSO integration enabled", delay: 3100 },
  { type: "output", text: "", delay: 3300 },

  {
    type: "comment",
    text: "# Deploy GitHub MCP with enterprise security",
    delay: 3500,
  },
  {
    type: "command",
    text: "ntcli server deploy github-mcp --workspace dev-team",
    delay: 4000,
  },
  {
    type: "output",
    text: "Pulling enterprise GitHub MCP image...",
    delay: 4500,
  },
  {
    type: "output",
    text: "Configuring GitHub App integration...",
    delay: 5000,
  },
  { type: "output", text: "Setting up audit logging...", delay: 5500 },
  {
    type: "output",
    text: "Enabling rate limiting & monitoring...",
    delay: 6000,
  },
  {
    type: "success",
    text: "✓ GitHub MCP deployed successfully",
    delay: 6500,
  },
  {
    type: "output",
    text: "Endpoint: https://dev-team.acme.nimbletools.com/github",
    delay: 6700,
  },
  { type: "output", text: "", delay: 6900 },

  {
    type: "comment",
    text: "# Scale for peak usage (all 50 developers active)",
    delay: 7400,
  },
  {
    type: "command",
    text: "ntcli server scale github-mcp 4 --workspace dev-team",
    delay: 7900,
  },
  {
    type: "output",
    text: "Scaling to handle 50 concurrent users...",
    delay: 8400,
  },
  {
    type: "success",
    text: "✓ Scaled to 4 instances with load balancing",
    delay: 9100,
  },
  { type: "output", text: "Ready for production workloads", delay: 9300 },
  { type: "output", text: "", delay: 9500 },

  {
    type: "comment",
    text: "# ✅ Result: 50 developers now have secure AI-powered GitHub access",
    delay: 10000,
  },
];

function animateTerminal() {
  const terminal = document.getElementById("terminal");
  if (!terminal) return;

  terminal.innerHTML = "";

  terminalLines.forEach((line, index) => {
    setTimeout(() => {
      const lineElement = document.createElement("div");
      lineElement.className = `terminal-line ${line.type}`;
      lineElement.style.animationDelay = "0s";

      if (line.type === "command") {
        lineElement.innerHTML = `<span class="prompt">$</span> ${line.text}`;
      } else {
        lineElement.textContent = line.text;
      }

      terminal.appendChild(lineElement);
      terminal.scrollTop = terminal.scrollHeight;
    }, line.delay);
  });
}

// Initialize terminal animation when container is in view
function initializeTerminalAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateTerminal();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const terminalContainer = document.querySelector(".terminal-container");
  if (terminalContainer) {
    observer.observe(terminalContainer);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTerminalAnimation);
} else {
  initializeTerminalAnimation();
}