#!/usr/bin/env node

/**
 * Vercel API Deployment Monitor
 * Uses Vercel REST API for proper deployment monitoring
 * Best practices implementation
 */

const https = require('https');
const { execSync } = require('child_process');

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Get Vercel token
function getVercelToken() {
  try {
    // Try to get from environment
    if (process.env.VERCEL_TOKEN) {
      return process.env.VERCEL_TOKEN;
    }

    // Try to get from Vercel auth
    const authPath = `${process.env.HOME}/.local/share/com.vercel.cli/auth.json`;
    const auth = JSON.parse(require('fs').readFileSync(authPath, 'utf8'));
    return auth.token;
  } catch (error) {
    console.error(`${colors.red}❌ Could not find Vercel token. Please run 'vercel login'${colors.reset}`);
    process.exit(1);
  }
}

// Get project info
function getProjectInfo() {
  try {
    const projectJson = require('fs').readFileSync('.vercel/project.json', 'utf8');
    return JSON.parse(projectJson);
  } catch (error) {
    console.error(`${colors.red}❌ Not in a Vercel project directory${colors.reset}`);
    process.exit(1);
  }
}

// API request helper
function apiRequest(path, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

// Get deployments
async function getDeployments(projectId, token) {
  const response = await apiRequest(`/v6/deployments?projectId=${projectId}&limit=10`, token);
  return response.deployments || [];
}

// Get deployment details
async function getDeploymentDetails(deploymentId, token) {
  return await apiRequest(`/v13/deployments/${deploymentId}`, token);
}

// Get build logs
async function getBuildLogs(deploymentId, token) {
  return await apiRequest(`/v2/deployments/${deploymentId}/events`, token);
}

// Monitor deployment
async function monitorDeployment(deployment, token) {
  console.log(`\n${colors.cyan}Monitoring deployment: ${deployment.url}${colors.reset}`);

  let attempts = 0;
  const maxAttempts = 60; // 10 minutes

  while (attempts < maxAttempts) {
    const details = await getDeploymentDetails(deployment.uid, token);

    const state = details.readyState || details.state || 'UNKNOWN';

    process.stdout.write(`\r${colors.yellow}Status: ${state} (${attempts}/${maxAttempts})${colors.reset}`);

    switch (state) {
      case 'READY':
        console.log(`\n${colors.green}✅ Deployment successful!${colors.reset}`);
        console.log(`URL: ${colors.bright}https://${deployment.url}${colors.reset}`);
        console.log(`Production: https://precision-manufacturing.vercel.app`);
        return true;

      case 'ERROR':
      case 'FAILED':
        console.log(`\n${colors.red}❌ Deployment failed!${colors.reset}`);

        // Get build logs
        console.log(`\n${colors.yellow}Fetching build logs...${colors.reset}`);
        const logs = await getBuildLogs(deployment.uid, token);

        if (Array.isArray(logs)) {
          logs.forEach(log => {
            if (log.type === 'stderr' || log.type === 'error') {
              console.log(`${colors.red}${log.text || log.payload}${colors.reset}`);
            }
          });
        }

        return false;

      case 'BUILDING':
      case 'QUEUED':
      case 'INITIALIZING':
        // Continue monitoring
        break;

      default:
        console.log(`\n${colors.yellow}Unknown state: ${state}${colors.reset}`);
    }

    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
    attempts++;
  }

  console.log(`\n${colors.yellow}⚠️ Timeout waiting for deployment${colors.reset}`);
  return false;
}

// Main function
async function main() {
  console.log(`${colors.bright}${colors.blue}🚀 Vercel API Deployment Monitor${colors.reset}`);
  console.log('='.repeat(50));

  const token = getVercelToken();
  const project = getProjectInfo();

  console.log(`Project: ${colors.cyan}${project.projectId}${colors.reset}`);

  // Get recent deployments
  console.log(`\n${colors.cyan}Fetching deployments...${colors.reset}`);
  const deployments = await getDeployments(project.projectId, token);

  if (deployments.length === 0) {
    console.log(`${colors.red}❌ No deployments found${colors.reset}`);
    return;
  }

  // Show recent deployments
  console.log(`\n${colors.bright}Recent Deployments:${colors.reset}`);
  deployments.slice(0, 5).forEach((dep, i) => {
    const status = dep.readyState || dep.state;
    const statusColor = status === 'READY' ? colors.green :
                       status === 'ERROR' ? colors.red :
                       colors.yellow;

    console.log(`${i + 1}. ${statusColor}${status}${colors.reset} - ${dep.url} - ${new Date(dep.created).toLocaleString()}`);
  });

  // Monitor latest if building
  const latest = deployments[0];
  const latestState = latest.readyState || latest.state;

  if (latestState === 'BUILDING' || latestState === 'QUEUED' || latestState === 'INITIALIZING') {
    console.log(`\n${colors.yellow}Latest deployment is in progress...${colors.reset}`);
    await monitorDeployment(latest, token);
  } else if (latestState === 'READY') {
    console.log(`\n${colors.green}✅ Latest deployment is live${colors.reset}`);
    console.log(`URL: https://${latest.url}`);
  } else if (latestState === 'ERROR') {
    console.log(`\n${colors.red}❌ Latest deployment failed${colors.reset}`);

    // Get error details
    const logs = await getBuildLogs(latest.uid, token);
    if (Array.isArray(logs)) {
      console.log(`\n${colors.yellow}Error logs:${colors.reset}`);
      logs.filter(log => log.type === 'error' || log.type === 'stderr')
          .forEach(log => console.log(`${colors.red}${log.text || log.payload}${colors.reset}`));
    }
  }
}

// Run
main().catch(error => {
  console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  process.exit(1);
});