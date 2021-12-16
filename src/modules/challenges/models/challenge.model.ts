import { Document, Schema } from 'mongoose';
import { Category } from 'src/modules/categories/models/category.model';
import { Player } from 'src/modules/players/models/player.model';

const ChallengeSchema = new Schema(
  {
    date_time_challenge: { type: Date },
    status: { type: String },
    date_time_request: { type: Date },
    date_time_response: { type: Date, isNull: true },
    requester: { type: Schema.Types.ObjectId, ref: 'Player' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'challenges' },
);

interface Challenge extends Document {
  date_time_challenge: Date;
  status: ChallengeStatus;
  date_time_request: Date;
  date_time_response: Date | null;
  requester: Player;
  category: Category;
  players: Player[];
}

enum ChallengeStatus {
  ACCOMPLISHED = 'ACCOMPLISHED',
  PENDING = 'PENDING',
  ACCEPT = 'ACCEPT',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED',
}

export { Challenge, ChallengeStatus, ChallengeSchema };
