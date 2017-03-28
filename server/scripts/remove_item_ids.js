/*
 * DB script. Updates the list of items in current
 * sessions to hold only ids and not objects.
 */

import Item from '../models/item';
import Session from '../models/session';
import mongoose from 'mongoose';
import configDB from '../config/db';

// Config DB
configDB();


Session.find()
	.then(sessions => {
		sessions.forEach(session => {
			if (session.items.length && typeof session.items[0] === 'object') {
				const itemIds = session.items.map(item => item._id);
				session.items = itemIds;
				session.save();
			}
		});
	})
	.catch(err => console.log('Oops!', err));
