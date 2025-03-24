module.exports = {
  apps: [
    {
      name: 'sathanic-v1',
      script: 'index.js',
      instances: process.env.PM2_INSTANCES || 1, // Use 'max' for multi-core auto-scaling
      exec_mode: process.env.PM2_MODE || 'fork', // 'cluster' for multi-instance support
      autorestart: true,
      watch: process.env.PM2_WATCH === 'true', // Enable file change monitoring if needed
      max_memory_restart: process.env.PM2_MEMORY_LIMIT || '512M', // Increased limit for better performance
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      out_file: './logs/out.log', // Logs output
      error_file: './logs/error.log', // Logs errors
      combine_logs: true,
      time: true, // Adds timestamps to logs
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000, // Default to port 3000 if not set
      },
    },
  ],
};
