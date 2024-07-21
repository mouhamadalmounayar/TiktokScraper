const { fromEvent, Subject } = require('rxjs');
const { filter, map, takeUntil } = require('rxjs/operators');
const setApiInterceptors = (page) => {
  const subject = new Subject();

  
  fromEvent(page, 'response')
    .pipe(
      
      filter((response) => response.request().url().includes('/api/post/item_list')),
      map(async (response) => {
        try {
          const jsonData = await response.json();
          return jsonData.itemList.map((element) => ({
            id: element.id,
            duration: element.video.duration,
            views: element.statsV2.playCount,
            creationTime: element.createTime,
            likes: element.statsV2.diggCount,
            comments: element.statsV2.commentCount,
            shares: element.statsV2.shareCount,
            desc: element.desc,
          }));
        } catch (error) {
          console.error('Error parsing JSON response:', error);
          subject.error(error);
        }
      }),
      takeUntil(subject)
    )
    .subscribe({
      next: (filteredDataPromise) => {
        filteredDataPromise.then((filteredData) => subject.next(filteredData));
      },
      error: (err) => {
        subject.error(err);
      },
    });

  return new Promise((resolve, reject) => {
    subject.subscribe({
      next: (data) => resolve(data),
      error: (err) => reject(err),
    });
  });
};

const setInterceptors = async (page) => {
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image', 'stylesheet', 'font', 'media'].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

module.exports = { setInterceptors, setApiInterceptors };
