# User

## Diagram

```mermaid.js
%%{init: {'theme': 'default'}}%%
classDiagram
  direction LR

  class User {
    +String id
    +String name
    +Email email
    +UserStatus status
  }

  class Email {
    <<value object>>
    -String value
    +isValid(): Boolean
    +equals(other: Email): Boolean
  }

  class UserStatus {
    <<enum>>
    ACTIVE
    INACTIVE
  }

  User *-- Email : email
  User *-- UserStatus : status
```


## Rules

### User

* `name`: Defaults to `"user"`.
* `email`: Initialized as an empty string (`""`).
* `status`: Defaults to `INACTIVE`.

### Email

* Has an `isValid()` method to perform syntax validation.
* Equality is determined using the `equals()` method.
* An empty email may be considered invalid and should be handled via a factory or service if necessary.

### UserStatus

* Only `ACTIVE` or `INACTIVE` are allowed.
* Only users with `ACTIVE` status can be used in other features (e.g., task assignment).
