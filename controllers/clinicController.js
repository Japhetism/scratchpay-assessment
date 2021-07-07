exports.getClinics = async (req, res, next) => {
    try {
        res.status(process.env.HTTP_OK_STATUS_CODE).json({
            status: process.env.SUCCESS_STATUS,
            data: null
        })
    } catch (error) {
        next(error);
    }
}