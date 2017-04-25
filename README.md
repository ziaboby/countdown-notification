# Countdown with browser notification

## Description
Set a countdown and warn its end through a browser notification.
The app works only with the latest browser, which support the notification functionality. 

## Dev environment installation and details
From root directory
```bash
npm install
```
then execute, when BackstopJS is required
```bash
npm run installBackstopJS
```

### Commands
All available scripts are listed under "scripts" in package.json file.
Some require additional arguments to be passed:

#### BackstopJS: to create reference images from a custom config file
```bash 
npm run createImagesRefBackstopJS -- --configPath=CUSTOM_FILE_PATH
```

#### BackstopJS: to create comparing test images
```bash 
npm run testBackstopJS -- --configPath=CUSTOM_FILE_PATH
```

#### Compass: compile sass source files in development environment with custom config file
```bash 
npm run compassDev -- -c CUSTOM_FILE_PATH
```

#### Compass: compile sass source files in production environment with custom config file
```bash 
npm run compassProd -- -c CUSTOM_FILE_PATH
``` 
