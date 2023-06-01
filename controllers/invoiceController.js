const Invoice = require('../models/invoice');
const HttpError = require('../interface/httpError');
const { DATA_NOT_FOUND_CODE, GENERAL_ERROR_CODE } = require('../constant/errorCode');
const { BAD_REQUEST, ERROR_SERVER } = require('../constant/errorHttp');
const { DATA_NOT_FOUND_MESSAGE, GENERAL_ERROR_MESSAGE } = require('../constant/errorMessage');
const { defineAbilityFor } = require('../utility/utility');
const { subject } = require('@casl/ability');

const show = async(req, res, next) => {
    try {
        let defineAbilityFor = defineAbilityFor(req.user);
        let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});
        if(!defineAbilityFor.can('read', subjectInvoice)){
            return res.json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk melihat invoice ini.'
            });
        }

        let {order_id} = req.params;
        let invoice = await Invoice
        .findOne({order: order_id})
        .populate('order')
        .populate('user');
        
        return rs.json(invoice);
    } catch (error) {
        const err = new HttpError(GENERAL_ERROR_MESSAGE, GENERAL_ERROR_CODE, ERROR_SERVER)
        return next(err)
    }
}

module.exports = {
    show
}