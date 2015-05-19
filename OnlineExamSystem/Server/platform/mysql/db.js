console.log('数据连接池正在加载...');
var POOL = require('./mySQLPool').POOL;

module.exports = {
	oeLogin: function(data, res) {
		var sql = 'select * from oe_user where username=? and password=? and status=?';
		data = JSON.parse(data);
		var queryParams = [];
		for(var i in data) {
			queryParams.push(data[i]);
		}
		POOL.getConnection(function(err, conn) {
			conn.query(sql, queryParams, function(err, result) {
				if(err) {
					console.log('oeLogin: ' + err);
					res.status(500).send({'flag': false});
				}
				if(result) {
					if(result.length > 0) {
						res.status(200).send({'flag': true, 'id': result[0].id});
					} else {
						res.status(201).send({'flag': false, 'message': '账号密码不存在或错误!'});
					}
				}
				conn.release();
			});
		});
	},

	oeUserInsert: function(data, res) {
		var sql = 'insert into oe_user set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeUserInsert' + err);
					res.status(500).send({'flag': false});
				}
				if(result) {
					res.status(200).send({'flag': true, 'id': result.insertId});
				}
				conn.release();
			});
		});
	},

	oeUserInfoInsert: function(data, res) {
		var sql = 'insert into oe_user_info set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeUserInfoInsert' + err);
					res.status(500).send({'flag': false});
				}
				if(result) {
					res.status(200).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	oeGetAllSubject: function(res) {
		var sql = 'select * from oe_subject';
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('oeGetAllSubject: ' + err);
				}
				if(result) {
					res.status(200).send(result);
				}
				conn.release();
			});
		});
	},

	oeGetSubjectByCondi: function(params, res) {
		var sql = 'select * from oe_subject where ';
		if(params.subjectType && params.subjectPoint) {
			sql = sql + 'subjectType="' + params.subjectType + '" and subjectPoint="' + params.subjectPoint + '"';
		}
		if(params.subjectType && !params.subjectPoint) {
			sql = sql + 'subjectType="' + params.subjectType + '"';
		}
		if(!params.subjectType && params.subjectPoint) {
			sql = sql + 'subjectPoint="' + params.subjectPoint + '"';
		}
		POOL.getConnection(function(err, conn) {
			conn.query(sql, params, function(err, result) {
				if(err) {
					console.log('oeGetSubjectByCondi: ' + err);
				}
				if(result) {
					res.status(200).send(result);
				}
				conn.release();
			});
		});
	},

	oeGetSubjectInfo: function(res) {
		var sql1 = 'select * from oe_subject_point';
		var sql2 = 'select * from oe_subject_type';
		var data = {};
		POOL.getConnection(function(err, conn) {
			conn.query(sql1, function(err, result) {
				if(err) {
					console.log('oeGetSubjectInfo[sql1]: ' + err);
				} else {
					data.point = result;
					conn.release();
					POOL.getConnection(function(err, conn) {
						conn.query(sql2, function(err, result) {
							if(err) {
								console.log('oeGetSubjectInfo[sql2]: ' + err);
							} else {
								data.type = result;
								res.status(200).send(data);
							}
							conn.release();
						});
					});
				}
			});
		});
	},

	oeAddSubject: function(data, res) {
		var sql = 'insert into oe_subject set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeAddSubject: ' + err);
				}
				if(result) {
					res.status(200).send({'flag': true,'id': result.insertId});
				}
				conn.release();
			});
		});
	},

	oeAddSubjectPoint: function(data, res) {
		var sql = 'insert into oe_subject_point set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeAddSubjectPoint: ' + err);
				}
				if(result) {
					res.status(200).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	deletePoint: function(id, res) {
		var sql = 'delete from oe_subject_point where id=' + id;
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('deletePoint: ' + err);
				}
				if(result) {
					res.status(202).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	oeAddSubjectType: function(data, res) {
		var sql = 'insert into oe_subject_type set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeAddSubjectType: ' + err);
				}
				if(result) {
					res.status(200).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	deleteType: function(id, res) {
		var sql = 'delete from oe_subject_type where id=' + id;
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('deleteType: ' + err);
				}
				if(result) {
					res.status(202).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	oeAddAnswerChose: function(data, res) {
		var sql = 'insert into oe_subject_chose set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeAddAnswerChose: ' + err);
				}
				if(result) {
					res.status(202).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	oeAddAnswerFill: function(data, res) {
		var sql = 'insert into oe_subject_fill set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeAddAnswerFill: ' + err);
				}
				if(result) {
					res.status(202).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	oeAddAnswerSimple: function(data, res) {
		var sql = 'insert into oe_subject_simple set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeAddAnswerSimple: ' + err);
				}
				if(result) {
					res.status(202).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	deleteSubject: function(params, res) {
		var sql1 = 'delete from oe_subject where id="' + params.id + '"';
		var sql2 = '';
		console.log(params);
		if(params.type == '01') {
			sql2 = 'delete from oe_subject_chose where subjectId="' + params.id + '"';
		}
		if(params.type == '02') {
			sql2 = 'delete from oe_subject_fill where subjectId="' + params.id + '"';
		}
		if(params.type == '03') {
			sql2 = 'delete from oe_subject_simple where subjectId="' + params.id + '"';
		}
		POOL.getConnection(function(err, conn) {
			conn.query(sql1, function(err, result) {
				if(err) {
					console.log('deleteSubject[sql1]: ' + err);
				}
				if(result) {
					console.log(sql2)
					POOL.getConnection(function(err, conn) {
						conn.query(sql2, function(err, result) {
							if(err) {
								console.log('deleteSubject[sql2]: ' + err);
							}
							if(result) {
								res.status(200).send({'flag': true});
							}
							conn.release();
						});
					});
				}
				conn.release();
			});
		});
	},

	oeGetChoseAnswer: function(id, res) {
		var sql = 'select * from oe_subject_chose where subjectId="' + id + '"';
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('oeGetChoseAnswer: ' + err);
				}
				if(result) {
					var subjectIndex = result[0].subjectIndex.split('^`');
					var subjectValue = result[0].subjectValue.split('^`');
					var chose = [];
					for(var i = 0; i < subjectIndex.length; i ++) {
						var choseItem = {};
						choseItem.item = subjectIndex[i] + '、' + subjectValue[i];
						chose.push(choseItem);
					}
					delete result[0].subjectIndex;
					delete result[0].subjectValue;
					result[0].chose = chose;
					res.status(200).send({'flag': true, 'answer': result[0]});
				}
				conn.release();
			});
		});
	},

	oeGetFillAnswer: function(id, res) {
		var sql = 'select * from oe_subject_fill where subjectId="' + id + '"';
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('oeGetFillAnswer: ' + err);
				}
				if(result) {
					var answers = result[0].subjectAnswer.split('^`');
					result[0].fill = answers;
					res.status(200).send({'flag': true, 'answer': result[0]});
				}
				conn.release();
			});
		});
	},

	oeGeneratePaper: function(data, res) {
		var sql = 'insert into oe_paper set ?';
		data = JSON.parse(data);
		POOL.getConnection(function(err, conn) {
			conn.query(sql, data, function(err, result) {
				if(err) {
					console.log('oeGeneratePaper: ' + err);
				}
				if(result) {
					res.status(200).send({'flag': true});
				}
				conn.release();
			});
		});
	},

	oeGetAllPaper: function(res) {
		var sql = 'select * from oe_paper';
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('oeGetAllPaper: ' + err);
				}
				if(result) {
					res.status(200).send(result);
				}
				conn.release();
			});
		});
	},

	oeGetSubjectById: function(id, res) {
		var sql = 'select * from oe_subject where id="' + id + '"';
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('oeGetSubjectById: ' + err);
				}
				if(result) {
					res.status(200).send(result[0]);
				}
				conn.release();
			});
		});
	},

	oeFileUpload: function(params, res) {
		var sql = 'insert into oe_file set ?';
		POOL.getConnection(function(err, conn) {
			conn.query(sql, params, function(err, result) {
				if(err) {
					console.log('oeFileUpload: ' + err);
				}
				if(result) {
					res.status(202).send(params);
				}
				conn.release();
			});
		});
	},

	getAllFileByType: function(params, res) {
		var sql = 'select * from oe_file where fileName like "%.' + params.type + '" limit ' + params.offset + ',' + params.limit;
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('getAllFileByType: ' + err);
				}
				if(result) {
					res.status(200).send(result);
				}
				conn.release();
			});
		});
	},

	getAllFile: function(params, res) {
		var sql = 'select * from oe_file limit ' + params.offset + ',' + params.limit;
		POOL.getConnection(function(err, conn) {
			conn.query(sql, function(err, result) {
				if(err) {
					console.log('getAllFile: ' + err);
				}
				if(result) {
					res.status(200).send(result);
				}
				conn.release();
			});
		});
	}
}