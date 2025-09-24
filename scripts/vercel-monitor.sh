#!/bin/bash

# Professional Vercel deployment monitoring using Vercel CLI
# This follows best practices by using Vercel's own tools

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'
BOLD='\033[1m'

echo -e "${BOLD}${BLUE}🚀 Vercel Deployment Monitor (Best Practices)${NC}"
echo "================================================"

# Function to get latest deployment info
get_latest_deployment() {
    vercel ls --yes 2>&1 | grep -E "Ready|Error|Building|Queued" | head -1
}

# Function to extract deployment URL
get_deployment_url() {
    echo "$1" | awk '{print $2}'
}

# Function to extract deployment status
get_deployment_status() {
    echo "$1" | grep -oE '●\s+[A-Za-z]+' | sed 's/●\s*//'
}

# Function to monitor specific deployment
monitor_deployment() {
    local deployment_url="$1"
    local max_attempts=60  # 10 minutes max
    local attempt=0

    echo -e "${CYAN}Monitoring deployment: ${deployment_url}${NC}"

    while [ $attempt -lt $max_attempts ]; do
        # Get fresh deployment list
        local deployment_info=$(vercel ls --yes 2>&1 | grep "$deployment_url" | head -1)

        if [ -z "$deployment_info" ]; then
            echo -e "${YELLOW}⚠️ Could not find deployment info${NC}"
            break
        fi

        local status=$(get_deployment_status "$deployment_info")

        case "$status" in
            "Ready")
                echo -e "\n${GREEN}✅ Deployment successful!${NC}"
                echo -e "URL: ${BOLD}${deployment_url}${NC}"

                # Get deployment details
                vercel inspect "$deployment_url" 2>/dev/null || true

                # Check production aliases
                echo -e "\n${CYAN}Production URLs:${NC}"
                vercel ls --yes 2>/dev/null | grep -A 5 "Aliases" | tail -n +2 || echo "No aliases found"

                return 0
                ;;
            "Error")
                echo -e "\n${RED}❌ Deployment failed!${NC}"
                echo -e "Deployment URL: ${deployment_url}"

                # Try to get error details
                echo -e "\n${YELLOW}Attempting to fetch error logs...${NC}"
                vercel inspect "$deployment_url" 2>/dev/null || echo "Could not fetch deployment details"

                return 1
                ;;
            "Building"|"Queued")
                echo -ne "\r${YELLOW}⏳ Status: ${status} (Attempt ${attempt}/${max_attempts})${NC}"
                ;;
            *)
                echo -e "\n${YELLOW}Unknown status: ${status}${NC}"
                ;;
        esac

        sleep 10
        ((attempt++))
    done

    echo -e "\n${YELLOW}⚠️ Timeout waiting for deployment${NC}"
    return 1
}

# Main monitoring logic
main() {
    # Check if Vercel CLI is available
    if ! command -v vercel &> /dev/null; then
        echo -e "${RED}❌ Vercel CLI not found. Please install it first.${NC}"
        exit 1
    fi

    # Check if we're in a Vercel project
    if [ ! -d ".vercel" ]; then
        echo -e "${YELLOW}⚠️ Not in a Vercel project directory${NC}"
        exit 1
    fi

    # Get latest deployment
    echo -e "${CYAN}Fetching latest deployment...${NC}"
    local latest=$(get_latest_deployment)

    if [ -z "$latest" ]; then
        echo -e "${RED}❌ No deployments found${NC}"
        exit 1
    fi

    local url=$(get_deployment_url "$latest")
    local status=$(get_deployment_status "$latest")

    echo -e "\nLatest deployment:"
    echo -e "  URL: ${CYAN}${url}${NC}"
    echo -e "  Status: ${YELLOW}${status}${NC}"

    # Monitor if building or queued
    if [[ "$status" == "Building" ]] || [[ "$status" == "Queued" ]]; then
        echo -e "\n${CYAN}Deployment in progress, monitoring...${NC}"
        monitor_deployment "$url"
    elif [[ "$status" == "Ready" ]]; then
        echo -e "\n${GREEN}✅ Latest deployment is already live${NC}"
        vercel inspect "$url" 2>/dev/null || true
    elif [[ "$status" == "Error" ]]; then
        echo -e "\n${RED}❌ Latest deployment failed${NC}"
        echo -e "${YELLOW}Fetching error details...${NC}"
        vercel inspect "$url" 2>/dev/null || echo "Could not fetch deployment details"
        exit 1
    fi
}

# Run main function
main "$@"