const db = require('../config/connection');
const { User, Article } = require('../models');
const userSeeds = require('./userSeeds.json');
const articleSeeds = require('./articleSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Article', 'articles');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < articleSeeds.length; i++) {
      const { _id, author } = await Article.create(articleSeeds[i]);
      await User.findOneAndUpdate(
        { author: author },
        {
          $addToSet: {
            articles: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
