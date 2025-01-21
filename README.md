
## An expense tracker app

##Preview
![image](https://github.com/user-attachments/assets/b70bb211-0e6f-4958-a91d-64261d850c71)


The main idea of this app is to create a customized expense tracker app, to keep track of life expenses and payments.

## Tech Stack

**Client (Front End):** 

bun
React,
TailwindCSS,
React Hook Form,
Zod,
Nyxb UI,
framer motion,

**Server (Back End):** 

node,
Express js,
mongodb,
Zod,
BcryptJS,
JsonWebToken,
sessions
## Models definitions

- **User**: is the **Worker** that is allowed to access the app, and perform the actions that are allowed to them.
  - **fullNameArabic**`*`: is the full name in arabic name of the user.
    - **fullNameEnglish**`*`: is the full name in english name of the user.
  - **email**: is the email of the user.
  - **phone**: is the phone number of the user.
  - **secondaryPhone**: is the secondary phone number of the user in case primary one is unreachable.
  - **password**`*`: is the password of the user.
  - **active**: is a flag that is set to decide whether the user is allowed to log in or not.
  - **role**: are the different roles that a **User** can have, different roles give the ability to do more or less actions they can perform.
    1. **Spectator**: can only view his own attendances and change his password.
    2. **User**: can view all the payments, attendances, but can't edit anything besides his password.
    3. **Admin**: can do what a **User** can do, and can add new records, but with restricted deletion and editing abilities, where he can't update or delete a user.
    4. **Superadmin**: The highest level of access can do anything.

- **Payment**: is the payment method that is used to pay the **user** at the end of the month.
  - **date**`*`: is the date that this payment made.
  - **amount**`*`: is the amount that is payed.
  - **user**: is an user that this payment is made out to.

- **Expense**: is the payment method that is used to pay the **user** at the end of the month.
  - **name**`*`: is the name of the expense eg: travel.
  - **description**`*`: is the description of the expense.
  - **date**`*`: is the date that this payment made.
  - **amount**`*`: is the amount that is payed.
  - **user**: is an user that this payment is made out to.
  - **category**: the category that the expnese is categorized to.
    
- **Session**: is the record of the sessions that are made by the users.
  - **refreshToken**`*`: is the refresh token that is used to generate new access tokens.
  - **user**`*`: is the user that the refresh token is associated with.
  - **expiresAt**`*`: is the date that the refresh token expires.
- `*`Required field
  
- When a worker gets deleted, all the logs that are associated with that worker are also deleted.
- When a user logout his refresh token is revoked, and all the cached data is revalidated.

  
