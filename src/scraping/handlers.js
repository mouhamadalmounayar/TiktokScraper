const handlePostItem = async (data, visited, response) => {
  const jsonData = await response.json();
  const uniqueId = jsonData.itemList[0].createTime;
  if (visited.has(uniqueId)) {
    // do nothing
  } else {
    visited.add(uniqueId);
    jsonData.itemList.forEach((element) => {
      data.push({
        id: element.id,
        duration: element.video.duration,
        views: element.statsV2.playCount,
        creationTime: element.createTime,
        likes: element.statsV2.diggCount,
        comments: element.statsV2.commentCount,
        shares: element.statsV2.shareCount,
        desc: element.desc,
      });
    });
  }
};

handleRecommendItem = async (data, visited, response) => {
  const jsonData = await response.json();
  jsonData.itemList.forEach((element) => {
    const user = {
      username: element.author.uniqueId,
      nickname: element.author.nickname,
      description: element.author.signature,
      stats: {
        followerCount: element.authorStats.followerCount,
        followingCount: element.authorStats.followingCount,
        heartCount: element.authorStats.heartCount,
        videoCount: element.authorStats.videoCount,
      },
    };
    if (!visited.has(user.username)) {
      data.push(user);
      visited.add(user.username);
    }
  });
};

module.exports = { handlePostItem, handleRecommendItem };
