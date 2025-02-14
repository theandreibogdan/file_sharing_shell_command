#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "Installing filesharing command..."

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python3 is required but not installed.${NC}"
    exit 1
fi

# Create temporary file
TMP_FILE=$(mktemp)

# Download the script
if command -v curl &> /dev/null; then
    curl -s https://raw.githubusercontent.com/theandreibogdan/file_sharing_shell_command/main/filesharing -o "$TMP_FILE"
elif command -v wget &> /dev/null; then
    wget -q https://raw.githubusercontent.com/theandreibogdan/file_sharing_shell_command/main/filesharing -O "$TMP_FILE"
else
    echo -e "${RED}Error: Neither curl nor wget is installed.${NC}"
    rm -f "$TMP_FILE"
    exit 1
fi

# Check if download was successful
if [ ! -s "$TMP_FILE" ]; then
    echo -e "${RED}Error: Failed to download the script.${NC}"
    rm -f "$TMP_FILE"
    exit 1
fi

# Move to destination and make executable
sudo mv "$TMP_FILE" /usr/local/bin/filesharing
sudo chmod +x /usr/local/bin/filesharing

echo -e "${GREEN}Installation complete! You can now use the 'filesharing' command.${NC}"
echo "Usage: Navigate to any folder and type 'filesharing' to start sharing files." 