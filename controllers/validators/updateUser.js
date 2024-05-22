const {check} = require('express-validator')

module.exports = [
    check('fullname')
    .exists().withMessage("Vui lòng nhập họ và tên")
    .notEmpty().withMessage("Họ và tên không được để trống"),

    check('birthday')
    .notEmpty().withMessage("Không được để trống ngày sinh"),

    check('phone')
    .exists().withMessage("Vui lòng nhập số điện thoại")
    .notEmpty().withMessage("Số điện thoại không được để trống"),
]