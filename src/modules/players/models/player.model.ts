import { Document, Schema } from 'mongoose';

const PlayerSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    phone_number: String,
    avatar: String,
    ranking: String,
    position_ranking: Number,
  },
  { timestamps: true, collection: 'players' },
);

interface Player extends Document {
  name: string;
  email: string;
  phone_number: string;
  avatar: string;
  ranking: string;
  position_ranking: number;
}

export { Player, PlayerSchema };
