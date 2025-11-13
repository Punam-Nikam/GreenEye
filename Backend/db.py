import pymysql
from config import MySQLConfig

def get_db_connection():
    connection = pymysql.connect(
        host=MySQLConfig.MYSQL_HOST,
        user=MySQLConfig.MYSQL_USER,
        password=MySQLConfig.MYSQL_PASSWORD,
        database=MySQLConfig.MYSQL_DB,
        cursorclass=pymysql.cursors.DictCursor
    )
    return connection
