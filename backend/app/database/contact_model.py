# IMPORTS
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)
from datetime import datetime
from app.database.db import Base
# CONTACT MODEL
class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    name = Column(
        String,
        nullable=False
    )
    email = Column(
        String,
        nullable=False
    )
    message = Column(
        Text,
        nullable=False
    )
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )