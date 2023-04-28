from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Enum, event
from sqlalchemy.ext.hybrid import hybrid_property
from bcrypt import hashpw, gensalt
from flask_bcrypt import Bcrypt
from config import db, app

bcrypt = Bcrypt(app)

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    dob = db.Column(db.String)
    _password_hash = db.Column(db.String(128), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    character = db.relationship("Character", backref="user")

    serialize_rules = ('-created_at', '-updated_at', '-character')


    @hybrid_property
    def password(self):
        return self._password_hash 

    @password.setter
    def password(self, password):
        salt = gensalt()
        self._password_hash = hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, 'Email address must contain an @ symbol.'
        return email

    @validates('username')
    def validate_username(self, key, username):
        assert len(username) >= 3, 'Username must be at least 3 characters long.'
        return username

class Character(db.Model, SerializerMixin):
    __tablename__ = "characters"

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    gender = db.Column(db.String, nullable=False)
    sex = db.Column(db.String, nullable=False)
    job = db.Column(Enum(
        'Knight', 'Gunslinger', 'Archer', 'Thief', 'Warrior', 'Berserker', 'Black Mage', 'White Mage'
    ), nullable=False)
    region = db.Column(Enum(
        "Nemar", "Cyneil", "Corize", "Naurra Isles", "Ausstero"
    ), nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    job_stats = db.relationship("JobStats", backref="character")
    inventory = db.relationship("Inventory", backref="character")

    serialize_rules = ('-created_at', '-updated_at', '-job_stats', '-inventory', '-user_id')

    @staticmethod
    def after_insert_listener(target):
        job_stats = JobStats(character=target)
        db.session.add(job_stats)
        db.session.commit()

        event.listen(Character, 'after_insert', Character.after_insert_listener)    

class JobStats(db.Model, SerializerMixin):
    __tablename__ = "job_stats"

    id = db.Column(db.Integer, primary_key=True)
    lvl = db.Column(db.Integer)
    hp = db.Column(db.Integer)
    mg = db.Column(db.Integer)
    strg = db.Column(db.Integer)
    defn = db.Column(db.Integer)
    mind = db.Column(db.Integer)
    intl = db.Column(db.Integer)
    spd = db.Column(db.Integer)
    evad = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))

    serialize_rules = ('-created_at', '-updated_at', '-character_id')

class Inventory(db.Model, SerializerMixin):
    __tablename__ = "inventories"

    id = db.Column(db.Integer, primary_key=True)
    qty = db.Column(db.Integer)
    name = db.Column(db.String)
    description = db.Column(db.String)
    character_id = db.Column(db.Integer, db.ForeignKey("characters.id"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ("-character_id")

class Monster(db.Model, SerializerMixin):
    __tablename__ = "monsters"

    id = db.Column(db.Integer, primary_key=True)
    monster_image = db.Column(db.String)
    monster_name = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    monster_stats = db.relationship("MonsterStats", backref="monster")

    serialize_rules = ('-created_at', '-updated_at', '-monster_stats')

class MonsterStats(db.Model, SerializerMixin):
    __tablename__ = "monster_stats"

    id = db.Column(db.Integer, primary_key=True)
    lvl = db.Column(db.Integer)
    hp = db.Column(db.Integer)
    mg = db.Column(db.Integer)
    strg = db.Column(db.Integer)
    defn = db.Column(db.Integer)
    mind = db.Column(db.Integer)
    intl = db.Column(db.Integer)
    spd = db.Column(db.Integer)
    evad = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    monster_id = db.Column(db.Integer, db.ForeignKey("monsters.id"))

    serialize_rules = ('-created_at', '-updated_at', '-monster_id')

# class Inventory(db.Model, SerializerMixin):
#     __tablename__ = 'inventory'

#     id = db.Column(db.Integer, primary_key=True)
#     quantity = db.Column(db.Integer, default=0, nullable=False)

#     character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), nullable=False)
#     weapon_id = db.Column(db.Integer, db.ForeignKey('weapons.id'), nullable=False)
#     armor_id = db.Column(db.Integer, db.ForeignKey('armor.id'), nullable=False)
#     accessory_id = db.Column(db.Integer, db.ForeignKey('accessories.id'), nullable=False)
#     item_id = db.Column(db.Integer, db.ForeignKey('items.id'), nullable=False)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

# class Weapon(db.Model, SerializerMixin):
#     __tablename__ = 'weapons'

#     id = db.Column(db.Integer, primary_key=True)
#     weapon_type = db.Column(db.String)
#     phy_damage = db.Column(db.Integer)
#     mg_damage = db.Column(db.Integer)
#     name = db.Column(db.String)
#     description = db.Column(db.String)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     inventory = db.relationship("Inventory", backref="weapon")


# class Armor(db.Model, SerializerMixin):
#     __tablename__ = 'armor'

#     id = db.Column(db.Integer, primary_key=True)
#     armor_type = db.Column(db.String)
#     phy_defense = db.Column(db.Integer)
#     mg_defense = db.Column(db.Integer)
#     name = db.Column(db.String)
#     description = db.Column(db.String)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     inventory = db.relationship("Inventory", backref="armor")


# class Accessory(db.Model, SerializerMixin):
#     __tablename__ = 'accessories'

#     id = db.Column(db.Integer, primary_key=True)
#     bonus = db.Column(db.String(50))
#     name = db.Column(db.String)
#     description = db.Column(db.String)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     inventory = db.relationship("Inventory", backref="accessory")

# class Item(db.Model, SerializerMixin):
#     __tablename__ = 'items'

#     id = db.Column(db.Integer, primary_key=True)
#     effect = db.Column(db.String(50))
#     name = db.Column(db.String)
#     description = db.Column(db.String)

#     created_at = db.Column(db.DateTime, server_default=db.func.now())
#     updated_at = db.Column(db.DateTime, onupdate=db.func.now())

#     inventory = db.relationship("Inventory", backref="item")
