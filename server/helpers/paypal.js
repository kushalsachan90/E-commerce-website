const paypal = require('paypal-rest-sdk')

paypal.configure({
  mode: 'sandbox',
  client_id: 'AS8SdH1fDnSywehGpG87l7BISIPMTFRAVpBjUBQZeFZJfiuGMn3srcdFoVGC13lETpqE7n_37EQb_2kb',
  client_secret: 'EPRqe4hq-6ycJBYXxXdCFQxilsjW-MPkgPjp_jJMVcH_0gd3EuqDSHhJ1ebt_zBAshEKif_rCmEg9JNe'
})

module.exports = paypal