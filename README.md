# Tiktok Scraper

## Content

- [Motivation](#motivation)
- [How does it work?](#how-does-it-work)
- [Getting Started](#getting-started)
- [Errors](#error-handling)
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

```sh
git clone  https://github.com/mouhamadalmounayar/TiktokScraper.git
```

2. Install dependencies :

```sh
 npm install 
```

3. Use the CLI :
    - **Default Usage**

        ```sh
        tiktok-scraper <username> 
        ```

        - Sample Response :

            ```json
            {
                nbFollowers: 139300,
                nbLikes: 4400000,
                videos: [
                    {
                        id: '7191576166006885637',
                        duration: 23,
                        views: '11000000',
                        creationTime: 1674419311,
                        likes: '619000',
                        comments: '1801',
                        shares: '4542',
                        desc: "McDonald's Logo animation"
                    },
                    ...
                ]
            }
            ```

    - **Flags**
      - `-f` :
      This will save the data to a file in json format.

        ```sh
        tiktok-scraper -f <filename> <username> 
        ```  

      - `-a` : This will fetch all videos from an account. If this flag is not used, only the first 35 videos will be fetched.

        ```sh
        tiktok-scraper -a <username>
        ```

    - **Commands**
        - scrapeFromFeed : To scrape directly from the for you feed.

            ```sh
            tiktok-scraper scrapeFromFeed <options>
            ```

            - options :
                - `--users` : to scrape users from the for you feed.
                    - Sample Response :

                        ```json
                            [
                            
                                {
                                    username: 'codingontiktok',
                                    nickname: '',
                                    description: 'Your smile can change the world.',
                                    stats: {
                                        followerCount: 15000000,
                                        followingCount: 43,
                                        heartCount: 345100000,
                                        videoCount: 749
                                    }
                                },
                                {
                                    username: 'coding101',
                                    nickname: 'Coding with passion',
                                    description: '',
                                    stats: {
                                        followerCount: 473100,
                                        followingCount: 23,
                                        heartCount: 7300000,
                                        videoCount: 148
                                    }
                                }
                            ]

                        ```

In the future, additional flags to fetch only certain data will be available. Furthermore, some builtin plugins to extract more useful data from the raw data.

## Error Handling

- **InvalidUsageError** : Thrown when the command you wrote is not valid.
- **ErrorWritingToFile** : Thrown when using the `-f` flag if the file path provided is invalid. 
- **ErrorFetchingData** : Thrown if, for one the following reasons, TS failed to fetch the corresponding data :
  - Your network connection : Since TS opens a headless browser it needs good internet connection to run.
  - Incorrect username : If the username you provided to TS is incorrect.

## Contributing

Any help to make this project come to life would be very much appreciated. To contribute, check the issues dashboard for issues or create your own. Then fork the repository and open a pull request to the main branch.
