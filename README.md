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
		baseIngredients: {
			type: string
			
		
		},
       		available: {
	 	type: boolean,
   		ref: true
        	
        }
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		}
Side is comprised of the following

		name: {
			type: String,
			required: true,
			unique: true
		},

		description: {
			type: String
		},

		size : {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
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

## Sides Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sides/:pizzaId`      | `sides#create`    |
| PATCH  | `/pizzas/:pizzaId/:sideId` | `sides#update`  |
| DELETE | `/sides/:pizzaId/:sideId` | `side#delete`  |
