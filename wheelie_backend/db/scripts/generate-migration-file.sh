#!/bin/bash

# Initialize variables
DB_NAME=""
SCHEMA_NAME=""
MIGRATION_NAME=""

# Get project root directory (two levels up from this script)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --db_name)
            DB_NAME="$2"
            shift 2
            ;;
        --db_schema)
            SCHEMA_NAME="$2"
            shift 2
            ;;
        --migration_name)
            MIGRATION_NAME="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 --db-name <name> --db-schema <schema> --name <migration_name>"
            exit 1
            ;;
    esac
done

# Validate required arguments
if [ -z "$DB_NAME" ] || [ -z "$SCHEMA_NAME" ] || [ -z "$MIGRATION_NAME" ]; then
    echo "Error: --db-name, --db-schema, and --name are required"
    echo "Usage: $0 --db-name <name> --db-schema <schema> --name <migration_name>"
    exit 1
fi

# Process migration name: convert to lowercase and replace spaces with underscores
MIGRATION_NAME=$(echo "$MIGRATION_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')

# Get the next version number
get_next_version() {
    local last_migration=$(ls -1 "../migration/postgresql/$DB_NAME/$SCHEMA_NAME/" | sort -V | tail -n 1)
    if [ -z "$last_migration" ]; then
        echo "30000000000"  # Initial version if no migrations exist
        return
    fi
    
    # Extract the version number and increment it
    local last_version=$(basename "$last_migration" | grep -oP 'V\K\d+')
    local next_version=$((last_version + 1))
    echo "$next_version"
}

# Create migration directory if it doesn't exist
mkdir -p "../migration/postgresql/$DB_NAME/$SCHEMA_NAME"

# Main script
VERSION=$(get_next_version)
FULL_NAME="V${VERSION}__${MIGRATION_NAME}.sql"
MIGRATION_PATH="../migration/postgresql/$DB_NAME/$SCHEMA_NAME/$FULL_NAME"

# Generate migration file
touch "$MIGRATION_PATH"
echo "Migration file generated: ${MIGRATION_PATH#../}" 