#!/usr/bin/env node

const { execSync } = require('child_process');
const https = require('https');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Get the latest deployment
function getLatestDeployment() {
  try {
    // Get the current git commit hash
    const gitHash = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    console.log(`${colors.cyan}📦 Current git commit: ${gitHash.substring(0, 7)}${colors.reset}`);

    // Get Vercel deployments (requires Vercel CLI to be authenticated)
    const deployments = execSync('vercel ls --json 2>/dev/null', { encoding: 'utf-8' });
    const deploymentsData = JSON.parse(deployments);

    if (deploymentsData && deploymentsData.deployments && deploymentsData.deployments.length > 0) {
      const latestDeployment = deploymentsData.deployments[0];
      return latestDeployment;
    }

    return null;
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Could not fetch deployments (may need to authenticate with 'vercel login')${colors.reset}`);
    return null;
  }
}

// Check deployment status via Vercel API
async function checkDeploymentStatus(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const deployment = JSON.parse(data);
          resolve(deployment);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Monitor the build
async function monitorBuild() {
  console.log(`${colors.bright}${colors.blue}🚀 Vercel Build Monitor${colors.reset}`);
  console.log('='.repeat(50));

  const deployment = getLatestDeployment();

  if (!deployment) {
    console.log(`${colors.red}❌ No deployments found${colors.reset}`);
    return;
  }

  console.log(`\n${colors.bright}Latest Deployment:${colors.reset}`);
  console.log(`  URL: ${colors.cyan}${deployment.url}${colors.reset}`);
  console.log(`  State: ${deployment.state === 'READY' ? colors.green : colors.yellow}${deployment.state}${colors.reset}`);
  console.log(`  Created: ${new Date(deployment.created).toLocaleString()}`);

  if (deployment.state === 'BUILDING' || deployment.state === 'QUEUED') {
    console.log(`\n${colors.yellow}⏳ Deployment in progress...${colors.reset}`);
    console.log('Waiting for completion...\n');

    // Poll for status
    let checkCount = 0;
    const maxChecks = 60; // 10 minutes max

    const interval = setInterval(async () => {
      checkCount++;
      process.stdout.write(`\r${colors.cyan}Checking... (${checkCount}/${maxChecks})${colors.reset}`);

      const updatedDeployment = getLatestDeployment();

      if (updatedDeployment && updatedDeployment.state === 'READY') {
        clearInterval(interval);
        console.log(`\n\n${colors.green}✅ Deployment successful!${colors.reset}`);
        console.log(`Live URL: ${colors.bright}https://${updatedDeployment.url}${colors.reset}`);
      } else if (updatedDeployment && (updatedDeployment.state === 'ERROR' || updatedDeployment.state === 'CANCELED')) {
        clearInterval(interval);
        console.log(`\n\n${colors.red}❌ Deployment failed: ${updatedDeployment.state}${colors.reset}`);

        // Try to get logs
        try {
          console.log(`\n${colors.yellow}Fetching build logs...${colors.reset}`);
          const logs = execSync(`vercel logs ${updatedDeployment.url} --output raw`, { encoding: 'utf-8' });
          console.log(logs);
        } catch (e) {
          console.log(`${colors.red}Could not fetch logs${colors.reset}`);
        }
      }

      if (checkCount >= maxChecks) {
        clearInterval(interval);
        console.log(`\n\n${colors.yellow}⚠️  Timeout waiting for deployment${colors.reset}`);
      }
    }, 10000); // Check every 10 seconds

  } else if (deployment.state === 'READY') {
    console.log(`\n${colors.green}✅ Latest deployment is live${colors.reset}`);
    console.log(`URL: ${colors.bright}https://${deployment.url}${colors.reset}`);
  } else if (deployment.state === 'ERROR') {
    console.log(`\n${colors.red}❌ Latest deployment failed${colors.reset}`);

    // Try to get logs
    try {
      console.log(`\n${colors.yellow}Build error logs:${colors.reset}`);
      const logs = execSync(`vercel logs ${deployment.url} --output raw 2>&1 | tail -50`, { encoding: 'utf-8' });
      console.log(logs);
    } catch (e) {
      console.log(`${colors.red}Could not fetch logs${colors.reset}`);
    }
  }
}

// Watch for git pushes and auto-check
function watchForPushes() {
  console.log(`\n${colors.cyan}👁️  Watching for git pushes...${colors.reset}`);
  console.log('Will automatically check Vercel deployment after each push.\n');

  // Monitor git reflog for new pushes
  let lastPush = execSync('git log -1 --format=%H', { encoding: 'utf-8' }).trim();

  setInterval(() => {
    const currentHead = execSync('git log -1 --format=%H', { encoding: 'utf-8' }).trim();
    const remoteDiff = execSync('git rev-list HEAD...origin/main --count 2>/dev/null || echo 0', { encoding: 'utf-8' }).trim();

    if (remoteDiff === '0' && currentHead !== lastPush) {
      console.log(`\n${colors.bright}${colors.green}🔄 New commit detected!${colors.reset}`);
      lastPush = currentHead;

      // Wait a bit for Vercel to pick up the push
      setTimeout(() => {
        monitorBuild();
      }, 5000);
    }
  }, 5000); // Check every 5 seconds
}

// Main execution
if (process.argv[2] === '--watch') {
  monitorBuild().then(() => {
    watchForPushes();
  });
} else {
  monitorBuild();
}