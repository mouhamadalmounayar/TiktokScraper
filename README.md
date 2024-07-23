# Tiktok scraper

## Content 
- [Motivation](#Motivation)
- [How does it work?](#how-does-it-work)
- [Getting Started](#getting-started)
- [Response](#response-format)
- [Errors](#errors-handling)
- [Contributing](#contributing)
## Motivation 
TikTok currently restricts access to their public API for developers, requiring a lengthy application process for access. I faced this problem while working on a machine learning project where I needed a substantial dataset to train my model. That is why I created this repository. 

## How does it work? 
This Node.js package is designed to gather information from TikTok using Puppeteer. It employs two primary methods to collect data:
- Intercepting api calls: The implementation details for this approach can be found in  `src/scraping/interceptors.js` . 
- Getting information from the html directly : The implementation details for this approach can be found in  `src/scraping/selectors.js`. 

## Getting started 
This package is not released to npm yet. For now, in order to use it, you can :
1. Clone the repository 
```git clone  https://github.com/mouhamadalmounayar/TiktokScraper.git```

2. Install dependencies : 
``` npm install ``` 

3. Use the CLI : 
    - **Usage** 
    ``` tiktok-scraper <username> ```
    The response will then be logged to your console.
    - **Flags** 
      - `-f` : ```tiktok-scraper -f <filename> <username>``` This will save the data to a file in json format.
      - `-a` : ```tiktok-scraper -a <username>``` This will fetch all videos from an account. If this flag is not used, only the first 35 videos will be fetched.

## Response format
After fetching the data, TS will return it following this schema :

```javascript
{
    global_followers : 
    global_likes : 
    videos : [
        {
            id: 
            duration: 
            views: 
            creationTime: 
            likes: 
            comments: 
            shares: 
            desc: 
        }, 
        ...
    ]
}
```
In the future, additional flags to fetch only certain data will be available. Furthermore, some builtin plugins to extract more useful data from the raw data. 

## Errors Handling 

- **InvalidUsageError** : Thrown when the command you wrote is not valid.

- **ErrorFetchingData** : Thrown if, for one the following reasons, TS failed to fetch the corresponding data : 
    - Your network connection : Since TS opens a headless browser it needs good internet connection to run. 
    - Incorrect username : If the username you provided to TS is incorrect.

## Contributing 
Any help to make this project come to life would be very much appreciated. To contribute, check the issues dashboard for issues or create your own. Then fork the repository and open a pull request to the main branch. 