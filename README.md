# Tiktok scraper

## Overview 
This Node.js script scrapes the TikTok website to gather valuable data about specific profiles. It can be employed to create datasets for machine learning models, facilitating tasks such as sentiment analysis, content recommendation, user behavior prediction, and more. 

## Getting started 
1. Install dependencies : 
```npm install ```

2. Run the script : 
    - cd to the repository : 
    ```cd SCRAPETIKTOK```
    - Run the script : 
    ``` node . <username> ```
    Replace username with the actual tiktok account username from which you want to fetch data. 

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