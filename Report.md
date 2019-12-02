#	     ESTORE - Online Store to Buy and Sell Items
	
	     
META

Team Members: Navyasai, Rohil Chandra, Shyam Kumar & Tarun Kumar

Website URL: http://estoreapp.projectweb.space/

GitHub Repository URL: https://github.com/rohilnula/estoreapp

The app is properly deployed and running in the given URL.

Contributions by each member:
Rohil Chandra Maharshi Nula: 
a. Designed and Implemented the Login Pages for the Different types 
of Users(Buyer and Seller)
b. Designed the Profile Pages of the Sellers and Buyers. Buyers page
profile will have the details of the Buyer, their Purchase History,
and the current money in their Account.
c. Designed and Implemented the Schemas for few of the Tables.
d. Implemented AJAX methods to retieve the details for the users.
e. Handled the CSS for some pages.
f. Deployed the App

Navyasai Poranki:
a. Implemented and Designed the Products Page, which will display all
the products present in the Store. Applied filter based on the Catego
-ry selected to display the products.
b. Implemented and Designed the ProductDetails Page, where all the 
details related to the a product are displayed. This page contains
 Details for a Product such as Reviews, InStock, Quantity Available.
c. Implemented Displaying and Adding Reviews for a product, Adding
money to the Buyer.
d. Implemented Uploading Product by a Seller.
e. Handled CSS for some pages.  
f. Deployed the App

Tarun:
a. Implemented and designed the Adding to Cart Functionality.
b. Handled the Elixir Code for validating all the pages.
d. Implemented AJAX methods to retieve the details for the users.
e. Handled the CSS for some pages.
f. Deployed the App

Shyam:
a. Implemented and designed the Live Feed for Product Reviews.
b. Implemeted and designed the Buying Products from the Cart of a
   Buyer by validating the money present in his Account and adding
   the money to the respective Seller.
c. Designed and Implemented the Sign Up Page for the Users.
d. Handled the functionality for posting current product details
   and other related information to pages.
e. Implemented AJAX methods to retieve the details for the users.
f. Deployed the App


App:

App Idea
-> The EStore app is an online E-Commerce website that allows 
  users to buy and sell products. It has the end to end feature
  where the user has the option to set the price, discount, item
  description for the item he wants to sell and while buying, 
  adding an item to cart and purchasing it.

-> User Interaction with the application
  The EStore application has 2 logins - buyer login and seller
  login. To start using the application, the user must first sign
  up either as a buyer or as a seller. Once a user has signed up
  and logins as a buyer, he/she will be able to view the items
  that are currently available in the store. The buyer can filter
  out the type of items he/she wants to use and view the item
  details of the item that is selected. In the item detail page,
  the buyer can add the item to the cart where the purchase is
  carried out.
  For a seller, the seller will be able to see the items that have
  been put for sale by him/her. The seller will also be able to see
  the amount he has made by selling the items.

-> Project Requirements
  All the project requirements as mentioned in the inkfish portal
  were fulfilled. Our team consists of 4 members and each of us 
  contributed to the project equally. The server side of the 
  application was written in elixir and the main web page was 
  implemented as a Single Page Application. The application was 
  properly deployed in the above-mentioned URL using the proper 
  steps as mentioned in the notes provided by the professor without
  any issues. We provide the functionality for a user to create
  an account and use the application. The user can be both a buyer
  and seller, and hence the user can signup as both. The user 
  details are stored in the Postgres database where the password 
  is hashed using Aargon and saved in the database. We have used 
  the location API to get the current location of the user which
  will aid while making payments. All the requests on the web page
  are through the API which is designed and processed via AJAX. 
  Every member of the team was in charge of a specific feature of 
  the app and was involved in creating the table in the database and
  creating the view in front end using ReactJS.

-> App Design
  We have used POSTGres Database for storing data. The application 
  uses 6 tables - buyers, sellers, products, reviews, purchases and
  carts. We have 2 different tables for sellers and buyers since a
  user who is both a seller and buyer can be create 2 seperate 
  accounts with the same login credentials. The password which is 
  saved in the database is hashed and saved to prevent hacekrs who 
  get access to database table get the user passwords ad the user 
  related. The database consists tables for products, reviews, 
  purchases and carts. All these are helpful for a buyer to make a 
  purchase. The items can be added to products table by the seller 
  and any rating that is provided by the buyer is the only edit 
  operation that can be performed in the products table. The reviews
  table contains the reviews that each buyer gives for a particuar 
  product. The table contains

-> Additional Features
  As a part of the additional features, we have implemented the web 
  app as a Single Page Application. We have also used the Phoenix 
  Channels to push realtime updated to users which get triggered 
  whenever a user writes a review for a product. Hence if another 
  user is viewing the product details page, he/she will be able to 
  live updates in the review section when another writes a review for 
  the product.

  The complex part and the most main challenge we faced when 
  implementing our app was creating the socket channel to provide live
  updates to other users. This must work in such a way that it doesn't
  broadcast to all the users, i.e., only to the buyers and at the same
  time the data must be reflected for those buyers who are viewing the
  current page. This was solved using a broadcast connection that will
  send a message when a new buyer opens the particular item detail page.
  This will also be triggered whenever the other buyer makes a review 
  and this will be updated for all the persons watching that particular
  view.

  As a part of the additional feature, we incorporated the location API 
  to get the current user's location. Upon fetching the user location, we
  use it to determine the current time zone and use it to display the 
  price of the product in the region's currency. We have used the 
  location API to determine the time to deliver the product to the buyer 
  which is calculated by time to deliver an item from the seller location 
  to the buyer location.

-> Attribution:
  For reference in deployment, coding in React, POSTGRES, 
  Elixir: http://www.ccs.neu.edu/home/ntuck/courses/2019/09/cs5610/notes/
  Image Art Used from: http://fontawesome.com/
