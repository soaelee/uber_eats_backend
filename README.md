# Uber Eats

The Backend of Uber Eats Clone

## User Model:

- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery)

## User CRUD:

- Create Account (create => save)
- Log In (findById)
- See Profile (find?)
- Edit Profile (update)
- Verify Email (find?)

## Restaurant CRUD:

- name
- category (foreign key)
- address
- coverImage

- Create Restaunrant
- Edit Restaurant
- Delete Restaurant

- See Categories
- See Restaurants by Category (pagination)
- See Restaurants (pagination)
- See Restaurant

# Dish CRUD:

- Create Dish
- Edit Dish
- Delete Dish

# Orders:

- Orders CRUD
- Orders Subscription(Owner, Customer, Delivery)

# Payments:

- Cron Job
