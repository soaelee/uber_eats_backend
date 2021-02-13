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
- Orders Read : 주문 목록을 받고 ID로 주문을 찾는다
- Orders Subscription(Owner, Customer, Delivery)

# Payments:

- Cron Job
