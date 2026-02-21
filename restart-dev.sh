#!/bin/bash
# Kill any existing Next.js dev server
pkill -f "next dev" 2>/dev/null || true
sleep 1
# Clear Next.js cache
rm -rf .next
# Start dev server
npm run dev
