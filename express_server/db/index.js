require('dotenv').config({path:'../.env'});

const {Client} = require('pg');
const client = new Client({
  host:'18.117.220.97',
  user:'postgres',
  port:5432,
  password: process.env.PASSWORD,
  database:'overview'
});

client.connect();

var getRecord = async function(offsetNum, limitNum, product_id = false) {
  console.log('get in')
  if (product_id) {
    try {
      const result = await client.query(`select * from product where id = ${product_id};`)
      return result.rows
    }
    catch(err) {
      console.log(err)
    }
  } else {
    try {
      const result = await client.query(`select * from product limit ${limitNum} offset ${offsetNum};`)
      return result.rows
    }
    catch(err) {
      console.log(err)
    }
  }

}

var getFeatureAgg = async function(product_id) {
  try {

    const result = await client.query(`select json_build_object('id', product.id, 'name', product.name, 'slogan',product.slogan, 'description', product.description, 'category', product.category, 'default_price', product.default_price, 'features', featureAgg) from (select product_id as id, json_agg(json_build_object('feature', feature, 'value', value)) as featureAgg from features group by product_id having product_id = ${product_id}) as chart join product on product.id = chart.id;`);

    return result.rows[0]['json_build_object'];
  }
  catch(err) {
    console.log(err)
  }
}


var getFeature = async function(product_id) {
  try {
    const result = await client.query(`select * from features where product_id = ${product_id};`);
    return result.rows;
  }
  catch(err) {
    console.log(err)
  }
}

var getStyleAgg  = async function(product_id) {
  try {
    const result = await client.query(`select json_build_object('product_id',${product_id},'results', json_agg(json_build_object('style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles."default?", 'photos', photoHelper.photoURL, 'skus', skuHelper.skuInfo) order by styles.id)) from (select style_id, json_agg(json_build_object('size', size, 'quantity', quantity)) as skuInfo from skus group by style_id having style_id in (select id from styles where product_id = ${product_id})) as skuHelper join (select style_id, json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) as photoURL from photos group by style_id having style_id in (select id from styles where product_id = ${product_id})) as photoHelper on photoHelper.style_id = skuHelper.style_id join styles on styles.id = photoHelper.style_id;
      `);
    // return result.rows[0];
    return result.rows[0]['json_build_object'];
  }
  catch(err) {
    console.log(err)
  }
}


var getStyle = async function(product_id) {
  try {
    const result = await client.query(`select id as style_id, name, sale_price, original_price, "default?" from styles where product_id = ${product_id};`);
    return result.rows;
  }
  catch(err) {
    console.log(err)
  }
}

var getPhoto = async function(style_id) {
  try {
    const result = await client.query(`select thumbnail_url, url from photos where style_id = ${style_id};`);
    return result.rows;
  }
  catch(err) {
    console.log(err)
  }
};

var getSku = async function(style_id) {
  try {
    const result = await client.query(`select id, size, quantity from skus where style_id = ${style_id};`);
    return result.rows;
  }
  catch(err) {
    console.log(err)
  }
}

var getRelated = async function(product_id) {

  try {
    const result = await client.query(`select related_product_id from related where current_product_id = ${product_id} union select current_product_id from related where related_product_id = ${product_id};`);

    return result.rows;
  }
  catch(err) {
    console.log(err)
  }

}

var getCart = async function(user_session) {
  console.log('enter!!')
  try {
    const result = await client.query(`select sku_id, count(sku_id) as count from (select product_id as sku_id from cart where user_session = '${user_session}') as person group by sku_id;`)
    return result.rows;
  }
  catch(err) {
    console.log(err)
  }

}

var postCart = async function(sku_id, user_session) {

  try {
    const result = await client.query(`insert into cart (user_session, product_id, active) values (${user_session}, ${sku_id}, true);`);

    return result;
  }
  catch(err) {
    console.log(err)
  }

}
// getRecord()

module.exports= {getRecord, getFeature, getStyle, getPhoto, getSku, getRelated, getCart, postCart, getFeatureAgg, getStyleAgg};
