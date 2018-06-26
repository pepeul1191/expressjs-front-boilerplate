const data = {
  base_url: 'http://localhost:3000/',
  static_url: 'http://localhost:9090/',
  ambiente_static: 'desarrollo',
  ambiente_csrf : 'activo',
  ambiente_session : 'activo',
  csrf: {
    secret: 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
    key: 'csrf_val'
  },
  accesos: {
    url: 'http://localhost:4000/',
    'csrf_key': 'csrf_val',
    'csrf_value': 'mpt/sr6eS2AlCRHU7DVThMgFTN08pnfSDf/C94eZx7udfm0lvgaYWLYJttYPKzGKDTlXwVU/d2FOxbKkgNlsTw==',
  },
};

exports.data = data;
