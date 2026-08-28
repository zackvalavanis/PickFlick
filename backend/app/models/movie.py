import uuid

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class Movie(Base):
    __tablename__ = "movies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=(uuid.uuid4))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    tmbd_id = Column(Integer, nullable=False)
    title = Column(String)
    poster_path = Column(String)

    user = relationship("User", back_populates="movies")
