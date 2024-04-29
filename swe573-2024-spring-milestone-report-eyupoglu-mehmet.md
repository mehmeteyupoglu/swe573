# MVP REPORT

[Link to repo](https://github.com/mehmeteyupoglu/Swe573-eyupoglu)
[Link to deployment](https://communiche.vercel.app)

### login info

```
username: test1234
password: test1234
```

### instructions to build my application

#### frontend

```
cd client
npm install
npm run start
```

#### backend

```
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Note: I have used mysql as database. You might need a mysql server running on your local machine. You can change the database settings in `server/communiche/settings.py` file. Also, consider .env file is needed. You can create a .env file in the root of the project and add the following lines:

```bash
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
```

After the installation is successfull, you can access the application from `http://127.0.0.1:5173`

## What is done and status (related to Requirements and infrastructure)

- [x] [Search & Navigation](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/28)
- [x] [Content Posting](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/24)
- [x] [Community Moderation](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/23)
- [x] [Joining and Leaving a Community](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/22)
- [x] [Community Creation](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/21)
- [x] [Authentication](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/20)
- [x] [Registration](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/19)
- [x] [Negotiate the MVP contents](https://github.com/mehmeteyupoglu/Swe573-eyupoglu/issues/17)

- Reflections about
  - Implementation
    - Management decisions:
      I have used Django as backend and React as frontend. I have used Django Rest Framework for the API, MySQL as database, Vercel for deployment, Github Projects for project management, and Github for version control.
    - Midcourse interventions:
      Some of the issues and requirements have not been totally implemented. I have tried to implement the most important ones. I have also added some extra features that are not in the requirements. For this reason, the issues are attached `re-visit` label to be revisited in the future.
