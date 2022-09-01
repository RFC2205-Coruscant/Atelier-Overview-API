# Atelier-Overview-API
# System Design

The goal of this project is to build, speed up, scale up, and deploy a REST server and PostgreSQL database to support a e-commerce application


## Technologies
<span><img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' /></span>
<img src="https://img.shields.io/badge/Express.js-808080?style=for-the-badge&logo=express&logoColor=white" />
<img src='https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white' />
<img src='https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white' />
<img src='https://camo.githubusercontent.com/22829b0ccec86873d95ab869095d8cf3c78a2ff70b00459966f4833d5f2ab2c3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d506f737467726553514c2d3431363945313f6c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465267374796c653d666f722d7468652d6261646765' />


## Stress Testing
Deployed AWS EC2 instances behind Load Balancer to sustain 1000 RPS with an average response time of 23ms and 0% error rate.

<!-- <div align="center"> -->
<!-- <img width="700" alt="" src="https://user-images.githubusercontent.com/97858299/186231146-4618f431-4301-4e0e-9b21-e29107e7fd80.png"> -->
<!-- </div> -->

## Routes
| Request        | Endpoint                        | Returns                                                               | Status
| -------------  | ------------------------------  | --------------------------------------------------------------------  | ------
| GET            | /products                       | Retrieves the list of products.                                       | 200
| GET            | /products/:product_id           | Returns all product level information for a specified product id.     | 200
| GET            | /products/:product_id/related   | Returns the all styles available for the given product.               | 200
| GET            | /products/:product_id/styles    | Returns the id's of products related to the product specified.        | 200
| GET            | /cart                           | Retrieves list of products added to the cart by a user.               | 200
| POST           | /cart/:userToken                | Adds a product to the cart.                                           | 201

## Usage
<i>In the project directory, you can run</i>

`npm run start`
