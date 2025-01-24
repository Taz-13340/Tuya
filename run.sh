#!/usr/bin/with-contenv bashio

# Get config values
config_path="/data/options.json"

# Export config as environment variables
export DEVICES=$(bashio::config 'devices')

# Start the application
cd /app
exec npm start