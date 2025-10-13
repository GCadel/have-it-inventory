# Have-It Inventory Management

## About

This is an inventory management application designed to help you manage
inventory. Whether you need to manage supplies for a bicycle repair shop or your
kitchen pantry, Have-It covers it all.

I have implemented a generic relational database for this project:

1. User has many assemblies and many parts
2. Each assembly belongs to 1 user
3. Each part belongs to 1 user
4. Many assemblies contain 1 or many parts

Feel free to tweak things as you see fit.

### Built with

This project was built using:

- Vite
- React
- React-Router
- Supabase

## How To

### Install the app

1. Clone the repository `git clone https://github.com/GCadel/have-it-inventory`
2. Navigate to the project directory
3. Create a copy of `.env.local.example` and rename it as `.env.local`
4. Update the values in `.env.local` with your API keys

- VITE_example_variable: This value is example value you get from
  `example location`

5. Install the dependencies

- In a terminal, navigate to the project directory
- Run `npm i`

6. Start the application via terminal, and navigate to the web page provided by
   the command output

```
  npm run dev
  (...misc. output information)

  ➜ Local: http://localhost:5173/
```

### Setup Supabase

1. Go to [https://supabase.com/](https://supabase.com/) and create an account
2. Create an organization, then a new project
3. In the `Project Overview` tab, scroll down to find your `Project URL` and `API Key` for connecting to your project.
4. In the cloned repo, make a copy of `.env.local.example` and rename it to `.env.local`, replace the two variables with the `Project URL` and `API Key` values you retrieved from Supabase
5. Back in Supabase, go to the `Authentication` tab, then `Configuration` -> `Sign In / Providers` -> `Supabase Auth`, then click enable `Allow new users to sign up`
6. TBD...
