#!/bin/bash

deno run --allow-read=. --allow-write=. --allow-net $1 ./api/server.ts
