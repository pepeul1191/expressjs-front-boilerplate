const data = {
  sistema_id: 1,
  base_url: 'http://localhost:3000/',
  static_url: 'http://localhost:9090/',
  ambiente_static: 'desarrollo',
  ambiente_csrf : 'inactivo',
  ambiente_session : 'inactivo',
  csrf: {
    secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
    key: 'csrf_val'
  },
  accesos: {
    url: 'http://localhost:4000/',
    'csrf_key': 'csrf_val',
    'csrf_value': 'PKBcauXg6sTXz7Ddlty0nejVgoUodXL89KNxcrfwkEme0Huqtj6jjt4fP7v2uF4L',
  },
};

exports.data = data;
