const {check} = require('express-validator')

module.exports = [
    check('email').exists().withMessage('Vui lòng nhập email người dùng')
    .notEmpty().withMessage('Không được để trống email người dùng')
    .isEmail().withMessage('Email không hợp lệ'),
  
    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Không được để trống mật khẩu')
    .isLength({min: 6}).withMessage('mật khẩu phải từ 6 ký tự trở lên'),
  
]