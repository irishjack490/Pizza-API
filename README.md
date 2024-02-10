# Pizza-API

#### Backend server for the Pizzas App, with auth and mongoose relationships etc

## Entities
User is comprised of the following 
    
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		token: String,

	
Pizza is comprised of the following 

        name: {
		    type: String,
			required: true,
		},
		ingredients: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: true,
		
		}],
        size: {
			type: String,
			required: true,
		},
        customizable: {
            type: Boolean,
            default: false,
        }
        size: {
            type: String,
            enum: ['Small', 'Medium', 'Large'],
            default: 'Medium'
        }
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}
Ingredient is comprised of the following

		name: {
			type: String,
			required: true,
			unique: true
		},

		description: {
			type: String
		},

		createdAt: {
			type: Date,
			default: Date.now
		}



### Auth Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| PATCH  | `/change-password/`    | `users#changepw`  |
| DELETE | `/sign-out/`           | `users#signout`   |

## Pizza Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/pizzas`              | `pizza#index`    |
| GET    | `/pizzas/:id`          | `pizza#show`     |
| POST   | `/pizzas`              | `pizzas#create`  |
| PATCH  | `/pizzas/:id `         | `pizzas#update`  |
| DELETE | `/pizzas/:id`          | `pizzas#delete`  |

## Ingredient Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET    | `/ingredients`         | `ingredients#index`|
| GET    | `/ingredients/:id`     | `ingredient#show`  |
