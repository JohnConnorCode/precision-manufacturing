#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

echo -e "${BOLD}${BLUE}🚀 Vercel Deployment Status Check${NC}"
echo "================================================"

# Get the current git commit
CURRENT_COMMIT=$(git rev-parse --short HEAD)
echo -e "${CYAN}Current commit: ${CURRENT_COMMIT}${NC}"

# Check deployment URLs
PROD_URL="https://precision-manufacturing.vercel.app"
PREVIEW_URL="https://precision-manufacturing-git-main-johnconnorcodes-projects.vercel.app"

echo -e "\n${BOLD}Checking deployment status...${NC}\n"

# Function to check URL status
check_url() {
    local url=$1
    local label=$2

    echo -n -e "${label}: "

    # Get HTTP status code
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)

    if [ "$status_code" == "200" ]; then
        echo -e "${GREEN}✅ Live (200 OK)${NC}"
        return 0
    elif [ "$status_code" == "404" ]; then
        echo -e "${RED}❌ Not Found (404)${NC}"
        return 1
    elif [ "$status_code" == "500" ] || [ "$status_code" == "502" ] || [ "$status_code" == "503" ]; then
        echo -e "${RED}❌ Server Error ($status_code)${NC}"
        return 1
    elif [ "$status_code" == "000" ]; then
        echo -e "${YELLOW}⚠️ Timeout or unreachable${NC}"
        return 1
    else
        echo -e "${YELLOW}⚠️ Status: $status_code${NC}"
        return 1
    fi
}

# Check production URL
check_url "$PROD_URL" "Production"
prod_status=$?

# Check preview URL
check_url "$PREVIEW_URL" "Preview"
preview_status=$?

echo ""

# Check recent GitHub Actions or commits
echo -e "${BOLD}Recent Git Activity:${NC}"
echo -e "${CYAN}Last 3 commits:${NC}"
git log --oneline -3

echo ""

# If we can access Vercel API without auth, check deployment status
if command -v vercel &> /dev/null; then
    echo -e "${BOLD}Vercel CLI Status:${NC}"

    # Try to get deployment list (might fail without auth)
    if vercel ls --json &> /dev/null; then
        echo -e "${GREEN}✅ Vercel CLI connected${NC}"

        # Get latest deployment info
        latest=$(vercel ls --json 2>/dev/null | jq -r '.deployments[0] | "\(.state) - \(.url) - \(.created)"' 2>/dev/null)

        if [ ! -z "$latest" ]; then
            echo -e "Latest deployment: ${CYAN}$latest${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️ Vercel CLI not authenticated (run 'vercel login')${NC}"
    fi
else
    echo -e "${YELLOW}⚠️ Vercel CLI not installed${NC}"
fi

echo ""
echo -e "${BOLD}Build Check Summary:${NC}"

if [ $prod_status -eq 0 ] && [ $preview_status -eq 0 ]; then
    echo -e "${GREEN}✅ All deployments are live!${NC}"
    exit 0
elif [ $prod_status -eq 0 ] || [ $preview_status -eq 0 ]; then
    echo -e "${YELLOW}⚠️ Partial deployment success${NC}"
    echo "Check Vercel dashboard for details: https://vercel.com/dashboard"
    exit 1
else
    echo -e "${RED}❌ Deployments appear to be failing${NC}"
    echo ""
    echo -e "${BOLD}Troubleshooting steps:${NC}"
    echo "1. Check Vercel dashboard: https://vercel.com/dashboard"
    echo "2. Review recent commits for issues"
    echo "3. Check environment variables in Vercel settings"
    echo "4. Run 'npm run build' locally to test"
    exit 1
fi