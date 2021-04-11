const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const cors = require('cors')
const { request, response } = require('express')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let authors =  [
        {
            "id": 1,
            "name": "Charles Dickens",
            "books": [
                {
                    "Oliver Twist": [
                      {
                        "ISBN": "978-1734314502",
                        "Published": 2014,
                        "Genre": "Fiction"
                      }
                    ]
                  },
                  {
                    "Towers": [
                      {
                        "ISBN": "978-1788399081",
                        "Published": 2004,
                        "Genre": "Romance"
                      }
                    ]
                  }
            ]
        },
        {
            "id": 2,
            "name": "Enid Blyton",
            "books": [
                {
                    "Famous Five": [
                      {
                        "ISBN": "978-1-56619-909-4",
                        "Published": 1994,
                        "Genre": "Thriller"
                      }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "name": "Tom Hardy",
            "books": [
                {
                    "Loli": [
                      {
                        "ISBN": "978-92-95055-02-5",
                        "Published": 2000,
                        "Genre": "Fiction"
                      }
                    ]
                }
            ]
        }
    ];
let users = [
  {
    username: 'kean',
    password: "dummy"
  },
  {
    username: 'kean1',
    password: "dummy1"
  },
]

const generateId = () => {
const maxId = authors.length > 0
	? Math.max(...authors.map(n => n.id))
	: 0
return maxId + 1
} 

function validateEmail(email) 
{
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePhone(phone) 
{
  var re = /^[7-9][0-9]{9}$/;
  return re.test(phone);
}

//getting all authors   
app.get('/api/authors', (request, response) => {
    response.json(authors)
})

//getting individual author
app.get('/api/authors/:id', (request, response) => {
    const id = Number(request.params.id)
    const author = authors.find(a => a.id === id)
    response.json(author)
})

//adding author
app.post('/api/authors', (request, response) => {
	const body = request.body

	if (!body.name) {
    return response.status(400).json({ 
      error: 'Content Missing' 
    })
	}

	const author = {
	id: generateId(),
	name: body.name,
	books: [],
	}

	authors = authors.concat(author)

	response.json(author)
})

//updating author
app.put('/api/authors/:id', async (request,response) => {
	const id = Number(request.params.id)
	const body = request.body

  //for author name change
  if(!body.name){
    return response.status(400).json({ 
		  error: 'Field cannot be empty' 
		})
  }
	index = authors.findIndex(author => author.id === id)
	authors[index] = body

	response.json(body)
})

//deleting author
app.delete('/api/authors/:id', (request, response) => {
    const id = Number(request.params.id)
    if(authors === authors.filter(author => author.id !== id)){
      return response.status(400).json({ 
        error: 'Content to be deleted doesnt exist' 
      })
    }
    authors = authors.filter(author => author.id !== id)
    response.status(204).end()
  })

//getting all users
app.get('/api/users', (request, response) => {
	response.json(users)
})

//registering
app.post('/api/users', async (request, response) => {
	const body = request.body

  if(!validateEmail(body.email)){
    return response.status(400).json({ 
		  error: 'Invalid email' 
		})
  }
  else if(!validatePhone(body.phone)){
    return response.status(400).json({ 
		  error: 'Invalid Phone. No.' 
		})
  }
	else if(!body.username || !body.password || !body.email || !body.phone){
		return response.status(400).json({ 
		  error: 'Content Missing' 
		})
	}
	else if(users.find(user => user.username === body.username)){
		return response.status(400).json({ 
		  error: 'Username already exists' 
		})
	}

	const user = {
		username: body.username,
    email: body.email,
    phone: body.phone,
		password: body.password,
	}

	users = users.concat(user)

	response.json(user)
})

//logging in
app.post('/api/login', (request, response) => {
	const body = request.body
	const user = users.find(user => user.username === body.username)
	const passwordCorrect = (user === undefined)?  false: (body.password===user.password? true:false)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
		  error: 'Invalid username or password'
		})
	}

	const userForToken = {
		username: user.username
	}
	const token = jwt.sign(userForToken, "test", {expiresIn: 3600})

	response
		.status(200)
		.send({ token, username: user.username})
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
