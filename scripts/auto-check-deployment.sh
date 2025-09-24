#!/bin/bash

# This script automatically monitors Vercel deployments after git push
# It should be run in the background after pushing changes

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
BOLD='\033[1m'

echo -e "${BOLD}${CYAN}🔄 Auto-checking Vercel deployment...${NC}"
echo "Waiting for Vercel to process the push..."

# Wait for Vercel to pick up the changes
sleep 15

# Maximum wait time (10 minutes)
MAX_WAIT=600
ELAPSED=0
CHECK_INTERVAL=15

# Production URL to check
PROD_URL="https://precision-manufacturing.vercel.app"

while [ $ELAPSED -lt $MAX_WAIT ]; do
    # Check if site is responding
    STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL" --max-time 10)

    if [ "$STATUS_CODE" == "200" ]; then
        echo -e "${GREEN}✅ Deployment successful! Site is live.${NC}"
        echo -e "URL: ${BOLD}$PROD_URL${NC}"

        # Optional: Open in browser
        if command -v open &> /dev/null; then
            echo "Opening in browser..."
            open "$PROD_URL"
        fi

        exit 0
    elif [ "$STATUS_CODE" == "500" ] || [ "$STATUS_CODE" == "502" ] || [ "$STATUS_CODE" == "503" ]; then
        echo -e "${RED}❌ Deployment failed with error code: $STATUS_CODE${NC}"
        echo "Check Vercel dashboard for details: https://vercel.com/dashboard"
        exit 1
    else
        echo -ne "\r${YELLOW}⏳ Waiting for deployment... ($ELAPSED/$MAX_WAIT seconds) Status: $STATUS_CODE${NC}"
    fi

    sleep $CHECK_INTERVAL
    ELAPSED=$((ELAPSED + CHECK_INTERVAL))
done

echo -e "\n${YELLOW}⚠️ Timeout waiting for deployment${NC}"
echo "Check manually at: https://vercel.com/dashboard"
exit 1