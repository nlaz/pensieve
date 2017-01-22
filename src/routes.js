import {
  UserEntity,
  ItemEntity,
  EmailEntity,
  ReviewSessionEntity,
} from './db/schema';

export default function(app) {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/api/items', (req, res) => {
    ItemEntity.find({}, (err, items) => {
      if (err) { return console.log(err); }
      res.send(items);
    });
  });

  app.get('/api/items/:itemId', (req, res) => {
    ItemEntity.findById(req.params.itemId, (err, item) => {
      if (err) { console.log(err); }
      return res.send(item);
    });
  });
}
