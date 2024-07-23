# Tiktok scraper

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

## Response format
The response is a json object that follows this schema. 

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
        }
    ]
}
```

## Error Handling 

- **ArgumentCountError** : Thrown when the script is not provided with the correct number of command-line arguments.

- **FetchingDataError** : Thrown when there is an error fetching data from TikTok's API or processing the retrieved data. To fix this, check your network connection and make sure that the user you provided exists. 