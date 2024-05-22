const {check} = require('express-validator')
const validator = require('validator');


module.exports = [
    // check tên có hợp lệ hay không
    check('name').exists().withMessage('Vui lòng nhập tên người dùng')
    .notEmpty().withMessage('Không được để trống tên người dùng')
    .isLength({min: 6}).withMessage('Tên người dùng phải từ 6 ký tự trở lên'),
  // check email có hợp lệ hay không
    check('email').exists().withMessage('Vui lòng nhập email người dùng')
    .notEmpty().withMessage('Không được để trống email người dùng')
    .isEmail().withMessage('Email không hợp lệ'),

// check số điện thoại có hợp lệ hay không
    check('phone')
    .notEmpty().withMessage('Số điện thoại không được để trống')
    .custom((value) => {
        if (!validator.isMobilePhone(value, 'vi-VN')) {
        throw new Error('Số điện thoại không hợp lệ');
        }
        return true;
    }),

  // check mât khẩu có hợp lệ hay không
    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
    .notEmpty().withMessage('Không được để trống mật khẩu')
    .isLength({min: 6}).withMessage('mật khẩu phải từ 6 ký tự trở lên'),
  // check mật khẩu có khớp lệ hay không
    check('repassword').exists().withMessage('Vui lòng nhập mật khẩu xác nhận')
    .notEmpty().withMessage('Vui lòng nhập mật khẩu xác nhận')
    .custom((value, {req}) => {
        if (value !== req.body.password){
            throw new Error('Mật khẩu không khớp')
        }
        return true;
    })


  ]