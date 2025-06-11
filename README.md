
---
# Judge0 Setup Guide

## 🚀 Setting Up Judge0

> ⚠️ **Important:** Refer to the official Judge0 documentation for complete and up-to-date instructions: [Judge0 Docs](https://github.com/judge0/judge0)

---

## 🛠️ Prerequisites

- Linux OS (preferably Ubuntu)
- Docker and Docker Compose installed

---

## 📦 Clone the Judge0 Docker Image

Clone the latest Judge0 version (e.g., `judge0-v1-13-1`):

```bash
wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
unzip judge0-v1.13.1.zip
```

---

## ⚙️ Configure Your Environment

### 1. GRUB Configuration

Make necessary adjustments to your GRUB settings if you're running Ubuntu. This may involve increasing memory limits or enabling virtualization features.

### 2. Judge0 Environment Variables

- Set a strong password for **Redis**
- Set a strong password for **PostgreSQL**

You can generate secure random passwords from [this website](https://www.random.org/passwords/?num=1&len=32&format=plain&rnd=new).

Update these values in the `judge0.conf` file inside the cloned Judge0 directory.

---

## ⚙️ Configure Workers and Batch Limits

You can customize the number of Judge0 workers based on:

- Expected number of users
- Expected submission volume
- Available system memory

> 🔧 The number of test cases processed in one submission batch is **20 by default**, but you may adjust it in the configuration file.

---

## ▶️ Start Judge0

Run the following commands to launch Judge0 and its dependencies:

```bash
docker compose up -d redis db       # Start Redis and PostgreSQL containers
sleep 10s                           # Wait for containers to be ready
docker compose up -d                # Start Judge0 API and workers
sleep 5s                            # Final wait for complete startup
```

---

## ⚠️ Memory Considerations

Ensure your system has **sufficient memory** to run Judge0 smoothly.

- **Java** submissions may fail to compile if your system is low on memory.
- **Python 3.11** and other lightweight languages usually run fine for short execution times.
- Compilation or runtime errors could indicate insufficient memory resources.

---
# Coding Rooms Platforme Setup 
---
1. For Developement : 
- `npm install ; npm run dev` on each service {`microservices` folder}
- `mvn install; java -jar target/your-producted-jar.jar` for the auth service from [repo](https://github.com/zakachaara/auth-service)
- `npm install ; npm run dev` on the root of this repo for the UI.
2. For Production :
- run the docker compose file 
## VARIABLES TO SET :
---
1. For the UI : 
- NEXT_PUBLIC_AUTHENTICATION_URL=  http://10.0.0.30:8080 #auth-service container
- NEXT_PUBLIC_SUBMIT_CTF_LINK= http://localhost:5007   # without leading "/" 
- NEXT_PUBLIC_CP_SERVICE= http://localhost:5005 
- NEXT_PUBLIC_CE_SERVICE= http://localhost:5006
2. For other services : 
- PORT=5006
- JUDGE0_URL= # For the CP and CE services
- LAMBDA=0.23
- DB_HOST=
- DB_PORT=
- DB_USER=
- DB_PASSWORD=
- DB_NAME=
- ENCRYPTION_KEY= # For the CTF service
