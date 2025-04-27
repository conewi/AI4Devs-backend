# Database Setup Instructions

These instructions will help you set up the database for the two new endpoints:
- `GET /positions/:id/candidates` - Get candidates by position with their stages and scores
- `PUT /candidates/:id/stage` - Update a candidate's interview stage

## Prerequisites

1. PostgreSQL installed and running
2. Node.js and npm installed

## Option 1: Setup Using Prisma (Recommended)

This option will create all tables and add sample data automatically.

1. First, ensure your database connection is configured correctly in `prisma/schema.prisma`. 
   The connection string should look like this:
   ```
   datasource db {
     provider = "postgresql"
     url      = "postgresql://USERNAME:PASSWORD@localhost:5432/LTIdb"
   }
   ```

2. Create the LTIdb database in PostgreSQL if it doesn't exist:
   ```sql
   CREATE DATABASE "LTIdb";
   ```

3. Run the database setup script:
   ```bash
   npm run db:reset
   ```
   This will:
   - Reset the database (drop all tables)
   - Run all migrations
   - Seed the database with sample data

   If you get permission errors, try running with administrator privileges.

4. If you encounter errors with the `db:reset` command, you can try the following steps separately:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   npx prisma db seed
   ```

## Option 2: Manual Setup Using SQL

If you have issues with Prisma, you can use the SQL script directly:

1. Create the LTIdb database in PostgreSQL:
   ```sql
   CREATE DATABASE "LTIdb";
   ```

2. Create the database schema:
   - Run the migrations manually or use Prisma to generate the schema:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Insert sample data using the SQL script:
   - Use the `prisma/sample-data-pg.sql` file (this is a PostgreSQL-compatible version)
   - Execute this SQL in your PostgreSQL client (pgAdmin, psql, etc.)

## Common Errors and Solutions

### Column "interviewflowid" of relation "InterviewStep" does not exist

This error occurs because PostgreSQL is case-sensitive for column names in quotes but defaults to lowercase otherwise. The solution is to:

1. Use the `sample-data-pg.sql` file which has proper quoting for column names
2. Always quote column names with double quotes when they use camelCase, like `"interviewFlowId"` 

### ON CONFLICT syntax errors

Some PostgreSQL versions may not support the ON CONFLICT syntax. The `sample-data-pg.sql` file uses DELETE before INSERT instead of ON CONFLICT for better compatibility.

## Testing the Endpoints

After setting up the database, you can test the endpoints:

1. Start the server:
   ```bash
   npm run start
   ```

2. Test the endpoints:
   - GET `http://localhost:3010/positions/1/candidates` - Should return candidates for position 1
   - PUT `http://localhost:3010/candidates/1/stage` with body `{"interviewStepId": 2}` - Should update candidate 1's stage

## Troubleshooting

If you encounter permission issues with Prisma:
1. Close any applications that might be using the database
2. Check if you have proper permissions to access the database
3. Try running commands with administrator privileges

If tables don't exist:
1. Check your database connection string
2. Make sure you've run the migrations
3. Check PostgreSQL logs for any errors 

If foreign key constraints fail:
1. Make sure you're inserting data in the correct order (parent records before child records)
2. Check that all referenced IDs exist in the parent tables 