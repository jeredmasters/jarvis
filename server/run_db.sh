echo on
rm -rf build/
npm run build
psql -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE datname = 'pi' AND leader_pid IS NULL" postgresql://pi:eEpT3ZX-E54s%25wupL@localhost:5432/postgres 
psql -c "drop database pi" postgresql://pi:eEpT3ZX-E54s%25wupL@localhost:5432/postgres 
psql -c "create database pi" postgresql://pi:eEpT3ZX-E54s%25wupL@localhost:5432/postgres 
psql -c "CREATE EXTENSION pg_trgm;" postgresql://pi:eEpT3ZX-E54s%25wupL@localhost:5432/pi 


rm src/migrations/*
npm run makemigrations
npm run migrations
