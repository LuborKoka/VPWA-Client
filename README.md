# Made by
- Adrián Hládek
- Lubor Koka



# Command line commands

#### List
Lists all members of the active channel

Syntax:

```bash
/list
```

#### Join
Joins a public channel if not a member already or creates a new channel

Syntax:

```bash
/join [<channel_name>] [options]
```

Options:
- `-p`: Create a private channel



#### Quit
Deletes the current channel if the user is its admin

Syntax:

```bash
/quit
```


#### Cancel
Cancels membership of the current user in the current channel. If the user is channel admin, the channel is deleted.

Syntax:

```bash
/cancel
```


#### Invite
Invites a user to a channel

Syntax:

```bash
/invite <username>
```

#### Revoke
Cancels a user's membership in a private channel

Syntax:

```bash
/revoke <username>
```
