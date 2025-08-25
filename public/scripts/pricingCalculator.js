// Pricing Calculator for NimbleTools
// Handles dynamic pricing calculation and UI updates

// Format number with K/M suffix
function formatNumber(num) {
  if (num > 1000000) {
    return "1M+";
  } else if (num >= 1000000) {
    return "1M";
  } else if (num >= 1000) {
    return Math.round(num / 1000) + "K";
  }
  return num.toString();
}

// Format workspace count with 21+ suffix
function formatWorkspaces(num) {
  if (num >= 21) {
    return "21+";
  }
  return num.toString();
}

// Format server count with 51+ suffix
function formatServers(num) {
  if (num >= 51) {
    return "51+";
  }
  return num.toString();
}

// Calculate pricing based on inputs
function calculatePricing(workspaces, servers, invocations, byocRequired) {
  // Enterprise threshold - if BYOC required or any limit exceeded
  if (
    byocRequired ||
    workspaces > 20 ||
    servers > 50 ||
    invocations > 1000000
  ) {
    return {
      plan: "Enterprise",
      price: "Contact Sales",
      details: byocRequired
        ? "BYOC/On-premise deployment available"
        : "Custom pricing for large organizations",
    };
  }

  // Community plan (free)
  if (workspaces <= 1 && servers <= 5 && invocations <= 50000) {
    return {
      plan: "Community",
      price: "Free",
      details: "Perfect for getting started",
    };
  }

  // Starter plan
  if (workspaces <= 5 && servers <= 10 && invocations <= 250000) {
    let basePrice = 49;
    let additionalCosts = 0;

    // Calculate overages
    if (invocations > 250000) {
      const additionalInvocations = invocations - 250000;
      const additionalUnits = Math.ceil(additionalInvocations / 100000);
      additionalCosts += additionalUnits * 25;
    }

    const totalPrice = basePrice + additionalCosts;
    const details =
      additionalCosts > 0
        ? `Base $49 + $${additionalCosts} overage`
        : "Great for indie developers";

    return {
      plan: "Starter",
      price: `$${totalPrice}<span style="font-size:12px;color:var(--text-secondary)">/month</span>`,
      details: details,
    };
  }

  // Team plan
  if (workspaces <= 20 && servers <= 50 && invocations <= 1000000) {
    let basePrice = 199;
    let additionalCosts = 0;

    // Calculate overages
    if (invocations > 1000000) {
      const additionalInvocations = invocations - 1000000;
      const additionalUnits = Math.ceil(additionalInvocations / 100000);
      additionalCosts += additionalUnits * 20;
    }

    const totalPrice = basePrice + additionalCosts;
    const details =
      additionalCosts > 0
        ? `Base $199 + $${additionalCosts} overage`
        : "Best for growing teams";

    return {
      plan: "Team",
      price: `$${totalPrice}<span style="font-size:12px;color:var(--text-secondary)">/month</span>`,
      details: details,
    };
  }

  // Fallback to Enterprise
  return {
    plan: "Enterprise",
    price: "Contact Sales",
    details: "Custom pricing for your needs",
  };
}

// Update calculator display
function updateCalculator() {
  const workspaces = parseInt(document.getElementById("workspaces").value);
  const servers = parseInt(document.getElementById("servers").value);
  const invocations = parseInt(
    document.getElementById("invocations").value
  );
  const byocRequired = document.getElementById("byoc").checked;

  // Update slider displays
  document.getElementById("workspaces-value").textContent =
    formatWorkspaces(workspaces);
  document.getElementById("servers-value").textContent =
    formatServers(servers);
  document.getElementById("invocations-value").textContent =
    formatNumber(invocations);

  // Calculate and display pricing
  const result = calculatePricing(
    workspaces,
    servers,
    invocations,
    byocRequired
  );
  document.getElementById("plan-name").textContent = result.plan;
  document.getElementById("plan-price").innerHTML = result.price;
  document.getElementById("plan-details").textContent = result.details;

  // Update recommended plan styling
  const planElement = document.querySelector(".recommended-plan");
  planElement.className = "recommended-plan";
  const ctaElement = document.getElementById("calculator-cta");

  if (result.plan === "Community") {
    planElement.classList.add("community-plan");
    ctaElement.style.display = "none";
  } else if (result.plan === "Starter") {
    planElement.classList.add("starter-plan");
    ctaElement.style.display = "none";
  } else if (result.plan === "Team") {
    planElement.classList.add("team-plan");
    ctaElement.style.display = "none";
  } else if (result.plan === "Enterprise") {
    planElement.classList.add("enterprise-plan");
    ctaElement.style.display = "block";
  }
}

// Initialize calculator when DOM is loaded
function initializePricingCalculator() {
  const sliders = ["workspaces", "servers", "invocations"];
  sliders.forEach((id) => {
    document.getElementById(id).addEventListener("input", updateCalculator);
  });
  document
    .getElementById("byoc")
    .addEventListener("change", updateCalculator);
  updateCalculator();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePricingCalculator);
} else {
  initializePricingCalculator();
}