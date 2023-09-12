const db = require('../../models');

module.exports = function (app) {

  app.get('/api/child', function (req, res) {
    db.Child.findAll({
      include: [db.Parent, db.Schedule]
    }).then(function (dbChild) {
      res.json(dbChild);
    });
  });


  app.get('/api/child/:id', function (req, res) {
    db.Child.findAll({
      where: { id: req.params.id },
      include: [db.Parent, db.Schedule]
    }).then(function (dbChild) {
      res.json(dbChild);
    });
  });


  app.get('/api/child/new/:pid', function (req, res) {
    res.render('newchild', { pid: req.params.pid });
  });


  app.post('/api/child', function (req, res) {
    db.Child.create(req.body).then(function (dbChild) {
      res.render('schedulechild', {
        childid: dbChild.id,
        pid: req.body.ParentId
      });
    });
  });

  app.post('/api/child/:id', function (req, res) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const daysToUpdate = {};
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (daysOfWeek[i] in req.body && req.body[daysOfWeek[i]] === 'on') {
        daysToUpdate[daysOfWeek[i]] = true;
      } else {
        daysToUpdate[daysOfWeek[i]] = false;
      }
    }

    db.Child.update(req.body, { where: { id: req.params.id } }).then(function (dbChild) {
      db.Schedule.update(daysToUpdate, { where: { ChildId: req.params.id } }).then(function (dbSchedule) {
        res.redirect('/childprofile/' + req.params.id);
      });
    });
  });

  app.post('/api/child/del/:id', function (req, res) {
    db.Child.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbChild) {
      res.redirect('/');
    });
  });

  app.delete('/api/child/:id', function (req, res) {
    db.Child.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbChild) {
      res.json(dbChild);
    });
  });
};
