'use strict'

// Import Modules & Database Connection
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const connection = require('../connection');

// Initialize Sender Email
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: "x3xhappyzombiesx3x@gmail.com",
		pass: "Mermaid4you"
	}
});

/* ↓ MIDDLEWARE FUNCTION ↓ */

// Test API Function
exports.test = function (req, res) {
	res.json({
		error: false,
		message: 'Register API Connect Successfuly'
	});
}

// Send data register to Database & Send 6 digit random code via Email
exports.create = function (req, res) {
	// Initialize input from Body
	let email = req.body.email;
	
	const digit = Math.floor(100000 + Math.random() * 900000); // 6 Digit Random Generator
	
	// Initialize Receiver Email
	const mailOptions = {
		from: "x3xhappyzombiesx3x@gmail.com",
		to: email,
		subject: '6 Digit kode rahasia untuk melanjutkan Registrasi',
		html: 'JANGAN MEMBERITAHUKAN KODE RAHASIA INI KE SIAPAPUN termasuk pihak Tokopedia.<br>WASPADA TERHADAP KASUS PENIPUAN! KODE RAHASIA untuk melanjutkan Registrasi: <b><i>' + digit + '</i></b>'
	}

	if (email === '') { // If Email is Empty
		res.json({
			error: true,
			message: 'Alamat Email harus di Isi'
		});
	}else { // If Email not Empty
		connection.query(
			`SELECT COUNT(email) AS total FROM tb_user WHERE email=?`,
			[email],
			function (err, rows) {
				if (err) {
					res.json({
						error: true,
						message: err
					});
				}else{
					let total = Math.ceil(rows[0].total);
					if (total === 1) { // If Email already exists
						res.json({
							message: 'Email Sudah Terdaftar'
						});
					}else{ // If Not exists
						// Send Email & Insert Email + 6 Digit code on Database 
						transporter.sendMail(mailOptions, function(err, info){
							if (err) {
								res.json({
									error: true,
									message: err
								});
							}else{
								connection.query(
									`INSERT INTO tb_user SET email=?, password=?, full_name='', address='', img_user=''`,
									[email, digit],
									function (err, rows) {
										if (err) {
											res.json({
												error: true,
												message: err
											});
										}else{
											res.json({
												error: false,
												id_user: rows.insertId,
												message: 'Akun berhasil dibuat'
											});
										}
									}
								)
							}
						});
					}
				}
			}
		)
	}
}

// Check 6 Digit Random Number & Set Token for 1 Hours
exports.check = function (req, res) {
	// Initialize input from Body
	let id_user = req.params.id;
	let password = req.body.password;

	if (password === '') { // If Password is Empty
		res.json({
			error: true,
			message: '6 Digit Autentikasi harus di Isi'
		});
	}else{ // If Password is not Empty
		connection.query(
			`SELECT COUNT(password) AS total FROM tb_user WHERE id_user=? AND password=?`,
			[id_user, password],
			function (err, rows) {
				if (err) {
					res.json({
						error: true,
						message: err
					});
				}else{
					let total = Math.ceil(rows[0].total);
					if (total === 0) { // If Authentication is Not Valid
						res.json({
							message: 'Kode Autentikasi Tidak Valid'
						});
					}else{ // If Authentication is Valid
						// Set Password (6 Digit Random Code) to 0
						connection.query(
							`UPDATE tb_user SET password=0 WHERE id_user=?`,
							[id_user], function (err) { if (err) { res.json({ error: true, message: err }); } }
						)

						// Set JWT Token
						jwt.sign({id_user}, 'secretKey', { expiresIn: '1h' }, (err, token) => {
							if (err) {
								res.json({ error: true });
							}else{
								res.json({
									message: 'Autentikasi Berhasil',
									token: token
								});
							}
						});
					}
				}
			}
		)
	}
}