const generateMockObjects = (count) => {
  const mockObjects = { itemList: [] };
  const expectedResults = [];
  const currentTime = Math.floor(Date.now() / 1000);

  for (let i = 0; i < count; i++) {
    const element = {
      createTime: currentTime - i * 1000,
      desc: `description for the video ${i + 1}.`,
      id: 7389346309217443697 + i,
      statsV2: {
        collectCount: Math.floor(Math.random() * 10),
        commentCount: Math.floor(Math.random() * 5),
        diggCount: Math.floor(Math.random() * 50),
        playCount: Math.floor(Math.random() * 5000),
        repostCount: Math.floor(Math.random() * 5),
        shareCount: Math.floor(Math.random() * 5),
      },
      video: {
        duration: Math.floor(Math.random() * 60) + 30, // Duration between 30 and 90 seconds
      },
    };
    mockObjects.itemList.push(element);
    expectedResults.push({
      id: element.id,
      duration: element.video.duration,
      views: element.statsV2.playCount,
      creationTime: element.createTime,
      likes: element.statsV2.diggCount,
      comments: element.statsV2.commentCount,
      shares: element.statsV2.shareCount,
      desc: element.desc,
    });
  }

  return { mocks: mockObjects, results: expectedResults };
};
module.exports = generateMockObjects;