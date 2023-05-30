# Build Docker Image Command
docker build . -t code/code-image

# Command to run tests
npm run test

# Command to run server in production
npm start

# Command to build source code for production
npm run build

# Command to run development server
npm run dev

# Rest API to search clinics
http://localhost:3600/api/clinic?state=CA&clinicName=good&to=20:00&from=11:00