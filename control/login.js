'use strict'

// Import Modules & Database Connection
require('dotenv').config();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const connection = require('../connection');

// Initialize Google APIs
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// 6 Digit Random Generator
const digit = Math.floor(100000 + Math.random() * 900000);

// Initailize to send 6 Digit Random Number via email
async function sendEmail(email) { // Use Async Javascript Function
	// Refresh Token from 'https://developers.google.com/oauthplayground'
	const token_refresh = "1/vmKGFhgWAlWfsA9OGbGjtGL0lQ64DRl4b5fqwcvfUFs"

	// Setup OAuth Client
	const oauth2Client = new OAuth2 (
		"323684778043-uibqc8mra877mmpfkjqud6klni0hbg8r.apps.googleusercontent.com", // ClientID
		"mFzDrvR155bm_BGsl2B0fwST", // Client Secret
		"https://developers.google.com/oauthplayground" // Redirect URL
	)

	// Set OAuth Credential & Get Access Token
	oauth2Client.setCredentials({
		refresh_token: token_refresh
	});
	const tokens = await oauth2Client.refreshAccessToken()
	const acessToken = tokens.credentials.access_token

	// Initialize Sender Email
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			type: "OAuth2",
			user: "dimasgamers01@gmail.com",
			clientId: "323684778043-uibqc8mra877mmpfkjqud6klni0hbg8r.apps.googleusercontent.com",
			clientSecret: "mFzDrvR155bm_BGsl2B0fwST",
			refreshToken: token_refresh,
			accessToken: acessToken
		}
	});

	// Initialize Receiver Email
	const mailOptions = {
		from: "Tokopedia",
		to: email,
		subject: '6 Digit kode rahasia untuk melanjutkan Registrasi',
		generateTextFromHTML: true,
		html: 'JANGAN MEMBERITAHUKAN KODE RAHASIA INI KE SIAPAPUN termasuk pihak Tokopedia.<br>WASPADA TERHADAP KASUS PENIPUAN! KODE RAHASIA untuk melanjutkan Login: <b><i>' + digit + '</i></b>'
	}

	// Send Email
	transporter.sendMail(mailOptions, function(err, info){ if (err) {  console.log(err); } });
}

/* ↓ MIDDLEWARE FUNCTION ↓ */

// Test API Function
exports.test = function (req, res) {
	res.json({
		error: false,
		message: 'Login API Connect Successfuly'
	})
}

// Checking User is Exists on Database & Send 6 digit random code via Email
exports.user = function (req, res) {
	// Initialize input from Body
	let email = req.body.email;

	if (email === '') { // If Email is Empty
		res.json({ error: true, message: 'Alamat Email harus di Isi' });
	} else { // If Email not Empty
		connection.query(
			`SELECT COUNT(email) AS total FROM tb_user WHERE email=?`,
			[email],
			function (err, rows) {
				if (err) {
					res.json({ error: true, message: err });
				} else {
					let total = Math.ceil(rows[0].total);
					if (total === 0) { // If Email doesn't exists
						res.json({ error: true, message: 'Email tidak ditemukan' });
					} else { // If Email exists
						sendEmail(email); // Call sendEmail() Function
						connection.query(
							`UPDATE tb_user SET password=? WHERE email=?`,
							[digit, email],
							function (err) {
								if (err) {
									res.json({ error: true, message: err });
								} else {
									connection.query(
										`SELECT id_user FROM tb_user WHERE email=?`,
										[email],
										function (err, result) {
											if (err) {
												res.json({ error: true, message: err });
											} else {
												res.json({
													error: false,
													message: 'Berhasil Login',
													result: result
												});
											}
										}
									)
								}
							}
						)
					}
				}
			}
		)
	}
}

// Check 6 Digit Random Number & Set Token for 1 Hours
exports.check = function (req, res) {
	// Initialize input
	let id_user = req.params.id;
	let password = req.body.password;

	if (password == '' || password == undefined) { // If Password empty
		res.json({ error: true, message: '6 Digit Autentikasi harus di Isi' });
	} else { // If Password not empty
		connection.query(
			`SELECT COUNT(password) AS total FROM tb_user WHERE id_user=? AND password=?`,
			[id_user, password],
			function (err, rows) {
				if (err) {
					res.json({ error: true, message: err });
				} else {
					let total = Math.ceil(rows[0].total);
					if (total === 0) { // If Authentication is Not Valid
						res.json({ message: 'Kode Autentikasi Tidak Valid' });
					} else { // If Authentication is Valid
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
									error: false,
									message: 'Autentikasi Berhasil',
									token: token,
									data: [{
										id_user: id_user,
									}]
								});
							}
						});
					}
				}
			}
		)
	}
}