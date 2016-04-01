var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
	name: {type: String},
	city: {type: String},
	favMovie: {type: String}
});

ProfileSchema.methods.summary = function() {
	var summary = {
		'name':this.name,
		'city':this.city,
		'favMovie':this.favMovie,
		'id':this._id
	};

	return summary;
};

module.exports = mongoose.model('ProfileSchema', ProfileSchema);	