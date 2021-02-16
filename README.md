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
  - subscription: resolver에서 변경사항이나 업데이트를 수신할 수 있게 함
  - Pending Orders for Owner (s: newOrder) (t: createOrder(newOrder))
  - Order Status for Everyone (s: orderUpdate) (t: editOrder)
  - Pending Pickup Order for Delivery (s: orderUpdate) (t: orderUpdate(orderUpdate))

# Payments:

- Cron Job
