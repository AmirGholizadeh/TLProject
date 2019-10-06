const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const docExists = (doc) => {
    if (!doc) {
        return next(new AppError('No document was found with that ID.', 404));
    }
}
exports.getAll = (Model, aggregation) => catchAsync(async(req, res) => {
    let doc;
    if (aggregation) {
        doc = await Model.aggregate(aggregation);
    } else {
        doc = await Model.find();
    }
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });

});
exports.getOne = Model => catchAsync(async(req, res) => {
    const doc = await Model.findById(req.params.id);
    docExists(doc);
    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });

});
exports.updateOne = Model => catchAsync(async(req, res) => {

    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true
    });
    docExists(updatedDoc)
    res.status(200).json({
        status: 'success',
        data: {
            data: updatedDoc
        }
    });
});
exports.createOne = Model => catchAsync(async(req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: newDoc
        }
    })
});
exports.deleteOne = Model => catchAsync(async(req, res) => {
    const doc = await Model.findOneAndDelete(req.params.id);
    docExists(doc);
    res.status(204).json({
        status: 'success',
        data: null
    });
});
exports.deleteAll = Model => catchAsync(async(req, res) => {
    await Model.deleteMany();
    res.status(204).json({
        status: 'success',
        data: null
    })
});