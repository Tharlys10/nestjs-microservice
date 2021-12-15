import { Document, Schema } from 'mongoose';
import { Player } from 'src/modules/players/models/player.model';

const CategorySchema = new Schema(
  {
    name: { type: String, unique: true },
    description: String,
    events: [
      {
        name: String,
        operation: String,
        value: Number,
      },
    ],
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);

interface Category extends Document {
  name: string;
  description: string;
  events: Event[];
  players: Player[];
}

interface Event {
  name: string;
  operation: '+' | '-';
  value: number;
}

export { Category, Event, CategorySchema };
