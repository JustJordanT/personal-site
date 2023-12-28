---
title: 'The Basics Of Entity Framework Core'
description: 'Learn how to use EF Core'
pubDate: 'Aug 01 2023'
heroImage: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fERhdGFCYXNlfGVufDB8fDB8fHww'
---

## Introduction

Creating a RESTful API with [ASP.NET](http://asp.net/) Core is a popular choice among developers who work with C#. In this tutorial, we will walkthrough how to model two entities—Users and Posts—using Entity Framework Core (EF Core), and then we will expose them via a REST API.

## Prerequisites

- .NET SDK installed
- A text editor or IDE of your choice
- Basic knowledge of C#, REST, and Entity Framework

## Setting Up Your Project

First, create a new [ASP.NET](http://asp.net/) Core Web API project:

```bash
dotnet new webapi -n UserPostApi
```

Add the EF Core package for SQL Server:

```bash
cd UserPostApi
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

## Creating Models

We'll start by defining our `User` and `Post` models. Create a folder named `Models` and add two classes: `User.cs` and `Post.cs`.

### User.cs

```csharp
public class User
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public List<Post> Posts { get; set; }
}

```

### Post.cs

```csharp
public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}

```

## Configuring DbContext

Create a new file `AppDbContext.cs`:

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Post> Posts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
         optionsBuilder.UseSqlite("Data Source=app.db"));
    }
}

```

## Creating Controllers

Generate API controllers for your models.

### UsersController.cs

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<List<User>> GetAll()
    {
        return _context.Users.ToList();
    }

    // ... more CRUD operations
}

```

### PostsController.cs

```csharp
[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;
    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<List<Post>> GetAll()
    {
        return _context.Posts.ToList();
    }

    // ... more CRUD operations
}

```

## Understanding Primary and Foreign Keys

EF Core identifies primary keys and foreign keys through conventions, data annotations, or Fluent API configurations.

For example, by convention:

- `UserId` in the `User` class is considered a primary key.
- `UserId` in the `Post` class is considered a foreign key.

You can also explicitly set these keys using Data Annotations or Fluent API as needed.

## Testing the API

Run your API and use Postman or a similar tool to test the endpoints:

- `dotnet ef migrations add initial`
- `dotnet ef database update`
- `GET <http://localhost:5000/api/users`>
- `GET <http://localhost:5000/api/posts`>

## Summary

We've just built a simple REST API using [ASP.NET](http://asp.net/) Core, modeled our Users and Posts entities, and configured the database context using Entity Framework Core. This example serves as a foundational step to build more complex and feature-rich APIs.

---

Feel free to adapt this blog post to suit your needs or audience. Happy coding and blogging!
