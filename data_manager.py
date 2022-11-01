import database_common


@database_common.connection_handler
def add_user(cursor, new_user):
    query = """
                INSERT INTO users
                (user_name, password)
                VALUES (%(user_name)s, %(password)s )
            """
    cursor.execute(query,
                   {'user_name': new_user['user_name'], 'password': new_user['password']})


@database_common.connection_handler
def get_user_name(cursor, user_name):
    cursor.execute("""SELECT COUNT(user_name)
                        FROM users
                        WHERE user_name = %(username)s""",
                   {
                       'username': user_name,
                   })
    return cursor.fetchone()


@database_common.connection_handler
def get_user_password(cursor, user_name):
    cursor.execute("""SELECT id, password FROM users
                        WHERE user_name = %(username)s""",
                   {
                       'username': user_name,
                   })
    return cursor.fetchone()