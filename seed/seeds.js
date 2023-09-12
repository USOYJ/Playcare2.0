const sequelize = require('../config/connection');
const { Child, Schedule } = require('../models');

const childData = require('./childData.json');
const scheduleData = require('./scheduleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const child = await Child.bulkCreate(childData, {
    individualHooks: true,
    returning: true,
  });

  // for (const schedule of scheduleData) {
  //   await Schedule.create({
  //     schedule,
  //     child_id: child[Math.floor(Math.random() * child.length)].id,
  //   });
  // }

  // Inserting the schedule data into the schedule table referencing the child_id
  for (const schedule of scheduleData) {
    await Schedule.create({
      ...schedule,
      child_id: child[Math.floor(Math.random() * child.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
