const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeChangeSchema = new Schema({
    SentByEmployee: {
        type: Schema.Types.ObjectId,
        ref: 'TransportEmployee',
        required: true
      },
    licensePlate: { type: String, required: true },
    district: { type: String, required: true },
    terminal: { type: String, required: true },
    route: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('RouteChange', routeChangeSchema);
